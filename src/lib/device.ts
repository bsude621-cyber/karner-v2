/**
 * Ziyaretçinin "nereden girdiğini" ölçen tek kaynak.
 *
 * Site tamamen statik üretiliyor (SSG) — bu, CDN'den anında servis edilmesinin
 * ve arama/AI botlarının ham HTML'i görmesinin sebebi. Bu yüzden cihaz ayrımını
 * SUNUCUDA yapamayız: bir middleware ekleyip User-Agent'a göre farklı HTML
 * üretmek her isteği dinamikleştirir, CDN önbelleğini bozar ve siteyi
 * HIZLANDIRMAK yerine yavaşlatır.
 *
 * Bunun yerine ölçüm tarayıcıda, ilk boyamadan sonra yapılır: HTML herkese aynı
 * ve anında gider, ağır 3B/shader katmanları ise cihazın gerçek gücüne göre
 * ayarlanır. Ölçülenler:
 *   - çekirdek sayısı, cihaz belleği (Chrome/Edge; Safari vermez → 0 = bilinmiyor)
 *   - Save-Data ve bağlantı tipi (2g/3g) — kullanıcı veri tasarrufundaysa kısarız
 *   - ekran piksel oranı (iPhone'da 3) — 3B sahnenin çözünürlüğü buna göre
 *   - hareketi azalt tercihi
 *   - WebGL gerçekten açılıyor mu (bazı kurumsal/eski cihazlarda kapalı)
 *   - tarayıcı motoru: iOS'ta Chrome da dahil HER tarayıcı WebKit'tir; WebKit'in
 *     GPU bellek sınırı katıdır, MSAA'yı orada kapatmak sekme çökmesini önler.
 */

export type QualityTier = "low" | "mid" | "high";
export type Engine = "webkit" | "blink" | "gecko" | "unknown";

export type DeviceProfile = {
  /** Ağır sahnelerin ayar kademesi */
  tier: QualityTier;
  /** 3B tuvallerin çizim çözünürlüğü için üst sınır (screenDpr ile sınırlanmış) */
  maxDpr: number;
  /** Ekranın gerçek piksel oranı (iPhone'da genelde 3) */
  screenDpr: number;
  /** Çoklu örnekleme (MSAA) açılsın mı — yüksek DPR'de gereksiz ve WebKit'te riskli */
  antialias: boolean;
  mobile: boolean;
  /** Dokunmatik birincil giriş (fare yok) */
  coarse: boolean;
  ios: boolean;
  engine: Engine;
  reducedMotion: boolean;
  saveData: boolean;
  slowNetwork: boolean;
  webgl: boolean;
  /** 0 = tarayıcı söylemiyor */
  cores: number;
  /** GB, 0 = tarayıcı söylemiyor (Safari) */
  memoryGb: number;
};

/** Sunucuda/JS öncesi varsayılan: orta kademe, kimseyi cezalandırmayan güvenli değerler. */
export const SERVER_PROFILE: DeviceProfile = {
  tier: "mid",
  maxDpr: 1.5,
  screenDpr: 1,
  antialias: true,
  mobile: false,
  coarse: false,
  ios: false,
  engine: "unknown",
  reducedMotion: false,
  saveData: false,
  slowNetwork: false,
  webgl: true,
  cores: 0,
  memoryGb: 0,
};

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { effectiveType?: string; saveData?: boolean };
};

/** WebGL testi pahalı: bir kez yapılır, açılan bağlam hemen serbest bırakılır. */
let webglSupport: boolean | null = null;

function detectWebgl(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      webglSupport = false;
      return false;
    }
    // Test bağlamını bırak — yoksa sayfanın WebGL bağlam bütçesinden bir slot yer.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    webglSupport = true;
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

function detectEngine(ua: string): Engine {
  // Sıra önemli: iOS'taki Chrome (CriOS) ve Firefox (FxiOS) de WebKit'tir.
  if (/iP(hone|ad|od)|CriOS|FxiOS/.test(ua)) return "webkit";
  if (/Edg\/|Chrome\/|Chromium/.test(ua)) return "blink";
  if (/Firefox\//.test(ua)) return "gecko";
  if (/Safari\//.test(ua)) return "webkit";
  return "unknown";
}

function pickTier(p: {
  cores: number;
  memoryGb: number;
  mobile: boolean;
  saveData: boolean;
  slowNetwork: boolean;
  webgl: boolean;
}): QualityTier {
  if (!p.webgl) return "low";
  // Kullanıcı açıkça veri tasarrufu istiyorsa ya da bağlantı 2g/3g ise
  // görsel şovun bedelini ödetmeyiz.
  if (p.saveData || p.slowNetwork) return "low";
  if (p.memoryGb > 0 && p.memoryGb <= 2) return "low";
  if (p.cores > 0 && p.cores <= 2) return "low";

  // memoryGb === 0 → Safari söylemiyor; çekirdek sayısıyla karar veriyoruz.
  const enoughMemory = p.memoryGb === 0 || p.memoryGb >= (p.mobile ? 4 : 8);
  if (p.mobile) {
    if (p.cores >= 6 && enoughMemory) return "high";
    return p.cores >= 4 ? "mid" : "low";
  }
  if (p.cores >= 8 && enoughMemory) return "high";
  return p.cores >= 4 ? "mid" : "low";
}

const DPR_CAP: Record<QualityTier, number> = { low: 1, mid: 1.5, high: 2 };

/**
 * Tarayıcıda ölçüm yapar. Yalnızca `window` varken çağırın; yoksa
 * SERVER_PROFILE döner.
 */
export function detectDeviceProfile(): DeviceProfile {
  if (typeof window === "undefined") return SERVER_PROFILE;

  const nav = navigator as NavigatorWithHints;
  const ua = nav.userAgent || "";
  const engine = detectEngine(ua);
  const ios =
    /iP(hone|ad|od)/.test(ua) ||
    // iPadOS 13+ kendini masaüstü Mac gibi tanıtır; dokunma noktası sayısı ele verir.
    (/Mac/.test(ua) && nav.maxTouchPoints > 1);

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const mobile = window.matchMedia("(max-width: 1023px)").matches || (coarse && ios);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const conn = nav.connection;
  const saveData = conn?.saveData === true;
  const slowNetwork = /^(slow-)?2g$|^3g$/.test(conn?.effectiveType || "");

  const cores = Number(nav.hardwareConcurrency) || 0;
  const memoryGb = Number(nav.deviceMemory) || 0;
  const webgl = detectWebgl();

  const tier = pickTier({ cores, memoryGb, mobile, saveData, slowNetwork, webgl });
  const screenDpr = Math.max(1, window.devicePixelRatio || 1);
  const maxDpr = Math.min(screenDpr, DPR_CAP[tier]);

  return {
    tier,
    maxDpr,
    screenDpr,
    // 1.75× ve üstünde zaten süper örnekleme yapıyoruz: MSAA görsel olarak fark
    // yaratmaz ama WebKit'te fazladan GPU belleği ister (sekme çökmesinin klasik
    // sebebi). Düşük DPR'de ise kenarları kurtardığı için açık kalır.
    antialias: maxDpr < 1.75,
    mobile,
    coarse,
    ios,
    engine,
    reducedMotion,
    saveData,
    slowNetwork,
    webgl,
    cores,
    memoryGb,
  };
}
