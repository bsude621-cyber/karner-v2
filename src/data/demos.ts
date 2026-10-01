/**
 * Kurgu demo siteler — KARNER'in farklı sektörler için tasarlayıp yayına
 * aldığı örnekler. Gerçek müşteri işi DEĞİLDİR; gerçek işler cases.ts'te.
 *
 * `featured` olanlar ana sayfa vitrininde (WorksSection) görünür; tamamı
 * /isler sayfasındaki "Sektörel demo siteler" bölümünde listelenir.
 */
export type Demo = {
  id: string;
  title: string;
  sector: string;
  summary: string;
  url: string;
  /** Hero videosu (public/demos altında). */
  video: string;
  /**
   * Gerçek poster görseli. Önceden video adresine `#t=8` gibi medya parçası
   * ekleyip tarayıcıdan o kareyi göstermesini istiyordum; masaüstünde çalıştı
   * ama iOS Safari kullanıcı dokunmadan videoyu yüklemediği için kartlar
   * siyah kutu olarak görünüyordu. Poster görseli her yerde çalışıyor.
   */
  poster: string;
  /** Oynatma bu saniyeden başlar — poster karesiyle aynı yer, geçiş pürüzsüz olsun. */
  posterTime: number;
  tags: string[];
  featured?: boolean;
};

