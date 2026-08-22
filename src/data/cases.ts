import type { GuideBlock } from "./guides/types";

/**
 * Gerçek işler (proje sayfaları) — /isler/[slug].
 * Kural: yalnızca belgeli, kamuya açık ve doğrulanabilir gerçekler.
 * Müşteri sözü/yorumu, ciro/rakam iddiası, sertifika iddiası YOK.
 * Sıralama/öneri gözlemleri tarihli yazılır ("… tarihli aramada") — arama
 * sonuçları değişkendir, kalıcı iddia gibi sunulmaz.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  location: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  summary: string;
  url?: string;
  image: { src: string; alt: string; width: number; height: number };
  video?: { src: string; poster: string; name: string; description: string; uploadDate: string; duration: string };
  /** Çoklu film galerisi (dikey reklam filmleri vb.) — her biri ayrı VideoObject */
  videos?: { src: string; poster: string; name: string; description: string; uploadDate: string; duration: string }[];
  services: string[];
  stack: string[];
  /** Kısa "sorun → yapılan → sonuç" şeridi */
  facts: { label: string; value: string }[];
  blocks: GuideBlock[];
  faq: { q: string; a: string }[];
  /** Şeffaflık notu (ilişki beyanı vb.) */
  disclosure?: string;
  published: string;
  modified: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "aysa-endustriyel-temizlik",
    client: "AYSA Endüstriyel Temizlik",
    sector: "Endüstriyel baca ve kanal temizliği",
    location: "Marmaris / Muğla",
    title: "AYSA Endüstriyel Temizlik: yerel hizmet sitesi üç arama yüzeyinde",
    seoTitle: "AYSA Endüstriyel Temizlik Web Sitesi ve AI Arama Sonucu | KARNER",
    seoDescription:
      "Marmaris merkezli endüstriyel baca temizliği firması için kurduğumuz site; 'muğla baca temizliği' aramasında ChatGPT, Google AI Bakışı ve organik sonuçlarda nasıl görünür oldu? Ne kurduk, nasıl ölçtük.",
    summary:
      "AYSA için sıfırdan kurduğumuz site (muglabacatemizlik.com), yapısal veri grafiği, yapay zekâ botlarına açık altyapı ve alıntılanabilir hizmet içeriğiyle yayına alındı. Ölçüm tarihindeki aramada firma ChatGPT tarafından önerildi, Google AI Bakışı'nda listelendi ve organik sonuçlarda ikinci sırada yer aldı.",
    url: "https://muglabacatemizlik.com",
    image: { src: "/isler/is-aysa.webp", alt: "AYSA Endüstriyel Temizlik web sitesi ana sayfası", width: 1280, height: 800 },
    video: {
      src: "/isler/aysa-laptop.mp4",
      poster: "/isler/aysa-laptop-poster.jpg",
      name: "AYSA — yapay zekâ aramasında görünürlük ekran kaydı",
      description: "\"muğla baca temizliği\" aramasında ChatGPT, Google AI Bakışı ve organik sonuçların ekran kaydı.",
      uploadDate: "2026-06-25",
      duration: "PT0M30S",
    },
    services: ["web-sitesi-gelistirme", "seo-geo-aeo"],
    stack: ["Astro", "Tailwind CSS", "Cloudflare Workers", "schema.org graph", "llms.txt", "IndexNow"],
    facts: [
      { label: "Başlangıç", value: "Yerel hizmet firması, aramada görünmüyor" },
      { label: "Kurulan", value: "Statik hızlı site + yapısal veri grafiği + AI bot altyapısı" },
      { label: "Gözlem", value: "ChatGPT önerisi · Google AI Bakışı · organik 2. sıra (ölçüm tarihli)" },
    ],
    blocks: [
      { type: "h2", text: "Sorun neydi?" },
      {
        type: "p",
        text: "AYSA, Marmaris merkezli bir endüstriyel baca ve havalandırma kanalı temizliği firması. Müşterileri oteller, restoranlar ve tesisler; bu müşteriler hizmeti çoğunlukla arama motorundan ve giderek yapay zekâ araçlarından buluyor. Firmanın aramada görünür bir varlığı yoktu.",
      },
      { type: "h2", text: "Ne kurduk?" },
      {
        type: "ul",
        items: [
          "**Statik, hızlı site** — Astro ile üretilen sayfalar Cloudflare Workers üzerinde yayınlandı; kritik içerik JavaScript'e bağımlı değil, yapay zekâ botları ham HTML'de tam metni okur.",
          "**Hizmet sayfaları** — her hizmet için ayrı sayfa; tanım kutusu, soru biçimli başlıklar ve doğrudan cevap cümleleri. Ana hizmet için bir rehber (pillar) sayfa.",
          "**Yapısal veri grafiği** — Organization/LocalBusiness, Service, FAQPage, HowTo, BreadcrumbList ve ImageObject düğümleri @id ile birbirine bağlı tek graph olarak kuruldu.",
          "**Yapay zekâ araması altyapısı** — robots.txt'te AI botlarına açık izin, llms.txt ve llms-full.txt, IndexNow ile Bing/Yandex'e anlık bildirim.",
          "**Saha fotoğrafı** — stok görsel yerine firmanın gerçek iş fotoğrafları; görsel dosyaları lisans ve telif bilgisiyle işaretlendi.",
          "**Kaynak gösterme** — ilgili standart ve mevzuat adları içerikte ve schema'da atıf olarak yer aldı.",
        ],
      },
      { type: "h2", text: "Nasıl ölçtük, ne gördük?" },
      {
        type: "p",
        text: "Ölçümü aynı sorguyu üç yüzeyde sorarak yaptık: ChatGPT, Google AI Bakışı ve klasik organik sonuçlar. Ekran kaydı bu sayfada. **Ölçüm tarihindeki \"muğla baca temizliği\" aramasında ChatGPT firmayı önerdi, Google AI Bakışı tercih edilen firmalar arasında listeledi, organik sonuçlarda site ikinci sıradaydı.** Arama sonuçları zamanla değişir; bu nedenle sonuç tarihli bir gözlem olarak sunulur, kalıcı bir sıralama vaadi değildir.",
      },
      { type: "h2", text: "Bu işten ne öğrendik?" },
      {
        type: "ul",
        items: [
          "Yerel ve niş bir hizmette içerik + yapısal veri + bot erişimi üçlüsü, dış bağlantı yatırımı olmadan da yapay zekâ araçlarının kaynak listesine girebiliyor.",
          "Google Business Profile ve dizin kayıtları gibi site dışı sinyaller işin ikinci yarısı; bunlar işletme tarafının katılımını gerektiriyor.",
          "Her sayfada tek konu, her paragrafta tek iddia: yapay zekâ araçları kısa ve bağımsız okunabilen pasajları alıntılıyor.",
        ],
      },
      {
        type: "callout",
        title: "İlgili rehber",
        text: "Bu yaklaşımın mantığını [Yapay Zekâ Aramasında Görünmek](/yapay-zeka-aramasinda-gorunmek) rehberinde, hizmet kapsamını [SEO / GEO / AEO](/hizmetler/seo-geo-aeo) sayfasında anlattık.",
      },
    ],
    faq: [
      {
        q: "Bu sonuç her yerel firmada tekrarlanır mı?",
        a: "Koşullar benzerse tekrarlanabilir: niş ve yerel bir hizmet, botlara açık hızlı site, tutarlı işletme kimliği ve alıntılanabilir içerik. Rekabeti yüksek ulusal aramalarda aynı çalışma tek başına yetmez; orada site dışı sinyaller de gerekir. Bu yüzden bu sayfada sonucu tarihli gözlem olarak veriyoruz.",
      },
      {
        q: "Site hangi teknolojiyle yapıldı?",
        a: "Astro ile statik üretilen sayfalar Cloudflare Workers üzerinde yayınlanıyor. Yapısal veri JSON-LD olarak, yapay zekâ araçları için llms.txt ve llms-full.txt ayrıca üretiliyor. İçerik güncellendiğinde IndexNow ile Bing ve Yandex'e anında bildirim gidiyor.",
      },
      {
        q: "Ekran kaydındaki arama ne zaman yapıldı?",
        a: "Kayıt, sitenin yayına alınmasından sonraki ölçüm turunda yapıldı; videonun yükleme tarihi sayfanın yapısal verisinde yer alıyor. Arama sonuçları ve yapay zekâ önerileri zamanla değişebilir.",
      },
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
  {
    slug: "bns-enerji-dogalgaz",
    client: "BNS Enerji & Doğalgaz",
    sector: "Doğalgaz iç tesisat, kombi, klima, ısı pompası",
    location: "Polatlı / Ankara",
    title: "BNS Enerji & Doğalgaz: Polatlı'da doğalgaz firması araması için site",
    seoTitle: "BNS Enerji & Doğalgaz Web Sitesi ve Yerel Arama Sonucu | KARNER",
    seoDescription:
      "Polatlı'da doğalgaz tesisatı, kombi ve klima hizmeti veren BNS için kurduğumuz Astro site: 36 soruluk SSS, yapısal veri, AI bot erişimi ve 'Polatlı doğalgaz firması' aramasındaki ölçüm.",
    summary:
      "BNS için editoryal tasarımlı, 15 sayfalık statik bir site kurduk (bnsenerjidogalgaz.com): hizmet ve ürün sayfaları, 36 soruluk SSS, yapısal veri grafiği ve yapay zekâ botlarına açık altyapı. Ölçüm tarihinde ChatGPT'ye sorulan \"Polatlı doğalgaz firması\" sorusunda BNS ilk sırada önerildi.",
    url: "https://bnsenerjidogalgaz.com",
    image: { src: "/isler/is-bns.webp", alt: "BNS Enerji & Doğalgaz web sitesi ana sayfası", width: 1280, height: 800 },
    services: ["web-sitesi-gelistirme", "seo-geo-aeo", "marka-grafik-tasarim"],
    stack: ["Astro", "Cloudflare Workers", "schema.org graph", "FAQPage", "llms.txt", "IndexNow"],
    facts: [
      { label: "Başlangıç", value: "Eski WordPress site, yerel aramada zayıf" },
      { label: "Kurulan", value: "15 sayfa editoryal site + ürün sayfaları + 36 soruluk SSS" },
      { label: "Gözlem", value: "ChatGPT 'Polatlı doğalgaz firması' sorusunda 1. öneri (ölçüm tarihli)" },
    ],
    blocks: [
      { type: "h2", text: "Sorun neydi?" },
      {
        type: "p",
        text: "BNS, Polatlı'da doğalgaz iç tesisat projelendirme ve montajı, kombi, klima ve ısı pompası işleri yapan yetkili bir firma. Mevcut WordPress sitesi yavaştı, hizmetleri arama niyetine göre ayrılmamıştı ve yapay zekâ araçları firmayı tanımıyordu. Müşteri ilçe ölçeğinde \"Polatlı + hizmet\" biçiminde arıyor.",
      },
      { type: "h2", text: "Ne kurduk?" },
      {
        type: "ul",
        items: [
          "**Editoryal tasarım** — gerçek dükkân fotoğrafıyla açılan hero, hizmetleri ev kesiti illüstrasyonuyla anlatan özgün bir bölüm; stok görsel yok.",
          "**Hizmet ve ürün sayfaları** — doğalgaz tesisatı, kombi, klima, ısı pompası ve VRF için ayrı sayfalar; ürünlerde Product schema.",
          "**36 soruluk SSS** — soru biçimli başlıklar, kısa doğrudan cevaplar, FAQPage schema ve Speakable işaretlemesi.",
          "**Yapısal veri grafiği** — LocalBusiness/Organization, Service, Product, FAQPage, BreadcrumbList ve lisans bilgili ImageObject düğümleri.",
          "**Yapay zekâ araması altyapısı** — AI botlarına açık robots.txt, llms.txt ve llms-full.txt içinde firmanın yetki bilgisi ve dağıtım şirketi kaynağı; IndexNow.",
          "**Yetki bilgisinin görünür olması** — dağıtım şirketinin sertifikalı firma listesindeki kayıt, içerikte ve llms.txt'te kaynak gösterildi.",
        ],
      },
      { type: "h2", text: "Ne gördük?" },
      {
        type: "p",
        text: "**Ölçüm tarihinde ChatGPT'ye \"Polatlı doğalgaz firması\" sorulduğunda BNS ilk sırada önerildi ve site bağlantısıyla listelendi.** Aynı gün sabah yapılan ön testte firma hiç görünmüyordu; aradaki dönemde yetki bilgisi kaynak gösterildi, llms.txt ve llms-full.txt yeniden yazıldı ve değişiklikler IndexNow ile bildirildi. Bu gözlem tarihlidir; yapay zekâ araçlarının cevapları değişebilir.",
      },
      { type: "h2", text: "Bu işten ne öğrendik?" },
      {
        type: "ul",
        items: [
          "Yapay zekâ araçları, resmi bir kaynakta (dağıtım şirketi listesi gibi) doğrulanabilen işletmeleri daha güvenle öneriyor: site bu kaynağa açıkça atıf verdiğinde \"tanınan işletme\" etkisi oluşuyor.",
          "Hizmet başına ayrı sayfa ve soru biçimli SSS, hem Google'ın zengin sonuçları hem de yapay zekâ alıntıları için aynı anda çalışıyor.",
          "Tasarım ve arama görünürlüğü ayrı işler değil: hızlı açılan, az JavaScript'li editoryal sayfa her iki hedefe birden hizmet ediyor.",
        ],
      },
      {
        type: "callout",
        title: "İlgili rehber",
        text: "Yapay zekâ araçlarının firmaları neye göre önerdiğini [ChatGPT firmamı neden önermiyor?](/rehber/chatgpt-firmami-neden-onermiyor) rehberinde adım adım anlattık.",
      },
    ],
    faq: [
      {
        q: "Sitede kaç sayfa var, neden bu kadar?",
        a: "On beş sayfa: ana sayfa, hizmet sayfaları, ürünler, hakkında, iletişim ve SSS. Her sayfa farklı bir arama niyetine cevap veriyor; aynı içeriği mahalle adlarıyla çoğaltan \"kapı sayfası\" yaklaşımı bilinçli olarak kullanılmadı.",
      },
      {
        q: "Ölçümde neden aynı gün fark görüldü?",
        a: "Arama tabanlı yapay zekâ araçları cevap üretirken güncel web sonuçlarını ve sitenin llms.txt gibi makine-okunur dosyalarını çeker. Yetki kaynağının ve işletme kimliğinin netleştirilmesi aracın firmayı doğrulamasını kolaylaştırdı. Yine de bu tek bir tarihli gözlemdir; kalıcı sıralama anlamına gelmez.",
      },
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
  {
    slug: "bns-enerji-klima-reklam-filmleri",
    client: "BNS Enerji & Doğalgaz",
    sector: "Klima satışı — yapay zekâ reklam filmleri",
    location: "Polatlı / Ankara",
    title: "BNS Enerji: klima sezonu için dört dikey yapay zekâ reklam filmi",
    seoTitle: "BNS Enerji Klima Reklam Filmleri — Yapay Zekâ ile Üretilen Dikey Reels | KARNER",
    seoDescription:
      "Polatlı'da Bosch klima satan BNS Enerji için Instagram Reels ve WhatsApp Durumu'na göre üretilen dört dikey reklam filmi: gerçek ürün görseli, yapay zekâ ile üretilen sahneler, FFmpeg montaj ve marka kapanış kartı.",
    summary:
      "BNS Enerji'nin klima sezonu için, stüdyo çekimi olmadan dört dikey reklam filmi ürettik: yapay zekâ ile üretilen sahneler, BNS'in sattığı Bosch klimanın gerçek ürün görseli, yazı ve müzikle kurulan anlatım, her filmde aynı marka kapanış kartı. Filmler Instagram Reels ve WhatsApp Durumu için 9:16 hazırlandı.",
    url: "https://bnsenerjidogalgaz.com",
    image: { src: "/isler/is-bns-reklam.webp", alt: "BNS Enerji için üretilen dört dikey reklam filminden kareler", width: 1280, height: 800 },
    videos: [
      {
        src: "/isler/bns-reklam/uyku.mp4",
        poster: "/isler/bns-reklam/uyku-poster.jpg",
        name: "Sıcak uyutmuyor — bölünmüş ekran reklam filmi",
        description: "Sıcakta uyuyamayan ve klimalı odada uyuyan aynı kişi; hareketli yazıyla 'Serin uykunun adresi belli: BNS Enerji' kapanışı.",
        uploadDate: "2026-07-18",
        duration: "PT17S",
      },
      {
        src: "/isler/bns-reklam/krem.mp4",
        poster: "/isler/bns-reklam/krem-poster.jpg",
        name: "Klima almanın tam zamanı — ürün vurgulu film",
        description: "Servis yoğunluğu başlamadan ve fiyatlar güncellenmeden önce klima almayı anlatan film; BNS'in sattığı Bosch klimanın gerçek görseli krem duvarda yeniden sahnelendi.",
        uploadDate: "2026-06-06",
        duration: "PT19S",
      },
      {
        src: "/isler/bns-reklam/amber.mp4",
        poster: "/isler/bns-reklam/amber-poster.jpg",
        name: "Bu sıcağa katlanmayın — sorun-çözüm filmi",
        description: "Sıcak odada bunalan, BNS'i arayan ve klimasına kavuşan kişi; ürün sahnesi odanın sıcak tonuyla eşleştirildi.",
        uploadDate: "2026-06-06",
        duration: "PT21S",
      },
      {
        src: "/isler/bns-reklam/buz.mp4",
        poster: "/isler/bns-reklam/buz-poster.jpg",
        name: "Klima sezonu başladı — buz kırılma teaser'ı",
        description: "Buzun içinden çıkan Bosch klima ve 'BNS Enerji hazır, sen yaza hazır mısın?' yazıları; koyu mavi kapanış kartı.",
        uploadDate: "2026-06-06",
        duration: "PT12S",
      },
    ],
    services: ["ai-video-reklam", "sosyal-medya-icerik-yonetimi"],
    stack: ["Veo 3 (Flow)", "Kling (görüntüden video)", "Flux Kontext (ürün sahneleme)", "Adobe Firefly", "FFmpeg montaj", "Telifsiz müzik (Mixkit)"],
    facts: [
      { label: "Başlangıç", value: "Klima sezonu için sosyal medyaya video gerekiyordu; çekim ekibi ve stüdyo yoktu" },
      { label: "Kurulan", value: "4 dikey reklam filmi (12-21 sn) — yapay zekâ sahneleri + gerçek ürün görseli + ortak kapanış kartı" },
      { label: "Kullanım", value: "Instagram Reels ve WhatsApp Durumu için 9:16; her film tek başına yayınlanabilir" },
    ],
    blocks: [
      { type: "h2", text: "İhtiyaç neydi?" },
      {
        type: "p",
        text: "BNS Enerji Polatlı'da Bosch klima satıyor; sezon başında sosyal medyada ürünü ve doğru zamanlamayı anlatan kısa videolar gerekiyordu. Gerçek çekim yapacak ekip, oyuncu ve stüdyo yoktu. Hedef: telefonda izlenen, ilk saniyede tutan, ürünü doğru gösteren dikey filmler.",
      },
      { type: "h2", text: "Ne ürettik?" },
      {
        type: "ul",
        items: [
          "**Dört ayrı film, dört ayrı açı** — bölünmüş ekran (sıcak/serin uyku), ürün vurgusu (\"Klima almanın tam zamanı\"), sorun-çözüm hikâyesi (bunalan kişi BNS'i arıyor) ve buz kırılma teaser'ı.",
          "**Gerçek ürün, yapay zekâ sahne** — BNS'in sattığı Bosch klimanın gerçek fotoğrafı korunarak yapay zekâ ile yeniden sahnelendi (krem ve sıcak tonlu duvar), sonra görüntüden videoya dönüştürüldü; logo ve ürün formu bozulmadı.",
          "**İnsanlı sahnelerde tutarlılık** — her filmde tek karakter ve tek mekân; farklı filmlerdeki kişiler karıştırılmadı.",
          "**Yazı ve müzikle anlatım** — seslendirme yok; kısa, düz reklam cümleleri (\"Servis yoğunluğu başlamadan\", \"Bu sıcağa katlanmayın\") ve telifsiz müzik.",
          "**Ortak kapanış kartı** — BNS logosu, telefon ve site adresiyle her filmde aynı marka kapanışı; abartılı iddia ve fiyat yok.",
          "**Montaj** — geçişler, yazı animasyonları, ses miksajı ve 9:16 teslim FFmpeg ile; yapay zekâ araçlarının filigranları temizlendi, BNS logosu bindirildi.",
        ],
      },
      { type: "h2", text: "Neye dikkat ettik?" },
      {
        type: "ul",
        items: [
          "Yapay zekâ görüntülerinde en çok göze batan hatalar (eriyen el, uçuşan perde, bozulan logo) için her klip tek tek elendi; zayıf klipler filme girmedi.",
          "Reklam dili sakin tutuldu: \"hemen al, fırsat kaçırma\" yerine gerçek gerekçe — servis sırası ve fiyat güncellemesi.",
          "Yetki ve sertifika ifadeleri doğrulanmadan yazılmadı; kapanış kartında yalnızca marka, telefon ve site var.",
        ],
      },
      {
        type: "callout",
        title: "İlgili iş ve hizmet",
        text: "BNS için kurduğumuz web sitesi ve yapay zekâ aramasındaki gözlem için [BNS Enerji & Doğalgaz web sitesi](/isler/bns-enerji-dogalgaz) sayfasına, hizmetin kapsamı için [Yapay Zekâ Video & Reklam](/hizmetler/ai-video-reklam) sayfasına bakabilirsiniz.",
      },
    ],
    faq: [
      {
        q: "Videolardaki insanlar ve mekânlar gerçek mi?",
        a: "Hayır; insanlı sahneler ve odalar yapay zekâ ile üretildi. Ürün ise gerçek: BNS'in sattığı Bosch klimanın fotoğrafı korunarak sahnelendi. İzleyiciyi yanıltmamak için filmlerde abartılı iddia ve fiyat yazılmadı.",
      },
      {
        q: "Neden dikey (9:16) ve bu kadar kısa?",
        a: "Filmler Instagram Reels ve WhatsApp Durumu için hazırlandı; telefonda dikey izlenir ve ilk saniyelerde tutmazsa geçilir. Her film 12-21 saniye aralığında, tek fikir anlatıyor.",
      },
      {
        q: "Seslendirme neden yok?",
        a: "Sosyal medyada videolar çoğunlukla sessiz izlendiği için anlatım yazıyla kuruldu; müzik ve ortam sesi destekliyor. İstenirse Türkçe seslendirme eklenebilir.",
      },
      {
        q: "Benzer filmler başka sektörler için de üretilebilir mi?",
        a: "Evet. Aynı akış — gerçek ürün/mekân görseli + yapay zekâ sahne + yazı ve müzik + marka kapanışı — yerel hizmet, ürün satışı ve kampanya duyuruları için uygulanabilir. Kapsam için Yapay Zekâ Video & Reklam hizmet sayfasına bakın.",
      },
    ],
    published: "2026-08-22",
    modified: "2026-08-22",
  },
  {
    slug: "colakoglu-emlak",
    client: "Çolakoğlu Emlak",
    sector: "Gayrimenkul danışmanlığı",
    location: "Menteşe / Muğla",
    title: "Çolakoğlu Emlak: ilan portföyü yapısal veriyle aranabilir emlak sitesi",
    seoTitle: "Çolakoğlu Emlak Web Sitesi: İlan Portföyü ve Yerel Arama | KARNER",
    seoDescription:
      "Muğla'da 1994'ten beri faaliyet gösteren Çolakoğlu Emlak için kurduğumuz site: ilan detay sayfaları, Offer/RealEstateListing yapısal verisi, kiralandı/satıldı akışı, İngilizce alıcı rehberi ve IndexNow.",
    summary:
      "Çolakoğlu Emlak için ilan portföyünü tek kaynaktan yöneten statik bir site kurduk (colakogluemlak48.com): her ilan kendi sayfası ve yapısal verisiyle, kiralanan ilan otomatik arşive düşüyor, yabancı alıcılar için İngilizce rehber sayfası var. Site Cloudflare üzerinde yayında ve IndexNow ile anında bildiriliyor.",
    url: "https://colakogluemlak48.com",
    image: { src: "/isler/is-colakoglu.webp", alt: "Çolakoğlu Emlak web sitesi ana sayfası", width: 1280, height: 800 },
    services: ["web-sitesi-gelistirme", "seo-geo-aeo"],
    stack: ["Astro", "Cloudflare", "Offer / RealEstateListing schema", "IndexNow", "Google Business Profile"],
    facts: [
      { label: "Başlangıç", value: "Erişilemeyen eski site, sahiplenilmemiş Haritalar kaydı, aranabilir ilan adresi yok" },
      { label: "Kurulan", value: "İlan sistemi + detay sayfaları + yapısal veri + EN alıcı rehberi" },
      { label: "Sürdürülen", value: "İlan ekleme/kapama, Haritalar kaydı sahiplenme süreci, IndexNow bildirimi" },
    ],
    blocks: [
      { type: "h2", text: "Sorun neydi?" },
      {
        type: "p",
        text: "Çolakoğlu Emlak, Muğla Menteşe'de 1994'ten beri faaliyet gösteren bir emlak ofisi. Eski site erişilemez durumdaydı, ilanların aranabilir bir adresi yoktu ve Google Haritalar'daki kayıt sahiplenilmemişti. Alıcılar \"Muğla satılık daire\", \"Menteşe kiralık büro\" gibi niyetlerle arıyor; yabancı alıcılar İngilizce bilgi istiyor.",
      },
      { type: "h2", text: "Ne kurduk?" },
      {
        type: "ul",
        items: [
          "**İlan sistemi** — tek veri dosyasından üretilen ilan kartları ve detay sayfaları; fotoğraf galerisi, özellik tablosu, konum bilgisi.",
          "**Yapısal veri** — her ilanda Offer ve gayrimenkul ilanı işaretlemesi; ofis için LocalBusiness/RealEstateAgent düğümü ve kırıntı.",
          "**Kiralandı / satıldı akışı** — kapanan ilan listede sona düşer, fiyat ve teklif verisi kaldırılır, kartta durum rozeti görünür; mevcut olmayan teklife fiyat gösterilmez.",
          "**İngilizce alıcı rehberi** — Türkiye'de mülk alım sürecini anlatan ayrı sayfa; yabancı alıcı sorgularına cevap verir.",
          "**Yayın ve bildirim** — Cloudflare üzerinde statik yayın, içerik değişince IndexNow ile arama motorlarına anında bildirim.",
          "**Site dışı kimlik** — mevcut Haritalar kaydı için sahiplenme sürecinin başlatılması ve işletme hesaplarının işletme adına açılması.",
        ],
      },
      { type: "h2", text: "Nasıl ilerliyor?" },
      {
        type: "p",
        text: "Bu bir teslim-et-çekil projesi değil: yeni ilanlar geldikçe sayfa açılıyor, kiralananlar kapanıyor, fiyat değişiklikleri tek yerden güncelleniyor ve her değişiklik arama motorlarına bildiriliyor. **Emlakta arama görünürlüğünün yarısı sitenin kendisi, diğer yarısı güncel tutulan ilan akışı ve Haritalar kaydıdır.**",
      },
      {
        type: "callout",
        title: "Sektör sayfası",
        text: "Emlak ofisleri için dijital ihtiyaçları [emlak sektör sayfasında](/sektor/emlak) topladık.",
      },
    ],
    faq: [
      {
        q: "İlanlar bir panelden mi giriliyor?",
        a: "İlanlar tek bir veri dosyasında tutuluyor; yeni ilan eklendiğinde detay sayfası, kart, yapısal veri ve site haritası otomatik üretiliyor. Ofis sahibi fotoğraf ve bilgileri iletiyor, yayın ve bildirim adımlarını biz yürütüyoruz. İstenirse aynı yapı bir yönetim paneline bağlanabilir.",
      },
      {
        q: "Kiralanan ilan neden silinmiyor?",
        a: "Silmek yerine kapatılıyor: ilan sayfası kısa süre arşivde kalır, fiyat ve teklif bilgisi kaldırılır, durum rozeti gösterilir. Böylece arama motorunda kırık bağlantı oluşmaz ve mevcut olmayan bir teklif fiyatla gösterilmez.",
      },
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
  {
    slug: "dukkan-takip-telegram-botu",
    client: "Dükkân Takip (iç kullanım)",
    sector: "Yerel hizmet işletmesi — iş takibi",
    location: "Polatlı / Ankara",
    title: "Dükkân Takip: Telegram'dan sesli/yazılı mesajla iş takip botu",
    seoTitle: "Dükkân Takip: Telegram + Google Sheets İş Takip Botu Projesi | KARNER",
    seoDescription:
      "Küçük bir hizmet işletmesinin tahsilat, usta ödemesi ve hatırlatmalarını Telegram mesajıyla kaydeden n8n botu: doğal dil anlama, Google Sheets kayıt, günlük/haftalık rapor komutları.",
    summary:
      "Bir hizmet işletmesinin üç kişilik ekibi için n8n üzerinde Telegram botu kurduk: \"Ahmet 500 nakit ödedi\" gibi yazılı ya da sesli mesaj, dil modeliyle anlaşılıp Google Sheets'e işleniyor; hatırlatmalar, usta ve müteahhit ödemeleri ayrı sekmelerde tutuluyor; komutlarla günlük ve haftalık rapor alınıyor.",
    image: { src: "/isler/dukkan-takip-poster.jpg", alt: "Dükkân Takip Telegram botu ekran görüntüsü", width: 1280, height: 720 },
    video: {
      src: "/isler/dukkan-takip.mp4",
      poster: "/isler/dukkan-takip-poster.jpg",
      name: "Dükkân Takip botu — kullanım ekran kaydı",
      description: "Telegram üzerinden mesajla kayıt ve rapor komutlarının ekran kaydı.",
      uploadDate: "2026-06-30",
      duration: "PT0M52S",
    },
    services: ["otomasyon-sistemleri"],
    stack: ["n8n (self-host)", "Telegram Bot API", "LLM (doğal dil anlama)", "Google Sheets", "Railway"],
    facts: [
      { label: "Başlangıç", value: "Elle tutulan Excel, ödeme ve hatırlatma kayıtları dağınık" },
      { label: "Kurulan", value: "Telegram botu + LLM + Google Sheets, 130'dan fazla düğümlü n8n akışı" },
      { label: "Kullanım", value: "3 kişilik ekip, yazılı/sesli kayıt, rapor komutları, yetki kontrolü" },
    ],
    blocks: [
      { type: "h2", text: "Sorun neydi?" },
      {
        type: "p",
        text: "Küçük bir hizmet işletmesinde tahsilatlar, usta ve müteahhit ödemeleri ve müşteri hatırlatmaları elle tutulan tablolarda dağınıktı. Ekip sahadaydı; bilgisayar başına geçip kayıt girmek ertelenince kayıt eksik kalıyordu. İhtiyaç: telefondan tek mesajla kayıt, komutla rapor.",
      },
      { type: "h2", text: "Ne kurduk?" },
      {
        type: "ol",
        items: [
          "**Telegram botu** — ekip üyeleri bota yazıyor ya da sesli mesaj bırakıyor; yetkisiz kullanıcılar yalnızca kimlik komutunu görebiliyor.",
          "**Doğal dil anlama** — dil modeli mesajı tipine ayırıyor: tahsilat, usta ödemesi, müteahhit ödemesi, hatırlatma ya da rapor sorgusu; tutar, kişi, ödeme şekli ve notu alanlara çıkarıyor.",
          "**Google Sheets kayıt** — çok sekmeli tek tablo: ödemeler, hatırlatmalar, ekip, işlem geçmişi, usta ve müteahhit ödemeleri.",
          "**Komutlar** — /bugun, /haftalik, /liste, /borc, /ara, /aktivite ve doğal dilde \"bugün kim ne yaptı?\" gibi rapor soruları.",
          "**Hatırlatma akışı** — tarihli hatırlatmalar zamanında bildirilir, ertelenebilir; erteleme sayısı takip edilir.",
        ],
      },
      { type: "h2", text: "Neden n8n ve Telegram?" },
      {
        type: "p",
        text: "n8n kendi sunucumuzda çalışıyor; veri işletmenin kendi Google hesabındaki tabloda kalıyor, aylık kullanıcı başına lisans yok. Telegram botu kurulum için onay süreci gerektirmiyor ve sesli mesaj desteği hazır. **Sonuç: ekip sahadan mesaj atıyor, tablo kendi kendine doluyor, rapor tek komutla geliyor.**",
      },
      { type: "h2", text: "Bu işten ne öğrendik?" },
      {
        type: "ul",
        items: [
          "Otomasyonun zor kısmı teknik değil, kayıt disiplinini ekibin alışkanlığına bağlamak: mesaj atmak tablo açmaktan kolaysa sistem kullanılıyor.",
          "Doğal dil anlamada açık şema (tip + alanlar) ve hatalı mesajda kibar geri sorma, kayıt kalitesini belirliyor.",
          "Aynı iskelet; randevu hatırlatma, fiş/fatura okuma veya alacak takibi gibi senaryolara küçük değişikliklerle uyarlanıyor.",
        ],
      },
      {
        type: "callout",
        title: "İlgili rehber",
        text: "Benzer senaryoları [küçük işletme için otomasyon örnekleri](/rehber/kucuk-isletme-icin-otomasyon-ornekleri) rehberinde topladık; hizmet kapsamı [Otomasyon Sistemleri](/hizmetler/otomasyon-sistemleri) sayfasında.",
      },
    ],
    faq: [
      {
        q: "Veriler nerede tutuluyor?",
        a: "İşletmenin kendi Google hesabındaki bir Google Sheets tablosunda. n8n akışı yalnızca bu tabloya yazıp okuyor; üçüncü bir veri tabanı yok. Bot kapatılsa bile tablo işletmede kalır.",
      },
      {
        q: "Aynı bot başka bir işletmeye kurulabilir mi?",
        a: "Evet. Akış şablon olarak duruyor; sekme yapısı, komutlar ve yetkili kişi listesi işletmeye göre düzenleniyor. WhatsApp istenirse kanal değişir, mantık aynı kalır; WhatsApp tarafında Meta onay süreci ayrıca gerekir.",
      },
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
