export type ServiceFeature = { title: string; desc: string };

export type ServiceFaq = { q: string; a: string };

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
  /** SERP başlığı — 50-60 karakter, hedef anahtar kelime önde */
  seoTitle?: string;
  /** SERP açıklaması — 140-160 karakter */
  seoDescription?: string;
  /**
   * Sık sorulan sorular — FAQPage schema + sayfa içeriği + llms-full.txt
   * buradan beslenir. Kural: yalnızca genel teknik/sektör bilgisi;
   * fiyat, süre garantisi ve onaysız firma iddiası yazılmaz.
   */
  faq?: ServiceFaq[];
  /** Hizmetle ilişkili rehber sayfası — detay sayfasında link kartı olarak çıkar */
  guide?: { href: string; label: string; desc: string };
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
    seoTitle: "Web Sitesi Geliştirme — Modern, Hızlı, 3D | KARNER",
    seoDescription:
      "Next.js ve Astro ile hızlı yüklenen, arama motorlarında öne çıkan modern web siteleri. 3D ve animasyonlu tasarım dahil, Türkiye genelinde geliştirme hizmeti.",
    guide: {
      href: "/3d-web-sitesi",
      label: "Rehber: 3D Web Sitesi",
      desc: "3D web sitesi nedir, kimlere uygun, hızı ve SEO'yu nasıl etkiler — detaylı rehberimizi okuyun.",
    },
    faq: [
      {
        q: "3D web sitesi nedir, klasik siteden farkı ne?",
        a: "3D web sitesi; ziyaretçinin fareyle veya dokunuşla etkileşime girebildiği, WebGL tabanlı üç boyutlu sahneler içeren web sitesidir. Klasik sitedeki durağan görsellerin yerine ürünü veya markayı döndürülebilir, canlı bir sahne olarak sunar; sitede geçirilen süreyi ve akılda kalıcılığı artırır.",
      },
      {
        q: "3D öğeler siteyi yavaşlatır mı?",
        a: "Doğru optimize edilmezse yavaşlatır. Model dosyalarını sıkıştırma (Draco, KTX2), sahneyi yalnızca ekrana geldiğinde yükleme ve mobil cihazlarda hafif alternatif gösterme gibi tekniklerle 3D içeren bir sayfa hız testlerinden yüksek puanla geçebilir.",
      },
      {
        q: "Hangi teknolojilerle geliştiriyorsunuz?",
        a: "Web'de Next.js ve Astro, 3D sahnelerde Three.js ve React Three Fiber, arayüzde Tailwind CSS kullanıyoruz. Bu yığın; hız, arama motoru uyumluluğu ve uzun ömürlü bakım kolaylığı için seçildi.",
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
    seoTitle: "Mobil Uygulama Geliştirme — iOS & Android | KARNER",
    seoDescription:
      "Expo / React Native ile tek kod tabanından iOS ve Android uygulama. Supabase backend, yönetim paneli ve mağaza yayınlama dahil uçtan uca geliştirme.",
    faq: [
      {
        q: "iOS ve Android için ayrı uygulama mı gerekiyor?",
        a: "Hayır. React Native ve Expo ile tek kod tabanından hem iOS hem Android uygulaması üretilir. Aynı ekip tek projeyi geliştirir; iki ayrı native ekibe göre daha hızlı ve daha ekonomiktir.",
      },
      {
        q: "Uygulamanın arka planı (backend) nasıl çalışır?",
        a: "Kimlik doğrulama, veritabanı ve gerçek zamanlı veri için Supabase (PostgreSQL) kullanıyoruz. Yanına Next.js ile bir yönetim paneli kurulur; siparişleri, kullanıcıları ve içeriği buradan yönetirsiniz.",
      },
      {
        q: "Mağaza yayınlama süreci nasıl işler?",
        a: "App Store ve Google Play, geliştirici hesabı ve inceleme sürecinden geçen bir yayın akışı ister. Mağaza kayıtları, sürüm paketleri, ekran görselleri ve inceleme sürecindeki düzeltmeler dahil yayınlamayı biz yürütüyoruz.",
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
    seoTitle: "AI Video Reklam ve Tanıtım Filmi Üretimi | KARNER",
    seoDescription:
      "Veo, Kling ve Adobe Firefly ile reklam filmi, Reels ve Shorts üretimi. Senaryodan kurguya yapay zekâ destekli video reklam — Türkiye genelinde.",
    guide: {
      href: "/yapay-zeka-reklam-videosu",
      label: "Rehber: Yapay Zekâ ile Reklam Videosu",
      desc: "AI reklam videosu nedir, klasik prodüksiyondan farkı ne, üretim süreci nasıl işler — detaylı rehberimizi okuyun.",
    },
    faq: [
      {
        q: "AI video reklam nedir?",
        a: "Yapay zekâ video modelleriyle (Veo, Kling gibi) üretilen reklam ve tanıtım içeriğidir. Senaryo ve marka dili insan elinden çıkar; görüntü üretimi yapay zekâya devredilir. Böylece çekim ekibi, mekân ve oyuncu maliyeti olmadan sinematik içerik üretilebilir.",
      },
      {
        q: "AI video gerçek çekimin yerini tutar mı?",
        a: "Her yerde değil. Ürün ve hizmet tanıtımı, konsept anlatımı ve sosyal medya içeriğinde AI video hızı ve maliyetiyle öne geçer; uzun oyunculu anlatımlarda ve birebir mekân çekimlerinde gerçek prodüksiyon hâlâ gereklidir. Doğru araç, içeriğin türüne göre seçilir.",
      },
      {
        q: "Hangi formatlar için üretiyorsunuz?",
        a: "Instagram Reels, TikTok, YouTube Shorts gibi dikey formatlar ile yatay tanıtım filmleri. Her platformun süre, altyazı ve ses alışkanlıklarına göre ayrı kurgu yapılır.",
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
    seoTitle: "AI Ürün Görseli ve Sanal Manken (Try-on) | KARNER",
    seoDescription:
      "Ürün fotoğrafını sanal manken üzerinde gösteren gerçekçi try-on görselleri. Butikler ve e-ticaret satıcıları için stüdyo kalitesinde AI ürün çekimi.",
    faq: [
      {
        q: "Sanal manken (try-on) görseli nedir?",
        a: "Elinizdeki ürün fotoğrafını, ürün bir manken üzerindeymiş gibi gösteren yapay zekâ üretimi görseldir. Stüdyo, manken ve çekim ekibi olmadan profesyonel katalog görünümü elde edilir.",
      },
      {
        q: "Hangi işletmeler için uygun?",
        a: "Butikler, ikinci el satıcıları ve e-ticaret mağazaları için uygundur. Askıda veya serili çekilmiş ürünün manken üzerinde gösterilmesi, alıcının ürünü üzerinde hayal etmesini kolaylaştırdığı için özellikle giyimde etkilidir.",
      },
      {
        q: "Ürün fotoğrafı nasıl olmalı?",
        a: "Net, iyi aydınlatılmış ve ürünün tamamını gösteren bir fotoğraf yeterlidir. Düz zemin işi kolaylaştırır ama şart değildir; mevcut telefon çekimlerinden de çalışılabilir.",
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
    seoTitle: "SEO, GEO ve AEO Hizmeti — Üç Arama Yüzeyinde | KARNER",
    seoDescription:
      "Google'da, ChatGPT'de ve Gemini'de aynı anda öne çıkın. Teknik SEO, generatif arama (GEO) ve cevap motoru (AEO) optimizasyonu — Türkiye genelinde.",
    guide: {
      href: "/yapay-zeka-aramasinda-gorunmek",
      label: "Rehber: ChatGPT'de Çıkmak",
      desc: "Yapay zekâ araçları hangi siteleri kaynak seçer, firmanız neden görünmüyor, görünürlük nasıl kurulur — detaylı rehberimizi okuyun.",
    },
    faq: [
      {
        q: "GEO ve AEO ne demek?",
        a: "GEO (Generative Engine Optimization); ChatGPT, Gemini ve Perplexity gibi yapay zekâ arama araçlarının bir soruya cevap verirken sizin sitenizi kaynak göstermesini sağlama çalışmasıdır. AEO (Answer Engine Optimization) ise Google'ın öne çıkan snippet, sesli arama ve 'Diğer sorular' kutularında görünmeyi hedefler.",
      },
      {
        q: "ChatGPT'de firmamın önerilmesi mümkün mü?",
        a: "Mümkün. Bunun için sitenin AI botlarına açık olması, yapısal veri (schema.org) taşıması, alıntılanabilir netlikte içerik sunması ve varsa sektörünüzdeki resmi yetki/üyelik kayıtlarıyla tutarlı olması gerekir. Bu sinyaller kurulduğunda AI araçları firmayı kaynak olarak kullanmaya başlayabilir.",
      },
      {
        q: "SEO sonuçları ne zaman görünür?",
        a: "Aramanın rekabetine göre değişir. Düşük rekabetli ve yerel aramalarda haftalar içinde hareket görülebilir; rekabetli ulusal aramalarda aylar sürer. Yeni bir alan adının arama motorlarında güven kazanması da zaman ister — bu yüzden doğru anahtar kelime seçimi işin ilk adımıdır.",
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
    seoTitle: "İş Akışı Otomasyonu ve AI Agent Kurulumu | KARNER",
    seoDescription:
      "n8n ile sistemlerinizi birbirine bağlayın: veri aktarımı, bildirim, raporlama ve AI destekli müşteri akışları uçtan uca otomatik çalışsın.",
    faq: [
      {
        q: "İş akışı otomasyonu nedir?",
        a: "Bir sistemde gerçekleşen olayın (yeni sipariş, form, mesaj) başka sistemlerde el değmeden işlem başlatmasıdır: kayıt açılır, bildirim gider, rapor güncellenir. Tekrarlayan el işi ortadan kalkar, hata payı düşer.",
      },
      {
        q: "Hangi uygulamalar birbirine bağlanabilir?",
        a: "n8n; CRM'ler, e-ticaret platformları, WhatsApp ve Telegram, Google hizmetleri, ödeme sistemleri ve e-posta dahil yüzlerce hazır entegrasyon sunar. Hazır bağlantısı olmayan sistemlere de API ve webhook üzerinden bağlanılır.",
      },
      {
        q: "AI agent ne yapar?",
        a: "Yapay zekâ destekli agent; gelen soruları anlayıp yanıtlar, talep toplar ve tanımlı işlemleri kendisi yürütür — örneğin müşteri mesajını sınıflandırıp doğru kişiye iletmek veya randevu kaydı açmak. Kurallı otomasyonun karar gerektiren adımlarını devralır.",
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
    seoTitle: "Logo, Kurumsal Kimlik ve Grafik Tasarım | KARNER",
    seoDescription:
      "Markanız için özgün logo, kurumsal kimlik ve sosyal medya tasarımı. Figma tabanlı tasarım sistemi ile her yüzeyde tutarlı görsel dil.",
    faq: [
      {
        q: "Kurumsal kimlik neleri kapsar?",
        a: "Logo, renk paleti, tipografi, kartvizit, antetli kağıt ve sunum şablonları gibi markanın tüm görsel yüzeylerini kapsar. Amaç; markanın her temas noktasında aynı dille konuşmasıdır.",
      },
      {
        q: "Logo süreci nasıl ilerler?",
        a: "Önce marka hedefi ve hedef kitle netleştirilir, ardından taslak yönler sunulur; seçilen yön revizyonlarla olgunlaştırılır. Teslimde baskı ve dijital kullanım için vektör (SVG/PDF) ve PNG dosyaları ile kullanım kılavuzu verilir.",
      },
      {
        q: "Tasarımlar hangi araçlarla yapılıyor?",
        a: "Figma üzerinde çalışıyoruz. Böylece tasarımlar yeniden kullanılabilir bileşenlere dönüşür; sosyal medya şablonlarınızı ekibiniz de kolayca güncelleyebilir.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
