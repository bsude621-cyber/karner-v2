/**
 * Ana sayfa SSS — görünür akordeon + FAQPage schema + llms-full.txt aynı veriden.
 * Kural: yalnızca belgeli gerçek ve genel sektör bilgisi; fiyat, süre garantisi,
 * sayı/yüzde iddiası, onaysız müşteri sözü YAZILMAZ.
 */
export type HomeFaq = { q: string; a: string };

export const HOME_FAQ: HomeFaq[] = [
  {
    q: "KARNER ne iş yapar?",
    a: "KARNER; yazılım ve medyayı aynı çatıda birleştiren bir dijital stüdyodur. Web sitesi geliştirme (3D ve animasyonlu dâhil), mobil uygulama, yapay zekâ destekli video ve ürün görseli, SEO/GEO/AEO görünürlük çalışması, iş akışı otomasyonu ve marka tasarımı olmak üzere yedi hizmet alanında çalışır.",
  },
  {
    q: "Hangi şehirlere hizmet veriyorsunuz?",
    a: "Ekibimiz Muğla ve Ankara merkezlidir; çalışma biçimimiz uzaktan yürütülebildiği için Türkiye genelindeki işletmelerle çalışıyoruz. Keşif görüşmesi, tasarım onayı ve teslim süreci çevrim içi araçlarla ilerler.",
  },
  {
    q: "Web sitesiyle birlikte SEO da yapılıyor mu?",
    a: "Evet. Ürettiğimiz her sitede arama görünürlüğü sonradan eklenen bir paket değil, kurulumun parçasıdır: yapısal veri (schema.org graph), hızlı açılış için performans mühendisliği, yapay zekâ botlarına açık robots.txt, llms.txt ve doğru başlık hiyerarşisi teslimle birlikte gelir.",
  },
  {
    q: "Yapay zekâ aramasında görünmek ne demek?",
    a: "ChatGPT, Gemini ve Perplexity gibi araçlar bir soruya cevap verirken web'den kaynak seçer ve bazı firmaları isim vererek önerir. Bu araçların cevaplarında yer almak için sitenin botlara açık olması, içeriğin alıntılanabilir ve güncel olması, yapısal veri ve tutarlı işletme kimliği gerekir. Bu çalışmaya GEO (generatif arama optimizasyonu) denir; KARNER klasik SEO ile GEO'yu birlikte kurar.",
  },
  {
    q: "Mevcut sitemi baştan yaptırmam gerekir mi?",
    a: "Her zaman değil. Önce mevcut siteyi hız, yapısal veri, içerik ve teknik SEO açısından inceliyoruz; sorun altyapıdaysa yeniden kurulum, içerik ve sinyal eksiğiyse mevcut site üzerinde iyileştirme öneriyoruz. Karar, keşif incelemesinin sonucuna göre birlikte verilir.",
  },
  {
    q: "Hangi teknolojilerle üretiyorsunuz?",
    a: "Web'de Next.js ve Astro, 3D için Three.js / React Three Fiber, mobilde Expo (React Native) ve veri tarafında Supabase gibi araçlarla, otomasyonda n8n ve dil modeli API'leri (Groq, Gemini), medya üretiminde Veo, Kling ve Adobe Firefly gibi araçlarla çalışıyoruz. Teknoloji seçimi projenin ihtiyacına göre yapılır; araç değil sonuç önceliklidir.",
  },
  {
    q: "Bir proje nasıl başlar?",
    a: "Telefon, e-posta veya site üzerinden ulaşırsınız; kısa bir keşif görüşmesinde hedefi ve kapsamı netleştiririz. Ardından kapsamı yazılı hâle getirir, tasarım yönünü örnekle gösterir ve onay sonrası üretime geçeriz. Süreç boyunca ilerlemeyi görür, her aşamada geri bildirim verirsiniz.",
  },
];
