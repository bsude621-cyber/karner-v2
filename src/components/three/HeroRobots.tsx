"use client";

import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import { useDeviceProfile } from "@/lib/use-device-profile";
import type { DeviceProfile } from "@/lib/device";

/**
 * Sahnenin cihaza göre ayarları. Tek karar tablosu — dağınık `mobile ? a : b`
 * ifadeleri yerine burada duruyor ki "hangi telefonda ne oluyor" tek bakışta
 * okunsun.
 *
 * KRİTİK OLAN SATIR: `dpr`. Eskiden mobilde sabit 1'di. iPhone'un ekranı 3×
 * yoğunlukta olduğu için 390 piksel genişliğinde çizilen sahne 1170 piksellik
 * alana geriliyordu — her piksel dokuz piksele yayılıyordu. Robotların
 * "kalitesiz" görünmesinin sebebi buydu, modelin kendisi değil. Artık cihazın
 * gerçek gücüne göre 2×'e kadar çıkıyor (yakl. 4 kat piksel), buna karşılık
 * MSAA kapanıyor ve kare hızı sınırlı kalıyor — net görüntü, aynı pil.
 */
function sceneSettings(p: DeviceProfile) {
  const { tier, mobile } = p;
  return {
    /** Çizim çözünürlüğü tavanı (ekranın kendi yoğunluğuyla sınırlı) */
    dpr: p.maxDpr,
    antialias: p.antialias,
    /** Yansıma/ortam haritası çözünürlüğü — krom gövdedeki parlamayı besler */
    envResolution: mobile
      ? tier === "high"
        ? 128
        : tier === "mid"
          ? 96
          : 64
      : 256,
    /**
     * Temas gölgesinin haritası. Yoğun blur altında kaybolduğu için yüksek
     * çözünürlük görünür bir kazanç getirmiyor — masaüstü değeri (256) olduğu
     * gibi kalıyor. Mobilde 128 → 256: sahne artık 4 kat daha çok piksele
     * çiziliyor, gölge tek zayıf halka olarak kalmasın.
     */
    shadowResolution: mobile ? (tier === "high" ? 256 : 128) : 256,
    /** Gölge kaç kare boyunca güncellensin (1 = tek kare, statik) */
    shadowFrames: mobile ? 1 : 120,
    /**
     * Nokta ışıklar ve alttaki dolgu panelleri masaüstüne özel. Mobilde bunlar
     * bilinçli olarak kapalı (2026-08-23 hafifletmesi) ve öyle kalıyor: bu
     * turda mobil GPU bütçesi çözünürlüğe harcandı — asıl şikâyet oydu.
     * Işıkları da geri açmak iki ağır değişikliği üst üste bindirirdi.
     */
    richLighting: !mobile,
    /** Saniyedeki kare — pil ömrünün asıl belirleyicisi */
    fps: p.reducedMotion ? 0 : mobile ? (tier === "high" ? 30 : 24) : tier === "low" ? 30 : 60,
  } as const;
}

/**
 * Model çiftleri. Mobil sürümlerin dokuları 512², masaüstününkiler 1024².
 * (Üretimi: scripts/make-mobile-models.mjs — türetilmiş dosyalar, elle
 * düzenlenmez.)
 *
 * Sebep GPU belleği: sıkıştırılmış .glb boyutları yakın (çoğu geometri ve
 * animasyon), ama GPU'da doku sıkıştırılmadan durur. Sekiz adet 1024² doku
 * ~43 MB, 512² olanlar ~11 MB. Robotlar telefonda 230 piksel boyunda
 * göründüğü için aradaki fark ekranda görünmüyor — iOS Safari'nin sekme
 * bellek tavanında ise 32 MB'lık bir yer açıyor.
 */
const MODELS = {
  desktop: ["/models/robot-a.opt.glb", "/models/robot-b.opt.glb"],
  mobile: ["/models/robot-a.mobile.glb", "/models/robot-b.mobile.glb"],
} as const;

