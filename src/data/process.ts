/**
 * Çalışma süreci — /surec sayfası + HowTo schema + llms-full.
 * Süre/fiyat yok; adımlar ve her adımın çıktısı.
 */
export type ProcessStep = {
  no: string;
  name: string;
  text: string;
  output: string;
  detail: string[];
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    no: "01",
    name: "Keşif",
    text: "İşinizi, müşterinizi ve rakiplerinizi dinleyerek başlarız. Hangi aramalarda bulunmanız gerektiği tahminle değil, anahtar kelime araştırması ve yerel rekabet analiziyle netleşir.",
    output: "yol haritası",
    detail: [
      "Kısa keşif görüşmesi: hedef, mevcut durum, müşteri profili.",
      "Arama niyeti ve rakip taraması: hangi sorgular, kim çıkıyor, neden.",
      "Kapsam yazılı hâle gelir: sayfalar, hizmetler, ölçüm ölçütleri.",
    ],
  },
  {
    no: "02",
    name: "Tasarım",
    text: "Hazır şablon kullanmayız. Renk, yazı ve düzen markanıza göre sıfırdan kurulur; favicon'a kadar her detay elden geçer. Amaç güzel durmak değil — sizin müşterinize doğru konuşmak.",
    output: "size özel tasarım",
    detail: [
      "Önce tek bir açılış ekranı (hero) gösterilir, yön birlikte kilitlenir.",
      "Saha fotoğrafı ve gerçek içerik; stok görsel ve klişe şablon yok.",
      "Mobil öncelikli yerleşim, erişilebilir kontrast ve okunur tipografi.",
    ],
  },
  {
    no: "03",
    name: "Kurulum",
    text: "Site hızlı, güvenli ve ölçülebilir kurulur. Teknik SEO, yapılandırılmış veri ve yapay zekâ aramalarının okuyabileceği içerik katmanı sonradan eklenmez — baştan içindedir.",
    output: "canlı site",
    detail: [
      "Next.js / Astro ile statik üretim, kendi domaininizde HTTPS ve güvenlik başlıkları.",
      "schema.org graph, site haritası, robots.txt'te yapay zekâ botlarına izin, llms.txt.",
      "Search Console, Bing Webmaster ve IndexNow kurulumu; görsel ve font optimizasyonu.",
    ],
  },
  {
    no: "04",
    name: "Ölçüm",
    text: "Yayına girince iş bitmez. Arama kayıtları açılır, görünürlük izlenir, sonuç raporla gösterilir. Vaka sayfalarındaki ekran kayıtları bu adımın çıktısıdır.",
    output: "görünürlük raporu",
    detail: [
      "Hedef sorgularda klasik arama + yapay zekâ araçları birlikte kontrol edilir.",
      "Hız ve yapısal veri düzenli doğrulanır; içerik güncellemeleri tarihlenir.",
      "Bakım kapsamında yeni içerik, ilan/ürün güncellemesi ve aylık özet.",
    ],
  },
];
