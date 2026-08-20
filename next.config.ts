import path from "path";
import type { NextConfig } from "next";

/**
 * Güvenlik + önbellek başlıkları.
 * - HSTS preload: Chrome/Firefox/Safari yerleşik HTTPS-only listesine giriş
 *   için şart (hstspreload.org — domain bağlandıktan 24 saat sonra submit).
 * - nosniff / referrer / permissions: Lighthouse Best Practices + tarayıcı
 *   güvenlik sinyalleri; içeriği etkilemez.
 * - Statik medya (demo videoları, 3D modeller, hizmet görselleri) bir yıl
 *   immutable — dosya adı değişmeden içerik değişmez.
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
  experimental: {
    /**
     * CSS'i <style> olarak HTML'e göm: render-blocking CSS isteği kalkar,
     * FCP/LCP düşer. Tailwind atomic CSS ~13KB olduğu için maliyeti düşük;
     * arama trafiği ağırlıklı sitede ziyaretçilerin çoğu ilk-ziyaret.
     */
    inlineCss: true,
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/:dir(demos|models|services)/:path*",
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