const pickModels = (mobile: boolean) => (mobile ? MODELS.mobile : MODELS.desktop);

// Bu modül yalnızca tarayıcıda yükleniyor (Hero.tsx'te dynamic + ssr:false),
// bu yüzden burada ölçüm yapmak güvenli. Ölçüt aşağıdaki yerleşim kırılma
// noktasının AYNISI — yoksa telefon önce masaüstü modellerini indirir, sonra
// mobil olanları: 2.5 MB boşa giderdi.
if (typeof window !== "undefined") {
  for (const src of pickModels(window.matchMedia("(max-width: 1023px)").matches)) {
    useGLTF.preload(src);
  }
}

type RobotProps = {
  src: string;
  position: [number, number, number];
  /** öne dönük dururken hafif içe/dışa açı (rad) */
  faceBias: number;
  /** salınım faz kaydırması (her robot farklı) */
  phase: number;
  /** salınım genliği (el sallayan robotta düşük tutulur ki hareket net görünsün) */
  oscAmp?: number;
  /** hedef yükseklik (birim). Rig'li modelde kaldırılan kola pay için biraz küçük tutulur */
  fit?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  /** "hareketi azalt" tercihi: robot duruşunu alır ve orada kalır */
  still?: boolean;
};

function Robot({ src, position, faceBias, phase, oscAmp = 0.55, fit = 2.2, mouse, still = false }: RobotProps) {
  const { scene, animations } = useGLTF(src);
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  // Ölçeklemeden gelen dikey ortalama payı — nefes animasyonu bunun ÜSTÜNE
  // eklenir, yoksa her karede ortalamayı silip modeli kaydırıyor.
  const baseY = useRef(0);
  const { actions, names } = useAnimations(animations, inner);

  // modeli sadece YÜKSEKLİĞE göre ölçekle (kol kaldırınca bozulmasın) + merkeze al
  useLayoutEffect(() => {
    const g = inner.current;
    if (!g) return;
    // setFromObject DÜNYA sınırlarını ölçer. İki sorun çıkarıyordu:
    //  1) Daha önce uygulanmış ölçek ölçüme giriyordu — efekt ikinci kez
    //     çalışınca (StrictMode / Fast Refresh) saçma bir kat sayı üretiyordu.
    //  2) Üst grubun [±2.7, -0.15, 0] konumu da ölçüme giriyordu; ortalama payı
    //     o konumu birebir götürüp iki robotu ekranın ortasında buluşturuyordu.
    // Çözüm: ölçümü sıfır durumdan yap ve kutuyu inner'ın YEREL uzayına çevir.
    g.scale.setScalar(1);
    g.position.set(0, 0, 0);
    g.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(scene);
    box.applyMatrix4(g.matrixWorld.clone().invert());
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = fit / (size.y || 1);
    g.scale.setScalar(s);
    g.position.set(-center.x * s, -center.y * s, -center.z * s);
    baseY.current = -center.y * s;
    // fit her robot için sabit; bağımlılık boyutunu sabit tutmak için yalnızca scene
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  // Malzemeleri canlandır: krom gövde ortamı daha güçlü yansıtsın, mor kenar
  // ışığı gövdeye işlesin. Renk değişmez (gümüş kalır), yalnızca kontrast/parlaklık.
  const maxAnisotropy = useThree((st) => st.gl.capabilities.getMaxAnisotropy());
  useLayoutEffect(() => {
    // Anizotropik filtreleme: eğik açıyla bakılan yüzeylerde (gövdenin yanları,
    // ayak altları) doku bulanıklığını kaldırır. GPU'da neredeyse bedava, ama
    // yüksek DPR'e çıkınca farkı en çok görünen ayar bu — 8 ile sınırlıyoruz,
    // ötesi gözle ayırt edilmiyor.
    const aniso = Math.min(8, maxAnisotropy || 1);
    scene.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
      if (!m) return;
      const mats = Array.isArray(m) ? m : [m];
      for (const mat of mats) {
        const std = mat as THREE.MeshStandardMaterial;
        if (!("metalness" in std)) continue;
        // Dokular (renk / metalik-pürüz haritası) olduğu gibi kalır: saç mat,
        // gövde krom — model ne diyorsa o. Sadece ortam yansıması biraz güçlenir.
        std.envMapIntensity = 1.7;
        for (const map of [std.map, std.metalnessMap, std.roughnessMap, std.normalMap]) {
          if (map && map.anisotropy !== aniso) {
            map.anisotropy = aniso;
            map.needsUpdate = true;
          }
        }
        std.needsUpdate = true;
      }
    });
  }, [scene, maxAnisotropy]);

  // varsa animasyonu (el salla) döngüde oynat
  useLayoutEffect(() => {
    if (!names.length) return;
    const action = actions[names[0]];
    if (!action) return;
    if (still) {
      // Hareketi azalt: klip sıfır hızda oynar — el sallama pozu ilk karesinde
      // donar. (`paused` alanına doğrudan yazmak yerine setEffectiveTimeScale:
      // aynı sonuç, dış nesneye atama yapmadan.)
      action.reset().setEffectiveTimeScale(0).play();
      return () => {
        action.stop();
      };
    }
    action.reset().fadeIn(0.4).play();
    return () => {
      action.fadeOut(0.2);
    };
  }, [actions, names, still]);

  // Giriş animasyonu ilerlemesi (0→1) ve "bakış" hedefi: robot ara sıra yönünü
  // değiştirir, fareye döner — canlı, ayakta duran bir figür hissi.
  const entrance = useRef(0);
  const glance = useRef({ target: 0, next: 2 + phase }); // ilk hedef faza bağlı (saf render)

  useFrame((state, delta) => {
    // "Hareketi azalt" açıksa: robot son duruşunu bir kez alır, sonra kıpırdamaz.
    // (Gizlemek yerine durdurmak doğrusu — figür yerinde, sadece hareket yok.)
    if (still) {
      if (inner.current) {
        inner.current.rotation.y = faceBias;
        inner.current.rotation.z = 0;
        inner.current.position.set(0, baseY.current, 0);
      }
      if (outer.current) {
        outer.current.rotation.set(0, 0, 0);
        outer.current.scale.setScalar(1);
        outer.current.position.y = position[1];
      }
      return;
    }
    const t = state.clock.elapsedTime;
    // giriş: yerden hafif yükselerek, ölçek 0.92→1, ~1.1 sn ease-out
    if (entrance.current < 1) {
      entrance.current = Math.min(1, entrance.current + delta / 1.1);
    }
    const e = 1 - Math.pow(1 - entrance.current, 3);

    // ara sıra bakış yönü değiştir (2–5 sn'de bir yeni hedef)
    if (t > glance.current.next) {
      glance.current.target = (Math.random() - 0.5) * 0.8;
      glance.current.next = t + 2.5 + Math.random() * 3;
    }

    if (inner.current) {
      // hedef yön: temel açı + fareye dönüş + ara sıra bakış + çok yavaş salınım
      const targetY =
        faceBias +
        mouse.current.x * 0.55 +
        glance.current.target +
        Math.sin(t * 0.25 + phase) * oscAmp * 0.35;
      inner.current.rotation.y += (targetY - inner.current.rotation.y) * Math.min(1, delta * 2.2);
      // ağırlık aktarma: hafif yana eğilme + küçük yatay kayma (ayakta durma hissi)
      inner.current.rotation.z = Math.sin(t * 0.45 + phase) * 0.035;
      inner.current.position.x = Math.sin(t * 0.45 + phase) * 0.06;
      // nefes: çok küçük dikey hareket — asılı durmasın, yere basar gibi
      inner.current.position.y = baseY.current + Math.sin(t * 1.1 + phase) * 0.02;
    }
    if (outer.current) {
      // fareye doğru çok hafif yatma (parallax) + giriş ölçeği
      const tx = mouse.current.y * 0.08;
      const ty = mouse.current.x * 0.12;
      outer.current.rotation.x += (tx - outer.current.rotation.x) * 0.05;
      outer.current.rotation.y += (ty - outer.current.rotation.y) * 0.05;
      const sc = 0.92 + 0.08 * e;
      outer.current.scale.setScalar(sc);
      outer.current.position.y = position[1] - 0.25 * (1 - e);
    }
  });

  return (
    <group ref={outer} position={position}>
      <group ref={inner}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

/**
 * Kare sınırlayıcı: Canvas "demand" modunda çalışır, burası belirli aralıkla
 * invalidate eder. 120-144 Hz ekranlarda robot sahnesi gereksiz yere 2× GPU
 * yakıyordu; idle hareket 30-60'ta aynı görünüyor.
 *
 * fps = 0 → "hareketi azalt": sahne birkaç kare çizilip (model yüklenmesi,
 * ortam haritası, gölge otursun diye) donar.
 */
function FrameLimiter({ fps, active }: { fps: number; active: boolean }) {
  const invalidate = useThree((st) => st.invalidate);
  useEffect(() => {
    if (!active) return;
    if (fps <= 0) {
      // Statik sahne: yarım saniye boyunca birkaç kare, sonra sessizlik.
      const id = window.setInterval(() => invalidate(), 120);
      const stop = window.setTimeout(() => window.clearInterval(id), 1500);
      return () => {
        window.clearInterval(id);
        window.clearTimeout(stop);
      };
    }
    const id = window.setInterval(() => invalidate(), 1000 / fps);
    return () => window.clearInterval(id);
  }, [fps, active, invalidate]);
  return null;
}

/**
 * Adaptif kalite emniyeti.
 *
 * Cihaz profili bir TAHMİNDİR: çekirdek sayısı yüksek ama GPU'su zayıf
 * telefonlar, ısınıp kısılan işlemciler, arka planda başka sekme yakan
 * kullanıcılar var. Bu yüzden ölçüme de bakıyoruz.
 *
 * ÖLÇÜT: Sahne "demand" modunda çalışıyor — her kareyi FrameLimiter istiyor.
 * Dolayısıyla `delta` render maliyeti DEĞİL, iki kare arasındaki gerçek süre.
 * Doğru soru şu: istediğimiz kare hızını cihaz tutturabiliyor mu? 30 fps
 * istiyorsak aralık 33 ms olmalı; ısrarla 53 ms'in (1,6 katı) üstündeyse cihaz
 * bu sahnenin altında kalıyor demektir. Böylece 24 fps hedefleyen bir telefon,
 * sırf hedefi düşük diye haksız yere cezalandırılmaz.
 *
 * Kalite yalnızca DÜŞER (2 → 1.5 → 1), asla geri yükselmez: yükseltmek gidip
 * gelen bir salınım üretir, titrek görüntü kararsız kaliteden beterdir.
 */
function AdaptiveQuality({
  maxDpr,
  targetFps,
  active,
}: {
  maxDpr: number;
  targetFps: number;
  active: boolean;
}) {
  const gl = useThree((st) => st.gl);
  const samples = useRef<number[]>([]);
  const current = useRef(maxDpr);

  useEffect(() => {
    current.current = maxDpr;
    samples.current.length = 0;
  }, [maxDpr]);

  useFrame((_, delta) => {
    // targetFps <= 0 → sahne zaten statik, ölçecek bir akış yok.
    if (!active || targetFps <= 0 || current.current <= 1) return;
    // İlk kareler model/doku yüklemesiyle şişkindir; sekme arka plana atılınca
    // da aralık saniyelere çıkar. 250 ms üstü örnekler ölçüme girmez.
    if (delta > 0.25) return;

    const s = samples.current;
    s.push(delta);
    if (s.length < 45) return;

    const avg = s.reduce((a, b) => a + b, 0) / s.length;
    s.length = 0;

    const budget = (1 / targetFps) * 1.6;
    if (avg > budget) {
      const next = current.current > 1.5 ? 1.5 : 1;
      current.current = next;
      gl.setPixelRatio(next);
    }
  });

  return null;
}

function Rig({
  mouse,
  mobile,
  settings,
  still,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  mobile: boolean;
  settings: ReturnType<typeof sceneSettings>;
  still: boolean;
}) {
  // Mobilde robotlar birbirine yakın, biraz küçük ve aşağıda dursun.
  // y birimini piksele çevirmek için: kamera fov 38° ve mobilde z=8.2 olduğundan
  // görünür yarı yükseklik tan(19°)*8.2 ≈ 2.82 birim. 812 px'lik bir ekranda
  // bu 406 px demek, yani 1 birim ≈ 144 px. -0.7 değeri robotları paragrafın
  // altına indiriyor (eskiden -0.35'ti ve kafaları paragrafla çakışıyordu).
  // Mobilde robotlar küçülür (1.45) ama AYAK hizası sabit kalır (-1.55 birim,
  // hero'nun ~%78'i) — butonlar (top-%83) ve gölge buna göre ayarlı. Kafalar
  // böylece hero'nun ~%54'üne iner; metin üstte biter, çakışma olmaz.
  // x, görünür genişliğe göre: dar telefonda robotlar kenardan taşmasın.
  // MOBİL YERLEŞİM PİKSEL TABANLI (Sude 2026-08-21: "tam yazının altına al"):
  // Hero metni px cinsinden sabit biter (~348 px; max-w 19rem, px fontlar).
  // Robot kafası 392 px'te başlar, boyu clamp(140, 100dvh − 541, 230) px — kısa
  // ekranlarda küçülür ki altındaki butonlar sohbet düğmesiyle çakışmasın.
  // Hero.tsx'teki buton konumu (top: calc(418px + clamp(140px, 100dvh − 541px, 230px)))
  // bu formülle eşleşir: ayak + 26 px. Birim↔px: görünür yükseklik 5.648 birim
  // (fov 38°, z 8.2), kamera y 0.15 → üst kenar 0.15 + 2.824 birim.
  const [modelA, modelB] = pickModels(mobile);
  const { size } = useThree();
  const H = Math.max(1, size.height);
  const aspect = size.width / H;
  const halfW = 2.824 * aspect; // z=0 düzleminde görünür yarı genişlik
  const upp = 5.648 / H; // birim / px
  // Ölçüm: fit birimi modelin en büyük boyutu; görünen boy ≈ fit × 1.087.
  // Yığın kısıtı: 392 (kafa) + R + 26 + 43 (buton) + 80 (sohbet düğmesi) ≤ H.
  const robotPx = Math.max(140, Math.min(230, H - 541));
  const fit = mobile ? (robotPx * upp) / 1.087 : 2.1;
  const headTopUnits = 0.15 + 2.824 - 392 * upp;
  const y = mobile ? headTopUnits - fit / 2 : -0.15;
  const x = mobile ? Math.min(1.15, Math.max(0.62, halfW - 0.45)) : 2.7;
  // Gölge robotların ayak hizasında dursun. Model kendi merkezine hizalandığı
  // için ayak seviyesi y - fit/2; 0.08 birim altına konuyor ki gölge ayakların
  // altından taşsın. Masaüstünde bu -1.28 veriyor (eski sabit değerin aynısı).
  const shadowY = y - fit / 2 - 0.08;
  return (
    <>
      <ambientLight intensity={0.7} />
      {/* anahtar ışık: nötr beyaz, gerçek doku renkleri okunur */}
      <directionalLight position={[3, 5, 4]} intensity={2.8} color="#ffffff" />
      <directionalLight position={[-4, 2, 3]} intensity={1.1} color="#ffffff" />

      {/* arkadan hafif mor kenar ışığı — silüeti ayırır, renkleri boyamaz */}
      {/* MOBİL HAFİFLETME (2026-08-23): nokta ışıklar yok, ortam haritası 64px ve 3 panel,
          temas gölgesi tek kare (statik) 128px, dpr 1, 24 fps. Görünüm korunur, yük düşer. */}
      {settings.richLighting && (
        <>
          <pointLight position={[-2.8, 0.9, -1.5]} intensity={10} distance={7} decay={2} color="#7B3FE4" />
          <pointLight position={[2.8, 0.9, -1.5]} intensity={10} distance={7} decay={2} color="#A78BFA" />
        </>
      )}

      {/* ortam: RENKLİ stüdyo (2026-08-21, "daha canlı dursun") — krom yansıttığı
          kadar renklidir; beyaz paneller gri robot veriyordu. Üstte beyaz anahtar
          panel (parlak vurgular), solda marka moru, sağda sıcak eflatun, altta
          soğuk buz-camgöbeği kicker → gövdede mor→beyaz→camgöbeği geçişleri.
          Mat yüzeyler (saç, kumaş) ortamı çok az yansıttığı için renkleri
          BOYANMAZ — daha önce geri alınan renkli ışık sorunu yaşanmaz. */}
      <Environment resolution={settings.envResolution}>
        <Lightformer form="rect" intensity={4} position={[0, 3.2, 3]} scale={[10, 3.5, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={3.2} position={[-6, 1, 2]} scale={[3, 7, 1]} color="#8B5CF6" />
        <Lightformer form="rect" intensity={2.8} position={[6, 0.5, 1.5]} scale={[3, 7, 1]} color="#D8B4FE" />
        {settings.richLighting && (
          <>
            <Lightformer form="rect" intensity={2.2} position={[0, -3, 2]} scale={[8, 2, 1]} color="#67E8F9" />
            <Lightformer form="ring" intensity={1.6} position={[0, 1, -5]} scale={[6, 6, 1]} color="#C084FC" />
          </>
        )}
      </Environment>

      {/* robotları yere oturtan yumuşak gölge (mor tonlu) */}
      {/* Her karede yeniden render edilen bir gölge haritası — çözünürlük
          düşük tutuluyor, zaten yoğun blur'un altında kayboluyor. */}
      <ContactShadows
        position={[0, shadowY, 0]}
        scale={14}
        far={2.2}
        blur={2.2}
        opacity={0.8}
        color="#1a0a33"
        resolution={settings.shadowResolution}
        frames={settings.shadowFrames}
      />
      {/* ayakların altında hafif mor zemin halkası — robotlar bir yüzeyde durur */}
      {[-x, x].map((px) => (
        <mesh key={px} rotation-x={-Math.PI / 2} position={[px, shadowY + 0.005, 0.1]}>
          <ringGeometry args={[0.55, 0.95, 48]} />
          <meshBasicMaterial color="#7B3FE4" transparent opacity={0.16} depthWrite={false} />
        </mesh>
      ))}

      {/* soldaki: Robot A, hafif sağa dönük — sağdaki: Robot B, hafif sola dönük */}
      <Robot
        src={modelA}
        position={[-x, y, 0]}
        faceBias={0.35}
        phase={0}
        fit={fit}
        mouse={mouse}
        still={still}
      />
      <Robot
        src={modelB}
        position={[x, y, 0]}
        faceBias={-0.35}
        phase={1.6}
        fit={fit}
        mouse={mouse}
        still={still}
      />
    </>
  );
}

export default function HeroRobots({ className = "" }: { className?: string }) {
  const mouse = useRef({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [mobile, setMobile] = useState(false);
  const profile = useDeviceProfile();
  const settings = sceneSettings(profile);

  // YERLEŞİM ölçütü — yalnızca genişlik. Cihaz profilindeki `mobile` bayrağı
  // dokunmatik iPad'i de kapsıyor; onu buraya bağlamak, telefon için piksel
  // piksel hesaplanmış hero yerleşimini (robot boyu, buton konumu) geniş
  // ekranlı tabletlere de uygulardı. Kalite kademesi cihazdan, yerleşim
  // ekrandan gelir — iki ayrı soru.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Parallax için fareyi pencereden dinle — böylece katman hiçbir tıklamayı engellemez
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // Hero ekran dışındayken render'ı durdur (GPU/pil tasarrufu)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // WebGL yoksa (kurumsal politika, çok eski cihaz, GPU kara listesi) hiç
  // denemeyiz: boş bir tuval bırakmak yerine katman tamamen yok sayılır,
  // hero'nun metni ve butonları zaten kendi başına ayakta.
  if (!profile.webgl) return null;

  return (
    <div ref={wrapRef} className={`pointer-events-none absolute inset-0 ${className}`}>
      <Canvas
        // Yerleşim (kamera mesafesi, robot konumları) mobil/masaüstünde farklı;
        // kademe değişimi ise sahneyi yeniden kurmayı GEREKTİRMEZ — anahtar
        // yalnızca yerleşime bağlı, yoksa telefon çevrildiğinde modeller
        // baştan yüklenirdi.
        key={mobile ? "m" : "d"}
        // Ölçümü geciktir. iOS'ta kaydırırken URL çubuğu oynuyor, görüntü
        // alanının yüksekliği değişiyor ve r3f her değişimde çizim tamponunu
        // (mobilde 780×1328 ≈ 4 MB) yeniden ayırıyordu. Kullanıcı bir aşağı bir
        // yukarı gezdikçe saniyede birkaç kez megabaytlık ayırma/bırakma —
        // iOS Safari'nin sekme bellek tavanını "bir süre sonra" aşmasının
        // sebeplerinden biri buydu. Gecikme, o seli tek bir ayırmaya indiriyor;
        // nihai boyut yine doğru ölçülüyor, yerleşim matematiği bozulmuyor.
        resize={{ debounce: { scroll: 200, resize: 200 } }}
        frameloop={visible ? "demand" : "never"}
        camera={{ position: [0, 0.15, mobile ? 8.2 : 6.2], fov: 38 }}
        dpr={[1, settings.dpr]}
        gl={{
          antialias: settings.antialias,
          alpha: true,
          powerPreference: "high-performance",
          // WebKit'te GPU belleği daralınca tarayıcı bağlamı düşürür. Bu bayrak,
          // three.js'in bağlam geri geldiğinde sahneyi yeniden kurabilmesi için
          // gerekli davranışı açık tutar.
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl, invalidate }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;

          // BAĞLAM KAYBI: telefon uyandığında, sekme uzun süre arka planda
          // kaldığında ya da bellek daraldığında tarayıcı WebGL bağlamını
          // öldürür. preventDefault() olmadan tarayıcı bağlamı geri VERMEZ ve
          // sahne kalıcı olarak siyah kalır. Buradaki iki satır, robotların
          // "bir daha hiç gelmemesi" ile kendiliğinden geri gelmesi arasındaki
          // farkı yaratıyor.
          const canvas = gl.domElement;
          const onLost = (e: Event) => {
            e.preventDefault();
          };
          const onRestored = () => invalidate();
          canvas.addEventListener("webglcontextlost", onLost, false);
          canvas.addEventListener("webglcontextrestored", onRestored, false);
        }}
      >
        <FrameLimiter fps={settings.fps} active={visible} />
        <AdaptiveQuality maxDpr={settings.dpr} targetFps={settings.fps} active={visible} />
        {/* useGLTF askıya alır (suspend). Sınır olmazsa askı en yakın ÜST
            sınıra çıkar; model indirilemezse hata da oraya kadar tırmanır.
            Burada yakalanınca en kötü ihtimalde robotlar gelmez — sayfa durur. */}
        <Suspense fallback={null}>
          <Rig
            mouse={mouse}
            mobile={mobile}
            settings={settings}
            still={profile.reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
