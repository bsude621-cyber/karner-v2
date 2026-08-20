import type { Guide } from "./types";

/**
 * Otomasyon kümesi rehberleri — pillar: /hizmetler/otomasyon-sistemleri
 * Kural: genel teknik bilgi + belgeli KARNER gerçeği. Sayı/fiyat/süre garantisi yok.
 */
export const OTOMASYON_GUIDES: Guide[] = [
  {
    slug: "n8n-nedir",
    title: "n8n Nedir? Açık Kaynak İş Akışı Otomasyonu Nasıl Çalışır?",
    seoTitle: "n8n Nedir? İş Akışı Otomasyonu Nasıl Çalışır? | KARNER",
    seoDescription:
      "n8n nedir, nasıl çalışır, Zapier ve Make'ten farkı ne? Tetikleyici, düğüm, webhook ve yapay zekâ ajanı mantığını örnek akışla anlatan Türkçe rehber.",
    summary:
      "n8n, açık kaynaklı ve kendi sunucunuzda barındırabileceğiniz bir iş akışı otomasyon aracıdır. Bir tetikleyici (webhook, zamanlayıcı, gelen mesaj) akışı başlatır; düğümler sırayla veriyi işler, uygulamalar arasında taşır ve gerekirse bir yapay zekâ modeline karar verdirir. Zapier ve Make'e göre en belirgin farkı, verinin ve maliyet yapısının sizin kontrolünüzde kalmasıdır.",
    cluster: "otomasyon",
    pillar: { href: "/hizmetler/otomasyon-sistemleri", label: "Otomasyon Sistemleri" },
    serviceSlug: "otomasyon-sistemleri",
    blocks: [
      { type: "h2", text: "n8n nedir?" },
      {
        type: "dl",
        items: [
          {
            term: "n8n",
            def: "Uygulamaları birbirine bağlayan, olay tabanlı çalışan açık kaynaklı iş akışı otomasyon platformu. Görsel bir tuvalde düğümler birbirine bağlanarak akış kurulur.",
          },
          {
            term: "Tetikleyici (trigger)",
            def: "Akışı başlatan olay: gelen webhook isteği, zamanlayıcı, yeni e-posta, Telegram mesajı, form gönderimi.",
          },
          {
            term: "Düğüm (node)",
            def: "Akışın her adımı. Veri okur, dönüştürür, bir API'ye yazar ya da koşula göre yol ayırır.",
          },
          {
            term: "Self-host",
            def: "Yazılımın sizin sunucunuzda ya da seçtiğiniz bulut hesabında çalışması. Veri üçüncü bir tarafın altyapısından geçmez.",
          },
        ],
      },
      {
        type: "p",
        text: "n8n'in çekirdek fikri basittir: **bir olay olur, bir dizi adım çalışır.** Müşteri form doldurur, sistem kaydı açar, satış ekibine mesaj gider, tabloya satır eklenir. Bu zincir bir kez kurulur, sonra her olayda kendiliğinden tekrar eder.",
      },
      {
        type: "p",
        text: "Zincirdeki adımlar hazır bağlantılarla kurulur. Telegram, WhatsApp, Google Sheets, Gmail, Notion, CRM'ler ve e-ticaret platformları için hazır düğümler vardır. Hazır düğümü olmayan sistemlere HTTP isteği düğümüyle bağlanılır.",
      },
      { type: "h2", text: "n8n nasıl çalışır? Tetikleyiciden sonuca bir akış" },
      {
        type: "p",
        text: "Her n8n akışı tek bir tetikleyiciyle başlar. Tetikleyici dışarıdan gelen bir webhook olabilir; belirli saatte çalışan bir zamanlayıcı olabilir; ya da bir Telegram botuna düşen mesaj olabilir.",
      },
      {
        type: "p",
        text: "Tetikleyiciden sonra veri düğümden düğüme akar. Her düğüm bir önceki adımın çıktısını girdi olarak alır. Bu sayede form alanı doğrudan tabloya yazılır, tablo satırı mesaja dönüşür, mesaj cevabı tekrar tabloya döner.",
      },
      {
        type: "ol",
        items: [
          "Tetikleyici: Web sitesindeki iletişim formu bir webhook adresine gönderim yapar.",
          "Doğrulama düğümü: Telefon ve e-posta alanları boş mu, biçimi uygun mu kontrol edilir.",
          "Kayıt düğümü: Temiz veri Google Sheets'e ya da CRM'e yeni satır olarak yazılır.",
          "Bildirim düğümü: Satış sorumlusuna Telegram veya WhatsApp üzerinden özet mesaj gider.",
          "Cevap düğümü: Müşteriye 'talebiniz alındı' e-postası otomatik gönderilir.",
        ],
      },
      {
        type: "p",
        text: "Bu akış kurulduktan sonra hiçbir adımda insan eli gerekmez. Hata olursa n8n yürütme günlüğünde hangi düğümün neden durduğu görünür.",
      },
      { type: "h2", text: "n8n ile yapay zekâ ajanı kurulabilir mi?" },
      {
        type: "p",
        text: "Evet. n8n'de LLM düğümleri vardır; bu düğümler Claude, GPT, Gemini gibi modellere bağlanır. Model, akışın içinde bir karar noktası olarak çalışır: gelen mesajın niyetini sınıflandırır, serbest metinden yapılandırılmış veri çıkarır ya da cevap taslağı yazar.",
      },
      {
        type: "p",
        text: "AI Agent düğümü bir adım ileri gider. Modele araçlar tanımlanır — tablo okuma, takvim yazma, web araması — ve model hangi aracı ne zaman çağıracağına kendisi karar verir. **Kurallı otomasyonun karar gerektiren adımları** bu şekilde modele devredilir.",
      },
      {
        type: "p",
        text: "Pratik örnek: Telegram'a gelen 'bugün üç kombi sattık, ikisi peşin' mesajı. LLM düğümü bu cümleyi ürün, adet ve ödeme biçimi alanlarına ayırır; sonraki düğüm bu alanları tabloya yazar. Kullanıcı form doldurmaz, doğal dille konuşur.",
      },
      { type: "h2", text: "n8n, Zapier ve Make arasındaki fark nedir?" },
      {
        type: "p",
        text: "Üç araç da 'olay → adımlar' mantığıyla çalışır. Fark barındırmada, veri kontrolünde ve maliyet yapısındadır.",
      },
      {
        type: "table",
        caption: "n8n, Zapier ve Make karşılaştırması (bu yazının tarihi itibarıyla genel yapı)",
        head: ["Ölçüt", "n8n", "Zapier", "Make"],
        rows: [
          ["Kaynak kodu", "Açık kaynak, incelenebilir", "Kapalı", "Kapalı"],
          ["Barındırma", "Kendi sunucunuz veya n8n bulutu", "Yalnızca Zapier bulutu", "Yalnızca Make bulutu"],
          ["Veri kontrolü", "Self-host'ta veri sizde kalır", "Sağlayıcı altyapısından geçer", "Sağlayıcı altyapısından geçer"],
          ["Maliyet mantığı", "Self-host'ta sunucu gideri; görev sayısına bağlı değil", "Görev sayısına göre kademe", "İşlem sayısına göre kademe"],
          ["Özelleştirme", "Kod düğümü, özel düğüm, HTTP isteği", "Sınırlı kod adımı", "Orta düzey"],
          ["Yapay zekâ ajanı", "Yerleşik LLM ve Agent düğümleri", "AI adımları var", "AI adımları var"],
          ["Kurulum eşiği", "Teknik kurulum gerektirir", "Düşük", "Düşük"],
        ],
      },
      {
        type: "p",
        text: "Seçim kriteri şudur: akış sayısı büyüdükçe ve içinden geçen veri hassaslaştıkça n8n'in avantajı artar. Birkaç basit akış ve sıfır teknik bakım isteniyorsa bulut araçlar daha hızlı başlatılır.",
      },
      { type: "h2", text: "n8n hangi işler için uygundur?" },
      {
        type: "ul",
        items: [
          "Form, sipariş ve mesaj gibi olayları tabloya, CRM'e ve bildirime bağlamak",
          "Telegram ve WhatsApp üzerinden çalışan iş takip ve müşteri botları",
          "Zamanlanmış raporlar: günlük satış özeti, haftalık alacak listesi",
          "Fiş, fatura ve belge işleme: görselden metin çıkarma, sınıflandırma, kayıt",
          "Farklı sistemleri senkron tutma: e-ticaret stoğu ile muhasebe tablosu",
          "Yapay zekâ ajanları: soru cevaplama, talep toplama, ön eleme",
        ],
      },
      {
        type: "p",
        text: "Uygun olmadığı yerler de var. Çok düşük gecikmenin kritik olduğu sistemler, çok yüksek hacimli gerçek zamanlı veri işleme ve karmaşık kullanıcı arayüzü gerektiren uygulamalar n8n'in değil, özel yazılımın alanıdır.",
      },
      { type: "h2", text: "Self-host n8n için neye ihtiyaç var?" },
      {
        type: "p",
        text: "Küçük bir sunucu ya da container barındıran bir bulut hesabı yeterlidir. Docker ile kurulum yaygın yoldur. Veritabanı, yedekleme ve HTTPS sertifikası baştan planlanmalıdır; çünkü akışlar büyüdükçe yürütme geçmişi ve kimlik bilgileri bu altyapıda tutulur.",
      },
      {
        type: "p",
        text: "Kimlik bilgileri (API anahtarları, bot token'ları) n8n içinde şifreli saklanır. Yine de **her akışın hangi veriye dokunduğu** belgelenmeli; KVKK kapsamındaki kişisel veriler için erişim ve saklama kararı baştan verilmelidir.",
      },
      {
        type: "callout",
        title: "KARNER bu alanda ne yapar?",
        text: "KARNER n8n ve Claude API ile iş akışları ve Telegram botları kurar. Hizmet kapsamı için [Otomasyon Sistemleri](/hizmetler/otomasyon-sistemleri) sayfasına, somut senaryolar için [küçük işletme otomasyon örnekleri](/rehber/kucuk-isletme-icin-otomasyon-ornekleri) rehberine bakabilirsiniz.",
      },
      {
        type: "p",
        text: "Sohbet kanalı tarafı için [WhatsApp ve Telegram bot rehberi](/rehber/whatsapp-telegram-bot-isletme), diğer konular için [rehber ana sayfası](/rehber) uygun başlangıçtır.",
      },
    ],
    faq: [
      {
        q: "n8n ücretsiz mi?",
        a: "Kaynak kodu açıktır ve kendi sunucunuzda çalıştırmak için lisans ücreti yoktur; sunucu ve bakım gideri size aittir. n8n'in kendi barındırdığı bulut sürümü ayrıca sunulur ve ücretli kademelerle çalışır. Hangi yolun uygun olduğu akış sayısına, veri hassasiyetine ve teknik bakım kapasitesine göre belirlenir.",
      },
      {
        q: "n8n kullanmak için kod bilmek gerekir mi?",
        a: "Temel akışlar görsel arayüzde, kod yazmadan kurulur. Hazır düğümler sürükle-bırak ile bağlanır. Veri dönüştürme, özel API çağrısı ve istisna yönetimi gibi adımlarda JavaScript bilgisi işi kolaylaştırır. Kurulum ve bakım tarafı ise sunucu, Docker ve yedekleme konularına aşinalık ister.",
      },
      {
        q: "n8n ile Telegram botu nasıl çalışır?",
        a: "Telegram Trigger düğümü bota gelen her mesajı akışa düşürür. Sonraki düğümler mesajı işler: metin ise LLM ile anlamlandırılır, sesli ise önce yazıya dökülür. İşlenen veri Google Sheets gibi bir kaynağa yazılır ve bot kullanıcıya onay cevabı döner. Tüm zincir tek akışta toplanır.",
      },
      {
        q: "n8n'de verilerim nerede tutulur?",
        a: "Self-host kurulumda akış tanımları, yürütme geçmişi ve kimlik bilgileri sizin sunucunuzdaki veritabanında durur. Bağladığınız servisler (Google, Telegram, CRM) kendi verilerini kendi altyapılarında tutmaya devam eder. n8n bu servisler arasında veriyi taşır; kopyasını saklayıp saklamaması yürütme günlüğü ayarlarına bağlıdır.",
      },
      {
        q: "n8n akışı hata verirse ne olur?",
        a: "Her yürütme kaydedilir; hangi düğümde ve hangi veriyle durduğu görünür. Akışlara hata yolu eklenebilir: başarısız adım Telegram'a uyarı gönderir ya da yeniden dener. Kritik akışlarda bu hata yolu baştan tasarlanır; böylece sessiz kayıp yerine görünür uyarı oluşur.",
      },
    ],
    related: ["kucuk-isletme-icin-otomasyon-ornekleri", "whatsapp-telegram-bot-isletme"],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
  {
    slug: "kucuk-isletme-icin-otomasyon-ornekleri",
    title: "Küçük İşletme İçin Otomasyon Örnekleri: Esnaf ve Hizmet Senaryoları",
    seoTitle: "Küçük İşletmeler İçin Otomasyon Senaryoları | KARNER",
    seoDescription:
      "Esnaf ve hizmet işletmesi için somut otomasyon örnekleri: mesajla satış-gider kaydı, randevu hatırlatma, fiş OCR, alacak takibi, günlük özet, yorum izleme.",
    summary:
      "Küçük işletme otomasyonu, her gün tekrarlanan kayıt, hatırlatma ve bildirim işlerini bir akışa devretmektir. Telegram veya WhatsApp'tan gelen mesajla satış kaydı açmak, randevu hatırlatmak, fişi okuyup tabloya yazmak, alacakları dürtmek ve günlük özet almak bu akışların başında gelir. Aşağıda esnaf ve hizmet işletmeleri için somut senaryolar var.",
    cluster: "otomasyon",
    pillar: { href: "/hizmetler/otomasyon-sistemleri", label: "Otomasyon Sistemleri" },
    serviceSlug: "otomasyon-sistemleri",
    blocks: [
      { type: "h2", text: "Küçük işletme için otomasyon ne demek?" },
      {
        type: "dl",
        items: [
          {
            term: "İş akışı otomasyonu",
            def: "Bir olayın (mesaj, form, saat) başka sistemlerde el değmeden işlem başlatması: kayıt açılır, bildirim gider, rapor güncellenir.",
          },
          {
            term: "Tetikleyici",
            def: "Akışı başlatan şey. Esnaf için çoğu zaman bir Telegram/WhatsApp mesajı, bir form ya da günün belirli saatidir.",
          },
          {
            term: "Kazanım",
            def: "Unutulan kayıt, geç hatırlatma ve tekrar yazılan veri gibi sessiz kayıpların ortadan kalkması.",
          },
        ],
      },
      {
        type: "p",
        text: "Büyük şirketin ERP'si yerine esnafın elinde telefon ve bir tablo vardır. İyi otomasyon bu ikisini birbirine bağlar; **yeni program öğrenmeyi değil, zaten kullanılan kanalı** iş aracına çevirir.",
      },
      {
        type: "p",
        text: "Aşağıdaki senaryoların tamamı [n8n](/rehber/n8n-nedir) gibi bir akış aracı, bir mesajlaşma kanalı ve Google Sheets gibi basit bir veri kaynağıyla kurulabilir.",
      },
      { type: "h2", text: "Hangi otomasyonlar esnafa gerçekten yarar sağlar?" },
      {
        type: "p",
        text: "Aşağıda sorun → akış → kazanım yapısında on senaryo var. Her biri bağımsızdır; bir tanesiyle başlanır, çalıştıkça diğerleri eklenir.",
      },
      {
        type: "ol",
        items: [
          "**Mesajla satış ve gider kaydı.** Sorun: Gün sonunda defter tutulmaz, satış unutulur. Akış: Telegram'a yazılı ya da sesli 'iki klima sattık, biri taksitli' mesajı gelir; ses yazıya dökülür, LLM cümleyi ürün-adet-ödeme alanlarına ayırır, Google Sheets'e satır yazılır, bot onay döner. Kazanım: Kayıt anında tutulur, defter kendiliğinden oluşur.",
          "**Randevu hatırlatma.** Sorun: Müşteri randevuyu unutur, saat boş kalır. Akış: Takvime veya tabloya düşen randevu için bir gün önce ve sabah WhatsApp ya da SMS mesajı gider; müşteri 'iptal' yazarsa kayıt güncellenir. Kazanım: Boşa giden saatler azalır, telefonla tek tek arama biter.",
          "**Fiş ve fatura OCR.** Sorun: Fişler cepte buruşur, gider kaydı eksik kalır. Akış: Fişin fotoğrafı bota gönderilir; görüntü okunur, tarih-tutar-satıcı alanları çıkarılır, gider tablosuna yazılır, görsel arşive kaydedilir. Kazanım: Gider tablosu güncel kalır, belge kaybolmaz.",
          "**Alacak takibi dürtme.** Sorun: Vadesi geçen alacak hatırlanmaz, tahsilat sarkar. Akış: Alacak tablosu her sabah taranır; vadesi yaklaşan ve geçen kayıtlar işletme sahibine özet olarak gider, istenirse müşteriye nazik hatırlatma şablonu gönderilir. Kazanım: Tahsilat takibi düzenli, ilişki bozulmadan hatırlatma.",
          "**Form → CRM → bildirim.** Sorun: Siteden gelen talep e-postada kaybolur. Akış: Form gönderimi webhook'a düşer, veri CRM'e veya tabloya yazılır, satış sorumlusuna Telegram'dan özet gider, müşteriye 'aldık' mesajı döner. Kazanım: Hiçbir talep cevapsız kalmaz, ilk temas hızlanır.",
          "**Günlük özet raporu.** Sorun: Günün nasıl geçtiği akşam hesaplanır, çoğu zaman hiç hesaplanmaz. Akış: Belirli saatte satış, gider ve alacak tabloları okunur; kısa özet mesaj olarak sahibe gönderilir. Kazanım: Her akşam tek bakışta durum, hesap makinesi yok.",
          "**Yorum ve inceleme izleme.** Sorun: Google veya sosyal medyadaki yeni yorum günler sonra fark edilir. Akış: Yeni yorum düştüğünde bildirim gider; olumsuz yorum ayrı işaretlenir; cevap taslağı LLM ile hazırlanıp onaya sunulur. Kazanım: Hızlı ve tutarlı cevap, itibar takibi.",
          "**Stok eşiği uyarısı.** Sorun: Ürün bitince fark edilir. Akış: Satış kaydı düştükçe stok tablosu azalır; eşiğin altına inen ürün için tedarikçi bilgisiyle birlikte uyarı gider. Kazanım: Sipariş zamanında verilir.",
          "**Teklif ve fiyat listesi gönderimi.** Sorun: Her müşteriye aynı belge elle hazırlanır. Akış: Müşteri bilgileri bota yazılır; şablon dolar, PDF oluşur, WhatsApp'tan gönderilir, gönderim tabloya işlenir. Kazanım: Teklif tek biçimde çıkar, kimin ne zaman aldığı görünür.",
          "**Saha ekibi iş listesi.** Sorun: Sahadaki ekip günün işini telefonla öğrenir. Akış: Sabah iş listesi her ekibe mesajla gider; iş bitince 'tamam' ve fotoğraf bota atılır; tablo güncellenir. Kazanım: İş durumu anlık görünür, akşam soru kalmaz.",
        ],
      },
      { type: "h2", text: "Mesajla iş takibi nasıl çalışır? Gerçek bir örnek" },
      {
        type: "p",
        text: "KARNER olarak Telegram üzerinden yazılı/sesli mesajla kayıt alan, Groq ve Google Sheets ile çalışan iş takip botu kurduk. Bu tip bir botun genel yapısı şudur: Telegram Trigger mesajı alır; sesli mesaj önce yazıya dökülür; LLM cümleden ürün, adet ve ödeme biçimi gibi alanları çıkarır; Google Sheets'e satır eklenir; bot kullanıcıya kısa bir onay özeti döner.",
      },
      {
        type: "p",
        text: "Bu yapının gücü kanaldadır: kullanıcı yeni uygulama açmaz. Zaten açık olan sohbet penceresine konuşur. Form alanı yoktur; **doğal dili anlamak modelin işidir.**",
      },
      {
        type: "p",
        text: "Aynı iskelet gider, alacak ve randevu için de çalışır; yalnızca çıkarılan alanlar ve hedef tablo değişir.",
      },
      { type: "h2", text: "Hangi senaryo önce kurulmalı?" },
      {
        type: "table",
        caption: "Belirtiye göre ilk akış seçimi",
        head: ["Belirti", "Önce kurulacak akış", "Gerekli parçalar"],
        rows: [
          ["Gün sonunda defter tutulmuyor", "Mesajla satış-gider kaydı", "Telegram bot + LLM + Sheets"],
          ["Randevular kaçıyor", "Randevu hatırlatma", "Takvim/tablo + WhatsApp veya SMS"],
          ["Fişler kayboluyor", "Fiş OCR", "Bot + görüntü okuma + Sheets"],
          ["Tahsilat sarkıyor", "Alacak dürtme", "Alacak tablosu + zamanlayıcı"],
          ["Talepler e-postada kayboluyor", "Form → CRM → bildirim", "Webhook + CRM/tablo + Telegram"],
          ["Gün nasıl geçti bilinmiyor", "Günlük özet", "Zamanlayıcı + tablo okuma"],
          ["Yorumlar geç görülüyor", "Yorum izleme", "Platform bağlantısı + bildirim"],
        ],
      },
      {
        type: "p",
        text: "Kural: en çok zaman veya para kaçıran belirti önce. İlk akış çalışıp güven verince ikincisi eklenir. Hepsini aynı anda kurmak bakım yükünü büyütür.",
      },
      { type: "h2", text: "Küçük işletme otomasyonunda en sık yapılan hatalar neler?" },
      {
        type: "ul",
        items: [
          "Kanal değiştirmek: Esnafın kullanmadığı yeni bir uygulama dayatmak. Mevcut Telegram/WhatsApp alışkanlığı korunmalı.",
          "Onay adımını atlamak: Müşteriye giden her mesaj (hatırlatma, teklif) sahibin onayından geçmeli; en azından şablon metin baştan kilitlenmeli.",
          "Hata yolu kurmamak: Akış sessizce durursa kayıt kaybolur. Başarısız adımda uyarı mesajı zorunlu.",
          "Veriyi dağıtmak: Satış bir tabloda, gider başka uygulamada. Tek kaynak, tek yapı.",
          "İzin ve KVKK'yı ertelemek: Müşteriye mesaj atan her akış için ticari ileti izni ve kişisel veri saklama kararı baştan verilmeli.",
        ],
      },
      {
        type: "callout",
        title: "KARNER bu alanda ne yapar?",
        text: "KARNER n8n ve Claude API ile iş akışları ve Telegram botları kurar. Hizmet kapsamı [Otomasyon Sistemleri](/hizmetler/otomasyon-sistemleri) sayfasında; kanal seçimi için [WhatsApp ve Telegram bot rehberi](/rehber/whatsapp-telegram-bot-isletme) okunabilir.",
      },
      {
        type: "p",
        text: "Aracın kendisini tanımak için [n8n nedir](/rehber/n8n-nedir), diğer konular için [rehber ana sayfası](/rehber).",
      },
    ],
    faq: [
      {
        q: "Otomasyon için hangi programları kullanmam gerekir?",
        a: "Çoğu senaryo için üç parça yeter: bir akış aracı (n8n gibi), zaten kullandığınız mesajlaşma kanalı (Telegram veya WhatsApp) ve bir veri kaynağı (Google Sheets ya da mevcut CRM'iniz). Yeni bir muhasebe programı öğrenmek gerekmez; otomasyon mevcut araçları birbirine bağlar.",
      },
      {
        q: "Sesli mesajla kayıt gerçekten çalışıyor mu?",
        a: "Evet. Sesli mesaj önce konuşmadan yazıya çevrilir, sonra LLM bu metni alanlara ayırır. Gürültülü ortam ve yerel ağız hatayı artırabilir; bu yüzden bot kaydı yazmadan önce kısa bir özet gösterip onay istemelidir. Yanlış anlaşılan kayıt tek mesajla düzeltilir.",
      },
      {
        q: "Google Sheets yeterli mi, CRM gerekir mi?",
        a: "Başlangıç için Google Sheets yeterlidir: görünür, paylaşılabilir ve her araçla bağlanır. Müşteri sayısı ve süreç karmaşıklığı arttığında, kayıt geçmişi ve yetki yönetimi için bir CRM'e geçilir. Akış aynı kalır; yalnızca hedef düğüm değişir.",
      },
      {
        q: "Müşterilerime otomatik mesaj atabilir miyim?",
        a: "Teknik olarak evet; hukuki olarak müşterinin ticari ileti için önceden izin vermiş olması gerekir. Hatırlatma gibi hizmete bağlı mesajlar ile kampanya mesajları farklı değerlendirilir. Her otomatik mesaj akışı kurulmadan önce izin kaydı ve şablon metni netleştirilmelidir.",
      },
      {
        q: "Akış bozulursa ben anlar mıyım?",
        a: "Doğru kurulmuş akışta evet. Her adım için hata yolu tanımlanır; başarısız kayıt size Telegram'dan uyarı olarak düşer ve yürütme günlüğünde hangi adımın neden durduğu görünür. Sessiz kaybı önlemenin yolu, akışı kurarken hata senaryosunu da tasarlamaktır.",
      },
    ],
    related: ["n8n-nedir", "whatsapp-telegram-bot-isletme"],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
  {
    slug: "whatsapp-telegram-bot-isletme",
    title: "İşletme İçin WhatsApp ve Telegram Botu: Kurulum ve Kanal Seçimi",
    seoTitle: "İşletme İçin WhatsApp ve Telegram Botu Rehberi | KARNER",
    seoDescription:
      "Telegram Bot API ile kurulum mantığı, WhatsApp Cloud API gereksinimleri, şablon mesaj kuralları, LLM ile niyet anlama ve ticari ileti izni. Hangi kanal ne zaman?",
    summary:
      "İşletme sohbet botu, müşteriden veya ekipten gelen mesajı otomatik işleyen ve cevaplayan bir akıştır. Telegram'da bot BotFather ile birkaç adımda açılır ve iç ekip işleri için idealdir. WhatsApp'ta Meta'nın Cloud API'si, işletme doğrulaması ve şablon mesaj kuralları devreye girer; müşteriye dönük iletişim için tercih edilir. LLM düğümü her iki kanalda niyeti anlar.",
    cluster: "otomasyon",
    pillar: { href: "/hizmetler/otomasyon-sistemleri", label: "Otomasyon Sistemleri" },
    serviceSlug: "otomasyon-sistemleri",
    blocks: [
      { type: "h2", text: "İşletme sohbet botu nedir?" },
      {
        type: "dl",
        items: [
          {
            term: "Sohbet botu",
            def: "Mesajlaşma kanalına gelen mesajı alan, anlayan, gerekirse bir işlem yapan ve cevap dönen otomatik akış.",
          },
          {
            term: "Telegram Bot API",
            def: "Telegram'ın bot oluşturma ve mesaj alıp gönderme arayüzü. Bot BotFather üzerinden açılır, bir token ile yönetilir.",
          },
          {
            term: "WhatsApp Cloud API",
            def: "Meta'nın işletmeler için sunduğu WhatsApp Business Platform erişimi. Doğrulanmış işletme hesabı ve onaylı şablonlarla çalışır.",
          },
          {
            term: "Webhook",
            def: "Gelen mesajın sizin belirlediğiniz adrese anında iletilmesi. Bot kanaldan mesaj çekmez; kanal mesajı bota iter.",
          },
          {
            term: "Şablon mesaj",
            def: "WhatsApp'ta işletmenin müşteriye kendiliğinden gönderebildiği, önceden Meta onayından geçmiş sabit metin.",
          },
        ],
      },
      {
        type: "p",
        text: "İki kanalın mantığı aynıdır: mesaj gelir, webhook akışı tetikler, akış işler, cevap kanala geri yazılır. Fark erişim kurallarında ve muhatapta. **Telegram ekip içi ve teknik kullanıcı için hızlı; WhatsApp müşterinin zaten bulunduğu yer.**",
      },
      { type: "h2", text: "Telegram botu nasıl kurulur?" },
      {
        type: "p",
        text: "Telegram tarafı en düşük eşikli kanaldır. Kurulum mantığı birkaç adımdan oluşur; kodun kendisi n8n gibi bir akış aracında ya da küçük bir sunucu uygulamasında yaşar.",
      },
      {
        type: "ol",
        items: [
          "BotFather ile yeni bot açılır; bota ad ve kullanıcı adı verilir, karşılığında bir erişim token'ı alınır.",
          "Token akış aracına kimlik bilgisi olarak kaydedilir; bu token bot adına mesaj okuma ve yazma yetkisidir, gizli tutulur.",
          "Webhook ayarlanır: Telegram'a 'gelen mesajları şu adrese ilet' denir. n8n'de Telegram Trigger düğümü bunu kendisi yapar.",
          "Gelen mesaj türüne göre yol ayrılır: metin, sesli mesaj, fotoğraf, belge, komut.",
          "İşleme adımı çalışır: LLM niyeti anlar, tabloya yazılır, başka sisteme istek atılır.",
          "Bot cevap döner: düz metin, düğmeli mesaj ya da dosya.",
        ],
      },
      {
        type: "p",
        text: "Telegram'ın güçlü yanları: grup içinde çalışır, sesli mesaj ve dosya alır, düğmeli menü sunar ve işletme tarafında onay süreci yoktur. Zayıf yanı: müşterilerin çoğu Telegram kullanmaz; bu yüzden ekip içi iş takibi, saha bildirimi ve yönetici özeti için en doğru kanaldır.",
      },
      { type: "h2", text: "WhatsApp Business API için ne gerekir?" },
      {
        type: "p",
        text: "WhatsApp'ta iki ayrı dünya var. WhatsApp Business uygulaması telefonda elle kullanılır ve otomasyona kapalıdır. WhatsApp Business Platform (Cloud API) ise sunucudan mesaj alıp göndermeye izin verir; bot bu ikincisiyle kurulur.",
      },
      {
        type: "ul",
        items: [
          "Meta Business hesabı ve işletme doğrulaması: işletmenin gerçek ve size ait olduğu belgeyle doğrulanır.",
          "Ayrı bir telefon numarası: numara aynı anda kişisel WhatsApp'ta kayıtlı olamaz.",
          "Cloud API erişimi ya da bir çözüm ortağı (BSP): doğrudan Meta üzerinden veya aracı sağlayıcıyla bağlanılır.",
          "Webhook adresi: gelen mesajlar ve teslim durumları bu adrese düşer.",
          "Onaylı şablonlar: müşteriye kendiliğinden gidecek her mesaj türü için Meta onayı alınır.",
        ],
      },
      {
        type: "p",
        text: "En önemli kural konuşma penceresidir. Müşteri size yazdığında belirli bir süre boyunca serbest metinle cevap verebilirsiniz. Bu pencere dışında müşteriye yalnızca onaylı şablon mesaj gönderilebilir. Şablonlar kategorilere ayrılır (pazarlama, hizmet bildirimi, doğrulama) ve kategoriye göre farklı kurallara tabidir.",
      },
      {
        type: "p",
        text: "Bu yapı pazarlama bombardımanını engellemek için tasarlanmıştır. İşletme açısından sonuç: **randevu hatırlatma, sipariş durumu ve cevap gibi hizmet mesajları WhatsApp'ta güçlü; toplu kampanya ise izne ve şablona bağlı.**",
      },
      { type: "h2", text: "Hangi kanal ne zaman seçilmeli?" },
      {
        type: "table",
        caption: "Telegram ve WhatsApp: işletme botu için karşılaştırma",
        head: ["Ölçüt", "Telegram", "WhatsApp Cloud API"],
        rows: [
          ["Kurulum eşiği", "BotFather ile hemen", "İşletme doğrulaması + şablon onayı"],
          ["Muhatap", "Ekip, saha, yönetici", "Müşteri"],
          ["Kendiliğinden mesaj", "Serbest", "Yalnızca onaylı şablon, pencere dışında"],
          ["Sesli mesaj ve dosya", "Var", "Var"],
          ["Grup kullanımı", "Güçlü", "Sınırlı"],
          ["Maliyet yapısı", "Bot tarafında ücret yok", "Konuşma/şablon bazlı, Meta tarifesine bağlı"],
          ["Tipik kullanım", "İş takip, gider kaydı, saha bildirimi", "Randevu, sipariş durumu, müşteri sorusu"],
        ],
      },
      {
        type: "p",
        text: "Karar kuralı kısa: mesaj işletmenin içine akıyorsa Telegram, müşteriye gidiyorsa WhatsApp. Çoğu işletmede ikisi birlikte yaşar; iç kayıt Telegram'da tutulur, müşteri bildirimi WhatsApp'tan çıkar.",
      },
      { type: "h2", text: "LLM ile niyet anlama nasıl çalışır?" },
      {
        type: "p",
        text: "Kurallı bot anahtar kelime arar; 'randevu' yazmayan müşteriyi anlamaz. LLM destekli bot ise cümlenin amacını çıkarır: randevu isteği mi, fiyat sorusu mu, şikâyet mi, iç kayıt mı. Buna niyet sınıflandırma denir.",
      },
      {
        type: "p",
        text: "Niyet belli olunca model aynı cümleden alanları da çıkarır: tarih, saat, ürün, adet, kişi adı. Bu alanlar akışın sonraki düğümlerine yapılandırılmış veri olarak gider. Kullanıcı form doldurmaz; model formu kendisi doldurur.",
      },
      {
        type: "ul",
        items: [
          "Sınır koyun: Modelin hangi konularda cevap vereceği ve neyi insana devredeceği baştan yazılır.",
          "Onay isteyin: Kayıt, ödeme ve randevu gibi geri dönüşü zor işlemlerde bot özet gösterip onay alır.",
          "İnsana devir yolu bırakın: Belirsiz niyet ya da şikâyet doğrudan ilgili kişiye yönlendirilir.",
          "Bağlamı tutun: Kısa süreli sohbet hafızası, 'aynı tarihe bir tane daha' gibi cümleleri anlamayı sağlar.",
        ],
      },
      { type: "h2", text: "Müşteriye mesaj atarken izin ve KVKK nasıl ele alınır?" },
      {
        type: "p",
        text: "Müşteriye kendiliğinden gönderilen tanıtım ve kampanya mesajları Türkiye'de ticari elektronik ileti sayılır ve alıcının önceden onayını gerektirir. Bu onayların kayıt altına alındığı merkezi sistem İleti Yönetim Sistemi'dir (İYS). Hangi mesajın hangi kapsama girdiği ve istisnalar konusunda güncel mevzuat ve gerekirse hukuki danışmanlık esas alınmalıdır; bu rehber genel çerçeveyi çizer.",
      },
      {
        type: "p",
        text: "Kişisel veri tarafında bot; telefon numarası, ad ve mesaj içeriği işler. KVKK kapsamında bu verilerin neden toplandığı, nerede tutulduğu ve ne zaman silineceği açıkça belirlenmelidir. Aydınlatma metni ve veri saklama kararı, bot yayına girmeden önce hazır olmalıdır.",
      },
      {
        type: "ul",
        items: [
          "Hizmete bağlı mesaj (randevu hatırlatma, sipariş durumu) ile tanıtım mesajını ayrı ele alın.",
          "Kampanya mesajı için izni kayıtlı tutun; izni olmayan numaraya akış mesaj göndermesin.",
          "Her mesajda ayrılma yolu bırakın: 'dur' yazan kişi listeden çıkar.",
          "Bot verisini gereksiz yere saklamayın; yürütme günlüğünde kişisel veri tutma süresini sınırlayın.",
        ],
      },
      {
        type: "callout",
        title: "KARNER bu alanda ne yapar?",
        text: "KARNER n8n ve Claude API ile iş akışları ve Telegram botları kurar. Hizmet kapsamı için [Otomasyon Sistemleri](/hizmetler/otomasyon-sistemleri), somut bot senaryoları için [küçük işletme otomasyon örnekleri](/rehber/kucuk-isletme-icin-otomasyon-ornekleri) rehberine bakabilirsiniz.",
      },
      {
        type: "p",
        text: "Akış aracının kendisi için [n8n nedir](/rehber/n8n-nedir), diğer konular için [rehber ana sayfası](/rehber).",
      },
    ],
    faq: [
      {
        q: "Telegram botu için sunucu gerekir mi?",
        a: "Evet, botun mantığı bir yerde çalışmalıdır. Bu yer n8n gibi bir akış aracının barındırıldığı sunucu olabilir ya da küçük bir bulut uygulaması. Telegram yalnızca mesajı sizin webhook adresinize iletir; mesajı işleyen, tabloya yazan ve cevap üreten kısım sizin altyapınızdadır.",
      },
      {
        q: "WhatsApp botu için neden işletme doğrulaması isteniyor?",
        a: "Meta, müşterilere kendiliğinden mesaj gönderebilecek işletmelerin gerçek ve sorumlu olmasını ister. Doğrulama; spam ve dolandırıcılığı azaltmak için tasarlanmış bir eşiktir. Doğrulama tamamlanmadan şablon mesaj hakları ve gönderim kapasitesi sınırlı kalır; bu yüzden süreç bot kurulumundan önce başlatılmalıdır.",
      },
      {
        q: "Şablon mesaj nedir, neden onay gerekiyor?",
        a: "Şablon mesaj; müşteri size yazmadan sizin başlattığınız, metni önceden sabitlenmiş WhatsApp mesajıdır. Meta her şablonu kategori ve içerik açısından inceler; pazarlama, hizmet bildirimi ve doğrulama şablonları farklı kurallara tabidir. Onay, istenmeyen toplu mesajın önüne geçmek içindir.",
      },
      {
        q: "Bot müşteriyi yanlış anlarsa ne olur?",
        a: "İyi tasarlanmış bot, emin olmadığı durumda tahmin etmek yerine kısa bir doğrulama sorusu sorar ya da konuyu bir kişiye devreder. Kayıt ve randevu gibi işlemlerde her zaman özet gösterip onay alınır. Böylece yanlış anlama, yanlış kayda dönüşmeden yakalanır.",
      },
      {
        q: "Aynı botu hem Telegram hem WhatsApp'ta kullanabilir miyim?",
        a: "Evet. Mesajı işleyen akış tektir; yalnızca giriş ve çıkış düğümleri kanala göre değişir. Çoğu işletmede ekip Telegram'dan kayıt girer, müşteri bildirimi WhatsApp'tan çıkar. Aynı LLM ve aynı tablo iki kanala birden hizmet eder.",
      },
    ],
    related: ["n8n-nedir", "kucuk-isletme-icin-otomasyon-ornekleri"],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
];
