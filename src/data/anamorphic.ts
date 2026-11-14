/**
 * Anamorfik LED videolarımız — ana sayfada "Demo sitelerimiz"in altındaki
 * vitrin (AnamorphicSection) ve her projenin video sayfası
 * (/anamorfik-videolar/[slug]). Bunlar KONSEPT çalışmalardır: markanın
 * siparişi değildir, gerçek işler bölümüne (cases.ts) girmez.
 *
 * Videolar yatay (16:9 civarı) önizlemelerdir: LED'e giden düz dosyanın
 * temsili bir mekâna (bina köşesi, AVM duvarı) yerleştirilmiş hâli.
 * Dosyalar public/anamorfik.
 */
export type AnamorphicClip = {
  src: string;
  poster: string;
  title: string;
  description: string;
  /** ISO tarih (VideoObject uploadDate) */
  uploadDate: string;
  /** ISO 8601 süre (VideoObject duration) */
  duration: string;
};

export type AnamorphicProject = {
  slug: string;
  /** Kart ve sayfa başlığı */
  title: string;
  /** Kartın altındaki kısa açıklama */
  summary: string;
  /** Sayfadaki uzun anlatım (paragraflar) */
  story: string[];
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  /** Kartta hover'da oynayan klip = videos[0]; oynatma bu saniyeden başlar */
  posterTime: number;
  videos: AnamorphicClip[];
  published: string;
  modified: string;
};

export const anamorphicProjects: AnamorphicProject[] = [
  {
    slug: "thy-kose-led-konsepti",
    title: "THY konsepti — köşe LED ekran",
    summary:
      "Köşe ekrandaki düz afiş parçalanıyor, ekran gün batımına açılıyor ve uçak izleyiciye doğru ekrandan çıkıyor.",
    story: [
      "Bina köşesindeki LED ekranda önce alışık olunan kırmızı bir afiş görünüyor: \"Uçmaya hazır mısın? İstanbul'dan dünyaya.\" Afiş parçalara ayrılıp dağılıyor ve ekranın aslında derin bir pencere olduğu ortaya çıkıyor.",
      "Pencerenin içinde gün batımı bulutları var. Uçak uzaktan beliriyor, izleyiciye doğru büyüyerek geliyor, ekranın önünden geçip bulutların arasında kayboluyor; film logo ile kapanıyor.",
      "Önizleme, ıslak zeminli bir gece sokağında binayı geniş açıdan gösteriyor; böylece ekranın sokaktan nasıl okunacağı görülebiliyor. Sahne Blender'da 3D olarak kuruldu.",
    ],
    seoTitle: "THY Köşe LED Ekran Konsepti — 3D Anamorfik Video | KARNER",
    seoDescription:
      "Bina köşesindeki LED ekran için Blender'da ürettiğimiz 3D anamorfik konsept: düz afiş parçalanıyor, uçak gün batımı gökyüzünden izleyiciye doğru uçuyor.",
    tags: ["Köşe LED", "Blender 3D", "Konsept"],
    posterTime: 10,
    videos: [
      {
        src: "/anamorfik/thy-2.mp4",
        poster: "/anamorfik/thy-2-poster.jpg",
        title: "Gece sokağı — geniş açı",
        description:
          "Köşe LED ekranda afiş parçalanıyor, ekran gün batımına açılıyor, uçak izleyiciye doğru uçup geçiyor; logo ile kapanış. Islak zeminli gece sokağı, geniş bina açısı.",
        uploadDate: "2026-11-13",
        duration: "PT18S",
      },
    ],
    published: "2026-11-15",
    modified: "2026-11-15",
  },
  {
    slug: "gratis-avm-led-konsepti",
    title: "Gratis konsepti — AVM ekranı",
    summary:
      "AVM duvarındaki LED ekranda derin bir vitrin kutusu: ruj kutudan dışarı taşıyor, ürün özellikleri ve kapanışta marka.",
    story: [
      "AVM koridorundaki duvar LED ekranının içinde derin, mor ışıklı bir vitrin kutusu kurduk. Ruj kutunun içinden dönerek öne çıkıyor ve çerçevenin dışına taşıyormuş gibi görünüyor.",
      "Film; ürünü tanıtan model kareleri, ürünün özellik listesi ve marka kapanışıyla döngüye giriyor. Sahne Blender'da 3D olarak kuruldu; mekân temsili bir AVM koridorudur.",
    ],
    seoTitle: "Gratis AVM LED Ekran Konsepti — 3D Anamorfik Video | KARNER",
    seoDescription:
      "AVM içindeki LED ekran için Blender'da ürettiğimiz 3D anamorfik konsept: derin vitrin kutusundan dışarı taşan ruj, ürün özellikleri ve marka kapanışı.",
    tags: ["AVM LED", "Blender 3D", "Konsept"],
    posterTime: 4.6,
    videos: [
      {
        src: "/anamorfik/gratis.mp4",
        poster: "/anamorfik/gratis-poster.jpg",
        title: "AVM koridoru görünümü",
        description:
          "AVM duvarındaki LED ekranda vitrin kutusundan dışarı taşan ruj, ürün özellikleri ve marka kapanışı.",
        uploadDate: "2026-11-14",
        duration: "PT18S",
      },
    ],
    published: "2026-11-15",
    modified: "2026-11-15",
  },
];

export const CONCEPT_DISCLAIMER =
  "Bu videolar tekniği göstermek için hazırladığımız bağımsız konsept çalışmalardır; adı geçen markalarla bir iş birliği veya sipariş ilişkisi yoktur. Mekân görüntüleri temsilidir.";

export function getAnamorphicProject(slug: string) {
  return anamorphicProjects.find((p) => p.slug === slug);
}
