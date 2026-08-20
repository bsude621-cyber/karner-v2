/**
 * Web sitesi paketleri — /paketler sayfası.
 * Fiyatlar "…'den başlayan" başlangıç fiyatıdır; net teklif keşif sonrası yazılı verilir.
 * Kaynak: KARNER paket taslağı (2026-08-11). Değişiklik Sude onayıyla.
 */
export type Package = {
  slug: string;
  name: string;
  tagline: string;
  audience: string;
  /** Başlangıç fiyatı (TL, tek seferlik) */
  setupFrom: number;
  /** Aylık bakım (TL) — opsiyonel paketlerde "opsiyonel" */
  monthlyFrom?: number;
  monthlyOptional?: boolean;
  includes: string[];
  excludes: string[];
  guarantee?: { yes: string[]; no: string[] };
  highlight?: boolean;
};

export const PACKAGES: Package[] = [
  {
    slug: "vitrin",
    name: "Vitrin",
    tagline: "Müşterin seni Google'da aradığında bulacağı profesyonel bir yüz.",
    audience: "Dükkânı olan ama internette görünmeyen esnaf: kuaför, butik, oto bakım, güzellik merkezi.",
    setupFrom: 12500,
    monthlyFrom: 1500,
    monthlyOptional: true,
    includes: [
      "Tek sayfa premium site — mobil öncelikli, hız odaklı",
      "Kendi domaininiz + SSL + güvenlik başlıkları (vercel.app / pages.dev değil)",
      "Google Business Profile kurulumu ve temel optimizasyon",
      "LocalBusiness yapısal verisi, ad-adres-telefon tutarlılığı",
      "WhatsApp tıkla-yaz ve tıkla-ara butonları",
      "Saha fotoğrafı yönlendirmesi — stok görsel yok",
      "1 revizyon turu",
    ],
    excludes: ["Blog", "Çok sayfalı yapı", "Sıralama taahhüdü", "Aylık içerik üretimi"],
  },
  {
    slug: "bolgesel-lider",
    name: "Bölgesel Lider",
    tagline: "Bölgende seni aramayan müşteri kalmasın.",
    audience: "İlçe/şehir ölçeğinde rakiplerini geçmek isteyen hizmet işletmesi: emlak, tesisat, klima, temizlik, klinik.",
    setupFrom: 25000,
    monthlyFrom: 4000,
    includes: [
      "5–8 sayfalık premium site: hizmet + bölge sayfaları (kapı sayfası değil, gerçek içerik)",
      "Sıralanma altyapısının tamamı: anahtar kelime araştırması, schema.org graph, yapay zekâ botlarına izin, llms.txt, IndexNow, Search Console + Bing, soru biçimli başlıklar ve özet kutuları, güncelleme tarihleri, HSTS preload",
      "Hyperlocal SEO: mahalle/ilçe bazlı anahtar kelime ve hizmet bölgesi işaretlemesi",
      "Google Business Profile tam optimizasyon + dizin kayıtları",
      "Aylık: 2 içerik güncellemesi + görünürlük raporu + GBP yönetimi",
    ],
    excludes: ["Ulusal head-term sıralama taahhüdü", "Reklam bütçesi yönetimi"],
    guarantee: {
      yes: ["Yerel ve uzun kuyruklu aramalarda 90 günde 1. sayfa hedefi — ölçülür, raporlanır"],
      no: ["Ulusal ve yüksek rekabetli tek kelimelik aramalar için taahhüt verilmez"],
    },
    highlight: true,
  },
  {
    slug: "dijital-tekel",
    name: "Dijital Tekel",
    tagline: "Rakiplerin web sitesi yaptırırken sen dijital altyapı kur.",
    audience: "Bölgesinde kategoriyi kapatmak isteyen, otomasyonla büyüyecek işletme.",
    setupFrom: 45000,
    monthlyFrom: 7500,
    includes: [
      "Bölgesel Lider paketinin tamamı",
      "Yapay zekâ görünürlüğü (GEO/AEO): ChatGPT, Gemini ve Perplexity cevaplarında kaynak gösterilme mühendisliği + site dışı kimlik katmanı",
      "1 otomasyon akışı: WhatsApp/Telegram müşteri karşılama veya randevu/iş takip botu",
      "Premium açılış deneyimi: scroll-hero, 3D veya video",
      "Aylık 4 Reels/kısa video içeriği",
      "Aylık strateji görüşmesi + rakip takibi",
    ],
    excludes: ["Reklam bütçesi", "Sosyal medya topluluk yönetimi (yorum/DM cevaplama)"],
  },
];

export const PACKAGE_FAQ = [
  {
    q: "Fiyatlar neden 'başlayan' olarak yazılı?",
    a: "Her işletmenin sayfa sayısı, içerik hacmi ve entegrasyon ihtiyacı farklı. Başlangıç fiyatı paketin temel kapsamını karşılar; keşif görüşmesinden sonra kapsam yazılı netleşir ve net teklif verilir. Sürpriz kalem yok: teklifte ne yazıyorsa o teslim edilir.",
  },
  {
    q: "Domain ve hosting kimde kalır?",
    a: "Sizde. Domain sizin adınıza alınır, barındırma hesabı sizin erişiminizde olur. Çalışma biter ya da ajans değiştirirseniz site ve alan adı sizinle kalır.",
  },
  {
    q: "Aylık bakım zorunlu mu?",
    a: "Vitrin paketinde opsiyonel. Bölgesel Lider ve Dijital Tekel paketlerinde sonuç içerik ve takibe bağlı olduğu için aylık çalışma paketin parçasıdır; bakımsız bırakılan site zamanla arama görünürlüğünü kaybeder.",
  },
  {
    q: "Neden ulusal sıralama taahhüdü yok?",
    a: "Ulusal ve tek kelimelik aramalarda sıralama, sitenin kendisi kadar site dışı sinyallere (bağlantılar, marka bilinirliği, yaş) bağlıdır; bunlar tek başına mühendislikle garanti edilemez. Yerel ve uzun kuyruklu aramalarda ise sonuç ölçülebilir ve hedeflenebilir — taahhüdü orada veriyoruz.",
  },
  {
    q: "Ödeme nasıl işliyor?",
    a: "Kurulum bedeli ve aylık bakım ayrı kalemlerdir; ödeme planı keşif sonrası verilen teklif dokümanında yazılı olarak belirlenir. Teklifte yazmayan bir kalem faturalandırılmaz.",
  },
];
