/**
 * Hizmet paketleri — /paketler sayfası + llms-full + asistan bilgi tabanı.
 *
 * Kural (Sude, 2026-08-20): FİYAT YAZILMAZ. Her hizmet kategorisi için
 * kapsamı ayrıntılı paketler; net teklif keşif sonrası yazılı verilir.
 * Süre garantisi, sonuç yüzdesi, müşteri sözü yok. Adet/sayfa sayısı gibi
 * kapsam sınırları yazılabilir (teklif çerçevesidir, iddia değildir).
 */
export type PackageTier = {
  slug: string;
  name: string;
  tagline: string;
  audience: string;
  includes: string[];
  excludes: string[];
  guarantee?: { yes: string[]; no: string[] };
  highlight?: boolean;
};

export type PackageCategory = {
  slug: string;
  /** hizmetler/[slug] */
  serviceSlug: string;
  name: string;
  intro: string;
  tiers: PackageTier[];
};

export const PACKAGE_CATEGORIES: PackageCategory[] = [
  {
    slug: "web-sitesi",
    serviceSlug: "web-sitesi-gelistirme",
    name: "Web sitesi",
    intro:
      "Üç hedef, üç paket: internette görünür olmak, bölgesinde öne çıkmak, kategoriyi kapatmak. Hepsinde ortak: kendi domaininiz, hızlı açılış, yapısal veri ve yapay zekâ botlarına açık altyapı teslimin parçası.",
    tiers: [
      {
        slug: "vitrin",
        name: "Vitrin",
        tagline: "Müşterin seni Google'da aradığında bulacağı profesyonel bir yüz.",
        audience: "Dükkânı olan ama internette görünmeyen esnaf: kuaför, butik, oto bakım, güzellik merkezi.",
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
    ],
  },
  {
    slug: "mobil-uygulama",
    serviceSlug: "mobil-uygulama",
    name: "Mobil uygulama",
    intro:
      "Expo (React Native) ile tek kod tabanından iOS ve Android. Paketler uygulamanın büyüklüğüne göre değil, iş modeline göre ayrılır: fikri doğrulamak, kullanıcı büyütmek, operasyonu taşımak.",
    tiers: [
      {
        slug: "mvp",
        name: "MVP",
        tagline: "Fikri mağazada gerçek kullanıcıyla doğrula.",
        audience: "İlk sürümünü çıkarmak isteyen girişim veya iç kullanım uygulaması isteyen işletme.",
        includes: [
          "Keşif ve ekran akışı: 5–8 ana ekran, tek kullanıcı rolü",
          "Expo ile iOS + Android tek kod tabanı",
          "Supabase backend: kimlik doğrulama, veri tabanı, dosya depolama",
          "Temel yönetim paneli (kayıt görüntüleme ve düzenleme)",
          "TestFlight / Google Play iç test dağıtımı",
          "App Store ve Google Play yayın hazırlığı (mağaza sayfası, gizlilik politikası, ekran görüntüleri)",
          "1 revizyon turu",
        ],
        excludes: ["Ödeme altyapısı", "Çok dilli yapı", "Çevrim dışı senkronizasyon", "Mağaza hesabı ücretleri (size aittir)"],
      },
      {
        slug: "buyume",
        name: "Büyüme",
        tagline: "Kullanıcıyı tut, ölç, geri getir.",
        audience: "MVP'si çalışan ve kullanıcı tabanını büyütmek isteyen ürün.",
        includes: [
          "MVP kapsamının tamamı",
          "Anlık bildirimler (push) ve bildirim kampanyaları",
          "Çoklu kullanıcı rolü ve yetki yapısı",
          "Uygulama içi ödeme veya abonelik (App Store / Google Play faturalandırma)",
          "Analitik ve çökme takibi kurulumu",
          "Gelişmiş yönetim paneli: filtre, dışa aktarma, içerik yönetimi",
          "Derin bağlantı (deep link) ve paylaşım akışları",
          "2 revizyon turu",
        ],
        excludes: ["Üçüncü taraf ERP/CRM entegrasyonu", "Özel donanım entegrasyonu"],
        highlight: true,
      },
      {
        slug: "kurumsal",
        name: "Kurumsal",
        tagline: "Operasyonu uygulamaya taşı, sistemlerle konuştur.",
        audience: "Saha ekibi, bayi ağı veya çoklu şube yöneten işletme.",
        includes: [
          "Büyüme kapsamının tamamı",
          "Mevcut sistemlerle entegrasyon: muhasebe, CRM, ERP veya özel API",
          "Çevrim dışı çalışma ve senkronizasyon",
          "Çok dilli arayüz",
          "Kurumsal dağıtım seçenekleri (özel mağaza listesi / MDM)",
          "Dokümantasyon ve ekip eğitimi",
          "Bakım ve sürüm takibi planı",
        ],
        excludes: ["Donanım tedariki", "7/24 çağrı merkezi desteği"],
      },
    ],
  },
  {
    slug: "ai-video-reklam",
    serviceSlug: "ai-video-reklam",
    name: "AI video & reklam",
    intro:
      "Senaryo ve marka dili insan eliyle; görüntü Veo, Kling gibi modellerle. Paketler tek içerikten aylık üretim ritmine ve kampanya filmine kadar gider. Her pakette altyazı, dikey/yatay kesimler ve yayın formatına uygun çıktı teslim edilir.",
    tiers: [
      {
        slug: "tek-reel",
        name: "Tek Reel",
        tagline: "Bir fikir, bir video, yayında.",
        audience: "Ürün lansmanı, kampanya duyurusu veya ilk deneme için tek içerik isteyen işletme.",
        includes: [
          "Kısa brief görüşmesi ve tek vaatli senaryo",
          "15–30 saniyelik dikey video (Reels / Shorts / TikTok)",
          "AI görüntü üretimi + kurgu + müzik + altyazı",
          "Marka kapanış kartı ve CTA",
          "1 revizyon turu",
          "Yayın formatında teslim (9:16) + kare kesim (1:1)",
        ],
        excludes: ["Seslendirme (opsiyonel eklenir)", "Oyuncu/mekân çekimi", "Reklam yayını yönetimi"],
      },
      {
        slug: "aylik-icerik",
        name: "Aylık İçerik",
        tagline: "Her hafta bir video, hesabın boş kalmasın.",
        audience: "Sosyal medyada düzenli görünmek isteyen ama içerik üretmeye vakti olmayan işletme.",
        includes: [
          "Aylık içerik planı (tema, kanca, yayın sırası)",
          "Ayda 4 kısa video (15–30 sn) — senaryo + AI üretim + kurgu + altyazı",
          "Her videoya kapak görseli ve açıklama metni",
          "Aylık 2 revizyon hakkı (toplam)",
          "Ay sonu kısa performans notu (izlenme, izlenme süresi)",
        ],
        excludes: ["Günlük hikâye/story içeriği", "Yorum ve DM yönetimi", "Reklam bütçesi"],
        highlight: true,
      },
      {
        slug: "kampanya",
        name: "Kampanya Filmi",
        tagline: "Bir hikâye, tüm mecralara kesimleri.",
        audience: "Ürün/hizmet lansmanı veya sezon kampanyası yapan marka.",
        includes: [
          "Kampanya brief'i, mesaj hiyerarşisi ve storyboard",
          "30–60 saniyelik ana film (yatay) + 3 kısa kesim (dikey, kare, 6 sn bumper)",
          "AI görüntü üretimi, profesyonel kurgu, renk düzeni, ses tasarımı",
          "Türkçe seslendirme (AI veya seslendirmen seçeneği)",
          "Marka tutarlılığı: logo animasyonu, tipografi, renk",
          "2 revizyon turu",
        ],
        excludes: ["Reklam yayını ve bütçe yönetimi", "Gerçek oyuncu/mekân çekimi (istenirse ayrı planlanır)"],
      },
    ],
  },
  {
    slug: "ai-urun-gorseli",
    serviceSlug: "ai-urun-gorseli",
    name: "AI ürün görseli",
    intro:
      "Ürün fotoğrafını sanal manken üzerinde veya stüdyo sahnesinde gösteren görseller. Paketler ürün adedine ve kullanım yerine göre ayrılır; her pakette e-ticaret/katalog ölçülerinde teslim ve tutarlı ışık-sahne dili vardır.",
    tiers: [
      {
        slug: "numune-seti",
        name: "Numune Seti",
        tagline: "Önce gör, sonra karar ver.",
        audience: "Sanal manken / AI görsel yaklaşımını kendi ürününde denemek isteyen butik veya üretici.",
        includes: [
          "5 ürüne kadar, ürün başına 2 görsel (manken üzerinde + sade zemin)",
          "Tek manken tipi ve tek sahne dili",
          "E-ticaret ölçülerinde teslim (kare + dikey)",
          "Hatalı üretimlerde yeniden üretim (ürün başına 1 tur)",
        ],
        excludes: ["Video", "Çoklu manken/etnik çeşitlilik", "Arka plan değişimi"],
      },
      {
        slug: "katalog",
        name: "Katalog",
        tagline: "Tüm koleksiyon, aynı stüdyo diliyle.",
        audience: "Sezonluk koleksiyonunu tutarlı görsellerle yayınlamak isteyen butik / e-ticaret.",
        includes: [
          "30 ürüne kadar, ürün başına 3 görsel (manken, detay, sade zemin)",
          "2 manken tipi seçimi ve 2 sahne dili",
          "Pazaryeri ve site için ölçü varyantları",
          "Renk/varyant türetme (aynı ürünün farklı renkleri)",
          "Toplu yeniden üretim turu",
        ],
        excludes: ["Video", "Kampanya görselleri (afiş/banner tasarımı)"],
        highlight: true,
      },
      {
        slug: "sezon",
        name: "Sezon Kampanyası",
        tagline: "Katalog + kampanya görselleri + kısa videolar.",
        audience: "Sezon lansmanı yapan, sosyal medya ve reklam görselini birlikte isteyen marka.",
        includes: [
          "Katalog kapsamının tamamı",
          "Kampanya konsepti ve 10 sosyal medya/banner görseli",
          "3 kısa ürün videosu (manken üzerinde hareket / 360° his)",
          "Marka renk ve tipografisiyle şablon seti",
          "2 revizyon turu",
        ],
        excludes: ["Reklam yayını yönetimi", "Gerçek çekim organizasyonu"],
      },
    ],
  },
  {
    slug: "seo-geo-aeo",
    serviceSlug: "seo-geo-aeo",
    name: "SEO / GEO / AEO",
    intro:
      "Klasik arama, yapay zekâ araması ve cevap motorları için görünürlük. Paketler tanıdan kuruluma, kurulumdan sürekli takibe gider; hepsinde ölçüm tarihli ve yazılı raporlanır.",
    tiers: [
      {
        slug: "tani-raporu",
        name: "Tanı Raporu",
        tagline: "Neden görünmüyorsunuz — sayfa sayfa, sebep sebep.",
        audience: "Mevcut sitesi olan, Google'da ve yapay zekâ araçlarında neden çıkmadığını öğrenmek isteyen işletme.",
        includes: [
          "Teknik tarama: hız (Core Web Vitals), dizinlenme, robots/sitemap, yapısal veri",
          "Yapay zekâ araması tanısı: bot erişimi, llms.txt, alıntılanabilirlik, işletme kimliği tutarlılığı",
          "Hedef sorgularda mevcut durum: klasik arama + ChatGPT/Gemini/Perplexity kontrolü (ekran görüntülü)",
          "Sektörde resmi yetki/katalog kaynağı var mı, kullanılıyor mu analizi",
          "Öncelik sıralı aksiyon listesi (etki × çaba)",
          "Yazılı rapor + 30 dakikalık anlatım görüşmesi",
        ],
        excludes: ["Uygulama (düzeltmelerin yapılması)", "Rakip backlink analizi (araç gerektirir; talep edilirse ayrıca)"],
      },
      {
        slug: "kurulum",
        name: "Görünürlük Kurulumu",
        tagline: "Sitenin okunur, anlaşılır ve önerilebilir hâle getirilmesi.",
        audience: "Sitesi var, altyapısını arama ve yapay zekâ için düzgün kurdurmak isteyen işletme.",
        includes: [
          "Tanı Raporu kapsamı",
          "Yapısal veri grafiği: Organization/LocalBusiness, Service, FAQPage, BreadcrumbList, ImageObject — @id ile bağlı",
          "robots.txt AI bot izinleri, llms.txt + llms-full.txt, site haritası, IndexNow",
          "Search Console + Bing Webmaster kurulumu ve ilk gönderimler",
          "Başlık/açıklama ve H1-H2 düzeni: soru biçimli başlıklar, özet kutuları, doğrudan cevap cümleleri",
          "Hız düzeltmeleri: görsel formatları, font, render engelleri",
          "Google Business Profile optimizasyonu (yerel işletme ise)",
        ],
        excludes: ["Yeni içerik üretimi (Sürekli Görünürlük paketinde)", "Site tasarımının yenilenmesi"],
        highlight: true,
      },
      {
        slug: "haritalar-isletme-profili",
        name: "Haritalar & İşletme Profili",
        tagline: "Google Haritalar'da doğru, dolu ve yönetilen profil.",
        audience: "Yerel müşteriye hizmet veren, Haritalar'da çıkmayan ya da profili sahipsiz/eksik olan işletme.",
        includes: [
          "Google İşletme Profili sahiplenme / doğrulama süreci yönetimi",
          "Kategori, hizmet alanı, çalışma saatleri, açıklama ve ürün/hizmet listesi",
          "Fotoğraf düzeni (gerçek mekân, ekip, iş) ve kapak/logo",
          "Ad-adres-telefon tutarlılığı ve temel dizin kayıtları",
          "Yorum toplama akışı önerisi ve yorum yanıt şablonları",
          "Bing Places ve Apple Haritalar kaydı",
        ],
        excludes: ["Yorum yazdırma / sahte yorum (yapılmaz)", "Aylık yönetim (Sürekli Görünürlük paketinde)"],
      },
      {
        slug: "surekli-gorunurluk",
        name: "Sürekli Görünürlük",
        tagline: "Aylık ritim: içerik, ölçüm, düzeltme.",
        audience: "Kurulumu bitmiş, bölgesinde ve yapay zekâ aramasında kalıcı görünürlük isteyen işletme.",
        includes: [
          "Aylık 2 içerik (rehber/SSS/hizmet derinleştirme) — kaynaklı, alıntılanabilir",
          "Aylık görünürlük raporu: hedef sorgular klasik arama + yapay zekâ araçlarında, ekran görüntülü",
          "Güncelleme tarihlerinin ve yapısal verinin bakımı",
          "Google Business Profile yönetimi: gönderi, yorum yanıtı, fotoğraf",
          "Dizin ve işletme kimliği tutarlılığı takibi",
          "Gerekirse sayfa/başlık düzeltmeleri",
        ],
        excludes: ["Ücretli bağlantı satın alma (yapılmaz)", "Ulusal head-term taahhüdü"],
        guarantee: {
          yes: ["Yerel ve uzun kuyruklu aramalarda 90 günde 1. sayfa hedefi — ölçülür, raporlanır"],
          no: ["Ulusal ve yüksek rekabetli tek kelimelik aramalar için taahhüt verilmez"],
        },
      },
    ],
  },
  {
    slug: "otomasyon",
    serviceSlug: "otomasyon-sistemleri",
    name: "Otomasyon sistemleri",
    intro:
      "n8n (kendi sunucusunda) + dil modelleri ile işletme akışları. Paketler tek akıştan sohbet asistanına ve çoklu akışlı operasyona gider. Her pakette veri sizin hesabınızda kalır; akış dokümante edilir.",
    tiers: [
      {
        slug: "tek-akis",
        name: "Tek Akış",
        tagline: "Bir tekrar eden işi tamamen otomatiğe al.",
        audience: "Kayıt, hatırlatma veya bildirim gibi tek bir süreci elden çıkarmak isteyen işletme.",
        includes: [
          "1 n8n akışı (ör. Telegram'dan mesajla satış/gider kaydı → Google Sheets; form → e-posta + bildirim; günlük özet raporu)",
          "Dil modeliyle doğal dil anlama (gerekiyorsa)",
          "Google Sheets / e-posta / Telegram bağlantıları",
          "Yetki kontrolü ve hata durumunda bildirim",
          "Akış dokümanı + kısa kullanım eğitimi",
          "İlk ay izleme ve düzeltme",
        ],
        excludes: ["WhatsApp Business API (Meta onayı gerektirir — Asistan paketinde)", "Özel yazılım geliştirme"],
      },
      {
        slug: "asistan",
        name: "Asistan",
        tagline: "Müşteriyle konuşan bot: karşılama, randevu, kayıt.",
        audience: "Gelen mesajları karşılamak, randevu/kayıt almak isteyen klinik, salon, hizmet işletmesi.",
        includes: [
          "Telegram veya WhatsApp (Cloud API) sohbet asistanı",
          "Dil modeliyle niyet anlama; tıbbi/fiyat gibi hassas soruları insana yönlendirme",
          "Randevu alma / hatırlatma / erteleme akışı veya kayıt akışı",
          "Onay kuyruğu: personel onaylamadan randevu kesinleşmez",
          "Google Sheets veya takvim entegrasyonu",
          "KVKK uyumlu aydınlatma ve izin akışı",
          "İlk ay izleme + aylık bakım seçeneği",
        ],
        excludes: ["Sesli telefon asistanı (ayrıca planlanır)", "Meta/WhatsApp mesaj ücretleri (size aittir)"],
        highlight: true,
      },
      {
        slug: "operasyon",
        name: "Operasyon",
        tagline: "Birden fazla akış, tek gösterge paneli.",
        audience: "Satış, takip, raporlama ve bildirimlerini birlikte otomatize etmek isteyen işletme.",
        includes: [
          "3–5 birbirine bağlı akış (kayıt, hatırlatma, alacak takibi, rapor, bildirim)",
          "CRM / e-tablo / e-posta / mesajlaşma entegrasyonları",
          "Fiş/fatura okuma (OCR) veya belge sınıflandırma akışı",
          "Yönetim için günlük/haftalık özet panosu",
          "İzleme, hata bildirimi ve yedekleme",
          "Aylık bakım ve geliştirme saati",
        ],
        excludes: ["ERP lisansları", "Donanım/POS entegrasyonu (ayrıca değerlendirilir)"],
      },
    ],
  },
  {
    slug: "marka-grafik-tasarim",
    serviceSlug: "marka-grafik-tasarim",
    name: "Marka & grafik tasarım",
    intro:
      "Logo, kurumsal kimlik ve sosyal medya için tutarlı görsel dil. Paketler logodan kimlik setine ve sürekli kullanılacak şablon kütüphanesine gider; her pakette kaynak dosyalar teslim edilir.",
    tiers: [
      {
        slug: "logo",
        name: "Logo & Temel Kimlik",
        tagline: "Doğru logo, doğru renk, doğru yazı.",
        audience: "Yeni kurulan veya logosunu yenilemek isteyen işletme.",
        includes: [
          "Marka brief'i ve rakip görsel taraması",
          "2 logo yönü, seçilen yönde 2 revizyon",
          "Renk paleti ve yazı tipi seçimi",
          "Logo varyantları: yatay, dikey, amblem, tek renk",
          "Kaynak dosyalar (SVG, PDF, PNG) ve kullanım notu",
        ],
        excludes: ["Kartvizit/antetli tasarımı", "Sosyal medya şablonları"],
      },
      {
        slug: "kurumsal-kimlik",
        name: "Kurumsal Kimlik Seti",
        tagline: "Her temas noktasında aynı marka.",
        audience: "Basılı ve dijital tüm materyallerini tutarlı kılmak isteyen işletme.",
        includes: [
          "Logo & Temel Kimlik kapsamı",
          "Kartvizit, antetli, e-posta imzası",
          "Sosyal medya profil ve kapak görselleri",
          "Araç giydirme / tabela / tanıtım dosyası için uygulama taslakları (ihtiyaca göre seçilir)",
          "Kısa marka kılavuzu (logo kullanımı, renk kodları, yazı hiyerarşisi)",
        ],
        excludes: ["Baskı ve üretim maliyeti", "Web sitesi tasarımı (Web sitesi paketlerinde)"],
        highlight: true,
      },
      {
        slug: "sosyal-medya-sablon",
        name: "Sosyal Medya Şablon Seti",
        tagline: "Ekibiniz kendi gönderisini marka diliyle üretsin.",
        audience: "Düzenli gönderi paylaşan, her seferinde tasarımcı beklemek istemeyen işletme.",
        includes: [
          "10 gönderi + 5 hikâye şablonu (Canva veya Figma)",
          "Kampanya, duyuru, ürün, bilgi kartı, yorum paylaşımı gibi türler",
          "Marka renk/yazı kilitli, metin ve görsel alanları düzenlenebilir",
          "Kısa kullanım eğitimi (video)",
          "1 revizyon turu",
        ],
        excludes: ["Aylık içerik üretimi (AI video paketlerinde)", "Reklam görseli üretimi"],
      },
    ],
  },
  {
    slug: "sosyal-medya",
    serviceSlug: "sosyal-medya-icerik-yonetimi",
    name: "Sosyal medya içerik yönetimi",
    intro:
      "İçerik üretimi ve yayın takvimi: plan, post/reels üretimi, yayın, kısa rapor. DM/yorum yönetimi ve reklam bütçesi hiçbir pakette yoktur; içerik onayı işletmede kalır.",
    tiers: [
      {
        slug: "baslangic",
        name: "Başlangıç",
        tagline: "Hesap sessiz kalmasın; düzenli, gerçek içerik.",
        audience: "Sosyal medyayı yeni düzene sokan esnaf ve hizmet işletmesi.",
        includes: [
          "Aylık içerik planı (3 sütun) ve yayın takvimi",
          "Ayda 8 gönderi (görsel/carousel) — metin + tasarım",
          "Haftalık hikâye önerileri (işletme paylaşır)",
          "Profil bilgilerinin siteyle uyumu (bio, bağlantı, iletişim)",
          "Aylık kısa özet",
        ],
        excludes: ["Reels üretimi", "DM/yorum yönetimi", "Reklam bütçesi"],
      },
      {
        slug: "duzenli",
        name: "Düzenli",
        tagline: "Post + reels ritmi: bilgi ve erişim birlikte.",
        audience: "Takipçi kazanmak ve mesaj almak isteyen klinik, emlak, butik, hizmet işletmesi.",
        includes: [
          "Aylık içerik planı (4 sütun) ve yayın takvimi",
          "Ayda 12 gönderi + 4 kısa video (reels, 15–30 sn, altyazılı)",
          "Aylık çekim listesi ve yönlendirme; yapay zekâ destekli görsel/video üretimi",
          "Onay tablosu ve planlı yayın",
          "Aylık rapor: izlenme, kaydetme, gelen mesaj sayısı (işletme paylaşırsa)",
        ],
        excludes: ["DM/yorum yönetimi", "Reklam bütçesi", "Etkileyici (influencer) iş birlikleri"],
        highlight: true,
      },
      {
        slug: "tam-akis",
        name: "Tam Akış",
        tagline: "Her hafta video, her ay strateji.",
        audience: "Sosyal medyayı ana müşteri kanalı yapan, kampanya dönemleri olan işletme.",
        includes: [
          "Düzenli kapsamının tamamı",
          "Ayda 16 gönderi + 8 kısa video",
          "Kampanya/sezon içerik setleri (afiş, hikâye, reels)",
          "Aylık strateji görüşmesi ve rakip içerik taraması",
          "Site içeriğiyle bağ: SSS ve rehber konularından sosyal içerik türetme",
        ],
        excludes: ["DM/yorum yönetimi", "Reklam bütçesi", "Canlı yayın yönetimi"],
      },
    ],
  },
];

export const PACKAGE_FAQ = [
  {
    q: "Fiyat neden sayfada yazmıyor?",
    a: "Her işletmenin kapsamı farklı: sayfa sayısı, içerik hacmi, entegrasyonlar, revizyon beklentisi. Paketler kapsamı netleştirir; fiyat keşif görüşmesinden sonra yazılı teklifle verilir. Teklif yazılıdır ve kapsamı açıktır.",
  },
  {
    q: "Paketler arası geçiş yapabilir miyim?",
    a: "Evet. Çoğu müşteri küçük paketle başlar, sonuç görünce bir üst pakete geçer; yapılan iş boşa gitmez, üst paket mevcut kurulumun üzerine eklenir.",
  },
  {
    q: "Domain ve hosting kimde kalır?",
    a: "Sizde. Domain sizin adınıza alınır, barındırma ve alan adı erişimleri size aittir. Çalışma biter ya da ajans değiştirirseniz site ve alan adı sizinle kalır.",
  },
  {
    q: "Aylık bakım zorunlu mu?",
    a: "Tek seferlik paketlerde (Vitrin, Tek Reel, Logo, Tanı Raporu, Haritalar & İşletme Profili vb.) zorunlu değil. Sonucu içerik ve takibe bağlı paketlerde (Bölgesel Lider, Sürekli Görünürlük, Aylık İçerik, sosyal medya paketleri, Asistan) aylık çalışma paketin parçasıdır; bakımsız bırakılan site zamanla görünürlüğünü kaybeder.",
  },
  {
    q: "Neden ulusal sıralama taahhüdü yok?",
    a: "Ulusal ve tek kelimelik aramalarda sıralama, sitenin kendisi kadar site dışı sinyallere (bağlantılar, marka bilinirliği, yaş) bağlıdır; bunlar tek başına mühendislikle garanti edilemez. Yerel ve uzun kuyruklu aramalarda ise sonuç ölçülebilir ve hedeflenebilir — taahhüdü orada veriyoruz.",
  },
  {
    q: "Paketlerin dışında bir ihtiyacım var; olur mu?",
    a: "Olur. Paketler başlangıç çerçevesidir; keşifte ihtiyacınız başka bir bileşim gerektiriyorsa kapsam size özel yazılır. Birden fazla kategoriyi birleştiren işlerde (site + otomasyon + video gibi) tek teklif hazırlanır.",
  },
];

/** hizmetler/[slug] → o hizmetin paket kategorisi (yoksa undefined). */
export function getPackageCategoryByService(serviceSlug: string) {
  return PACKAGE_CATEGORIES.find((c) => c.serviceSlug === serviceSlug);
}
