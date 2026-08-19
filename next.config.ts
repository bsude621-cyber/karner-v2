import path from "path";
import type { NextConfig } from "next";

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
};

export default nextConfig;
