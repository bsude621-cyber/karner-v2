import type { Guide } from "./types";

/**
 * Mobil kümesi rehberleri — pillar ve hizmet: /hizmetler/mobil-uygulama.
 * Kural: genel teknik bilgi + belgeli KARNER gerçeği. Fiyat, süre garantisi,
 * mağaza inceleme süresi, yüzde/sayı iddiası ve müşteri sözü yazılmaz.
 */
export const MOBIL_GUIDES: Guide[] = [
  {
    slug: "mobil-uygulama-mi-web-uygulamasi-mi",
    title: "Mobil Uygulama mı Web Uygulaması mı? Hangisini Seçmeli?",
    seoTitle: "Mobil Uygulama mı Web Uygulaması mı (PWA)? | KARNER",
    seoDescription:
      "Mobil uygulama mı web uygulaması (PWA) mı? Mağaza varlığı, bildirim, cihaz erişimi, maliyet ve bakım yapısı, güncelleme hızı ve keşfedilebilirlik açısından karar tablosu.",
    summary:
      "Mağazada yer almak, güvenilir bildirim ve derin cihaz erişimi gerekiyorsa mobil uygulama; anında güncelleme, tek adresten erişim ve düşük giriş eşiği önemliyse web uygulaması veya PWA seçilir. Expo ile tek kod tabanından iOS ve Android üretmek, iki ayrı native proje maliyetini ortadan kaldırır.",
    cluster: "mobil",
    pillar: { href: "/hizmetler/mobil-uygulama", label: "Mobil Uygulama" },
    serviceSlug: "mobil-uygulama",
    blocks: [
      {
        type: "h2",
        text: "Mobil uygulama ile web uygulaması arasındaki fark nedir?",
      },
      {
        type: "dl",
        items: [
          {
            term: "Native uygulama",
            def: "iOS için Swift, Android için Kotlin ile ayrı ayrı yazılan, mağazadan yüklenen uygulama. İki kod tabanı, iki ekip.",
          },
          {
            term: "Cross-platform uygulama",
            def: "Expo / React Native gibi araçlarla tek kod tabanından iOS ve Android için üretilen, yine mağazadan yüklenen uygulama.",
          },
          {
            term: "Web uygulaması",
            def: "Tarayıcıda çalışan, adresle açılan uygulama. Yükleme gerektirmez, her cihazda aynıdır.",
          },
          {
            term: "PWA (Progressive Web App)",
            def: "Ana ekrana eklenebilen, çevrimdışı çalışabilen ve sınırlı bildirim gönderebilen web uygulaması.",
          },
          {
            term: "Push bildirimi",
            def: "Uygulama kapalıyken cihaza düşen mesaj. Native ve cross-platform'da tam, web'de platforma göre sınırlı.",
          },
          {
            term: "Mağaza",
            def: "App Store ve Google Play. Dağıtım, güven ve keşif kanalı; inceleme sürecinden geçmeyi gerektirir.",
          },
        ],
      },
      {
        type: "p",
        text: "İkisi de telefonda çalışır; fark nerede yaşadıklarındadır. Mobil uygulama cihaza yüklenir, mağazadan gelir ve işletim sistemiyle derin konuşur. Web uygulaması bir adreste yaşar, tarayıcının izin verdiği kadarını kullanır.",
      },
      {
        type: "p",
        text: "Bu fark iş sonuçlarına dönüşür: ziyaretçi sizi nasıl bulacak, nasıl geri gelecek, hangi cihaz özelliklerini kullanacak, güncellemeyi ne kadar hızlı alacak. **Doğru seçim teknolojiden değil, kullanıcının uygulamayla kuracağı ilişkiden başlar.**",
      },
      {
        type: "h2",
        text: "Mağaza varlığı ve keşfedilebilirlik nasıl karşılaştırılır?",
      },
      {
        type: "p",
        text: "Mobil uygulama mağazada listelenir. Mağaza sayfası bir güven işaretidir; kullanıcı puanları, ekran görüntüleri ve kurum adı tek yerde durur. Ancak mağaza içinde bulunmak ayrı bir rekabettir; uygulama yüklendikten sonra da ana ekranda yaşaması gerekir.",
      },
      {
        type: "p",
        text: "Web uygulaması arama motorlarında bulunur ve bağlantıyla paylaşılır. Kullanıcı yüklemeden dener; ilk temas eşiği düşüktür. Buna karşılık ana ekranda simgesi yoktur, geri dönüş kullanıcının hatırlamasına bağlıdır.",
      },
      {
        type: "h2",
        text: "Bildirim ve cihaz erişiminde hangisi güçlü?",
      },
      {
        type: "p",
        text: "Push bildirimi, kullanıcıyı geri getirmenin en doğrudan yoludur. Native ve cross-platform uygulamalarda bildirim tam ve güvenilirdir. Web uygulamasında bildirim platforma bağlıdır; Android'de geniş desteklenir, iOS'ta yalnızca ana ekrana eklenmiş web uygulamalarında ve sınırlı biçimde çalışır.",
      },
      {
        type: "p",
        text: "Cihaz erişiminde de tablo benzerdir. Kamera, konum ve dosya gibi temel yetenekler tarayıcıdan kullanılabilir. Arka planda konum, Bluetooth cihazlarla sürekli iletişim, sağlık verileri, NFC ödeme ve işletim sistemi widget'ları ise uygulama gerektirir. **Uygulama fikri cihazın derinine iniyorsa web seçeneği erken elenir.**",
      },
      { type: "h2", text: "Maliyet ve bakım yapısı nasıl ayrışır?" },
      {
        type: "p",
        text: "Web uygulaması tek kod tabanıdır ve tek yerde yayınlanır; geliştirme ve bakım maliyeti genellikle en düşük olandır. Mağaza ücreti ve inceleme süreci yoktur.",
      },
      {
        type: "p",
        text: "Native uygulama iki ayrı kod tabanı demektir: iOS ve Android için ayrı geliştirme, ayrı test, ayrı bakım. Cross-platform yaklaşım bu yükü büyük ölçüde ortadan kaldırır; Expo / React Native ile tek kod tabanından iki platform üretilir, tek ekip bakar. Mağaza geliştirici hesapları ve her sürümün inceleme süreci yine bakımın parçasıdır. Rakamlar projeye bağlıdır; yapıyı karşılaştırmak için [mobil uygulama hizmeti](/hizmetler/mobil-uygulama) sayfasındaki kapsamı inceleyebilirsiniz.",
      },
      {
        type: "h2",
        text: "Güncelleme hızı: mağaza incelemesi mi anında yayın mı?",
      },
      {
        type: "p",
        text: "Web uygulamasında güncelleme anında yayındadır; kullanıcı sayfayı yenilediğinde yeni sürümü görür. Hata düzeltmek ve özellik eklemek aynı gün mümkündür.",
      },
      {
        type: "p",
        text: "Mağaza uygulamasında her sürüm incelemeden geçer ve kullanıcı güncellemeyi cihazına almalıdır. Expo gibi araçlar, yalnızca JavaScript katmanını etkileyen değişiklikleri kablosuz güncelleme ile mağazaya uğramadan iletebilir; native katman değiştiğinde ise mağaza sürümü gerekir. Süreç ayrıntısı [mobil uygulama geliştirme süreci](/rehber/mobil-uygulama-gelistirme-sureci) rehberinde.",
      },
      {
        type: "table",
        caption: "Mobil uygulama ile web uygulaması / PWA karar tablosu",
        head: ["Ölçüt", "Mobil uygulama (Expo / native)", "Web uygulaması / PWA"],
        rows: [
          [
            "Mağaza varlığı",
            "App Store ve Google Play'de listelenir",
            "Yok; adres ve arama motoruyla bulunur",
          ],
          [
            "Push bildirimi",
            "Tam ve güvenilir",
            "Android'de geniş, iOS'ta sınırlı",
          ],
          [
            "Cihaz erişimi",
            "Arka plan, Bluetooth, NFC, widget dâhil derin",
            "Kamera, konum gibi temel yetenekler",
          ],
          [
            "Çevrimdışı çalışma",
            "Tam kontrol",
            "PWA ile kısmi, önbelleğe bağlı",
          ],
          [
            "Güncelleme hızı",
            "Mağaza incelemesi; JS katmanı kablosuz",
            "Anında",
          ],
          [
            "Maliyet ve bakım yapısı",
            "Expo ile tek kod; mağaza hesapları ve inceleme ek yük",
            "Tek kod, tek yayın; en hafif",
          ],
          [
            "Keşfedilebilirlik",
            "Mağaza araması, ana ekran simgesi",
            "Web araması, bağlantı paylaşımı",
          ],
          [
            "İlk kullanım eşiği",
            "Yükleme gerekir",
            "Bağlantıya tıklamak yeterli",
          ],
        ],
      },
      { type: "h2", text: "Şu durumda şunu seçin" },
      {
        type: "ul",
        items: [
          "**Düzenli geri dönüş ve bildirim işin kalbiyse** (sipariş takibi, randevu hatırlatma, sadakat) mobil uygulama seçin.",
          "**Uygulama cihazın derinine iniyorsa** (arka plan konum, Bluetooth cihaz, NFC, sağlık verisi) mobil uygulama seçin; web erken elenir.",
          "**Mağazada görünmek güven ve pazarlama için gerekiyorsa** mobil uygulama seçin; Expo ile iOS ve Android tek kod tabanından çıkar.",
          "**Kullanıcı ara sıra gelecek, tek işlem yapıp çıkacaksa** (rezervasyon formu, fiyat hesaplama, katalog) web uygulaması seçin.",
          "**Fikri hızlı denemek ve her gün güncellemek istiyorsanız** web uygulaması veya PWA ile başlayın; ihtiyaç kanıtlanınca mobil uygulamaya geçin.",
          "**Kurum içi araçta** (saha ekibi, stok, görev takibi) cihaz yetenekleri gerekiyorsa uygulama, yalnızca form ve liste ise web yeterlidir.",
        ],
      },
      {
        type: "callout",
        title: "KARNER mobilde nasıl çalışır?",
        text: "KARNER mobilde Expo ile tek kod tabanından iOS ve Android üretir; web tarafında siteleri Next.js ve Astro ile kurar. Aynı ekip her iki yolu da bildiği için karar, teknolojiden değil ihtiyaçtan başlar. Kapsam için [mobil uygulama hizmeti](/hizmetler/mobil-uygulama) sayfasına bakabilirsiniz.",
      },
      { type: "h2", text: "İkisini birlikte kurmak mümkün mü?" },
      {
        type: "p",
        text: "Mümkün ve yaygındır. Çoğu ürün hem web hem mobil uygulamaya sahiptir; web ilk temas ve arama görünürlüğünü, mobil uygulama geri dönüş ve derin kullanımı taşır. Supabase gibi tek bir backend her iki yüzeyi birlikte besler.",
      },
      {
        type: "p",
        text: "Sıra önemlidir. Talep belirsizse web ile başlamak ucuz ve hızlıdır; kullanım kanıtlandığında aynı backend üstüne Expo ile mobil uygulama eklenir. Baştan mobil başlamak ise bildirim ve cihaz erişiminin ilk günden gerektiği ürünlerde doğrudur. Web tarafının hız ölçütleri için [Core Web Vitals rehberine](/rehber/core-web-vitals-nedir), tüm rehberler için [rehber merkezine](/rehber) bakabilirsiniz.",
      },
    ],
    faq: [
      {
        q: "PWA mağazaya yüklenebilir mi?",
        a: "Google Play, PWA'nın paketlenip yayımlanmasına izin verir; App Store'da ise doğrudan PWA listelenmez, uygulama paketi gerekir. Bu yüzden iki mağazada da yer almak isteyen ürünler için Expo gibi cross-platform yaklaşım daha düz bir yoldur. PWA, mağaza dışı dağıtımın güçlü olduğu senaryolarda mantıklıdır.",
      },
      {
        q: "Expo ile yapılan uygulama gerçek native gibi mi hisseder?",
        a: "Evet; arayüz bileşenleri platformun kendi bileşenlerine çizilir, kaydırma ve geçişler native'dir. Kamera, bildirim, konum gibi yetenekler hazır modüllerle gelir. Çok özel donanım entegrasyonu veya yoğun grafik gerektiren oyunlar gibi uç durumlarda tam native tercih edilebilir; kurumsal ve ticari uygulamaların büyük kısmı için Expo yeterlidir.",
      },
      {
        q: "Önce web uygulaması yapıp sonra mobile geçmek israf mı?",
        a: "Değil, doğru kurulduğunda kazançtır. Backend, veri modeli ve iş kuralları her iki yüzeyde ortaktır; mobil uygulama yalnızca yeni bir arayüz katmanı ekler. İsraf, web'i atılacak prototip gibi kurup backend'i baştan yazmak zorunda kalmaktır. Başlangıçta iki yüzeyi de hesaba katan mimari bunu önler.",
      },
      {
        q: "Web uygulamasına ana ekran simgesi eklenebilir mi?",
        a: "Evet; PWA olarak hazırlanan web uygulaması hem Android hem iOS'ta ana ekrana eklenebilir ve tam ekran açılır. Kullanıcı bunu kendisi yapmalıdır, mağazadaki \"Yükle\" düğmesi kadar doğal değildir. Bu yüzden PWA, geri dönüşü bildirime değil alışkanlığa dayanan ürünlerde daha iyi çalışır.",
      },
      {
        q: "Küçük işletme için mobil uygulama gerçekten gerekli mi?",
        a: "Çoğu zaman önce hayır. Müşterinin sizi bulup bir işlem yapması yeterliyse hızlı bir web sitesi veya web uygulaması daha iyi sonuç verir. Uygulama, tekrar eden kullanım ve bildirim ihtiyacı kanıtlandığında anlam kazanır: sadakat programı, sipariş takibi, randevu. Bu ihtiyaç yoksa mağazadaki uygulama yüklenmeden unutulur.",
      },
    ],
    related: [
      "mobil-uygulama-gelistirme-sureci",
      "core-web-vitals-nedir",
      "web-sitesi-hizi-neden-onemli",
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
  {
    slug: "mobil-uygulama-gelistirme-sureci",
    title: "Mobil Uygulama Geliştirme Süreci: Fikirden Mağazaya Adımlar",
    seoTitle: "Mobil Uygulama Geliştirme Süreci Adım Adım | KARNER",
    seoDescription:
      "Mobil uygulama geliştirme süreci adım adım: keşif ve kapsam, UX akışı, tasarım, Expo ve Supabase ile geliştirme, TestFlight testi, App Store ve Google Play yayın gereksinimleri, yayın sonrası.",
    summary:
      "Mobil uygulama geliştirme süreci keşif ve kapsamla başlar, UX akışı ve tasarımla devam eder; Expo ve Supabase gibi araçlarla geliştirilir, TestFlight ve Internal testing ile test edilir, App Store ve Google Play'in geliştirici hesabı, gizlilik politikası ve inceleme gereksinimleriyle yayımlanır. Yayın sonrası analitik, çökme takibi ve güncelleme sürer.",
    cluster: "mobil",
    pillar: { href: "/hizmetler/mobil-uygulama", label: "Mobil Uygulama" },
    serviceSlug: "mobil-uygulama",
    blocks: [
      { type: "h2", text: "Mobil uygulama geliştirme süreci nasıl işler?" },
      {
        type: "dl",
        items: [
          {
            term: "Keşif",
            def: "Kim, neden, hangi işlemi yapacak sorularının cevaplandığı ilk aşama. Kapsamın sınırı burada çizilir.",
          },
          {
            term: "MVP",
            def: "Ürünün, ana değeri kanıtlamaya yetecek en küçük sürümü. İlk mağaza sürümü genellikle budur.",
          },
          {
            term: "Expo",
            def: "React Native üzerine kurulu araç seti. Tek kod tabanından iOS ve Android üretir; derleme ve mağaza gönderimini kolaylaştırır.",
          },
          {
            term: "Supabase",
            def: "PostgreSQL tabanlı backend hizmeti: kimlik doğrulama, veritabanı, dosya depolama ve gerçek zamanlı veri.",
          },
          {
            term: "TestFlight",
            def: "Apple'ın yayın öncesi test dağıtım aracı. Davetli kullanıcılar uygulamayı mağazaya çıkmadan dener.",
          },
          {
            term: "Internal testing",
            def: "Google Play'in kapalı test kanalı. Belirli e-posta listesine yayın öncesi sürüm dağıtılır.",
          },
        ],
      },
      {
        type: "p",
        text: "Mobil uygulama bir web sitesinden daha uzun yaşar ve daha sıkı kurallara tabidir; mağazalar her sürümü inceler, kullanıcı cihazında kalıcıdır. Bu yüzden süreç baştan planlanır ve her aşama bir sonrakine girdi üretir.",
      },
      {
        type: "p",
        text: "**İyi bir mobil proje, yazılan kod miktarıyla değil, keşif aşamasında elenen özelliklerle tanınır.** Aşağıdaki adımlar fikirden mağazaya giden yolu sırayla açıklar.",
      },
      { type: "h2", text: "Adım adım: fikirden mağazaya" },
      {
        type: "ol",
        items: [
          "**Keşif ve kapsam:** hedef kullanıcı, çözülen sorun, ilk sürümün sınırı ve başarı ölçütü yazılır. Gereksiz özellikler burada elenir.",
          "**UX akışı:** kullanıcının uygulamaya girişten hedefe ulaşana kadar geçtiği ekranlar kâğıt üstünde çizilir; her ekranın tek bir görevi olur.",
          "**Tasarım:** akış, marka diliyle yüksek çözünürlüklü ekranlara dönüşür; iOS ve Android alışkanlıkları ayrı gözetilir, tıklanabilir prototip çıkar.",
          "**Backend kurulumu:** veri modeli, kimlik doğrulama, yetki kuralları ve depolama Supabase gibi bir altyapıda kurulur; yönetim paneli gerekiyorsa burada planlanır.",
          "**Geliştirme:** Expo ile tek kod tabanında ekranlar ve iş kuralları yazılır; her sprint sonunda çalışan sürüm cihazda denenir.",
          "**Test:** TestFlight (iOS) ve Internal testing (Android) ile gerçek kullanıcılara dağıtılır; çökme, akış kopukluğu ve cihaz farkları düzeltilir.",
          "**Mağaza hazırlığı:** geliştirici hesapları, uygulama adı, açıklama, ekran görüntüleri, gizlilik politikası ve veri beyanları tamamlanır.",
          "**Yayın ve inceleme:** sürüm gönderilir, mağaza inceler, gerekirse düzeltme yapılır; onayla birlikte uygulama yayındadır.",
          "**Yayın sonrası:** analitik ve çökme takibi izlenir, geri bildirim toplanır, güncellemeler planlı sürümlerle çıkar.",
        ],
      },
      { type: "h2", text: "Keşif ve kapsam aşamasında ne belirlenir?" },
      {
        type: "p",
        text: "Keşif, projenin en ucuz ama en belirleyici aşamasıdır. Üç soru cevaplanır: kullanıcı kim, uygulamayı açınca ne yapmak istiyor, bunu bugün nasıl yapıyor. Cevaplar ekran sayısını ve backend ihtiyacını doğrudan belirler.",
      },
      {
        type: "p",
        text: "Kapsam yazılı olmalıdır: ilk sürümde ne var, ne yok. \"Sonra ekleriz\" listesi, \"şimdi yapıyoruz\" listesi kadar önemlidir. Bu netlik olmadan teklif de takvim de tutmaz. Uygulama mı web mi kararı henüz verilmediyse önce [mobil uygulama mı web uygulaması mı](/rehber/mobil-uygulama-mi-web-uygulamasi-mi) rehberine bakın.",
      },
      { type: "h2", text: "Geliştirme hangi araçlarla yapılır?" },
      {
        type: "p",
        text: "Cross-platform yaklaşımda Expo / React Native tek kod tabanından iOS ve Android üretir. Kamera, bildirim, konum gibi yetenekler hazır modüllerle gelir; derleme ve mağaza gönderimi Expo'nun bulut hizmetiyle yürütülür. Tek ekip iki platformu birlikte geliştirir ve bakar.",
      },
      {
        type: "p",
        text: "Backend tarafında Supabase, PostgreSQL veritabanı, kimlik doğrulama, dosya depolama ve gerçek zamanlı veriyi tek hizmette toplar; satır düzeyinde yetki kuralları verinin kimin tarafından görülebileceğini veritabanında tanımlar. İşletmenin siparişleri, kullanıcıları ve içeriği yönetmesi için yanına Next.js ile bir yönetim paneli eklenir.",
      },
      {
        type: "p",
        text: "**Teknoloji seçiminin ölçütü şudur: ekip büyümeden de uygulama bakılabilir kalmalı.** Yaygın, belgeli ve aktif geliştirilen araçlar bu ölçütü karşılar.",
      },
      { type: "h2", text: "Test aşaması nasıl yürütülür?" },
      {
        type: "p",
        text: "Geliştirici cihazında çalışan uygulama, gerçek kullanıcı cihazında farklı davranabilir: ekran boyutu, işletim sistemi sürümü, bağlantı kalitesi, izin diyalogları. Bu yüzden yayın öncesi gerçek kişilere dağıtım şarttır.",
      },
      {
        type: "p",
        text: "iOS'ta TestFlight, davetli kullanıcılara sürümü mağaza dışından dağıtır ve geri bildirim toplar. Android'de Google Play'in Internal testing ve kapalı test kanalları aynı işi görür. Bu turda çökme raporları, takılan akışlar ve anlaşılmayan ekranlar düzeltilir; test listesi yazılı tutulur.",
      },
      { type: "h2", text: "App Store ve Google Play ne ister?" },
      {
        type: "table",
        caption: "Mağaza yayın gereksinimlerinin karşılaştırması",
        head: ["Gereksinim", "App Store (Apple)", "Google Play (Google)"],
        rows: [
          [
            "Geliştirici hesabı",
            "Apple Developer Program üyeliği; yıllık yenilenir",
            "Google Play Console geliştirici hesabı; kayıt ücreti vardır",
          ],
          [
            "Gizlilik politikası",
            "Zorunlu; mağaza sayfasında ve uygulama içinde bağlantı",
            "Zorunlu; mağaza sayfasında ve uygulama içinde bağlantı",
          ],
          [
            "Veri beyanı",
            "Uygulama gizliliği etiketleri (toplanan veri türleri)",
            "Veri güvenliği formu (toplanan ve paylaşılan veriler)",
          ],
          [
            "Mağaza varlıkları",
            "Simge, ekran görüntüleri, açıklama, yaş derecelendirmesi",
            "Simge, ekran görüntüleri, açıklama, içerik derecelendirmesi",
          ],
          [
            "Yayın öncesi test",
            "TestFlight (isteğe bağlı ama önerilir)",
            "Internal / kapalı test; yeni kişisel hesaplarda kapalı test şartı olabilir",
          ],
          [
            "İnceleme",
            "Her sürüm insan incelemesinden geçer; kurallara uymayan sürüm reddedilir",
            "Otomatik ve insan incelemesi; politika ihlali sürümü durdurur",
          ],
          [
            "Hesap sahibi",
            "İşletmenin kendi hesabı önerilir",
            "İşletmenin kendi hesabı önerilir",
          ],
        ],
      },
      {
        type: "p",
        text: "İki mağaza da gizlilik politikasını zorunlu tutar; kullanıcı verisi toplayan her uygulama, neyi neden topladığını mağaza formunda beyan eder ve politika metniyle tutarlı olmalıdır. İnceleme süresi sürüme, mağazaya ve döneme göre değişir; takvime kesin süre yazılmaz, yayın tarihi için pay bırakılır.",
      },
      {
        type: "p",
        text: "Geliştirici hesaplarının işletme adına açılması önemlidir. Hesap ajansta kalırsa uygulama, puanları ve kullanıcı tabanı da ajansın hesabında kalır; web sitesinde domainin kimde olduğu neyse mobilde geliştirici hesabı odur.",
      },
      { type: "h2", text: "Yayın sonrası ne yapılır?" },
      {
        type: "ul",
        items: [
          "**Analitik:** hangi ekran açılıyor, kullanıcı nerede bırakıyor, hangi özellik kullanılmıyor. Kararlar bu veriyle alınır.",
          "**Çökme takibi:** cihaz ve sürüm bazında hata raporları toplanır; tekrar eden çökme ilk düzeltme önceliğidir.",
          "**Güncelleme:** Expo'nun kablosuz güncellemesi JavaScript değişikliklerini mağazaya uğramadan iletir; native değişiklik için yeni mağaza sürümü çıkar.",
          "**İşletim sistemi uyumu:** her yıl gelen iOS ve Android sürümleriyle uygulama test edilir, gerekli güncellemeler yapılır.",
          "**Mağaza bakımı:** yorumlara cevap, güncel ekran görüntüleri, politika değişikliklerine uyum.",
        ],
      },
      {
        type: "callout",
        title: "KARNER'de mobil süreç",
        text: "KARNER mobilde Expo ile tek kod tabanından iOS ve Android üretir. Aynı ekip web tarafında Next.js ve Astro ile çalıştığı için yönetim paneli ve uygulama tek projede kurulur. Kapsam ve adımlar için [mobil uygulama hizmeti](/hizmetler/mobil-uygulama) sayfasına bakabilirsiniz.",
      },
      { type: "h2", text: "Süreçte en sık nerede takılınır?" },
      {
        type: "p",
        text: "Üç noktada. Birincisi kapsam şişmesi: keşifte elenmeyen özellikler geliştirmeyi uzatır. İkincisi mağaza reddi: gizlilik beyanı eksik, test hesabı verilmemiş ya da uygulama içi satın alma kuralı atlanmıştır. Üçüncüsü yayın sonrası sessizlik: analitik kurulmadığı için ne olduğu bilinmez.",
      },
      {
        type: "p",
        text: "Üçü de sürecin başında çözülür: yazılı kapsam, mağaza gereksinimlerinin geliştirme sırasında hazırlanması ve ilk sürümle birlikte kurulan ölçüm. Karar aşaması için [mobil uygulama mı web uygulaması mı](/rehber/mobil-uygulama-mi-web-uygulamasi-mi) rehberine, diğer konular için [rehber merkezine](/rehber) bakabilirsiniz.",
      },
    ],
    faq: [
      {
        q: "Mobil uygulama geliştirme ne kadar sürer?",
        a: "Kapsama bağlıdır; tek bir süre vermek yanıltıcı olur. Belirleyici etkenler ekran sayısı, backend karmaşıklığı, üçüncü taraf entegrasyonlar ve test turu sayısıdır. Mağaza incelemesi de takvime ayrıca eklenir ve kontrolünüz dışındadır. Yazılı kapsam olmadan süre tahmini değil, tahmin oyunudur; bu yüzden süreç keşifle başlar.",
      },
      {
        q: "Geliştirici hesabını kim açmalı?",
        a: "İşletme kendi adına açmalıdır. Apple ve Google hesapları uygulamanın, puanlarının ve kullanıcı tabanının bağlı olduğu yerdir; ajansın hesabında kalırsa uygulama fiilen ajansa ait olur. Ajansa yalnızca geliştirme ve yayın için takım üyesi yetkisi verilir. Bu, web sitesinde domainin müşteri adına kayıtlı olması kuralının mobildeki karşılığıdır.",
      },
      {
        q: "Mağaza uygulamayı reddederse ne olur?",
        a: "Red, gerekçesiyle birlikte gelir; çoğu zaman eksik gizlilik beyanı, inceleyici için test hesabı verilmemesi, çalışmayan bir akış ya da politika uyumsuzluğudur. Gerekçe düzeltilir ve sürüm yeniden gönderilir. Deneyimli bir ekip yaygın red nedenlerini geliştirme sırasında kapatır; red süreci durdurmaz, yalnızca bir tur ekler.",
      },
      {
        q: "Uygulama yayınlandıktan sonra bakım şart mı?",
        a: "Şart. İşletim sistemleri her yıl güncellenir, mağaza politikaları değişir, kütüphaneler yenilenir. Bakımsız uygulama bir noktada yeni cihazlarda çökmeye veya mağazadan kaldırılmaya başlar. Bakım; çökme takibi, bağımlılık güncellemesi, işletim sistemi uyum testi ve politika değişikliklerine uyumdan oluşur ve yazılı kapsamla anlaşılır.",
      },
      {
        q: "Expo ile başlayıp sonra native'e geçmek gerekir mi?",
        a: "Çoğu kurumsal ve ticari uygulamada gerekmez. Expo, native modüllere erişim sağlar ve özel native kod eklenmesine izin verir; uç ihtiyaçlar proje içinde çözülür. Tam native'e geçiş yalnızca yoğun grafik, çok özel donanım ya da platforma çok sıkı bağlı deneyim gerektiren ürünlerde gündeme gelir. Karar, keşifte belirlenen ihtiyaçla verilir.",
      },
    ],
    related: [
      "mobil-uygulama-mi-web-uygulamasi-mi",
      "web-sitesi-yaptirmadan-once-sorulacak-sorular",
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
];
