export type ServiceFeature = { title: string; desc: string };

export type Service = {
  slug: string;
  no: string;
  tag: string;
  title: string;
  summary: string;
  imageSrc: string;
  tags: string[];
  intro: string;
  features: ServiceFeature[];
  proof?: string;
};

export const services: Service[] = [
  {
    slug: "web-sitesi-gelistirme",
    no: "01",
    tag: "Web",
    title: "Web Sitesi Geliştirme",
    summary: "3D ve animasyonlu, yüksek performanslı modern web siteleri.",
    imageSrc:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=70",
    tags: ["Next.js", "Astro", "React Three Fiber", "Tailwind"],
    intro:
      "Markanızı yalnızca güzel değil; hızlı, bulunur ve akılda kalıcı kılıyoruz. 3D ve animasyonlu, ölçeklenebilir modern web siteleri tasarlayıp geliştiriyoruz.",
    features: [
      {
        title: "3D & WebGL Deneyimler",
        desc: "React Three Fiber ve Three.js ile rakiplerinizden ayrışan etkileşimli sahneler.",
      },
      {
        title: "Performans & SEO Odaklı",
        desc: "Next.js / Astro ile hızlı yüklenen, arama motorlarında öne çıkan siteler.",
      },
      {
        title: "Tam Mobil Uyumlu",
        desc: "Her ekranda kusursuz görünen, erişilebilir ve modern tasarım.",
      },
      {
        title: "Kolay Yönetim",
        desc: "İçeriğinizi rahatça güncelleyebileceğiniz altyapı ve bakım desteği.",
      },
    ],
  },
  {
    slug: "mobil-uygulama",
    no: "02",
    tag: "Mobil",
    title: "Mobil Uygulama",
    summary: "iOS & Android için tek kod tabanı. Supabase backend + panel.",
    imageSrc:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=70",
    tags: ["Expo", "React Native", "Supabase", "TypeScript"],
    intro:
      "iOS ve Android için tek kod tabanıyla native performanslı uygulamalar geliştiriyoruz. Backend, yönetim paneli ve mağaza yayınlama dahil uçtan uca.",
    features: [
      {
        title: "Tek Kod, İki Platform",
        desc: "Expo / React Native ile hem iOS hem Android — daha hızlı, daha ekonomik.",
      },
      {
        title: "Güçlü Backend",
        desc: "Supabase (PostgreSQL) ile kimlik doğrulama, veritabanı ve gerçek zamanlı veri.",
      },
      {
        title: "Yönetim Paneli",
        desc: "Next.js ile siparişleri, kullanıcıları ve içeriği yönetebileceğiniz panel.",
      },
      {
        title: "Mağaza Yayınlama",
        desc: "App Store ve Google Play sürecini biz yönetiyoruz.",
      },
    ],
  },
  {
    slug: "ai-video-reklam",
    no: "03",
    tag: "AI Video",
    title: "AI Video & Reklam",
    summary: "Veo, Kling ve Firefly ile reklam filmi & Reels üretimi.",
    imageSrc:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=70",
    tags: ["Veo 3", "Kling", "Adobe Firefly", "n8n"],
    intro:
      "Yapay zekâ ile reklam filmi ve sosyal medya içeriği üretiyoruz. Senaryo, görsel ve kurgu — hızlı, tutarlı ve ölçeklenebilir.",
    features: [
      {
        title: "AI Video Üretimi",
        desc: "Veo 3 ve Kling ile sinematik reklam ve Reels içerikleri.",
      },
      {
        title: "AI Görsel & Tasarım",
        desc: "Adobe Firefly ile marka uyumlu görseller ve afişler.",
      },
      {
        title: "Profesyonel Kurgu",
        desc: "CapCut ile post-prodüksiyon, altyazı ve ses tasarımı.",
      },
      {
        title: "Üretim Otomasyonu",
        desc: "n8n ile tekrarlayan video üretimini otomatik akışlara bağlıyoruz.",
      },
    ],
  },
  {
    slug: "ai-urun-gorseli",
    no: "04",
    tag: "AI Görsel",
    title: "AI Ürün Görseli",
    summary: "Ürün fotoğrafını sanal manken üzerinde gösteren try-on görselleri.",
    imageSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=70",
    tags: ["Adobe Firefly", "Virtual Try-on", "E-ticaret"],
    intro:
      "Ürün fotoğrafınızı sanal manken üzerindeymiş gibi gösteren gerçekçi try-on görselleri üretiyoruz. Özellikle butikler ve ikinci el satıcılar için dönüşümü artırır.",
    features: [
      {
        title: "Sanal Manken / Try-on",
        desc: "Gelen ürün fotoğrafını manken üzerinde gösteren gerçekçi görseller.",
      },
      {
        title: "Stüdyo Kalitesi",
        desc: "Pahalı çekim olmadan profesyonel ürün görselleri.",
      },
      {
        title: "E-ticaret İçin Optimize",
        desc: "İkinci el satış siteleri ve butikler için dönüşüm odaklı görseller.",
      },
      {
        title: "Toplu Üretim",
        desc: "Çok sayıda ürün için hızlı ve tutarlı görsel üretimi.",
      },
    ],
  },
  {
    slug: "seo-geo-aeo",
    no: "05",
    tag: "Görünürlük",
    title: "SEO / GEO / AEO",
    summary: "Google'da, ChatGPT'de ve Gemini'de aynı anda öne çıkma.",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=70",
    tags: ["SEO", "GEO", "AEO", "Schema.org"],
    intro:
      "Sitenizi yalnızca Google'da değil; ChatGPT, Gemini ve Perplexity gibi yapay zekâ aramalarında da öne çıkarıyoruz. Üç arama yüzeyinde birden görünürlük.",
    features: [
      {
        title: "Klasik SEO",
        desc: "Google / Bing organik sıralaması, teknik SEO ve içerik stratejisi.",
      },
      {
        title: "GEO — Generatif Arama",
        desc: "ChatGPT ve Gemini gibi AI motorlarının sizi önermesini sağlama.",
      },
      {
        title: "AEO — Cevap Motoru",
        desc: "Öne çıkan snippet, sesli arama ve 'People Also Ask' optimizasyonu.",
      },
      {
        title: "Yapısal Veri",
        desc: "Schema.org işaretlemeleriyle motorların sitenizi doğru anlaması.",
      },
    ],
    proof:
      "Kanıt: AYSA Endüstriyel Temizlik için “muğla baca temizliği” aramasında üç AI/arama yüzeyinde birden görünürlük sağladık — ChatGPT firmayı öneriyor, Google AI Overview tercih edilen firmalar arasında gösteriyor ve organik sonuçlarda 2. sıradayız.",
  },
  {
    slug: "otomasyon-sistemleri",
    no: "06",
    tag: "Otomasyon",
    title: "Otomasyon Sistemleri",
    summary: "n8n ile iş akışlarını ve tekrarlayan görevleri uçtan uca otomatikleştirme.",
    imageSrc:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1600&q=70",
    tags: ["n8n", "Webhook", "API", "AI Agent"],
    intro:
      "Tekrarlayan işleri ortadan kaldırıyoruz. n8n ile sistemlerinizi birbirine bağlayıp; veri aktarımı, bildirim, raporlama ve müşteri akışlarını otomatik hale getiriyoruz — yapay zekâ destekli agent'larla.",
    features: [
      {
        title: "İş Akışı Otomasyonu",
        desc: "n8n ile uygulamalarınız arasında veri akışını ve tekrarlayan görevleri otomatikleştirin.",
      },
      {
        title: "Entegrasyon & Webhook",
        desc: "CRM, e-ticaret, WhatsApp/Telegram, Google ve ödeme servislerini tek akışta birleştirme.",
      },
      {
        title: "AI Agent & Chatbot",
        desc: "Soruları yanıtlayan, talep toplayan ve işlem yapan yapay zekâ destekli agent'lar.",
      },
      {
        title: "Bildirim & Raporlama",
        desc: "Otomatik e-posta/mesaj bildirimleri ve düzenli raporlarla süreçleri görünür kılma.",
      },
    ],
  },
  {
    slug: "marka-grafik-tasarim",
    no: "07",
    tag: "Tasarım",
    title: "Marka & Grafik Tasarım",
    summary: "Logo, kurumsal kimlik ve sosyal medya için tutarlı görsel dil.",
    imageSrc:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1600&q=70",
    tags: ["Logo", "Kurumsal Kimlik", "Sosyal Medya", "Figma"],
    intro:
      "Markanızı baştan sona görsel bir dile dönüştürüyoruz. Logo, kurumsal kimlik ve sosyal medya şablonlarıyla her yüzeyde tutarlı, akılda kalıcı bir marka deneyimi tasarlıyoruz.",
    features: [
      {
        title: "Logo & Marka Kimliği",
        desc: "Markanızı yansıtan özgün logo, renk paleti ve tipografi sistemi.",
      },
      {
        title: "Kurumsal Kimlik",
        desc: "Kartvizit, antetli kağıt ve sunum şablonlarıyla bütünleşik kurumsal görünüm.",
      },
      {
        title: "Sosyal Medya Tasarımı",
        desc: "Marka uyumlu gönderi, hikâye ve kapak şablonlarıyla tutarlı içerik akışı.",
      },
      {
        title: "Tasarım Sistemi",
        desc: "Figma üzerinde yeniden kullanılabilir bileşenler ve marka kılavuzu.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
