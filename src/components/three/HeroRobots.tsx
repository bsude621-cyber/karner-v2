"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/robot-a.opt.glb");
useGLTF.preload("/models/robot-b.opt.glb");

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
};

function Robot({ src, position, faceBias, phase, oscAmp = 0.55, fit = 2.2, mouse }: RobotProps) {
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
  useLayoutEffect(() => {
    scene.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
      if (!m) return;
      const mats = Array.isArray(m) ? m : [m];
      for (const mat of mats) {
        const std = mat as THREE.MeshStandardMaterial;
        if (!("metalness" in std)) continue;
        // Dokular (renk / metalik-pürüz haritası) olduğu gibi kalır: saç mat,
        // gövde krom — model ne diyorsa o. Sadece ortam yansıması biraz güçlenir.
        std.envMapIntensity = 1.25;
        std.needsUpdate = true;
      }
    });
  }, [scene]);

  // varsa animasyonu (el salla) döngüde oynat
  useLayoutEffect(() => {
    if (!names.length) return;
    const action = actions[names[0]];
    if (!action) return;
    action.reset().fadeIn(0.4).play();
    return () => {
      action.fadeOut(0.2);
    };
  }, [actions, names]);

  // Giriş animasyonu ilerlemesi (0→1) ve "bakış" hedefi: robot ara sıra yönünü
  // değiştirir, fareye döner — canlı, ayakta duran bir figür hissi.
  const entrance = useRef(0);
  const glance = useRef({ target: 0, next: 2 + phase }); // ilk hedef faza bağlı (saf render)

  useFrame((state, delta) => {
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

function Rig({
  mouse,
  mobile,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  mobile: boolean;
}) {
  // Mobilde robotlar birbirine yakın, biraz küçük ve aşağıda dursun.
  // y birimini piksele çevirmek için: kamera fov 38° ve mobilde z=8.2 olduğundan
  // görünür yarı yükseklik tan(19°)*8.2 ≈ 2.82 birim. 812 px'lik bir ekranda
  // bu 406 px demek, yani 1 birim ≈ 144 px. -0.7 değeri robotları paragrafın
  // altına indiriyor (eskiden -0.35'ti ve kafaları paragrafla çakışıyordu).
  const x = mobile ? 1.15 : 2.7;
  const y = mobile ? -0.7 : -0.15;
  const fit = mobile ? 1.7 : 2.1;
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
      <pointLight position={[-2.8, 0.9, -1.5]} intensity={7} distance={7} decay={2} color="#7B3FE4" />
      <pointLight position={[2.8, 0.9, -1.5]} intensity={7} distance={7} decay={2} color="#8B5CF6" />

      {/* ortam: nötr stüdyo paneller — krom canlı, mat yüzeyler mat kalır */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3.5} position={[0, 3, 3]} scale={[10, 4, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={2.2} position={[-6, 1, 2]} scale={[3, 6, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.8} position={[6, 0, 1]} scale={[3, 6, 1]} color="#ede9fe" />
        <Lightformer form="rect" intensity={1.2} position={[0, -3, 2]} scale={[8, 2, 1]} color="#ffffff" />
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
        resolution={256}
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
        src="/models/robot-a.opt.glb"
        position={[-x, y, 0]}
        faceBias={0.35}
        phase={0}
        fit={fit}
        mouse={mouse}
      />
      <Robot
        src="/models/robot-b.opt.glb"
        position={[x, y, 0]}
        faceBias={-0.35}
        phase={1.6}
        fit={fit}
        mouse={mouse}
      />
    </>
  );
}

export default function HeroRobots({ className = "" }: { className?: string }) {
  const mouse = useRef({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [mobile, setMobile] = useState(false);

  // Ekran boyutunu izle (mobilde robotlar yakın + kamera geride)
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

  return (
    <div ref={wrapRef} className={`pointer-events-none absolute inset-0 ${className}`}>
      <Canvas
        key={mobile ? "m" : "d"}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0.15, mobile ? 8.2 : 6.2], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
        }}
      >
        <Rig mouse={mouse} mobile={mobile} />
      </Canvas>
    </div>
  );
}