export const demos: Demo[] = [
  {
    id: "icmimar",
    title: "İç Mimarlık Stüdyosu",
    sector: "İç Mimarlık",
    summary:
      "Ziyaretçi daha okumadan işin kalitesini görüyor, teklif formu elinin altında.",
    url: "https://icmimar-demo.vercel.app",
    video: "/demos/icmimar.webm",
    poster: "/demos/icmimar-poster.jpg",
    posterTime: 8,
    tags: ["Video Hero", "Proje Galerisi", "Teklif Formu"],
    featured: true,
  },
  {
    id: "mimar",
    title: "Mimarlık Stüdyosu",
    sector: "Mimarlık",
    summary:
      "Sade tasarım projeleri öne çıkarıyor, dikkat doğrudan işin kendisine gidiyor.",
    url: "https://mimar-demo.vercel.app",
    video: "/demos/mimar.webm",
    poster: "/demos/mimar-poster.jpg",
    posterTime: 8,
    tags: ["Sinematik", "Portfolyo"],
    featured: true,
  },
  {
    id: "insaat",
    title: "İnşaat & Mühendislik",
    sector: "İnşaat",
    summary:
      "Büyük bütçeli işlerde aranan kurumsal güveni veren duruş, referanslar önde.",
    url: "https://insaat-web-eight.vercel.app",
    video: "/demos/insaat.webm",
    poster: "/demos/insaat-poster.jpg",
    posterTime: 4,
    tags: ["Kurumsal", "Referanslar", "Güven"],
    featured: true,
  },
  {
    id: "dustas",
    title: "Duşakabin & Banyo",
    sector: "Banyo & Yapı",
    summary:
      "Ziyaretçi aradığı ürünü birkaç tıkta buluyor, iletişim her ekranda.",
    url: "https://dustas-demo.vercel.app",
    video: "/demos/dustas.webm",
    poster: "/demos/dustas-poster.jpg",
    posterTime: 8,
    tags: ["Ürün Vitrini", "Katalog"],
    featured: true,
  },
  {
    id: "diyetisyen",
    title: "Diyetisyen Kliniği",
    sector: "Sağlık",
    summary:
      "Randevuya giden yolu kısaltıyor, danışan yorumları güveni pekiştiriyor.",
    url: "https://diyetisyen-demo.vercel.app",
    video: "/demos/diyetisyen.webm",
    poster: "/demos/diyetisyen-poster.jpg",
    posterTime: 8,
    tags: ["Randevu", "Paketler"],
    featured: true,
  },
  {
    id: "meridyen",
    title: "Gayrimenkul Ofisi",
    sector: "Gayrimenkul",
    summary:
      "Kaydırdıkça açılan sinematik giriş — ilan sitelerinden ayrışan ilk izlenim.",
    url: "https://meridyen-demo.vercel.app",
    // Kaynak sitede video yok: hero'su 120 JPEG'lik kare dizisi. Kartta
    // oynatabilmek için o kareler videoya dönüştürüldü (24 fps, 5 sn).
    video: "/demos/meridyen.webm",
    poster: "/demos/meridyen-poster.jpg",
    posterTime: 2.5,
    tags: ["Scroll Animasyon", "Sinematik"],
    featured: true,
  },
  {
    id: "disklinigi",
    title: "Diş Kliniği",
    sector: "Sağlık",
    summary:
      "Önce bilgilendiren sakin bir anlatım; tedavi adımları randevudan önce anlaşılıyor.",
    url: "https://dis-klinigi-demo-eight.vercel.app",
    video: "/demos/disklinigi.webm",
    poster: "/demos/disklinigi-poster.jpg",
    posterTime: 4,
    tags: ["Video Hero", "Tedavi Akışı", "Randevu"],
  },
  {
    id: "fizyoterapi",
    title: "Fizyoterapi Merkezi",
    sector: "Sağlık",
    summary:
      "Ziyaretçi şikâyetinden başlıyor, ilgili tedaviye ve randevuya yönleniyor.",
    url: "https://fizyoterapi-demo.vercel.app",
    video: "/demos/fizyoterapi.webm",
    poster: "/demos/fizyoterapi-poster.jpg",
    posterTime: 4,
    tags: ["Bölge Seçimi", "Seans Bilgisi", "Randevu"],
  },
  {
    id: "otoservis",
    title: "Oto Servis & Ekspertiz",
    sector: "Yerel Hizmet",
    summary:
      "Araca yapılacak işlem başlamadan önce gösteriliyor; servis süreci adım adım açık.",
    url: "https://oto-servis-demo.vercel.app",
    video: "/demos/otoservis.webm",
    poster: "/demos/otoservis-poster.jpg",
    posterTime: 4,
    tags: ["Scroll Animasyon", "Süreç", "Randevu"],
  },
  {
    id: "nakliyat",
    title: "Evden Eve Nakliyat",
    sector: "Yerel Hizmet",
    summary:
      "Taşınmanın üç sorusuna ilk ekranda cevap: paketleme, yazılı fiyat, belli gün.",
    url: "https://nakliyat-demo.vercel.app",
    video: "/demos/nakliyat.webm",
    poster: "/demos/nakliyat-poster.jpg",
    posterTime: 4,
    tags: ["Video Hero", "Teklif Formu"],
  },
  {
    id: "malimusavir",
    title: "Mali Müşavirlik Ofisi",
    sector: "Mali Müşavirlik",
    summary:
      "Ofisin nasıl çalıştığını sade bir dille anlatan, güven veren kurumsal duruş.",
    url: "https://mali-musavir-demo.vercel.app",
    video: "/demos/malimusavir.webm",
    poster: "/demos/malimusavir-poster.jpg",
    posterTime: 4,
    tags: ["Kurumsal", "Hizmetler", "İletişim"],
  },
  {
    id: "butikotel",
    title: "Butik Otel",
    sector: "Konaklama",
    summary:
      "Odalar kısa videolarla geziliyor; atmosfer rezervasyondan önce hissediliyor.",
    url: "https://butik-otel-demo.vercel.app",
    video: "/demos/butikotel.webm",
    poster: "/demos/butikotel-poster.jpg",
    posterTime: 4,
    tags: ["Oda Galerisi", "Sinematik", "Rezervasyon"],
  },
  {
    id: "kres",
    title: "Kreş & Çocuk Evi",
    sector: "Eğitim",
    summary:
      "Veliye mekânı ve günün akışını gösteren, sakin ve güven veren bir tanıtım.",
    url: "https://kres-demo.vercel.app",
    video: "/demos/kres.webm",
    poster: "/demos/kres-poster.jpg",
    posterTime: 4,
    tags: ["Mekân Turu", "Günlük Akış", "Ön Kayıt"],
  },
];

export const featuredDemos = demos.filter((d) => d.featured);

export function getDemo(id: string) {
  return demos.find((d) => d.id === id);
}
