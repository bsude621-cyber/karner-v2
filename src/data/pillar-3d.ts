/**
 * /3d-web-sitesi pillar sayfasının paylaşılan verisi.
 * FAQ hem sayfada (görünür + FAQPage schema) hem llms-full.txt'te kullanılır.
 * Kural: yalnızca genel teknik/sektör bilgisi — fiyat, süre garantisi,
 * onaysız firma iddiası yazılmaz.
 */
export const PILLAR_3D = {
  slug: "3d-web-sitesi",
  title: "3D Web Sitesi",
  seoTitle: "3D Web Sitesi Yaptırma — WebGL ile Etkileşimli Site | KARNER",
  seoDescription:
    "3D web sitesi nedir, hangi işletmelere uygun, hızlı olur mu? WebGL/Three.js ile etkileşimli site rehberi ve Türkiye genelinde 3D web sitesi geliştirme.",
  summary:
    "3D web sitesi; ürünü veya markayı tarayıcıda gerçek zamanlı, döndürülebilir üç boyutlu sahnelerle sunan sitedir. WebGL ve Three.js ile çalışır, doğru optimize edildiğinde klasik site kadar hızlı açılır.",
} as const;

export const PILLAR_3D_FAQ = [
  {
    q: "3D web sitesi telefonda çalışır mı?",
    a: "Çalışır. WebGL, modern mobil tarayıcıların tamamına yakınında desteklenir. İyi kurulmuş bir 3D sitede mobil cihazlara daha küçük model ve doku gönderilir; 3D'yi kaldıramayan eski cihazlarda ise sahnenin yerine aynı bilgiyi veren bir görsel gösterilir. Ziyaretçi hiçbir durumda boş sayfayla karşılaşmaz.",
  },
  {
    q: "WebGL ve WebGPU nedir?",
    a: "WebGL, tarayıcının ekran kartını kullanarak üç boyutlu grafik çizmesini sağlayan web standardıdır ve on yılı aşkın süredir tüm büyük tarayıcılarda bulunur. WebGPU, aynı işin daha yüksek performanslı yeni nesli olarak tarayıcılara girmektedir. Three.js gibi kütüphaneler bu katmanların üzerinde çalışır; siteniz teknoloji değişse de aynı kütüphaneyle güncel kalır.",
  },
  {
    q: "Hazır şablonla 3D site olur mu?",
    a: "Hazır şablonlardaki 3D öğeler genellikle stok modellerdir; markayla bağı yoktur ve rakip sitelerde de aynıları görülür. Etki bırakan 3D, markanın ürününü veya hikâyesini anlatan özel sahneden gelir. Şablon 3D ile özel 3D arasındaki fark, stok fotoğrafla marka çekimi arasındaki farka benzer.",
  },
  {
    q: "3D öğelerin SEO'ya etkisi ne?",
    a: "3D sahnenin kendisi arama motoruna görünmez; sayfanın metni, başlıkları ve yapısal verisi sıralamayı taşır. Doğru kurulumda 3D sahne yalnızca ekrana geldiğinde yüklenir ve sayfanın hız puanını düşürmez. Dolaylı etkisi olumludur: etkileşimli sahne sitede geçirilen süreyi artırır; bu davranış sinyalleri arama motorlarının kaliteli sayfa değerlendirmesine girer.",
  },
  {
    q: "Var olan siteme 3D eklenebilir mi?",
    a: "Eklenebilir. 3D sahne, sayfanın bir bölümü olarak mevcut sitenin içine gömülebilir — sitenin tamamını yeniden yapmak gerekmez. Teknik altyapıya göre en temiz yol değişir; modern bir React/Next.js sitesinde bileşen olarak, diğer altyapılarda gömülü modül olarak entegre edilir.",
  },
  {
    q: "3D modeller hangi formatta hazırlanır?",
    a: "Web'in standart formatı glTF/GLB'dir — modeli, dokuları ve animasyonu tek dosyada taşır. Yayın öncesi model Draco ile sıkıştırılır, dokular küçültülür; böylece dosya boyutu büyük oranda düşer ve sahne mobil bağlantıda da hızlı yüklenir.",
  },
] as const;
