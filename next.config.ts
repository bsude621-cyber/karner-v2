import path from "path";
import type { NextConfig } from "next";

/**
 * Güvenlik + önbellek başlıkları.
 * - HSTS preload: Chrome/Firefox/Safari yerleşik HTTPS-only listesine giriş
 *   için şart (hstspreload.org — domain bağlandıktan 24 saat sonra submit).
 * - nosniff / referrer / permissions: Lighthouse Best Practices + tarayıcı
 *   güvenlik sinyalleri; içeriği etkilemez.
 * - Statik medya (demo videoları, 3D modeller, hizmet görselleri, iş
 *   posterleri, arka plan görselleri) bir yıl immutable — dosya adı
 *   değişmeden içerik değişmez. public/ altına YENİ bir medya klasörü
 *   eklersen buraya da ekle, yoksa her istekte yeniden doğrulanır.
 */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Sekmeyi kendisini açan yabancı sayfadan yalıtır (Lighthouse "Best
  // Practices" maddesi). `-allow-popups` sürümü seçildi: tam yalıtım, sitenin
  // açtığı pencerelerle (harita, telefon/e-posta uygulamaları) bağı koparabilir.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig: NextConfig = {
  // Ana klasörde duran yabancı bir package-lock.json yüzünden Next.js kökü
  // C:\Users\celik sanıyordu; kökü açıkça bu projeye sabitliyoruz.
  turbopack: {
    root: __dirname,
  },
  /**
   * Next.js, geliştirme sunucusunun iç kaynaklarını (HMR bağlantısı, RSC
   * yükleri, dinamik parçalar) `localhost` dışındaki adreslerden gelen
   * isteklere karşı 403 ile kapatır — başka bir sitenin geliştirme sunucuna
   * erişmesini engellemek için.
   *
   * Telefondan yerel ağ IP'siyle test ederken bu engel devreye giriyordu:
   * HTML ve script'ler geliyordu (onlar `Origin` başlığı göndermiyor) ama
   * `fetch` ve WebSocket istekleri engellendiği için React sayfayı hiç
   * devralamıyor, `dynamic(ssr:false)` bileşenleri (hero shader'ı ve 3B
   * robotlar) hiç yüklenmiyordu.
   *
   * Yalnızca yerel alt ağa izin veriliyor ve yalnızca geliştirme modunda
   * geçerli — üretim derlemesini etkilemez.
   */
  allowedDevOrigins: ["192.168.1.*"],

  // Sunucu imzası paylaşmanın faydası yok, her yanıtta birkaç bayt maliyeti var.
  poweredByHeader: false,

  /**
   * Görsel teslimatı — tarayıcı ne destekliyorsa onu alsın.
   *
   * Next, isteğin `Accept` başlığına bakıp listeden İLK eşleşeni üretir; sıra
   * bu yüzden önemli. AVIF, WebP'den ~%20 daha küçük ve artık Safari 16+
   * dahil her yerde destekleniyor; desteklemeyen tarayıcı sessizce WebP'ye,
   * o da yoksa özgün formata düşer. Hizmet görselleri 75-230 KB arası JPEG —
   * mobilde en çok bayt bu satırla geri kazanılıyor.
   */
  images: {
    formats: ["image/avif", "image/webp"],
    // Görseller dosya adı değişmeden güncellenmiyor; 4 saatlik varsayılan TTL
    // yerine 30 gün, tekrar tekrar yeniden üretmeyi (ve maliyeti) önler.
    minimumCacheTTL: 2592000,
  },

  experimental: {
    /**
     * CSS'i <style> olarak HTML'e göm: render-blocking CSS isteği kalkar,
     * FCP/LCP düşer. Tailwind atomic CSS ~13KB olduğu için maliyeti düşük;
     * arama trafiği ağırlıklı sitede ziyaretçilerin çoğu ilk-ziyaret.
     */
    inlineCss: true,
    /**
     * framer-motion adlandırılmış onlarca modül dışa aktarıyor; bu liste
     * yalnızca gerçekten kullanılanların paketlenmesini sağlıyor.
     * (lucide-react zaten Next'in varsayılan listesinde.)
     */
    optimizePackageImports: ["framer-motion"],
  },
  /**
   * Tek kanonik host: karneryazilim.com. Vercel üretim takma adı
   * (karner-v2.vercel.app) ve www, 308 ile apex'e döner — arama motoru
   * aynı sayfayı üç adreste görmesin. Önizleme URL'leri (karner-v2-xxx-…)
   * bilerek kapsam dışı; Beyza'nın preview'ları çalışmaya devam eder.
   */
  async redirects() {
    return ["karner-v2.vercel.app", "www.karneryazilim.com"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: "https://karneryazilim.com/:path*",
      permanent: true,
    }));
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/:dir(demos|models|services|backgrounds|isler)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // IndexNow anahtar dosyası ve metin kaynakları arama sonucu olmasın
        source: "/:key([a-f0-9]{32}).txt",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
