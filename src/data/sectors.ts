import type { GuideBlock } from "./guides/types";

/**
 * Sektör sayfaları — /sektorler/[slug].
 *
 * Kural: yalnızca genel sektör bilgisi ve KARNER'in genel yetkinliği.
 * Müşteri sayısı, sonuç yüzdesi, fiyat, süre garantisi, sertifika YAZILMAZ.
 * "demo" alanındaki siteler KARNER'in yayınladığı kurgu demo siteleridir;
 * metinde de demo olduğu açıkça söylenir.
 */
export type Sector = {
  slug: string;
  name: string;
  /** Görünür H1 */
  title: string;
  /** SERP başlığı 50-60 karakter + " | KARNER" */
  seoTitle: string;
  /** SERP açıklaması 140-160 karakter */
  seoDescription: string;
  /** TL;DR — 40-60 kelime */
  summary: string;
  /** WorksSection'daki eşleşen demo (varsa) */
  demo?: { title: string; url: string; poster: string; video: string };
  /** İlgili hizmet slug'ları (hizmetler/[slug]) */
  services: string[];
  /** İlgili rehber / pillar yolları */
  guides: string[];
  blocks: GuideBlock[];
  faq: { q: string; a: string }[];
  published: string;
  modified: string;
};

export const sectors: Sector[] = [
  // ─────────────────────────────────────────────────────────────── EMLAK
  {
    slug: "emlak",
    name: "Emlak ofisleri",
    title: "Emlak ofisi için web sitesi ve dijital görünürlük",
    seoTitle: "Emlak Ofisi Web Sitesi, İlan Vitrini ve Yerel SEO | KARNER",
    seoDescription:
      "Emlak ofisi ve gayrimenkul danışmanı için ilan vitrini, harita, WhatsApp ve yerel arama görünürlüğü. Yapay zekâ aramasında önerilen emlak sitesi nasıl kurulur.",
    summary:
      "Emlak ofisi dijitalde üç şey ister: ilanı hızlı gösteren mobil vitrin, ilçe bazlı aramalarda çıkmak ve telefona giden kısa yol. KARNER bunun için ilan vitrini ve harita içeren hızlı bir site, Google Business Profile ile uyumlu yerel SEO katmanı ve yapay zekâ aramasında önerilmeyi hedefleyen içerik yapısı kurar.",
    demo: {
      title: "Gayrimenkul Ofisi",
      url: "https://meridyen-demo.vercel.app",
      poster: "/demos/meridyen-poster.jpg",
      video: "/demos/meridyen.webm",
    },
    services: ["web-sitesi-gelistirme", "seo-geo-aeo", "otomasyon-sistemleri", "sosyal-medya-icerik-yonetimi"],
    guides: [
      "/yapay-zeka-aramasinda-gorunmek",
      "/rehber/google-ai-overview-nasil-cikilir",
      "/3d-web-sitesi",
    ],
    blocks: [
      { type: "h2", text: "Bu sektörde müşteri sizi nasıl arar?" },
      {
        type: "p",
        text: "Emlak araması neredeyse her zaman yerle başlar. Alıcı \"ilçe + satılık daire\", \"mahalle + kiralık dükkân\" ya da \"semt + 3+1\" gibi kalıplarla arar. Ofis ismini bilen çok azdır; çoğu kişi önce ilanı, sonra danışmanı bulur. Bu yüzden ilan sayfası ofisin ana sayfasından daha çok ziyaret alır.",
      },
      {
        type: "p",
        text: "İkinci bir kalıp danışman aramasıdır: \"X ilçesinde güvenilir emlakçı\", \"Y'de emlak ofisi\", \"bana yakın gayrimenkul danışmanı\". Bu sorgularda Google haritalı sonuçları, yorumları ve artık yapay zekâ özetlerini gösterir. **Haritada ve AI özetinde görünmeyen ofis, bu aramada yoktur.** Ayrıntı için [yapay zekâ aramasında görünmek](/yapay-zeka-aramasinda-gorunmek) rehberine bakabilirsiniz.",
      },
      {
        type: "p",
        text: "Üçüncü kalıp bilgi aramasıdır: \"tapu masrafı kim öder\", \"kira kontratı nasıl yapılır\", \"ekspertiz raporu ne kadar sürer\". Bu sorulara sitenizde net cevap vermek, alıcıyı ilan portalından önce sizinle tanıştırır. Satıcı tarafı da benzer sorularla gelir: \"evimi kaç paraya satarım\", \"emlakçı komisyonu nasıl hesaplanır\".",
      },
      {
        type: "p",
        text: "Bir de zamanlama var. Kiralık aramaları yaz sonu ve üniversite dönemi açılışında yoğunlaşır; satılık aramaları kredi ve kampanya haberleriyle dalgalanır. Sayfaların bu dönemlerden önce hazır olması, sezon geldiğinde arama motorunda yer almayı kolaylaştırır.",
      },
      { type: "h2", text: "Sitede neler olmalı?" },
      {
        type: "ul",
        items: [
          "**İlan vitrini:** filtrelenebilir, fotoğrafı önde, fiyat ve konum ilk bakışta okunur. Portal kalabalığından ayrışan tek yer burasıdır.",
          "**Harita:** her ilanda konum, ofis sayfasında ulaşım. Alıcı mahalleyi tanımadan karar vermez.",
          "**Hızlı mobil:** emlak araması çoğunlukla telefonda yapılır; geç açılan sayfa kapanır.",
          "**WhatsApp ve tıkla-ara:** her ilanın altında tek dokunuşla danışmana ulaşım.",
          "**Google Business Profile bağı:** site ile haritadaki kayıt aynı adı, adresi ve telefonu taşımalı; yorumlar siteye akmalı.",
          "**Fotoğraf ve video kalitesi:** düzgün ışık, doğru açı, kısa tanıtım videosu. İlanı satan görüntüdür.",
          "**İlçe ve mahalle sayfaları:** gerçek içerikle (ulaşım, okul, fiyat aralığı anlatımı); boş şablon sayfa değil.",
          "**Yapılandırılmış veri:** RealEstateAgent ve ilan şeması, arama motorunun ofisi ve ilanı doğru anlaması için.",
        ],
      },
      {
        type: "p",
        text: "Bu maddelerin ortak noktası şudur: alıcı siteye ilan için gelir, danışman için kalır. İlan vitrini trafiği getirir; harita, fotoğraf ve hızlı iletişim o trafiği telefona çevirir. Biri eksikse diğerleri boşa çalışır.",
      },
      { type: "h3", text: "Sık yapılan hatalar" },
      {
        type: "ul",
        items: [
          "Portal ilanını siteye yalnızca bağlantıyla koymak; ziyaretçi portala gider, bir daha dönmez.",
          "Haritadaki kayıtla sitedeki telefonun farklı olması; arama motoru iki kaydı birbirine bağlayamaz.",
          "Her mahalle için aynı metnin kopyalandığı sayfalar; arama motoru bunları değersiz sayar.",
          "Telefonla çekilmiş karanlık fotoğrafları olduğu gibi yayınlamak.",
        ],
      },
      { type: "h2", text: "KARNER bu sektör için ne kurar?" },
      {
        type: "ul",
        items: [
          "[Web sitesi geliştirme](/hizmetler/web-sitesi-gelistirme): ilan vitrini, harita ve WhatsApp akışı olan hızlı, mobil öncelikli site. İstenirse scroll'la açılan sinematik giriş gibi ayrıştırıcı bir hero.",
          "[SEO / GEO / AEO](/hizmetler/seo-geo-aeo): ilçe bazlı anahtar kelime yapısı, Google Business Profile uyumu, schema işaretlemesi ve yapay zekâ araçlarının ofisi kaynak göstermesini hedefleyen içerik düzeni. Yöntem için [Google AI Overview rehberi](/rehber/google-ai-overview-nasil-cikilir).",
          "[Otomasyon sistemleri](/hizmetler/otomasyon-sistemleri): site formundan gelen talebi WhatsApp veya CRM'e düşüren, ilan güncellemesini sosyal medyaya taşıyan, alıcıya benzer ilan bildirimi gönderen akışlar.",
          "İsteğe bağlı [3D / gezilebilir sunum](/3d-web-sitesi): öne çıkan projeler için tarayıcıda dolaşılan daire planı.",
          "Tüm hizmet listesi için [hizmetler sayfasına](/hizmetler) bakabilirsiniz.",
        ],
      },
      {
        type: "p",
        text: "Çalışma sırası genellikle şöyle ilerler: önce ofisin hedef ilçeleri ve ilan türleri netleşir, sonra site bu yapıya göre kurulur, ardından yerel kayıt ve içerik katmanı eklenir. Otomasyon en sona kalır; çünkü neyi otomatikleştireceğimiz ancak akış oturunca belli olur.",
      },
      { type: "h2", text: "Demo: Gayrimenkul Ofisi" },
      {
        type: "p",
        text: "Bu sektör için hazırladığımız **Gayrimenkul Ofisi** bir demo sitedir; gerçek bir müşteriye ait değildir, ilanlar ve ofis bilgisi kurgudur. Kaydırdıkça açılan sinematik giriş, ilan sitelerinden ayrışan bir ilk izlenim vermek için tasarlandı; altında ilan vitrini ve iletişim akışı durur. Yaklaşımı canlı demo sitesinde inceleyebilirsiniz. [Demoyu aç](https://meridyen-demo.vercel.app)",
      },
      {
        type: "callout",
        title: "Nereden başlanır?",
        text: "Önce Google Business Profile kaydını ve ilçe bazlı arama listesini netleştirin; site bu iki şeyin üstüne kurulur.",
      },
    ],
    faq: [
      {
        q: "Emlak ofisinin ilan portalı varken ayrı siteye ihtiyacı var mı?",
        a: "Portal ilanı gösterir ama ofisi değil. Alıcı portalda onlarca danışmanla aynı listede durursunuz ve ilanınızın yanında rakibin ilanı çıkar. Kendi siteniz; ilçe aramalarında, Google haritasında ve yapay zekâ özetlerinde sizi ayrı bir varlık olarak gösterir, talebi portala komisyon ödemeden doğrudan telefonunuza getirir.",
      },
      {
        q: "Emlak sitesinde ilçe sayfaları açmak doorway sayılır mı?",
        a: "Boş şablon sayfalar sayılır ve arama motorları bunu değersiz bulur, bazen cezalandırır. İlçe sayfası o bölgeye özgü gerçek içerik taşıyorsa (ulaşım, mahalle yapısı, aktif ilanlar, okul ve pazar gibi yerel bilgi) doğal bir sayfadır. Biz yalnızca içerik üretebildiğimiz bölgeler için sayfa açarız; sayı değil içerik belirler.",
      },
      {
        q: "Yapay zekâ aramasında emlak ofisi önerilir mi?",
        a: "Önerilebilir. ChatGPT ve Google AI Overview gibi araçlar \"X ilçesinde emlakçı\" sorusuna cevap verirken haritadaki kayıt, yorumlar, sitedeki net bilgi ve yapısal veriyi birlikte değerlendirir. Bu sinyaller tutarlı kurulduğunda ofis kaynak olarak gösterilebilir; tek başına site yetmez, dış kayıtlar da gerekir.",
      },
      {
        q: "İlan fotoğraflarını kim çeker?",
        a: "Fotoğraf ve video ofisin kendi çekimidir; biz çekim için açı, ışık, saat ve süre önerisi verir, gelen görselleri siteye uygun biçimde optimize ederiz. İstenirse kısa tanıtım videoları için yapay zekâ destekli kurgu da yapılabilir; ancak gerçek mekân görüntüsü her zaman temel kaynaktır.",
      },
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },

  // ──────────────────────────────────────────────────────── KLİNİK & SAĞLIK
  {
    slug: "klinik-ve-saglik",
    name: "Klinik ve sağlık",
    title: "Klinik ve sağlık işletmeleri için web sitesi ve randevu akışı",
    seoTitle: "Klinik Web Sitesi, Randevu Akışı ve Yerel SEO | KARNER",
    seoDescription:
      "Diyetisyen, diş kliniği, fizyoterapi ve estetik merkezi için güven veren web sitesi, randevu hatırlatma otomasyonu, KVKK duyarlı form ve yerel arama görünürlüğü.",
    summary:
      "Klinikte dijital, güvenle başlar: uzman tanıtımı, gerçek mekân fotoğrafı ve açık randevu yolu. KARNER bunun için sade ve hızlı bir site, randevu hatırlatma botu gibi otomasyonlar, KVKK'ya duyarlı form akışı ve \"ilçe + uzmanlık\" aramalarında görünürlük kurar; iddialı tıbbi vaat yazmaz.",
    demo: {
      title: "Diyetisyen Kliniği",
      url: "https://diyetisyen-demo.vercel.app",
      poster: "/demos/diyetisyen-poster.jpg",
      video: "/demos/diyetisyen.webm",
    },
    services: ["web-sitesi-gelistirme", "otomasyon-sistemleri", "seo-geo-aeo", "sosyal-medya-icerik-yonetimi"],
    guides: [
      "/yapay-zeka-aramasinda-gorunmek",
      "/rehber/google-ai-overview-nasil-cikilir",
    ],
    blocks: [
      { type: "h2", text: "Bu sektörde müşteri sizi nasıl arar?" },
      {
        type: "p",
        text: "Sağlık araması iki yoldan gelir. Birincisi yakınlık: \"ilçe + diyetisyen\", \"semt + diş kliniği\", \"bana yakın fizyoterapi\", \"şehir + estetik merkezi\". Bu aramalarda harita sonucu, yorum puanı ve çalışma saati belirleyicidir. Kişi genellikle iki üç kliniğe bakar, birini arar.",
      },
      {
        type: "p",
        text: "İkincisi sorundur: \"ağız kokusu neden olur\", \"bel fıtığı egzersizi\", \"kilo vermek için diyet listesi\", \"diş beyazlatma kalıcı mı\". Kişi henüz klinik aramıyor, cevap arıyor. Bu soruya sakin ve doğru cevap veren klinik, randevu aşamasında ilk akla gelen olur. **Güven, randevudan önce kurulur.**",
      },
      {
        type: "p",
        text: "Üçüncü yol tavsiyedir: arkadaş söyler, kişi ismi arar. Bu aramada sitenin ilk saniyede uzmanı, mekânı ve randevu yolunu göstermesi gerekir; aksi hâlde tavsiye boşa gider.",
      },
      {
        type: "p",
        text: "Her yolda yapay zekâ araçları artık araya giriyor: \"X'te iyi bir diyetisyen önerir misin\" sorusuna ChatGPT ve Google AI Overview cevap veriyor. Bu cevaba girmenin yolunu [yapay zekâ aramasında görünmek](/yapay-zeka-aramasinda-gorunmek) rehberinde anlattık.",
      },
      { type: "h2", text: "Sitede neler olmalı?" },
      {
        type: "ul",
        items: [
          "**Uzman tanıtımı:** ad, unvan, eğitim ve çalışma alanı. Hasta kiminle görüşeceğini bilmek ister.",
          "**Gerçek mekân fotoğrafı:** stok görsel değil, kliniğin kendisi. Temizlik ve düzen fotoğrafta okunur.",
          "**Açık randevu yolu:** tek tıkla arama, WhatsApp veya form; hangisi kullanılıyorsa o öne çıksın.",
          "**Randevu hatırlatma:** onay ve hatırlatma mesajı otomatik gitsin; gelmeyen randevu azalır.",
          "**KVKK duyarlı form:** yalnızca gereken bilgi istenir, aydınlatma metni görünür, veri güvenli tutulur.",
          "**Ölçülü dil:** sonuç garantisi, \"kesin çözüm\" gibi ifadeler yok. Sağlık alanında reklam ve tanıtım düzenlemelere tabidir; metin buna göre yazılır.",
          "**Sık sorulan sorular:** ilk seans, ücretlendirme mantığı, süre, hazırlık. Telefonu meşgul eden soruların cevabı sitede dursun.",
          "**Yerel kayıt uyumu:** Google Business Profile ile aynı ad, adres, telefon; çalışma saatleri güncel.",
        ],
      },
      {
        type: "p",
        text: "Klinik sitesinde az şey çok şeydir. Uzun hizmet listeleri ve parlak sloganlar yerine, kimin ne yaptığı ve nasıl randevu alınacağı açıkça dursun. Hasta karar vermeden önce iki şeye bakar: bu kişi işini biliyor mu, buraya ulaşmak kolay mı.",
      },
      { type: "h3", text: "Sık yapılan hatalar" },
      {
        type: "ul",
        items: [
          "Stok fotoğraflı, uzmansız ana sayfa; hasta kiminle görüşeceğini göremez.",
          "\"Öncesi / sonrası\" görselleri ve sonuç vaadi içeren metinler; hem güven kırar hem düzenlemelere takılır.",
          "Formda gereğinden fazla bilgi istemek; doldurma oranı düşer, KVKK yükü artar.",
          "Haritadaki çalışma saatinin güncel olmaması; hasta gelir, kapalı bulur.",
        ],
      },
      { type: "h2", text: "KARNER bu sektör için ne kurar?" },
      {
        type: "ul",
        items: [
          "[Web sitesi geliştirme](/hizmetler/web-sitesi-gelistirme): sade, hızlı, mobil öncelikli; uzman bio ve randevu yolu her ekranda görünür.",
          "[Otomasyon sistemleri](/hizmetler/otomasyon-sistemleri): randevu hatırlatma botu, form → takvim → WhatsApp akışı, danışan takibi için bildirim zinciri, seans sonrası bilgilendirme mesajı.",
          "[SEO / GEO / AEO](/hizmetler/seo-geo-aeo): \"ilçe + uzmanlık\" aramaları için sayfa yapısı, MedicalBusiness / Physician gibi schema işaretlemesi, yapay zekâ araçlarının kliniği kaynak göstermesini hedefleyen soru-cevap düzeni. Yöntem için [Google AI Overview rehberi](/rehber/google-ai-overview-nasil-cikilir).",
          "İsteğe bağlı [marka ve grafik tasarım](/hizmetler/marka-grafik-tasarim): klinik kimliği ve sosyal medya şablonları.",
          "Tüm hizmetler için [hizmetler sayfası](/hizmetler).",
        ],
      },
      {
        type: "p",
        text: "Metin tarafında ilkemiz açıktır: tıbbi sonuç vaadi, kıyaslamalı üstünlük ve onaysız hasta görüşü yazmayız. Sağlık alanındaki tanıtım kurallarının gerektirdiği yerde kliniğin kendi hukuki danışmanına işaret ederiz; mevzuat yorumu bizden çıkmaz.",
      },
      { type: "h2", text: "Demo: Diyetisyen Kliniği" },
      {
        type: "p",
        text: "**Diyetisyen Kliniği** bu sektör için hazırladığımız bir demo sitedir; gerçek bir kliniğe ait değildir, uzman ve danışan bilgileri kurgudur. Randevuya giden kısa yolu, paket sunumunu ve danışan yorumlarının güveni nasıl pekiştirdiğini canlı demo sitesinde inceleyebilirsiniz. [Demoyu aç](https://diyetisyen-demo.vercel.app)",
      },
      {
        type: "callout",
        title: "Nereden başlanır?",
        text: "Önce randevu akışını netleştirin (telefon mu, WhatsApp mı, form mu); site ve otomasyon bu tek yolun etrafında kurulur.",
      },
    ],
    faq: [
      {
        q: "Klinik sitesinde hangi ifadeler kullanılmamalı?",
        a: "Sonuç garantisi, kesinlik bildiren tedavi vaatleri, kıyaslamalı üstünlük iddiaları, öncesi / sonrası görselleri ve onaysız hasta görüşleri kullanılmamalıdır. Sağlık alanında tanıtım düzenlemelere tabidir; metinleri bilgilendirici ve ölçülü tutar, hukuki danışmanlık gereken noktaları kliniğin kendi danışmanına bırakırız.",
      },
      {
        q: "Randevu hatırlatma botu nasıl çalışır?",
        a: "Randevu kaydı alındığında sistem belirlenen sürede danışana onay ve hatırlatma mesajı gönderir; istenirse iptal veya erteleme cevabını da alıp takvimi günceller. Mesajlar kliniğin WhatsApp veya SMS kanalı üzerinden gider, kayıtlar takvime işlenir, sekreter yalnızca istisnalarla ilgilenir.",
      },
      {
        q: "Danışan verisi formda nasıl korunur?",
        a: "Formda yalnızca randevu için gereken bilgi istenir, aydınlatma metni ve açık rıza görünür biçimde sunulur, veri şifreli bağlantıyla iletilir ve yalnızca kliniğin erişebildiği yerde tutulur. Sağlık verisi gibi özel nitelikli bilgiler form dışında bırakılır; bunlar görüşmede, kliniğin kendi sisteminde alınır.",
      },
      {
        q: "Klinik yapay zekâ aramasında nasıl önerilir?",
        a: "Yapay zekâ araçları harita kaydı, yorumlar, sitedeki açık bilgi ve yapısal veriyi birlikte değerlendirir. Uzman bilgisi, çalışma alanı ve konum tutarlı biçimde işaretlendiğinde, \"X'te diyetisyen\" gibi sorulara verilen cevaplarda klinik kaynak olarak görünebilir. Soru-cevap biçiminde yazılmış sayfalar bu olasılığı artırır.",
      },
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },

  // ───────────────────────────────────────────── MİMARLIK & İÇ MİMARLIK
  {
    slug: "mimarlik-ve-ic-mimarlik",
    name: "Mimarlık ve iç mimarlık",
    title: "Mimarlık ve iç mimarlık stüdyosu için portföy sitesi",
    seoTitle: "Mimarlık Stüdyosu Web Sitesi ve 3D Portföy | KARNER",
    seoDescription:
      "Mimarlık ve iç mimarlık stüdyoları için görsel ağırlıklı ama hızlı portföy sitesi, gezilebilir 3D proje sunumu ve referans projelerle kurulan güven.",
    summary:
      "Mimarlık stüdyosunun sitesi işin kendisini göstermelidir: büyük görsel, az söz, hızlı açılış. KARNER bunun için proje galerisi ve teklif formu olan portföy sitesi, tarayıcıda gezilebilen 3D proje sunumu ve stüdyo adıyla yapılan aramalarda görünürlük kurar; iki ayrı demo siteyle yaklaşımı gösterir.",
    demo: {
      title: "Mimarlık Stüdyosu",
      url: "https://mimar-demo.vercel.app",
      poster: "/demos/mimar-poster.jpg",
      video: "/demos/mimar.webm",
    },
    services: ["web-sitesi-gelistirme", "seo-geo-aeo", "marka-grafik-tasarim"],
    guides: ["/3d-web-sitesi", "/yapay-zeka-aramasinda-gorunmek"],
    blocks: [
      { type: "h2", text: "Bu sektörde müşteri sizi nasıl arar?" },
      {
        type: "p",
        text: "Mimarlık müşterisi çoğunlukla referansla gelir; siteye \"bir bakayım\" diye girer. Bu yüzden ilk aramalar genellikle stüdyo adıyla yapılır. Site o an işin kalitesini ilk saniyede göstermelidir; müşteri okumadan önce görür, gördüğüne göre okur.",
      },
      {
        type: "p",
        text: "İkinci kalıp tür ve yer aramasıdır: \"şehir + mimarlık ofisi\", \"iç mimar + villa projesi\", \"ofis iç mimarı\", \"restoran iç mimarlık\". Burada portföyün arama motoruna okunur biçimde sunulması ve yerel kayıt uyumu öne çıkar. Yalnızca görselden oluşan site bu aramada metinsiz kaldığı için görünmez.",
      },
      {
        type: "p",
        text: "Üçüncü kalıp ilhamdır: \"küçük banyo tasarımı\", \"açık mutfak fikirleri\", \"dubleks merdiven çözümü\". Proje sayfalarınız bu aramalara doğal cevapsa, stüdyo henüz iş yokken tanınır. **Portföy, en iyi satış metnidir.**",
      },
      {
        type: "p",
        text: "Kurumsal müşteri (ofis, otel, zincir mağaza) ise süreç ister: nasıl çalışıyorsunuz, hangi aşamada ne teslim ediyorsunuz. Bu kitle için yaklaşım sayfası, portföy kadar önemlidir.",
      },
      { type: "h2", text: "Sitede neler olmalı?" },
      {
        type: "ul",
        items: [
          "**Büyük, hızlı görsel:** proje fotoğrafı tam ekran; ama sıkıştırma ve tembel yükleme ile sayfa geç açılmasın.",
          "**Proje sayfası yapısı:** konum, alan, yıl, kapsam ve kısa anlatım. Arama motoru ve müşteri aynı bilgiyi okur.",
          "**Referans projeler:** tamamlanmış işler önde; süreç fotoğrafı güveni artırır.",
          "**Gezilebilir 3D sunum:** seçili proje için tarayıcıda dolaşılan model; müşteri plan okumadan mekânı hisseder.",
          "**Teklif formu:** proje türü, yer ve yaklaşık alan soran kısa form; uzun anket değil.",
          "**Ekip ve yaklaşım:** kim olduğunuz ve nasıl çalıştığınız tek sayfada.",
          "**Sade tipografi ve boşluk:** tasarımcı olduğunuz sitenin kendisinden anlaşılsın.",
          "**Görsel meta verisi:** her projeye açıklayıcı alt metin ve yapısal veri; Google Görseller ve AI araçları bunu okur.",
        ],
      },
      {
        type: "p",
        text: "Mimarlık sitesinde en zor denge görsel ile hız arasındadır. Fotoğrafın büyük olması gerekir; ama büyük fotoğraf yavaş açılırsa müşteri ilk projeyi görmeden gider. Çözüm görseli küçültmek değil, doğru formatta ve ekrana göre sunmaktır.",
      },
      { type: "h3", text: "Sık yapılan hatalar" },
      {
        type: "ul",
        items: [
          "Fotoğrafları orijinal boyutta yüklemek; sayfa telefonda dakikalarca açılır.",
          "Proje sayfasında hiç metin olmaması; arama motoru projeyi anlamaz, kimse bulamaz.",
          "Hazır tema kullanmak; tasarımcı sitesinin kendisi tasarımsız görünür.",
          "Teklif formunu uzun ankete çevirmek; müşteri yarıda bırakır.",
        ],
      },
      { type: "h2", text: "KARNER bu sektör için ne kurar?" },
      {
        type: "ul",
        items: [
          "[Web sitesi geliştirme](/hizmetler/web-sitesi-gelistirme): video veya sinematik hero, proje galerisi, teklif formu; görsel ağırlıklı ama performans puanı yüksek yapı.",
          "[3D web sitesi](/3d-web-sitesi): seçili projeyi tarayıcıda gezilebilir hâle getirme; mobilde hafif alternatif ile.",
          "[SEO / GEO / AEO](/hizmetler/seo-geo-aeo): proje sayfalarının arama ve yapay zekâ araçlarında okunur olması, stüdyo adı ve \"şehir + mimarlık ofisi\" aramalarında görünürlük. Ayrıntı için [yapay zekâ aramasında görünmek](/yapay-zeka-aramasinda-gorunmek).",
          "[Marka ve grafik tasarım](/hizmetler/marka-grafik-tasarim): stüdyo kimliği, sunum şablonu, sosyal medya dili.",
          "Diğer hizmetler için [hizmetler sayfası](/hizmetler).",
        ],
      },
      {
        type: "p",
        text: "Çalışmaya portföyden başlarız: en güçlü projeler seçilir, künyeleri yazılır, görselleri web için hazırlanır. Site bu portföyün etrafında kurulur; 3D sunum ve kimlik çalışması, ana yapı oturduktan sonra eklenir. Böylece ilk yayında eksik hissettiren bir sayfa kalmaz.",
      },
      { type: "h2", text: "Demo: Mimarlık Stüdyosu" },
      {
        type: "p",
        text: "Bu sektör için iki ayrı demo site yayınladık; ikisi de kurgudur, gerçek bir stüdyoya ait değildir. **Mimarlık Stüdyosu** sade ve sinematik bir portföy yaklaşımı gösterir; dikkat doğrudan işin kendisine gider: [Demoyu aç](https://mimar-demo.vercel.app). **İç Mimarlık Stüdyosu** ise video hero, proje galerisi ve teklif formunu bir arada kurar; ziyaretçi daha okumadan işin kalitesini görür: [İç mimarlık demosunu aç](https://icmimar-demo.vercel.app). İkisini de canlı demo sitesi olarak inceleyebilirsiniz.",
      },
      {
        type: "callout",
        title: "Nereden başlanır?",
        text: "En iyi 6-8 projenizin fotoğraf ve kısa künyesini toplayın; site bu portföyün etrafında kurulur, 3D sunum sonra eklenir.",
      },
    ],
    faq: [
      {
        q: "Görsel ağırlıklı mimarlık sitesi yavaş olmak zorunda mı?",
        a: "Hayır. Modern görsel formatları, ekrana göre boyut sunma ve tembel yükleme ile tam ekran fotoğraflı bir site hızlı açılabilir. Yavaşlık genellikle orijinal boyutta yüklenen fotoğraflardan ve gereksiz betiklerden gelir; ikisi de çözülür. Hız testinden yüksek puan alan görsel site mümkündür.",
      },
      {
        q: "3D proje sunumu her proje için gerekli mi?",
        a: "Gerekli değil. Bir veya iki öne çıkan projeyi gezilebilir hâle getirmek yeterlidir; diğerleri fotoğrafla anlatılır. 3D sunum, müşterinin plan okumadan mekânı hissetmesi gereken satış aşamasında en çok işe yarar; portföyün tamamını 3D yapmak hem gereksiz hem siteyi ağırlaştırır.",
      },
      {
        q: "Mevcut projelerin 3D modelini siteye aktarabilir misiniz?",
        a: "Evet. Revit, SketchUp, 3ds Max gibi araçlardan dışa aktarılan modeller sadeleştirilip web için optimize edilir ve tarayıcıda çalışan sahneye dönüştürülür. Model ağırsa doku ve detay seviyesi web için düşürülür; görünüm korunur, dosya boyutu küçülür.",
      },
      {
        q: "Mimarlık stüdyosu yapay zekâ aramasında nasıl çıkar?",
        a: "Proje sayfaları açık künye, konum ve açıklayıcı metin taşırsa yapay zekâ araçları stüdyoyu \"X şehrinde mimarlık ofisi\" gibi sorularda kaynak gösterebilir. Yerel kayıt, tutarlı iletişim bilgisi ve yapısal veri bu olasılığı artırır. Yalnızca görselden oluşan site bu araçlar için okunmazdır.",
      },
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },

  // ─────────────────────────────────────────────── İNŞAAT & MÜHENDİSLİK
  {
    slug: "insaat-ve-muhendislik",
    name: "İnşaat ve mühendislik",
    title: "İnşaat firması için kurumsal web sitesi ve 3D proje sunumu",
    seoTitle: "İnşaat Firması Web Sitesi ve 3D Proje Sunumu | KARNER",
    seoDescription:
      "İnşaat firması ve proje geliştirici için kurumsal güven veren web sitesi, proje sayfaları, ilerleme görselleri ve temel atılmadan 3D sunum. İhale uyumlu kimlik.",
    summary:
      "İnşaat firmasının sitesi güven satar: referans projeler, ilerleme görselleri ve kurumsal duruş. KARNER bunun için proje sayfalarıyla kurulan kurumsal site, temel atılmadan önce alıcıya gösterilecek 3D sunum ve firma adıyla yapılan aramalarda görünürlük kurar; ihale dosyasına yakışan kimlik uyumunu gözetir.",
    demo: {
      title: "İnşaat & Mühendislik",
      url: "https://insaat-web-eight.vercel.app",
      poster: "/demos/insaat-poster.jpg",
      video: "/demos/insaat.webm",
    },
    services: ["web-sitesi-gelistirme", "marka-grafik-tasarim", "seo-geo-aeo"],
    guides: ["/3d-web-sitesi", "/yapay-zeka-reklam-videosu"],
    blocks: [
      { type: "h2", text: "Bu sektörde müşteri sizi nasıl arar?" },
      {
        type: "p",
        text: "İnşaat firmasını iki ayrı kitle arar. Konut alıcısı \"şehir + yeni proje\", \"ilçe + satılık daire projeden\", \"şehir + site projesi\" gibi aramalar yapar ve proje sayfasına iner. Kurumsal müşteri ve ihale tarafı ise firma adını arar; referans listesine, tamamlanmış işlere ve iletişim bilgisine bakar.",
      },
      {
        type: "p",
        text: "Her iki kitle de aynı soruyu sorar: bu firma işi bitirir mi? **Cevap sitede fotoğrafla, tarihle ve adresle verilir;** sıfatla değil. Süreç görseli olan proje sayfası, slogan dolu ana sayfadan daha çok güven verir.",
      },
      {
        type: "p",
        text: "Mühendislik ve taahhüt tarafında arama daha dar ve tekniktir: \"çelik konstrüksiyon firması\", \"kentsel dönüşüm müteahhit\", \"altyapı taahhüt\". Bu sorgularda hizmet sayfasının teknik kapsamı açıkça yazması gerekir; genel \"inşaat hizmetleri\" başlığı bu aramayı karşılamaz.",
      },
      {
        type: "p",
        text: "Yapay zekâ araçları da artık \"X şehrinde güvenilir inşaat firması\" sorusuna cevap veriyor. Firma bilgisi tutarlı ve yapısal veriyle işaretli değilse bu cevapta yer almaz; ayrıntı [yapay zekâ aramasında görünmek](/yapay-zeka-aramasinda-gorunmek) rehberinde.",
      },
      { type: "h2", text: "Sitede neler olmalı?" },
      {
        type: "ul",
        items: [
          "**Proje sayfaları:** her proje için konum, tür, durum (planlanan / devam eden / teslim), teslim yılı ve fotoğraf.",
          "**İlerleme görselleri:** şantiye fotoğrafı tarihli olarak; devam eden projede güven buradan okunur.",
          "**3D sunum:** temel atılmadan alıcıya gösterilecek dış cephe ve kat planı; tarayıcıda döndürülebilir.",
          "**Referanslar ve tamamlanan işler:** liste değil, görselli künye.",
          "**Kurumsal kimlik uyumu:** logo, renk ve tipografi ihale dosyası, tabela ve siteyle aynı dili konuşsun.",
          "**Kurumsal bilgiler:** ticaret unvanı, adres, yetkili iletişim; kurumsal müşteri bunu arar.",
          "**Hızlı ve sade yapı:** ağır görsel olsa da sayfa geç açılmasın; mobilde de okunsun.",
          "**Yapısal veri:** Organization ve proje şeması ile firma bilgisinin arama ve yapay zekâ araçlarınca doğru okunması.",
        ],
      },
      {
        type: "p",
        text: "İnşaat sitesinin ağırlık merkezi proje arşividir. Ana sayfa bir vitrindir; güveni kuran yer, tarihli ve adresli proje sayfalarıdır. Bu sayfalar düzenli güncellendiğinde site canlı görünür; güncellenmediğinde firma da durmuş gibi algılanır.",
      },
      { type: "h3", text: "Sık yapılan hatalar" },
      {
        type: "ul",
        items: [
          "Proje sayfası yerine tek bir \"projelerimiz\" galerisi; hangi proje nerede, ne zaman bitti anlaşılmaz.",
          "Render görseli ile gerçek fotoğrafı ayırmamak; alıcı hangisinin bittiğini bilemez.",
          "Kurumsal bilgilerin sitede olmaması; ihale ve kurumsal müşteri güven duymaz.",
          "Yıllardır güncellenmeyen \"devam eden projeler\" sayfası.",
        ],
      },
      { type: "h2", text: "KARNER bu sektör için ne kurar?" },
      {
        type: "ul",
        items: [
          "[Web sitesi geliştirme](/hizmetler/web-sitesi-gelistirme): proje sayfası yapısı, referans vitrini, kurumsal sayfalar; güven veren sade duruş.",
          "[3D web sitesi](/3d-web-sitesi): projeyi temel atılmadan tarayıcıda gösteren dış cephe ve kat planı sahnesi.",
          "[Marka ve grafik tasarım](/hizmetler/marka-grafik-tasarim): logo, kurumsal kimlik, sunum ve ihale dosyası şablonu; siteyle tutarlı.",
          "[SEO / GEO / AEO](/hizmetler/seo-geo-aeo): firma adı ve \"şehir + inşaat firması\" aramalarında görünürlük, yapısal veri, yapay zekâ araçlarında kaynak gösterilme hedefi.",
          "İsteğe bağlı [AI video ve reklam](/hizmetler/ai-video-reklam): proje tanıtım filmi ve Reels; gerçek şantiye görüntüsüyle birlikte. Yöntem için [yapay zekâ ile reklam videosu](/yapay-zeka-reklam-videosu). Diğer hizmetler için [hizmetler sayfası](/hizmetler).",
        ],
      },
      {
        type: "p",
        text: "Projeyi genellikle proje arşiviyle başlatırız: tamamlanmış ve devam eden işlerin fotoğraf, tarih ve konum listesi çıkarılır. Site bu arşivin üstüne kurulur; kimlik çalışması ve 3D sunum, firmanın satış takvimine göre sıraya girer. Proje sayfalarını firma kendi güncelleyebilsin diye yönetim tarafı sade tutulur.",
      },
      { type: "h2", text: "Demo: İnşaat & Mühendislik" },
      {
        type: "p",
        text: "**İnşaat & Mühendislik** bu sektör için hazırladığımız bir demo sitedir; gerçek bir firmaya ait değildir, projeler ve referanslar kurgudur. Büyük bütçeli işlerde aranan kurumsal duruşu ve referansı önde tutan yapıyı canlı demo sitesinde inceleyebilirsiniz. [Demoyu aç](https://insaat-web-eight.vercel.app)",
      },
      {
        type: "callout",
        title: "Nereden başlanır?",
        text: "Tamamlanmış ve devam eden projelerin fotoğraf, tarih ve konum listesini çıkarın; kurumsal site bu proje arşivinin üstüne kurulur.",
      },
    ],
    faq: [
      {
        q: "İnşaat sitesinde en çok ne güven verir?",
        a: "Tarihli şantiye fotoğrafı, teslim edilmiş projelerin adresli künyesi ve açık kurumsal bilgi. Alıcı ve kurumsal müşteri sıfatlara değil kanıta bakar; süreç görseli olan proje sayfası, slogan dolu ana sayfadan daha inandırıcıdır. Render ile gerçek fotoğrafın açıkça ayrılması da güveni artırır.",
      },
      {
        q: "Projeyi temel atılmadan 3D olarak göstermek mümkün mü?",
        a: "Mümkün. Mimari modelden dış cephe ve kat planı web için optimize edilir, tarayıcıda döndürülüp gezilebilir hâle getirilir. Alıcı daireyi plan okumadan görür; satış ofisindeki maket tarayıcıya taşınmış olur. Mobil cihazlar için hafif bir alternatif de hazırlanır.",
      },
      {
        q: "Kurumsal kimlik siteyle birlikte mi yapılmalı?",
        a: "Birlikte yapılması tutarlılığı kolaylaştırır. Logo, renk ve tipografi aynı anda tanımlanınca site, ihale dosyası, tabela ve sosyal medya aynı dili konuşur. Mevcut kimlik varsa site ona uyarlanır; yeniden tasarım gerekmez, yalnızca eksik parçalar (sunum şablonu gibi) tamamlanır.",
      },
      {
        q: "İnşaat firması yapay zekâ aramasında nasıl yer alır?",
        a: "Firma adı, adresi, proje listesi ve iletişim bilgisi sitede açık ve yapısal veriyle işaretli olduğunda, yapay zekâ araçları \"X şehrinde inşaat firması\" gibi sorularda firmayı kaynak gösterebilir. Yerel kayıt, yorumlar ve varsa resmi sicil bilgileriyle tutarlılık bu sinyali güçlendirir.",
      },
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },

  // ───────────────────────────────────────── YAPI ÜRÜNLERİ & SHOWROOM
  {
    slug: "yapi-urunleri-ve-showroom",
    name: "Yapı ürünleri ve showroom",
    title: "Yapı ürünleri üreticisi ve showroom için ürün kataloğu sitesi",
    seoTitle: "Yapı Ürünleri Katalog Sitesi, 3D Ürün ve Bayi | KARNER",
    seoDescription:
      "Duşakabin, banyo, mutfak ve yapı ürünleri üreticisi için ürün kataloğu, 360° / 3D ürün görüntüleme, bayi bulucu, B2B teklif formu ve yapay zekâ ürün görseli.",
    summary:
      "Yapı ürünü üreticisinin sitesi iki kitleye aynı anda konuşur: ürünü arayan son kullanıcı ve teklif isteyen bayi. KARNER bunun için filtrelenebilir ürün kataloğu, tarayıcıda döndürülen 3D ürün sahnesi, bayi bulucu ve B2B teklif formu olan hızlı bir site kurar; katalog görsellerini yapay zekâ ile çoğaltır.",
    demo: {
      title: "Duşakabin & Banyo",
      url: "https://dustas-demo.vercel.app",
      poster: "/demos/dustas-poster.jpg",
      video: "/demos/dustas.webm",
    },
    services: [
      "web-sitesi-gelistirme",
      "ai-urun-gorseli",
      "otomasyon-sistemleri",
      "seo-geo-aeo",
    ],
    guides: ["/3d-web-sitesi", "/yapay-zeka-aramasinda-gorunmek"],
    blocks: [
      { type: "h2", text: "Bu sektörde müşteri sizi nasıl arar?" },
      {
        type: "p",
        text: "Son kullanıcı ürünle arar: \"köşe duşakabin\", \"siyah profil duşakabin\", \"90x90 duşakabin fiyat\", \"banyo dolabı modelleri\". Karar çoğunlukla görselle verilir; ürünü açıdan görmek ister. Bu aramada katalog sayfasının hızı ve fotoğraf kalitesi belirleyicidir. Google görsel arama ve Alışveriş sekmesi bu sayfaları okur.",
      },
      {
        type: "p",
        text: "Bayi ve usta ise farklı arar: \"duşakabin üreticisi\", \"toptan banyo aksesuarı\", \"şehir + duşakabin bayisi\", \"özel ölçü duşakabin imalat\". Bu kitle teknik bilgi, teslim kapasitesi ve teklif yolu ister. **Aynı site iki kitleye iki ayrı kapı açmalıdır.**",
      },
      {
        type: "p",
        text: "Üçüncü kitle mimar ve müteahhittir: proje için ürün seçer, teknik çizim ve montaj detayı ister. Onlar için indirilebilir teknik dosya ve ölçü tablosu, fotoğraftan daha önemlidir.",
      },
      {
        type: "p",
        text: "Yapay zekâ araçları \"hangi duşakabin markası iyi\" gibi sorulara da cevap üretiyor. Ürün bilgisi yapısal veriyle işaretli üretici, bu cevaplarda kaynak olarak geçebilir; ayrıntı [yapay zekâ aramasında görünmek](/yapay-zeka-aramasinda-gorunmek) rehberinde.",
      },
      { type: "h2", text: "Sitede neler olmalı?" },
      {
        type: "ul",
        items: [
          "**Filtrelenebilir katalog:** ölçü, renk, cam tipi, profil gibi gerçek seçim ölçütleriyle; ziyaretçi aradığını birkaç tıkta bulsun.",
          "**360° / 3D ürün görüntüleme:** seçili ürünler tarayıcıda döndürülsün; showroom ziyareti olmadan ürün anlaşılsın.",
          "**Ürün sayfası künyesi:** teknik ölçü, malzeme, montaj bilgisi, indirilebilir teknik çizim.",
          "**Bayi bulucu:** şehre göre yetkili satış noktası; bayi ağı hem müşteriye hem bayilere güven verir.",
          "**B2B teklif formu:** ürün, adet ve teslim yeri soran kısa form; talep doğrudan satış ekibine düşsün.",
          "**Tutarlı ürün görseli:** aynı açı, aynı ışık; katalog bütün görünsün. Eksik görseller yapay zekâ ile tamamlanabilir.",
          "**Her ekranda iletişim:** showroom adresi, telefon ve WhatsApp sayfanın her yerinde.",
          "**Ürün şeması:** Product yapısal verisi ile arama motorunun ürünü doğru okuması.",
        ],
      },
      {
        type: "p",
        text: "Katalog sitesinin sırrı veri düzenidir. Ürünler ölçü, renk ve varyant bilgisiyle tek tabloda tutulursa filtre, karşılaştırma ve teklif formu bu tablodan beslenir; yeni ürün eklemek tek satır eklemek kadar kolay olur. Dağınık PDF kataloglardan başlayan projelerde önce bu tablo kurulur.",
      },
      { type: "h3", text: "Sık yapılan hatalar" },
      {
        type: "ul",
        items: [
          "PDF kataloğu siteye yükleyip bırakmak; arama motoru ürünü bulamaz, ziyaretçi telefonda açamaz.",
          "Her ürünü farklı ışık ve açıyla çekmek; katalog bütünlüğü bozulur, marka ucuz görünür.",
          "Bayi ve son kullanıcıyı aynı forma yönlendirmek; bayi talebi perakende sorularının arasında kaybolur.",
          "Ürün sayfasında teknik ölçü olmaması; usta ve mimar arar, sormak zorunda kalır.",
        ],
      },
      { type: "h2", text: "KARNER bu sektör için ne kurar?" },
      {
        type: "ul",
        items: [
          "[Web sitesi geliştirme](/hizmetler/web-sitesi-gelistirme): ürün vitrini ve katalog yapısı, bayi bulucu, teklif formu; hızlı ve mobil uyumlu.",
          "[3D web sitesi](/3d-web-sitesi): seçili ürünlerin tarayıcıda döndürülebilen 3D sahnesi; mobilde hafif alternatif.",
          "[AI ürün görseli](/hizmetler/ai-urun-gorseli): katalog görsellerini tutarlı stüdyo görünümünde çoğaltma, farklı mekân ve renk varyasyonları.",
          "[Otomasyon sistemleri](/hizmetler/otomasyon-sistemleri): teklif formundan gelen talebi CRM veya e-postaya düşürme, bayi başvurusunu sınıflandırma, stok ve fiyat güncellemesini kataloğa taşıma.",
          "[SEO / GEO / AEO](/hizmetler/seo-geo-aeo): ürün ve kategori sayfalarının aramada görünmesi, yapay zekâ araçlarında kaynak gösterilme hedefi. Diğer hizmetler için [hizmetler sayfası](/hizmetler).",
        ],
      },
      {
        type: "p",
        text: "İşe ürün tablosuyla başlarız; katalog, filtre ve teklif formu bu tablodan kurulur. Görsel tarafında mevcut fotoğraflar tek bir stüdyo diline getirilir, eksik kareler yapay zekâ ile tamamlanır. 3D sahne en çok satan birkaç ürün için hazırlanır; bayi bulucu ve otomasyon, satış ekibinin akışına göre sona eklenir.",
      },
      { type: "h2", text: "Demo: Duşakabin & Banyo" },
      {
        type: "p",
        text: "**Duşakabin & Banyo** bu sektör için hazırladığımız bir demo sitedir; gerçek bir üreticiye ait değildir, ürünler ve marka kurgudur. Ürün vitrini ve katalog yaklaşımını, ziyaretçinin aradığı ürünü birkaç tıkta bulmasını ve iletişimin her ekranda bulunuşunu canlı demo sitesinde inceleyebilirsiniz. [Demoyu aç](https://dustas-demo.vercel.app)",
      },
      {
        type: "callout",
        title: "Nereden başlanır?",
        text: "Ürün listesini ölçü, renk ve varyant bilgisiyle tek tabloda toplayın; katalog, filtre ve teklif formu bu tablodan kurulur.",
      },
    ],
    faq: [
      {
        q: "Katalog sitesi ile e-ticaret sitesi arasındaki fark ne?",
        a: "Katalog sitesi ürünü gösterir, teklif veya bayiye yönlendirir; sepet ve ödeme yoktur. Yapı ürünlerinde montaj, ölçü ve nakliye değişken olduğu için çoğu üretici katalog + teklif modelini seçer. İstenirse sonradan sipariş katmanı eklenebilir; altyapı baştan buna uygun kurulur.",
      },
      {
        q: "3D ürün görüntüleme için neye ihtiyaç var?",
        a: "Ürünün teknik çizimi veya mevcut 3D modeli yeterlidir; yoksa fotoğraflardan model üretilebilir. Model web için sadeleştirilir, doku ve ışık ayarlanır, tarayıcıda döndürülebilir sahne hâline getirilir. Her ürün için değil, en çok satan veya en çok soru alan ürünler için yapılması yeterlidir.",
      },
      {
        q: "Yapay zekâ ürün görseli gerçek çekimin yerini tutar mı?",
        a: "Katalog tutarlılığı ve varyasyon üretiminde evet; ana ürün görseli için gerçek çekim hâlâ temel kaynaktır. Biz mevcut fotoğraftan yola çıkarak farklı mekân, renk ve açı varyasyonları üretir, eksik kalan katalog karelerini tamamlarız. Ürünün ölçü ve detayı değiştirilmez.",
      },
      {
        q: "Bayi teklif talepleri nereye düşer?",
        a: "Form gönderildiğinde talep belirlenen e-posta, WhatsApp veya CRM kaydına otomatik düşer; istenirse ürün ve bölgeye göre ilgili satış temsilcisine yönlendirilir. Böylece talep kaybolmaz, cevap süresi kısalır ve hangi talebin kimde olduğu her zaman görünür.",
      },
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },

  // ──────────────────────────────────────────── YEREL HİZMET İŞLETMELERİ
  {
    slug: "yerel-hizmet-isletmeleri",
    name: "Yerel hizmet işletmeleri",
    title: "Yerel hizmet işletmesi için \"şehir + hizmet\" aramasında görünürlük",
    seoTitle: "Yerel Hizmet İşletmesi Web Sitesi ve Yerel SEO | KARNER",
    seoDescription:
      "Tesisat, doğalgaz, klima, temizlik, baca ve tadilat firmaları için şehir + hizmet aramasında çıkan site, Google Business Profile, tıkla-ara ve AI aramasında önerilme.",
    summary:
      "Yerel hizmet işletmesi için dijital, \"şehir + hizmet\" aramasında çıkmak demektir. KARNER bunun için tıkla-ara odaklı hızlı bir site, gerçek içerikli hizmet ve bölge sayfaları, Google Business Profile uyumu, yorum toplama akışı ve yapay zekâ araçlarının \"X şehrinde Y firması\" sorusunda işletmeyi önermesini hedefleyen yapı kurar.",
    services: ["seo-geo-aeo", "web-sitesi-gelistirme", "otomasyon-sistemleri"],
    guides: [
      "/yapay-zeka-aramasinda-gorunmek",
      "/rehber/google-ai-overview-nasil-cikilir",
    ],
    blocks: [
      { type: "h2", text: "Bu sektörde müşteri sizi nasıl arar?" },
      {
        type: "p",
        text: "Yerel hizmet araması acil ve yerlidir: \"şehir + klima servisi\", \"ilçe + tesisatçı\", \"bana yakın baca temizliği\", \"doğalgaz tesisatı + şehir\", \"ev temizliği + semt\". Kişi karşılaştırma yapmaz; ilk güvenilir görünen numarayı arar. Bu yüzden ilk ekranda telefon numarası olmayan site, aramayı kaybeder.",
      },
      {
        type: "p",
        text: "Bu aramada Google haritalı sonuçları, yorum puanını ve çalışma saatini önde gösterir. Sonra organik sonuçlar gelir. Son dönemde bir de yapay zekâ özeti var: \"X şehrinde Y firması önerir misin\" sorusuna ChatGPT ve Google AI Overview doğrudan firma adı sayıyor. **Haritada, organikte ve AI özetinde aynı anda görünen işletme telefonu alır.**",
      },
      {
        type: "p",
        text: "İkinci kalıp sorun aramasıdır: \"kombi su kaçırıyor\", \"klima soğutmuyor\", \"baca ne sıklıkla temizlenir\". Kişi çözüm arar; çözümü açıklayan sayfa, çağrılacak firmayı da belirler. Bu sayfalar yapay zekâ özetine en çok giren içeriklerdir.",
      },
      {
        type: "p",
        text: "Bir de mevsim vardır: klima yazın, kombi ve baca kışın aranır. Sayfalar buna göre hazır olmalı, sezon gelince değil önceden. Arama motorunun yeni sayfayı tanıması zaman aldığı için sezon içeriği birkaç ay erken yayınlanır.",
      },
      { type: "h2", text: "Sitede neler olmalı?" },
      {
        type: "ul",
        items: [
          "**Tıkla-ara ve WhatsApp:** ekranın her yerinde, özellikle mobilde sabit. Acil arayan form doldurmaz.",
          "**Hizmet sayfaları:** her hizmet için ayrı sayfa; ne yapıldığı, süreç, hangi durumda çağrılır.",
          "**Hizmet bölgesi sayfaları:** gerçek içerikle (o bölgedeki dağıtıcı, bina tipi, sık sorun); mahalle başına boş sayfa değil.",
          "**Google Business Profile uyumu:** ad, adres, telefon, kategori ve çalışma saati siteyle aynı; hizmet bölgesi doğru tanımlı.",
          "**Yorum toplama:** iş bitince müşteriye tek tıkla yorum bağlantısı gitsin; yorumlar siteye de yansısın.",
          "**Yetki ve belge alanı:** varsa yetkili servis, dağıtıcı kaydı gibi resmi bilgiler; yoksa yazılmaz.",
          "**Gerçek saha fotoğrafı:** ekip, araç, yapılan iş. Stok fotoğraf güven kırar.",
          "**Sık sorulan sorular:** fiyat mantığı, süre, garanti kapsamı; telefonu meşgul eden soruların cevabı sitede dursun.",
        ],
      },
      {
        type: "p",
        text: "Yerel hizmet sitesi süslü olmak zorunda değildir; hızlı, açık ve doğru olmak zorundadır. Ziyaretçi telefonda, çoğu zaman bir sorunun ortasında bakar. Numara görünür, hizmet anlaşılır ve firma gerçek görünüyorsa arama gelir.",
      },
      { type: "h3", text: "Sık yapılan hatalar" },
      {
        type: "ul",
        items: [
          "Her mahalle için aynı metnin isim değiştirilerek kopyalandığı sayfalar; arama motoru bunları değersiz sayar.",
          "Haritadaki kayıtta eski telefon, sitede yeni telefon; iki kayıt birbirini zayıflatır.",
          "Sahte ya da satın alınmış yorumlar; platform fark eder, kayıt zarar görür.",
          "Yetkili olmadığı markayı \"yetkili servis\" diye yazmak; hem güven hem hukuk sorunu.",
        ],
      },
      { type: "h2", text: "KARNER bu sektör için ne kurar?" },
      {
        type: "ul",
        items: [
          "[SEO / GEO / AEO](/hizmetler/seo-geo-aeo): \"şehir + hizmet\" anahtar kelime yapısı, LocalBusiness / Service schema, Google Business Profile uyumu, yapay zekâ araçlarında \"X şehrinde Y firması\" sorusunda önerilmeyi hedefleyen içerik düzeni. Yöntem için [Google AI Overview rehberi](/rehber/google-ai-overview-nasil-cikilir).",
          "[Web sitesi geliştirme](/hizmetler/web-sitesi-gelistirme): tıkla-ara odaklı, hızlı, mobil öncelikli site; hizmet ve bölge sayfaları.",
          "[Otomasyon sistemleri](/hizmetler/otomasyon-sistemleri): iş bitiminde otomatik yorum isteği, form → WhatsApp bildirimi, sezon kampanyası mesaj akışı, gelen aramaların kayıt altına alınması.",
          "İsteğe bağlı [AI video ve reklam](/hizmetler/ai-video-reklam): sezon kampanyası için kısa Reels; gerçek saha görüntüsüyle.",
          "Tüm hizmetler için [hizmetler sayfası](/hizmetler).",
        ],
      },
      {
        type: "p",
        text: "Bu sektörde işe siteden değil kayıttan başlarız: Google Business Profile doğrulanır, kategori ve hizmet bölgesi düzeltilir, site bu kaydı destekleyecek biçimde kurulur. Sonra hizmet ve bölge sayfaları gerçek içerikle yazılır; yorum akışı ve sezon otomasyonu en sona kalır. Bu sıra, yerel aramada görünürlüğün nasıl kurulduğunu anlatan [yapay zekâ aramasında görünmek](/yapay-zeka-aramasinda-gorunmek) rehberiyle aynıdır.",
      },
      {
        type: "callout",
        title: "Nereden başlanır?",
        text: "Google Business Profile kaydını doğrulayıp güncelleyin; yerel görünürlüğün geri kalanı bu kaydın üstüne kurulur.",
      },
    ],
    faq: [
      {
        q: "Yerel hizmet firması için site mi, Google Business Profile mi önce?",
        a: "İkisi birlikte çalışır ama kayıt önce gelir. Harita sonucu çoğu yerel aramada ilk görünen yerdir; site ise o kaydı destekleyen, hizmet ve bölge bilgisini açıklayan ve yapay zekâ araçlarına okunur veri sunan katmandır. Kayıt olmadan site yalnız kalır, site olmadan kayıt zayıf kalır.",
      },
      {
        q: "Her mahalle için sayfa açmak işe yarar mı?",
        a: "Boş şablon sayfa işe yaramaz; arama motorları bunu doorway içerik sayar ve değer vermez. Bölge sayfası yalnızca o bölgeye özgü gerçek bilgi (dağıtıcı, bina tipi, sık karşılaşılan sorun, ulaşım süresi) taşıyorsa açılır. Biz bu ilkeyi uygular, boş sayfa üretmeyiz; az ama dolu sayfa daha iyi çalışır.",
      },
      {
        q: "Yapay zekâ aramasında yerel firma nasıl önerilir?",
        a: "Yapay zekâ araçları harita kaydı, yorumlar, sitedeki açık hizmet bilgisi ve yapısal veriyi birlikte değerlendirir; varsa resmi yetki kayıtlarıyla tutarlılığa bakar. Bu sinyaller kurulduğunda \"X şehrinde Y firması\" sorusunda firma kaynak olarak gösterilebilir. Sorun anlatan içerik sayfaları bu olasılığı artırır.",
      },
      {
        q: "Yorum toplama otomasyonu nasıl çalışır?",
        a: "İş tamamlandığında sistem müşteriye teşekkür mesajıyla birlikte yorum bağlantısı gönderir; cevap gelmezse tek bir hatırlatma yapar. Mesaj WhatsApp veya SMS üzerinden gider, kimin yorum bıraktığı takip edilir. Sahte yorum üretilmez; yalnızca gerçek müşteriye, gerçek iş sonrası istek gider.",
      },
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },

  // ──────────────────────────────────────────────── BUTİK & E-TİCARET
  {
    slug: "butik-ve-e-ticaret",
    name: "Butik ve e-ticaret",
    title: "Butik ve küçük e-ticaret için mağaza vitrini ve AI ürün görseli",
    seoTitle: "Butik E-ticaret Sitesi ve AI Ürün Görseli | KARNER",
    seoDescription:
      "Butik, moda ve küçük e-ticaret için hızlı mobil mağaza vitrini, sanal manken try-on görseli, Reels ve AI video, Instagram entegrasyonu ve sezon kampanyası akışı.",
    summary:
      "Butik dijitalde görselle satar: ürünü üzerinde hayal ettiren fotoğraf, akıcı Reels ve telefonda hızlı açılan vitrin. KARNER bunun için sanal manken try-on görselleri, kısa AI video, Instagram ile bağlı mobil mağaza vitrini ve sezon kampanyalarını otomatik akıtan yapı kurar; görünürlük katmanı arama ve yapay zekâ araçlarını kapsar.",
    services: [
      "ai-urun-gorseli",
      "ai-video-reklam",
      "web-sitesi-gelistirme",
      "otomasyon-sistemleri",
    "sosyal-medya-icerik-yonetimi"],
    guides: ["/yapay-zeka-reklam-videosu", "/yapay-zeka-aramasinda-gorunmek"],
    blocks: [
      { type: "h2", text: "Bu sektörde müşteri sizi nasıl arar?" },
      {
        type: "p",
        text: "Butik müşterisi çoğu zaman aramaz, keşfeder: Instagram'da bir Reels, bir kaydedilen ürün, bir etiket. Oradan profile, profilden vitrine gelir. Bu yüzden ilk temas görseldir; **görsel kötüyse ürün iyi olsa da geçilir.** Ürünün manken üzerinde, doğru ışıkta görünmesi satışın ilk adımıdır.",
      },
      {
        type: "p",
        text: "Aramayla gelen de var: \"keten elbise\", \"büyük beden yazlık\", \"şehir + butik\", \"el yapımı çanta\". Bu sorgularda ürün sayfasının hızı, fotoğraf kalitesi ve açık fiyat belirleyicidir. Google Alışveriş ve görsel arama bu sayfaları okur; fiyatı gizli ürün bu sonuçlara girmez.",
      },
      {
        type: "p",
        text: "Üçüncü kalıp durumdur: \"mezuniyet için elbise\", \"düğün davetlisi kombin\", \"ofis için rahat ayakkabı\". Kişi ürün adını bilmez, ihtiyacını yazar. Koleksiyon ve kombin sayfaları bu aramayı karşılar; tek tek ürün sayfaları karşılamaz.",
      },
      {
        type: "p",
        text: "Yapay zekâ araçları da alışveriş önerisi vermeye başladı: \"yaz düğünü için sade elbise nereden alınır\" gibi sorulara mağaza adı sayıyor. Ürün bilgisi yapısal veriyle işaretli mağaza bu cevaplarda yer alabilir; ayrıntı [yapay zekâ aramasında görünmek](/yapay-zeka-aramasinda-gorunmek) rehberinde.",
      },
      { type: "h2", text: "Sitede neler olmalı?" },
      {
        type: "ul",
        items: [
          "**Ürün görseli:** ürün manken üzerinde, tutarlı ışık ve açı; askıda çekilmiş fotoğraf satışı düşürür. Sanal manken (try-on) bu boşluğu kapatır.",
          "**Hızlı mobil vitrin:** telefonda anında açılan, kaydırması akıcı ürün listesi; ağır tema değil.",
          "**Instagram bağı:** profil ve vitrin aynı ürünleri göstersin; Reels'ten ürüne tek tıkla geçiş.",
          "**Reels / kısa video:** ürünün hareketi, kumaşın dökümü; gerçek çekim ve AI video birlikte.",
          "**Açık fiyat ve beden bilgisi:** soru sordurmayan ürün sayfası; beden tablosu her üründe.",
          "**Sezon kampanyası alanı:** yeni sezon, indirim ve son ürünler için güncellenebilir vitrin başı.",
          "**Kolay iletişim ve sipariş yolu:** WhatsApp, DM veya sepet; butiğin gerçek satış kanalı hangisiyse o önde.",
          "**Ürün şeması:** Product yapısal verisi ile Google Alışveriş ve yapay zekâ araçlarının ürünü okuması.",
        ],
      },
      {
        type: "p",
        text: "Butik sitesinde en çok geri dönen soru bedendir. Ürün sayfasında ölçü tablosu, mankenin bedeni ve kumaş bilgisi açıkça dururdu, DM trafiği azalır ve iade düşer. Görsel ne kadar iyiyse bilgi de o kadar açık olmalıdır; biri diğerinin yerini tutmaz.",
      },
      { type: "h3", text: "Sık yapılan hatalar" },
      {
        type: "ul",
        items: [
          "Askıda veya yerde çekilmiş ürün fotoğrafını olduğu gibi yayınlamak.",
          "Ağır hazır tema; telefonda ürün listesi geç açılır, müşteri Instagram'a döner.",
          "Fiyatı gizleyip \"DM'den yazın\" demek; arama ve alışveriş sonuçlarına giremez, müşteriyi yorar.",
          "Instagram'da olan ürünün sitede olmaması ya da tersi; iki vitrin birbirini yalanlar.",
        ],
      },
      { type: "h2", text: "KARNER bu sektör için ne kurar?" },
      {
        type: "ul",
        items: [
          "[AI ürün görseli](/hizmetler/ai-urun-gorseli): mevcut ürün fotoğrafından sanal manken üzerinde gerçekçi try-on görselleri; toplu ve tutarlı katalog üretimi.",
          "[AI video ve reklam](/hizmetler/ai-video-reklam): sezon Reels'i, ürün tanıtım klibi ve kampanya videosu; platforma göre kurgu. Yöntem için [yapay zekâ ile reklam videosu](/yapay-zeka-reklam-videosu) rehberi.",
          "[Web sitesi geliştirme](/hizmetler/web-sitesi-gelistirme): hızlı mobil mağaza vitrini, Instagram entegrasyonu, ürün ve koleksiyon sayfaları; istenirse sipariş katmanı.",
          "[Otomasyon sistemleri](/hizmetler/otomasyon-sistemleri): yeni ürünü siteden Instagram'a taşıma, sezon kampanyası mesaj akışı, gelen DM ve sipariş taleplerini tek listede toplama.",
          "Görünürlük için [SEO / GEO / AEO](/hizmetler/seo-geo-aeo); tüm hizmetler [hizmetler sayfasında](/hizmetler).",
        ],
      },
      {
        type: "p",
        text: "Butikte işe görselden başlarız: en çok satan ürünlerin fotoğrafı try-on görseline dönüştürülür, ilk Reels bu ürünlerle çekilir. Vitrin bu görsellerin üstüne kurulur; Instagram bağı ve otomasyon, butiğin gerçek satış kanalına göre ayarlanır. Sezon kampanyası akışı, ilk koleksiyon yayınlandıktan sonra devreye girer.",
      },
      {
        type: "callout",
        title: "Nereden başlanır?",
        text: "En çok satan 10 ürünün fotoğrafını toplayın; try-on görseli ve ilk Reels bu ürünlerle yapılır, vitrin sonra kurulur.",
      },
    ],
    faq: [
      {
        q: "Sanal manken (try-on) görseli butik için gerçekten işe yarar mı?",
        a: "Giyimde alıcı ürünü üzerinde hayal etmek ister; askıda veya serili fotoğraf bunu vermez. Sanal manken görseli stüdyo, model ve çekim ekibi olmadan katalog görünümü sağlar. Gerçek çekimin yerini tamamen almaz ama askıda çekimin yerini kesinlikle alır; özellikle çok ürünlü butiklerde tutarlılığı kurar.",
      },
      {
        q: "Instagram varken ayrı vitrin sitesine gerek var mı?",
        a: "Instagram keşif kanalıdır, vitrin değil. Kendi vitrininiz ürünü filtrelenebilir, aranabilir ve Google'da bulunur kılar; hesap kapanma ya da erişim düşmesi riskine karşı ürün arşiviniz size ait kalır. İkisi bağlı çalışınca en iyi sonucu verir: Instagram getirir, vitrin satar.",
      },
      {
        q: "AI video ile Reels üretimi nasıl işler?",
        a: "Ürün fotoğrafı veya kısa gerçek çekimden yola çıkılır; yapay zekâ modeliyle hareket ve sahne üretilir, kurgu ve altyazı platforma göre yapılır. Senaryo ve marka dili sizden, üretim bizden. Gerçek çekimle karıştırıldığında en doğal sonucu verir; tamamen yapay görüntü butik için soğuk durabilir.",
      },
      {
        q: "Sezon kampanyası otomasyonu ne yapar?",
        a: "Yeni sezon veya indirim tanımlandığında vitrin başı güncellenir, seçili ürünler sosyal medyaya ve mesaj listesine otomatik gider, gelen talepler tek listede toplanır. Elle tekrarlanan paylaşım işi azalır, kampanya zamanında çıkar; butik sahibi ürünle ilgilenir, paylaşım takvimiyle değil.",
      },
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
];

export function getSector(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}
