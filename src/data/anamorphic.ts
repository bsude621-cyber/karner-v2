/**
 * Anamorfik LED videolarımız — ana sayfada "Demo sitelerimiz"in altındaki
 * vitrin (AnamorphicSection). Bunlar KONSEPT çalışmalardır: markanın
 * siparişi değildir, gerçek işler bölümüne (cases.ts) girmez.
 *
 * Videolar yatay (16:9 civarı) önizlemelerdir: LED'e giden düz dosyanın
 * temsili bir mekâna (bina köşesi, AVM duvarı) yerleştirilmiş hâli.
 * Dosyalar public/anamorfik.
 */
export type AnamorphicVideo = {
  id: string;
  title: string;
  /** Kartın altındaki kısa açıklama */
  summary: string;
  video: string;
  poster: string;
  /** Oynatma bu saniyeden başlar — poster karesiyle aynı yer */
  posterTime: number;
  tags: string[];
};

export const anamorphicVideos: AnamorphicVideo[] = [
  {
    id: "thy-aksam",
    title: "THY konsepti — akşam",
    summary:
      "Köşe ekrandaki düz afiş parçalanıyor, ekran gün batımına açılıyor ve uçak izleyiciye doğru ekrandan çıkıyor.",
    video: "/anamorfik/thy-1.mp4",
    poster: "/anamorfik/thy-1-poster.jpg",
    posterTime: 10,
    tags: ["Köşe LED", "Blender 3D", "Konsept"],
  },
  {
    id: "thy-gece",
    title: "THY konsepti — gece",
    summary:
      "Aynı anamorfik film, ıslak zeminli gece sokağında ve daha geniş bir bina açısından.",
    video: "/anamorfik/thy-2.mp4",
    poster: "/anamorfik/thy-2-poster.jpg",
    posterTime: 10,
    tags: ["Köşe LED", "Blender 3D", "Konsept"],
  },
  {
    id: "gratis-stay-it",
    title: "Gratis konsepti — AVM ekranı",
    summary:
      "AVM duvarındaki LED ekranda derin bir vitrin kutusu: ruj kutudan dışarı taşıyor, ürün özellikleri ve kapanışta marka.",
    video: "/anamorfik/gratis.mp4",
    poster: "/anamorfik/gratis-poster.jpg",
    posterTime: 4.6,
    tags: ["AVM LED", "Blender 3D", "Konsept"],
  },
];
