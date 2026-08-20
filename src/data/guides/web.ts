import type { Guide } from "./types";

/**
 * Web kümesi rehberleri — pillar: /3d-web-sitesi, hizmet: web-sitesi-gelistirme.
 * Kural: genel teknik bilgi + belgeli KARNER gerçeği. Fiyat, süre garantisi,
 * yüzde/sayı iddiası, müşteri sözü yazılmaz. Google'ın yayımladığı resmi
 * eşikler (Core Web Vitals) yazılabilir.
 */
export const WEB_GUIDES: Guide[] = [
  {
    slug: "web-sitesi-yaptirmadan-once-sorulacak-sorular",
    title: "Web Sitesi Yaptırmadan Önce Ajansa Sorulacak 12 Soru",
    seoTitle: "Web Sitesi Yaptırmadan Önce Sorulacak Sorular | KARNER",
    seoDescription:
      "Web sitesi yaptırmadan önce sorulacak 12 soru: domain kimde kalır, kaynak kod teslim edilir mi, hız ölçütü ne, KVKK ve bakım nasıl? İyi cevap ölçütleriyle.",
    summary:
      "Web sitesi yaptırmadan önce ajansa mülkiyet (domain, hosting, kaynak kod), ölçülebilir hız ölçütü, yapısal veri, mobil test, yönetim paneli, bakım kapsamı, KVKK uyumu, teslim sonrası destek ve revizyon sınırı sorulmalıdır. İyi cevap her zaman yazılı, ölçülebilir ve sizin adınıza kayıtlı olandır.",
    cluster: "web",
    pillar: { href: "/3d-web-sitesi", label: "3D Web Sitesi" },
    serviceSlug: "web-sitesi-gelistirme",
    blocks: [
      {
        type: "h2",
        text: "Web sitesi yaptırmadan önce hangi sorular sorulmalı?",
      },
      {
        type: "dl",
        items: [
          {
            term: "Domain",
            def: "Sitenin adresi, yani alan adı. Kaydın kimin adına olduğu, sitenin kime ait olduğunu belirler.",
          },
          {
            term: "Hosting",
            def: "Site dosyalarının çalıştığı sunucu veya bulut hizmeti. Hesap sahibi siteyi açabilir, kapatabilir, taşıyabilir.",
          },
          {
            term: "Kaynak kod",
            def: "Siteyi oluşturan düzenlenebilir dosyaların tamamı. Teslim edilmezse başka bir ekip siteyi sürdüremez.",
          },
          {
            term: "Core Web Vitals",
            def: "Google'ın sayfa deneyimini ölçtüğü üç metrik: LCP, INP ve CLS. Hız sözünün ölçülebilir hâli.",
          },
          {
            term: "Yapısal veri",
            def: "Arama motorlarına ve yapay zekâ botlarına sayfanın ne anlattığını söyleyen schema.org işaretlemesi.",
          },
          {
            term: "KVKK",
            def: "Kişisel Verilerin Korunması Kanunu. Form ve çerez kullanan her site için aydınlatma yükümlülüğü doğurur.",
          },
        ],
      },
      {
        type: "p",
        text: "Web sitesi teklifi alan işletme sahibi çoğu zaman tasarımı konuşur. Oysa teslimden sonra sorun çıkaran konular başka yerdedir: mülkiyet, hız, yasal uyum ve bakım. **Doğru sorular teklif aşamasında sorulursa sözleşmeye girer; sonradan sorulursa ek maliyete dönüşür.**",
      },
      {
        type: "p",
        text: "Aşağıdaki liste, ajansla ilk görüşmede masaya konacak 12 soruyu ve her birinin iyi cevabını içerir. Listeyi olduğu gibi gönderebilir ya da teklif karşılaştırma tablosu olarak kullanabilirsiniz.",
      },
      { type: "h2", text: "Ajansa sorulacak 12 soru ve iyi cevap ölçütleri" },
      {
        type: "ol",
        items: [
          "**Domain kimin adına kaydedilecek?** İyi cevap: sizin adınıza, sizin hesabınızda. Ajans yalnızca teknik yönetim yetkisi alır; kayıt sahibi siz kalırsınız.",
          "**Hosting hesabı kimde olacak, erişim teslim edilecek mi?** İyi cevap: hesap sizin adınıza açılır ya da teslimde tüm erişim size devredilir. Hizmet bedelini doğrudan sağlayıcıya ödersiniz.",
          "**Kaynak kod teslim edilecek mi, hangi biçimde?** İyi cevap: evet, Git deposu olarak ve sizin erişiminizdeki bir hesapta. Derlenmiş çıktı değil, düzenlenebilir kaynak teslim edilir.",
          "**Hız hangi ölçütle kanıtlanacak?** İyi cevap: Lighthouse puanı ve Core Web Vitals eşikleri sözleşmeye yazılır; teslimde mobil ölçüm raporu verilir. \"Hızlı olacak\" sözü ölçüt değildir.",
          "**Yapısal veri (schema.org) kurulacak mı?** İyi cevap: evet; kuruluş, hizmet, sayfa ve SSS işaretlemeleri teslimin parçasıdır ve Google'ın zengin sonuç testiyle doğrulanır.",
          "**Site mobilde nasıl test edilecek?** İyi cevap: gerçek cihazlarda ve farklı ekran genişliklerinde. Tasarım mobil öncelikli düşünülür; masaüstü sonradan küçültülmez.",
          "**İçeriği kendim güncelleyebilecek miyim?** İyi cevap: evet; yönetim paneli veya içerik yönetim sistemi teslim edilir ve sizin düzenleyebildiğiniz alanlar yazılı listelenir.",
          "**Bakım neleri kapsıyor?** İyi cevap: güvenlik güncellemeleri, yedekleme, çalışırlık kontrolü ve küçük içerik düzeltmeleri yazılı tanımlanır; kapsam dışı işin nasıl ücretlendirileceği belirtilir.",
          "**KVKK aydınlatma metni ve çerez yönetimi dâhil mi?** İyi cevap: form ve çerez için teknik altyapı kurulur; metinlerin hukuki içeriğini sizin danışmanınız onaylar.",
          "**Teslim sonrası destek nasıl işliyor?** İyi cevap: hata bildirimi için tek bir kanal, tanımlı yanıt süresi ve garanti kapsamında düzeltilecek hata türleri yazılır.",
          "**Kaç revizyon turu var, revizyon neyi kapsıyor?** İyi cevap: tasarım ve içerik için ayrı tur sayısı, her turun kapsamı ve ek turun koşulu sözleşmede yer alır.",
          "**Sözleşme biterse site çalışmaya devam eder mi?** İyi cevap: evet. Domain, hosting ve kod sizde olduğu için başka bir ekip ek izin almadan devam edebilir.",
        ],
      },
      { type: "h2", text: "Mülkiyet neden en kritik soru?" },
      {
        type: "p",
        text: "Domain, hosting ve kaynak kod üçlüsü sitenin tapusudur. Üçü de sizin adınıza değilse site size ait değildir; kiralanmış demektir.",
      },
      {
        type: "p",
        text: "Yaygın sorun şudur: domain ajansın hesabında kayıtlıdır, ajans kapanır ya da anlaşmazlık çıkar, site ve kurumsal e-posta adresleri birlikte erişilemez olur. Bu riskin tek önlemi kayıt sahibinin baştan siz olmanızdır.",
      },
      {
        type: "p",
        text: "Kaynak kod teslimi de aynı mantıkla çalışır. **Kodu teslim etmeyen ajans sizi kendine bağımlı kılar; kodu teslim eden ajans işine güvenir.** Modern bir sitede bu teslim, Git deposuna erişim vermekle yapılır.",
      },
      { type: "h2", text: "Hız ve teknik kalite nasıl kanıtlanır?" },
      {
        type: "p",
        text: "Hız sözü ölçülebilir olmalıdır. Google, sayfa deneyimini Core Web Vitals adlı üç metrikle ölçer: LCP (en büyük içeriğin görünme süresi), INP (etkileşime yanıt gecikmesi) ve CLS (düzen kayması). Ayrıntı için [Core Web Vitals rehberine](/rehber/core-web-vitals-nedir) bakabilirsiniz.",
      },
      {
        type: "p",
        text: "Teklifte şu soru yeterlidir: teslimde PageSpeed Insights mobil raporunu paylaşacak mısınız? Rapor paylaşılıyorsa ajans kendi işini ölçüyor demektir.",
      },
      {
        type: "table",
        caption: "Teknik kalite sorularında iyi cevap ve uyarı işareti",
        head: ["Soru", "İyi cevap", "Uyarı işareti"],
        rows: [
          [
            "Hız ölçütü",
            "Lighthouse ve Core Web Vitals raporu teslimde paylaşılır",
            "\"Hızlı olur\" sözü, rapor yok",
          ],
          [
            "Yapısal veri",
            "schema.org grafiği kurulur, test aracıyla doğrulanır",
            "\"SEO uyumlu\" ifadesi, ayrıntı yok",
          ],
          [
            "Mobil",
            "Mobil öncelikli tasarım, gerçek cihaz testi",
            "Yalnızca tarayıcı penceresini küçülterek kontrol",
          ],
          [
            "Yapay zekâ botları",
            "robots.txt ve llms.txt ile açık erişim",
            "Konu hiç gündeme gelmiyor",
          ],
          [
            "Yönetim paneli",
            "Düzenlenebilir alanların yazılı listesi",
            "\"Her şeyi değiştirebilirsiniz\" genellemesi",
          ],
        ],
      },
      {
        type: "h2",
        text: "Teslim sonrası destek, bakım ve revizyon nasıl ayrılır?",
      },
      {
        type: "p",
        text: "Üç kavram sık karışır. Revizyon, teslim öncesi tasarım ve içerik düzeltme turlarıdır. Garanti desteği, teslim sonrası ortaya çıkan hataların ücretsiz düzeltilmesidir. Bakım ise sitenin güvenli ve çalışır kalması için yapılan düzenli iştir.",
      },
      {
        type: "p",
        text: "Üçünün sınırı yazılı olmalıdır. Yeni sayfa eklemek bakım değildir; kırık formu düzeltmek garanti kapsamıdır; ana sayfa görselini değiştirmek revizyondur ya da küçük içerik desteğidir. Sınır yazılı değilse her istek tartışmaya döner.",
      },
      { type: "h2", text: "Yasal tarafta neler sorulmalı?" },
      {
        type: "p",
        text: "Formu veya çerezi olan her site kişisel veri işler. KVKK kapsamında aydınlatma metni, çerez bilgilendirmesi ve gerektiğinde açık rıza mekanizması gerekir. Ajans teknik altyapıyı kurar; metinlerin hukuki içeriği işletmenin sorumluluğundadır.",
      },
      {
        type: "p",
        text: "İyi cevap iki tarafın sınırını netleştirir: ajans çerez yönetimini ve form kayıtlarının nerede saklandığını kurar, siz veya hukuk danışmanınız metinleri onaylar.",
      },
      {
        type: "callout",
        title: "KARNER'de teslimin parçası sayılanlar",
        text: "KARNER siteleri Next.js ve Astro ile kurar; hızlı açılış, yapısal veri ve yapay zekâ botlarına açık altyapıyı teslimin parçası sayar. Bu rehberdeki sorular, [web sitesi geliştirme hizmetinin](/hizmetler/web-sitesi-gelistirme) kapsamını konuşurken de aynı şekilde sorulabilir.",
      },
      { type: "h2", text: "Teklifler nasıl karşılaştırılır?" },
      {
        type: "p",
        text: "Fiyatı son sütuna koyun. Önce 12 sorunun cevaplarını yan yana yazın; mülkiyet ve hız sorularında zayıf cevap veren teklifi, fiyatı ne olursa olsun ayrı değerlendirin.",
      },
      {
        type: "p",
        text: "Teknoloji seçimi de karşılaştırmanın parçasıdır; [Next.js mi WordPress mi](/rehber/nextjs-mi-wordpress-mi) rehberi bu kararı açar. Siteniz 3D veya animasyon içerecekse [3D web sitesi](/3d-web-sitesi) rehberindeki hız notları geçerlidir. Diğer konular için [rehber merkezine](/rehber) göz atın.",
      },
    ],
    faq: [
      {
        q: "Domain ajansın adına kayıtlıysa ne yapmalıyım?",
        a: "Kayıt sahibinin sizin adınıza değiştirilmesini isteyin. Çoğu kayıt firmasında bu işlem, mevcut sahibin onayıyla yapılan bir devir işlemidir. Ajans devri reddediyorsa sözleşmeye bakın; devir yazılı değilse bile site içerikleri ve marka adı size aittir, ancak alan adı için hukuki destek gerekebilir. Yeni projede ise kaydı baştan kendi hesabınızda açtırın.",
      },
      {
        q: "Kaynak kod teslimi her projede mümkün mü?",
        a: "Özel geliştirilen sitelerde mümkündür ve istenmelidir. Kiralık site platformlarında kod teslim edilemez çünkü altyapı platforma aittir; bu durumda siz siteyi değil aboneliği alırsınız. Teklifte hangi modelin geçerli olduğunu açıkça sorun: özel geliştirme mi, abonelik mi? İkisi de meşru, ancak mülkiyet sonuçları farklıdır.",
      },
      {
        q: "Lighthouse puanı kaç olmalı?",
        a: "Google, Lighthouse'ta 90 ve üzerini yeşil bantta gösterir; teslim ölçütü olarak mobil cihazda bu bant hedeflenir. Ancak tek puan yanıltabilir: laboratuvar ölçümüdür ve her çalıştırmada küçük farklar verir. Gerçek kullanıcı verisine dayanan Core Web Vitals raporu daha güvenilir bir teslim ölçütüdür; ikisini birlikte isteyin.",
      },
      {
        q: "Bakım sözleşmesi zorunlu mu?",
        a: "Zorunlu değildir ama sitenin türüne göre gereklidir. Eklenti tabanlı sistemlerde güvenlik güncellemeleri düzenli emek ister; statik üretilen modern sitelerde saldırı yüzeyi küçüktür ve bakım yükü daha azdır. Her durumda yedekleme ve çalışırlık kontrolünün kimde olduğunu yazılı netleştirin.",
      },
      {
        q: "Revizyon hakkı bitince ne olur?",
        a: "Sözleşmede ek tur koşulu yazıyorsa o koşul uygulanır; genellikle ek tur ayrıca ücretlendirilir. Bu yüzden revizyon turunu toplu ve yazılı geri bildirimle kullanmak önemlidir: tek seferde tüm notları iletmek, parça parça göndermekten daha az tur harcar. Hata düzeltmeleri revizyon sayılmaz, garanti kapsamındadır.",
      },
    ],
    related: [
      "nextjs-mi-wordpress-mi",
      "core-web-vitals-nedir",
      "web-sitesi-hizi-neden-onemli",
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
  {
    slug: "nextjs-mi-wordpress-mi",
    title: "Next.js mi WordPress mi? Kurumsal Site İçin Dürüst Karşılaştırma",
    seoTitle: "Next.js mi WordPress mi? Kurumsal Site Rehberi | KARNER",
    seoDescription:
      "Kurumsal site için Next.js/Astro mu WordPress mi? Hız, güvenlik, bakım, içerik yönetimi, maliyet yapısı ve SEO açısından dürüst karşılaştırma ve karar tablosu.",
    summary:
      "Kurumsal site için Next.js veya Astro daha hızlı açılış, daha küçük güvenlik yüzeyi ve daha düşük bakım yükü sunar. WordPress ise tanıdık paneli ve geniş eklenti ekosistemiyle içerik ağırlıklı sitelerde hâlâ makul seçimdir. İkisi de Google'da sıralanır; fark uygulamanın kalitesinde ortaya çıkar.",
    cluster: "web",
    pillar: { href: "/3d-web-sitesi", label: "3D Web Sitesi" },
    serviceSlug: "web-sitesi-gelistirme",
    blocks: [
      { type: "h2", text: "Next.js ile WordPress arasındaki temel fark nedir?" },
      {
        type: "dl",
        items: [
          {
            term: "Next.js",
            def: "React tabanlı web çatısı. Sayfaları önceden üretebilir (statik) veya istek anında sunucuda oluşturabilir (SSR).",
          },
          {
            term: "Astro",
            def: "İçerik odaklı siteler için çatı. Varsayılan olarak tarayıcıya JavaScript göndermez; etkileşim yalnızca gereken bileşene eklenir.",
          },
          {
            term: "WordPress",
            def: "PHP ve veritabanı üzerinde çalışan içerik yönetim sistemi. Tema ve eklentilerle genişletilir; sayfa her istekte üretilir.",
          },
          {
            term: "Headless CMS",
            def: "Yalnızca içerik yönetimi yapan, arayüzü olmayan sistem. İçerik API ile Next.js veya Astro sitesine akar.",
          },
          {
            term: "Eklenti yüzeyi",
            def: "Siteye eklenen her üçüncü taraf kod parçasının oluşturduğu güvenlik ve bakım alanı.",
          },
        ],
      },
      {
        type: "p",
        text: "WordPress, içeriği veritabanında tutar ve her ziyarette sayfayı PHP ile üretir. Next.js ve Astro ise sayfaları yayın anında hazır dosyalara çevirir ya da gerektiğinde sunucuda oluşturur. Bu mimari fark hız, güvenlik ve bakım tarafındaki tüm farkların kaynağıdır.",
      },
      {
        type: "p",
        text: "İki yaklaşım da kurumsal site üretebilir. **Soru \"hangisi iyi\" değil, \"bu işletmenin ihtiyacına hangisi daha az sürtünmeyle uyar\" sorusudur.** Aşağıdaki başlıklar bu kararı parça parça açar.",
      },
      { type: "h2", text: "Hız tarafında hangisi öne geçer?" },
      {
        type: "p",
        text: "Önceden üretilmiş statik sayfa, ziyaretçiye hazır dosya olarak gider; sunucu her istekte yeniden hesap yapmaz. Bu yüzden Next.js ve Astro siteleri varsayılan hâliyle hızlı başlar.",
      },
      {
        type: "p",
        text: "WordPress de önbellek eklentisi ve iyi bir hosting ile hızlanabilir. Fark şudur: WordPress'te hız sonradan eklenen bir katmandır, modern çatılarda ise başlangıç durumudur. Tema ve eklenti sayısı arttıkça WordPress'in hız puanını korumak emek ister. Hızın neden önemli olduğunu [web sitesi hızı rehberinde](/rehber/web-sitesi-hizi-neden-onemli) açtık.",
      },
      { type: "h2", text: "Güvenlik ve bakım yükü nasıl karşılaştırılır?" },
      {
        type: "p",
        text: "WordPress dünyanın en yaygın içerik yönetim sistemidir; bu yaygınlık onu otomatik saldırıların doğal hedefi yapar. Güvenlik açıklarının büyük kısmı çekirdekten değil, eklenti ve temalardan gelir. Her eklenti ayrı bir güncelleme takvimi ve ayrı bir risk demektir.",
      },
      {
        type: "p",
        text: "Statik üretilen bir sitede ziyaretçinin ulaştığı yerde veritabanı ve yönetici girişi yoktur; saldırı yüzeyi küçüktür. Bakım, bağımlılık güncellemesi ve yeniden yayından ibarettir. **Eklenti sayısı arttıkça WordPress'in bakım yükü artar; modern çatıda yük büyük ölçüde sabit kalır.**",
      },
      { type: "h2", text: "İçerik yönetimi: WordPress paneli mi headless CMS mi?" },
      {
        type: "p",
        text: "WordPress'in en güçlü yanı panelidir. Ekip onu tanır, yazı eklemek ve görsel yüklemek öğrenme gerektirmez. Blog, haber ve sık güncellenen sayfalar için bu panel gerçek bir avantajdır.",
      },
      {
        type: "p",
        text: "Modern çatılarda içerik yönetimi iki yolla çözülür. Az değişen kurumsal sitede içerik doğrudan kod deposunda tutulur; güncellemeyi ajans yapar. Sık değişen içerikte ise headless CMS eklenir: ekip panelden yazar, site otomatik yeniden yayınlanır. Böylece WordPress paneline yakın bir deneyim, statik sitenin hız ve güvenliğiyle birleşir.",
      },
      { type: "h2", text: "Maliyet yapısı nasıl ayrışır?" },
      {
        type: "p",
        text: "WordPress'te kurulum genellikle daha ucuz başlar; hazır tema ve eklentiler işin bir kısmını hazır verir. Maliyet sonradan gelir: eklenti lisansları, güvenlik ve yedekleme hizmetleri, düzenli bakım emeği ve zamanla biriken hız düzeltmeleri.",
      },
      {
        type: "p",
        text: "Next.js ve Astro'da maliyet başlangıçta yoğunlaşır; site özel geliştirilir. Sonrasında barındırma genellikle hafif ve bakım yükü düşüktür. Kısa ömürlü bir site için WordPress'in başlangıç avantajı anlamlıdır; yıllarca yaşayacak kurumsal sitede toplam maliyet modern çatı lehine dönebilir. Tam rakam projeye bağlıdır; teklifi [doğru sorularla](/rehber/web-sitesi-yaptirmadan-once-sorulacak-sorular) karşılaştırın.",
      },
      { type: "h2", text: "SEO'da fark var mı?" },
      {
        type: "p",
        text: "Hayır, teoride fark yoktur. Google, sayfanın hangi sistemle üretildiğine bakmaz; içeriğe, teknik sağlığa ve sayfa deneyimine bakar. Bir WordPress sitesi de bir Next.js sitesi de birinci sırada çıkabilir.",
      },
      {
        type: "p",
        text: "Fark uygulamada doğar. Modern çatıda hız, temiz HTML ve yapısal veri tasarımın parçasıdır; WordPress'te bunlar eklenti ve ayarla sonradan kurulur, yanlış kurulduğunda eksik kalır. **SEO farkı teknolojiden değil, işi yapan ekibin disiplininden gelir.**",
      },
      {
        type: "table",
        caption: "Kurumsal site için Next.js/Astro ile WordPress karşılaştırması",
        head: ["Ölçüt", "Next.js / Astro", "WordPress"],
        rows: [
          [
            "Hız",
            "Varsayılan olarak hızlı; statik üretim",
            "Önbellek ve iyi hosting ile hızlanır",
          ],
          [
            "Güvenlik yüzeyi",
            "Küçük; ziyaret edilen yerde veritabanı yok",
            "Eklenti ve tema sayısıyla büyür",
          ],
          [
            "Bakım",
            "Bağımlılık güncellemesi, yeniden yayın",
            "Çekirdek + eklenti + tema güncellemesi düzenli",
          ],
          [
            "İçerik yönetimi",
            "Kod deposu veya headless CMS",
            "Tanıdık yerleşik panel",
          ],
          [
            "Maliyet yapısı",
            "Başlangıçta yoğun, sonrası hafif",
            "Başlangıçta hafif, sonrası birikimli",
          ],
          [
            "SEO",
            "Eşit; teknik sağlık tasarımın parçası",
            "Eşit; eklenti ve ayara bağlı",
          ],
          [
            "3D ve animasyon",
            "React Three Fiber ile doğal entegrasyon",
            "Gömülü modül olarak eklenir",
          ],
        ],
      },
      { type: "h2", text: "Ne zaman WordPress, ne zaman Next.js?" },
      {
        type: "ul",
        items: [
          "**WordPress seçin:** ekip her gün içerik girecekse, blog veya haber sitenin omurgasıysa, hazır bir eklentiye ihtiyaç varsa ve panel eğitimi istenmiyorsa.",
          "**WordPress seçin:** bütçe kısıtlı, site kısa ömürlü veya deneme amaçlıysa ve düzenli bakımı üstlenecek biri varsa.",
          "**Next.js veya Astro seçin:** hız ve güvenlik öncelikliyse, site yıllarca yaşayacaksa, özel tasarım ve 3D/animasyon isteniyorsa.",
          "**Next.js veya Astro seçin:** yapısal veri, yapay zekâ botlarına açık altyapı ve düşük bakım yükü teslim ölçütüyse; sık içerik için yanına headless CMS eklenir.",
        ],
      },
      {
        type: "callout",
        title: "KARNER'in tercihi ve nedeni",
        text: "KARNER siteleri Next.js ve Astro ile kurar; hızlı açılış, yapısal veri ve yapay zekâ botlarına açık altyapıyı teslimin parçası sayar. 3D ve animasyonlu kurumsal siteler için bu yığın doğal zemindir; ayrıntı için [3D web sitesi rehberine](/3d-web-sitesi) ve [web sitesi geliştirme hizmetine](/hizmetler/web-sitesi-gelistirme) bakabilirsiniz.",
      },
      { type: "h2", text: "Var olan WordPress sitesi taşınmalı mı?" },
      {
        type: "p",
        text: "Çalışan, hızlı ve bakımı yapılan bir WordPress sitesini sırf teknoloji için taşımak gerekmez. Taşıma; hız puanı düzelmiyorsa, güvenlik olayları tekrar ediyorsa, eklenti bağımlılığı yönetilemez hâle geldiyse veya yeni tasarım zaten sıfırdan yapılacaksa anlamlıdır.",
      },
      {
        type: "p",
        text: "Taşınırken eski adreslerin yeni adreslere yönlendirilmesi ve yapısal verinin korunması şarttır; aksi hâlde sıralama kaybı yaşanır. Karar öncesi [Core Web Vitals raporuna](/rehber/core-web-vitals-nedir) bakmak, taşınmanın gerekip gerekmediğini veriyle gösterir. Tüm web rehberleri [rehber merkezinde](/rehber) listelenir.",
      },
    ],
    faq: [
      {
        q: "WordPress güvensiz midir?",
        a: "Hayır, çekirdek yazılım düzenli güncellenir ve güvenlidir. Risk, güncellenmeyen eklenti ve temalardan, zayıf yönetici parolalarından ve bakımsız kurulumlardan gelir. Az eklentiyle, güncel tutulan ve iyi barındırılan bir WordPress sitesi güvenli çalışır. Fark, bu disiplinin sürekli emek istemesidir; statik sitede aynı yüzey baştan küçüktür.",
      },
      {
        q: "Next.js sitede içeriği kendim değiştirebilir miyim?",
        a: "Evet, iki yolla. Az değişen sitede metinler kod deposunda tutulur ve güncelleme ajans tarafından yapılır. Sık değişen içerik için headless CMS eklenir; panelden yazar, kaydeder, site kendiliğinden yeniden yayınlanır. Hangi alanların sizin tarafınızdan düzenlenebildiğini teslim öncesi yazılı isteyin.",
      },
      {
        q: "Astro ile Next.js arasında nasıl seçilir?",
        a: "İçerik ağırlıklı, etkileşimi az kurumsal site ve bloglar için Astro daha hafiftir; tarayıcıya neredeyse hiç JavaScript göndermez. Kullanıcı girişi, panel, yoğun etkileşim veya uygulama benzeri akışlar varsa Next.js daha uygundur. İkisi de statik üretimi destekler ve aynı hız hedefine ulaşabilir.",
      },
      {
        q: "WordPress'ten Next.js'e geçince sıralama düşer mi?",
        a: "Doğru yapılırsa düşmez. Her eski adres yeni adrese kalıcı yönlendirilmeli, başlıklar, açıklamalar ve yapısal veri korunmalı, site haritası yenilenmelidir. Geçiş sonrası Search Console'da tarama hataları izlenir. Düşüş genellikle yönlendirme eksikliğinden ve içerik kaybından kaynaklanır; teknolojinin kendisinden değil.",
      },
      {
        q: "Headless CMS kullanmak ek maliyet getirir mi?",
        a: "Çoğu headless CMS'in küçük ekipler için ücretsiz katmanı vardır; kurumsal sitelerin büyük kısmı bu katmanda kalır. Asıl maliyet kurulum emeğidir: içerik modelinin tasarlanması ve siteyle bağlanması. Sık içerik girilmeyecekse CMS eklemek gereksizdir; az değişen içerik doğrudan kodda tutulur.",
      },
    ],
    related: [
      "web-sitesi-yaptirmadan-once-sorulacak-sorular",
      "web-sitesi-hizi-neden-onemli",
      "core-web-vitals-nedir",
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
  {
    slug: "core-web-vitals-nedir",
    title: "Core Web Vitals Nedir? LCP, INP ve CLS Eşikleri ve Düzeltme Yolları",
    seoTitle: "Core Web Vitals Nedir? LCP, INP, CLS Eşikleri | KARNER",
    seoDescription:
      "Core Web Vitals nedir? LCP, INP ve CLS tanımları, Google'ın resmi eşikleri, PageSpeed Insights ve Search Console ile ölçüm, en sık nedenler ve düzeltme yolları.",
    summary:
      "Core Web Vitals, Google'ın sayfa deneyimini ölçtüğü üç metriktir: LCP en büyük içeriğin görünme süresi, INP etkileşime yanıt gecikmesi, CLS beklenmedik düzen kayması. Google'ın iyi eşikleri LCP 2,5 saniye, INP 200 milisaniye ve CLS 0,1'dir; ölçüm PageSpeed Insights ve Search Console ile yapılır.",
    cluster: "web",
    pillar: { href: "/3d-web-sitesi", label: "3D Web Sitesi" },
    serviceSlug: "web-sitesi-gelistirme",
    blocks: [
      { type: "h2", text: "Core Web Vitals nedir?" },
      {
        type: "dl",
        items: [
          {
            term: "LCP (Largest Contentful Paint)",
            def: "Sayfanın görünür alanındaki en büyük içerik parçasının (genellikle ana görsel veya başlık) ekrana geldiği an. Yüklenme hızını temsil eder.",
          },
          {
            term: "INP (Interaction to Next Paint)",
            def: "Kullanıcının tıklama, dokunma veya tuş basımına sayfanın görsel yanıt verme gecikmesi. Sayfa ömrü boyunca ölçülür; yanıt verebilirliği temsil eder.",
          },
          {
            term: "CLS (Cumulative Layout Shift)",
            def: "Sayfa yüklenirken öğelerin beklenmedik biçimde yer değiştirmesinin toplam puanı. Görsel kararlılığı temsil eder.",
          },
          {
            term: "Alan verisi",
            def: "Gerçek Chrome kullanıcılarından toplanan ölçüm (CrUX). Google sıralamada bu veriyi kullanır.",
          },
          {
            term: "Laboratuvar verisi",
            def: "Lighthouse gibi araçların kontrollü ortamda tek seferlik ölçümü. Tanı koymaya yarar, sıralamaya girmez.",
          },
        ],
      },
      {
        type: "p",
        text: "Core Web Vitals, Google'ın sayfa deneyimini üç sayıya indirdiği ölçüm setidir. Her metrik bir kullanıcı hissini temsil eder: sayfa ne zaman göründü, dokunduğumda ne zaman tepki verdi, okurken içerik yerinden kaydı mı.",
      },
      {
        type: "p",
        text: "Metrikler değişebilir; INP, 2024'te eski FID metriğinin yerini aldı. Bu yüzden rapor okurken güncel üçlüye bakmak gerekir. **Core Web Vitals, hız sözünü tartışılabilir olmaktan çıkarıp ölçülebilir hâle getirir.**",
      },
      { type: "h2", text: "Google'ın eşikleri nelerdir?" },
      {
        type: "p",
        text: "Google her metrik için üç bant yayımlar: iyi, iyileştirme gerekli, zayıf. Değerlendirme, sayfa ziyaretlerinin yüzde 75'lik dilimine göre yapılır; yani ziyaretlerin büyük çoğunluğu eşiğin altında kalmalıdır.",
      },
      {
        type: "table",
        caption: "Google'ın yayımladığı Core Web Vitals eşikleri",
        head: ["Metrik", "İyi", "İyileştirme gerekli", "Zayıf"],
        rows: [
          ["LCP", "2,5 saniye ve altı", "2,5 – 4 saniye", "4 saniyeden fazla"],
          [
            "INP",
            "200 milisaniye ve altı",
            "200 – 500 milisaniye",
            "500 milisaniyeden fazla",
          ],
          ["CLS", "0,1 ve altı", "0,1 – 0,25", "0,25'ten fazla"],
        ],
      },
      {
        type: "p",
        text: "Üç metriğin üçü de iyi bantta olduğunda sayfa Core Web Vitals değerlendirmesini geçer. Tek bir metriğin zayıf olması, sayfanın tamamını geçemez duruma getirir.",
      },
      { type: "h2", text: "Core Web Vitals nasıl ölçülür?" },
      {
        type: "ol",
        items: [
          "**PageSpeed Insights:** adresi yapıştırın; üstte alan verisi (varsa), altta laboratuvar ölçümü ve öneriler görünür. Mobil sekmesini esas alın.",
          "**Search Console Core Web Vitals raporu:** sitenin tüm sayfalarını gruplar hâlinde iyi / iyileştirme gerekli / zayıf olarak listeler. Sıralamaya giren veri budur.",
          "**Chrome DevTools:** Performance panelinde LCP öğesi, düzen kaymaları ve uzun görevler tek tek görülür; sorunun kaynağını bulmaya yarar.",
          "**Lighthouse:** DevTools içinden veya komut satırından çalışır; laboratuvar puanı ve düzeltme listesi verir. Teslimde rapor olarak paylaşılır.",
        ],
      },
      {
        type: "p",
        text: "Alan verisi için sitenin yeterli ziyareti olmalıdır; yeni sitelerde yalnızca laboratuvar ölçümü görünür. Bu normaldir; laboratuvar ölçümü iyi bantta olan site, ziyaret geldikçe alan verisinde de genellikle iyi görünür.",
      },
      { type: "h2", text: "En sık nedenler nelerdir?" },
      {
        type: "table",
        caption: "Core Web Vitals sorunlarının en sık nedenleri ve düzeltmeleri",
        head: ["Belirti", "En sık neden", "Düzeltme"],
        rows: [
          [
            "LCP yüksek",
            "Büyük, sıkıştırılmamış ana görsel",
            "AVIF/WebP'ye çevir, boyutu ekrana göre ver, ana görseli öncelikli yükle",
          ],
          [
            "LCP yüksek",
            "Render'ı engelleyen CSS ve JavaScript",
            "Kritik CSS'i satır içine al, kalan betikleri ertele",
          ],
          [
            "LCP yüksek",
            "Yavaş sunucu yanıtı",
            "Statik üretim, CDN ve önbellek kullan",
          ],
          [
            "INP yüksek",
            "Ana iş parçacığını kilitleyen uzun JavaScript görevleri",
            "Görevleri böl, üçüncü taraf betikleri azalt veya ertele",
          ],
          [
            "CLS yüksek",
            "Boyutu belirtilmemiş görsel, video ve reklam alanı",
            "Her medyaya genişlik/yükseklik ver, alanı önceden ayır",
          ],
          [
            "CLS yüksek",
            "Web fontu geç gelince metnin yeniden dizilmesi",
            "Fontu kendi sunucundan ver, önceden yükle, ölçüleri yakın yedek font seç",
          ],
        ],
      },
      { type: "h2", text: "LCP, INP ve CLS nasıl düzeltilir?" },
      { type: "h3", text: "LCP için" },
      {
        type: "p",
        text: "LCP öğesi çoğu sitede ana görseldir. Bu görsel modern formatta, ekran boyutuna göre sunulmuş ve öncelikli yüklenmiş olmalıdır; lazy loading bu tek görsele uygulanmaz. Sunucu yanıtı yavaşsa önce oraya bakılır; statik üretim ve CDN sunucu süresini doğrudan kısaltır.",
      },
      { type: "h3", text: "INP için" },
      {
        type: "p",
        text: "INP sorunları neredeyse her zaman JavaScript'ten gelir. Sayfa açılışında çalışan betik miktarı azaltılır, analitik ve sohbet eklentileri gibi üçüncü taraf kodlar geciktirilir, uzun görevler küçük parçalara bölünür. Tarayıcıya daha az JavaScript gönderen çatılar burada baştan avantajlıdır.",
      },
      { type: "h3", text: "CLS için" },
      {
        type: "p",
        text: "Düzen kayması, tarayıcının bir öğenin ne kadar yer kaplayacağını bilmemesinden doğar. Görsel ve videolara boyut verilir, dinamik içerik için alan ayrılır, font geçişi kontrol altına alınır. **CLS, üç metrik içinde en ucuz düzeltilen ve en çok ihmal edilendir.**",
      },
      { type: "h2", text: "Core Web Vitals sıralamayı ne kadar etkiler?" },
      {
        type: "p",
        text: "Google, sayfa deneyimini sıralama sinyallerinden biri olarak kullandığını açıklar; Core Web Vitals bu deneyimin ölçülen kısmıdır. İçerik ve alaka her zaman önde gelir: zayıf içerik hızlı olduğu için birinci olmaz.",
      },
      {
        type: "p",
        text: "Buna karşılık benzer içeriğe sahip iki sayfa arasında deneyim farkı belirleyici olabilir. Asıl etki dolaylıdır: hızlı ve kararlı sayfa daha az terk edilir, daha çok dönüştürür. Bu ilişkiyi [web sitesi hızı rehberinde](/rehber/web-sitesi-hizi-neden-onemli) ayrı ele aldık.",
      },
      {
        type: "callout",
        title: "KARNER'de hız nasıl teslim edilir?",
        text: "KARNER siteleri Next.js ve Astro ile kurar; hızlı açılış, yapısal veri ve yapay zekâ botlarına açık altyapıyı teslimin parçası sayar. 3D sahne içeren sitelerde de aynı eşikler hedeflenir; sahne yalnızca ekrana geldiğinde yüklenir. Ayrıntı: [3D web sitesi rehberi](/3d-web-sitesi) ve [web sitesi geliştirme hizmeti](/hizmetler/web-sitesi-gelistirme).",
      },
      { type: "h2", text: "Site sahibi raporu nasıl okumalı?" },
      {
        type: "p",
        text: "Search Console'da Core Web Vitals raporunu açın ve mobil sekmesine bakın; masaüstü genellikle daha iyi görünür ve yanıltır. Zayıf gruptaki sayfa kalıplarını not edin; genellikle aynı şablonu kullanan sayfalar birlikte düşer.",
      },
      {
        type: "p",
        text: "Ajansla konuşurken raporu paylaşın ve hangi metriğin hangi nedenle düştüğünü sorun. Teknoloji seçiminin bu metriklere etkisini [Next.js mi WordPress mi](/rehber/nextjs-mi-wordpress-mi) rehberinde, teklif aşamasında sorulacak hız sorularını ise [web sitesi yaptırmadan önce](/rehber/web-sitesi-yaptirmadan-once-sorulacak-sorular) rehberinde bulabilirsiniz. Tüm rehberler [rehber merkezinde](/rehber).",
      },
    ],
    faq: [
      {
        q: "Core Web Vitals ile Lighthouse puanı aynı şey mi?",
        a: "Değil. Lighthouse, laboratuvar ortamında tek seferlik ölçüm yapar ve 0-100 arası bir performans puanı üretir; Core Web Vitals ise gerçek kullanıcı ziyaretlerinden toplanan alan verisidir ve Google sıralamada bunu kullanır. Lighthouse tanı aracıdır, Core Web Vitals sonuçtur. İyi bir teslimde ikisi birlikte raporlanır.",
      },
      {
        q: "INP nedir, FID'den farkı ne?",
        a: "FID yalnızca ilk etkileşimin gecikmesini ölçüyordu. INP, sayfa açık kaldığı süre boyunca tüm etkileşimleri izler ve en yavaşlarından birini esas alır; bu yüzden gerçek yanıt verebilirliği daha iyi temsil eder. Google, INP'yi 2024'te FID'in yerine resmi Core Web Vitals metriği yaptı.",
      },
      {
        q: "Yeni sitede alan verisi görünmüyor, sorun mu?",
        a: "Sorun değil. Alan verisi için Chrome kullanıcılarından yeterli ziyaret toplanması gerekir; yeni veya düşük trafikli sitelerde PageSpeed Insights yalnızca laboratuvar ölçümü gösterir. Bu dönemde Lighthouse ölçümünü iyi bantta tutmak yeterlidir; ziyaret arttıkça alan verisi kendiliğinden görünür.",
      },
      {
        q: "3D veya animasyon içeren site Core Web Vitals'ı geçebilir mi?",
        a: "Geçebilir. Koşul, 3D sahnenin ve ağır betiklerin ilk açılışı engellememesidir: sahne yalnızca ekrana geldiğinde yüklenir, LCP öğesi hafif tutulur, sahne alanına önceden yer ayrılır ki CLS oluşmasın. Doğru kurulmuş 3D site ile klasik site aynı eşiklere ulaşır.",
      },
      {
        q: "Core Web Vitals hangi sıklıkla kontrol edilmeli?",
        a: "Search Console raporu sürekli güncellenir; ayda bir bakmak çoğu kurumsal site için yeterlidir. Ayrıca her büyük değişiklikten sonra, yeni görsel, yeni eklenti veya yeni bölüm eklendiğinde, PageSpeed Insights ile tek seferlik kontrol yapılmalıdır. Düşüşler genellikle bu değişikliklerle birlikte gelir.",
      },
    ],
    related: [
      "web-sitesi-hizi-neden-onemli",
      "nextjs-mi-wordpress-mi",
      "web-sitesi-yaptirmadan-once-sorulacak-sorular",
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
  {
    slug: "web-sitesi-hizi-neden-onemli",
    title: "Web Sitesi Hızı Neden Önemli? Kullanıcı, Sıralama ve Çözüm Yolları",
    seoTitle: "Web Sitesi Hızı Neden Önemli? Hızlı Site Rehberi | KARNER",
    seoDescription:
      "Web sitesi hızı neden önemli? Hızın kullanıcı davranışı ve Google sıralamasıyla ilişkisi, AVIF/WebP, font self-host, lazy loading, CDN, önbellek ve hızlı site kontrol listesi.",
    summary:
      "Web sitesi hızı önemlidir çünkü yavaş açılan sayfa terk edilir, yavaş tepki veren sayfa güven kaybettirir ve Google sayfa deneyimini sıralama sinyali olarak kullanır. Hız; modern görsel formatı, kendi sunucundan font, lazy loading, CDN ve önbellekle kurulur; Core Web Vitals ile ölçülür.",
    cluster: "web",
    pillar: { href: "/3d-web-sitesi", label: "3D Web Sitesi" },
    serviceSlug: "web-sitesi-gelistirme",
    blocks: [
      { type: "h2", text: "Web sitesi hızı neden önemli?" },
      {
        type: "dl",
        items: [
          {
            term: "Sunucu yanıt süresi (TTFB)",
            def: "Tarayıcının isteği gönderdiği andan ilk baytın geldiği ana kadar geçen süre. Hızın başlangıç noktası.",
          },
          {
            term: "AVIF / WebP",
            def: "JPEG ve PNG'ye göre aynı görünürlükte çok daha küçük dosya üreten modern görsel formatları.",
          },
          {
            term: "Font self-host",
            def: "Web fontunu üçüncü taraf servisten değil, sitenin kendi alan adından sunmak. Ek bağlantı ve gizlilik yükünü kaldırır.",
          },
          {
            term: "Lazy loading",
            def: "Ekran dışındaki görsel ve videoların yalnızca kullanıcı yaklaştığında yüklenmesi.",
          },
          {
            term: "CDN",
            def: "Site dosyalarını dünyanın farklı noktalarındaki sunuculara dağıtan ağ; ziyaretçi en yakın kopyadan alır.",
          },
          {
            term: "Önbellek",
            def: "Bir kez üretilen sayfa veya dosyanın tekrar tekrar hesaplanmadan hazır sunulması.",
          },
        ],
      },
      {
        type: "p",
        text: "Web sitesi hızı, ziyaretçinin ilk izlenimidir. Sayfa geç açılırsa tasarım, metin ve teklif görülmeden sekme kapanır. **Hız bir teknik ayrıntı değil, sitenin geri kalanının görülüp görülmeyeceğinin ön koşuludur.**",
      },
      {
        type: "p",
        text: "Hızın üç sonucu vardır: kullanıcı davranışı, arama görünürlüğü ve işletme maliyeti. Aşağıda üçünü ayrı ele alıyor, ardından hızlı sitenin nasıl kurulduğunu ve nasıl anlaşıldığını gösteriyoruz.",
      },
      { type: "h2", text: "Hız kullanıcı davranışını nasıl etkiler?" },
      {
        type: "p",
        text: "Mobil bağlantıda, yolda, sabırsızken açılan bir sayfa birkaç saniye içinde ya içeriği gösterir ya da kaybeder. Gecikme, ziyaretçinin geri tuşuna basma olasılığını artırır; sektörden bağımsız olarak gözlenen bir davranıştır.",
      },
      {
        type: "p",
        text: "Hız yalnızca açılış değildir. Menüye dokununca tepki gecikirse, form gönderilince ekran donarsa, okurken içerik yerinden kayarsa güven zedelenir. Ziyaretçi bunu \"bozuk site\" olarak yorumlar ve işletmeye mal eder.",
      },
      {
        type: "p",
        text: "Bu davranışların hepsi dönüşüme yansır: form doldurma, arama, sipariş. Hızlı site aynı ziyaretçiden daha fazla sonuç alır; reklam bütçesi de daha az boşa gider.",
      },
      { type: "h2", text: "Hız arama sıralamasını etkiler mi?" },
      {
        type: "p",
        text: "Evet, dolaylı ve doğrudan. Google, sayfa deneyimini sıralama sinyali olarak kullandığını ve bu deneyimi Core Web Vitals metrikleriyle ölçtüğünü açıklamıştır. Metriklerin tanımı ve eşikleri için [Core Web Vitals rehberine](/rehber/core-web-vitals-nedir) bakın.",
      },
      {
        type: "p",
        text: "Doğrudan etki sınırlıdır; içerik ve alaka önce gelir. Asıl etki dolaylıdır: hızlı sayfa daha az terk edilir, daha uzun okunur ve daha çok paylaşılır. Arama motorları bu davranış örüntülerini kaliteli sayfa değerlendirmesinde dikkate alır. **Yavaş site iyi içeriğin sıralamasını frenler; hızlı site iyi içeriğin önünü açar.**",
      },
      {
        type: "p",
        text: "Yapay zekâ aramaları için de aynı şey geçerlidir. Hızlı ve temiz HTML sunan sayfa, botlar tarafından daha kolay taranır ve kaynak olarak seçilmeye daha uygundur.",
      },
      { type: "h2", text: "Siteyi yavaşlatan en yaygın nedenler neler?" },
      {
        type: "ul",
        items: [
          "**Büyük görseller:** telefondan çekilmiş fotoğrafın olduğu gibi yüklenmesi. Tek görsel, sayfanın geri kalanından ağır olabilir.",
          "**Fazla JavaScript:** analitik, sohbet, pazarlama ve eklenti betiklerinin birikmesi. Her biri küçük, toplamı yavaş.",
          "**Üçüncü taraf font servisleri:** ek bağlantı ve font gelene kadar yazının görünmemesi veya yer değiştirmesi.",
          "**Yavaş sunucu:** paylaşımlı, önbelleksiz hosting ve her istekte yeniden üretilen sayfa.",
          "**Boyutsuz medya:** genişliği belirtilmemiş görsel ve video; içerik yüklenince zıplar.",
          "**Optimize edilmemiş 3D ve video:** sıkıştırılmamış model ve otomatik oynayan ağır video.",
        ],
      },
      { type: "h2", text: "Hızlı site nasıl kurulur?" },
      {
        type: "table",
        caption: "Hız için temel teknikler ve ne işe yaradıkları",
        head: ["Teknik", "Ne yapar", "Ne zaman uygulanır"],
        rows: [
          [
            "AVIF / WebP görsel",
            "Aynı görünürlükte çok daha küçük dosya",
            "Her görselde; tarayıcı desteği için yedek format verilir",
          ],
          [
            "Ekrana göre görsel boyutu",
            "Telefona küçük, masaüstüne büyük kopya",
            "Özellikle ana görsel ve galerilerde",
          ],
          [
            "Font self-host",
            "Ek bağlantıyı kaldırır, font geçişini kontrol eder",
            "Özel web fontu kullanılan her sitede",
          ],
          [
            "Lazy loading",
            "Ekran dışı medyayı sonraya bırakır",
            "Ana görsel hariç tüm görsel ve videolarda",
          ],
          [
            "Statik üretim / önbellek",
            "Sayfayı hazır dosya olarak sunar",
            "İçeriği sık değişmeyen tüm sayfalarda",
          ],
          [
            "CDN",
            "Dosyayı ziyaretçiye en yakın noktadan verir",
            "Türkiye dışından da ziyaret alan sitelerde öncelikli",
          ],
          [
            "Betik erteleme",
            "Analitik ve eklentileri açılıştan sonraya alır",
            "Üçüncü taraf kod içeren her sitede",
          ],
        ],
      },
      {
        type: "p",
        text: "Bu tekniklerin çoğu modern çatılarda varsayılan olarak gelir; Next.js ve Astro görselleri otomatik dönüştürür, sayfaları önceden üretir ve betikleri akıllı yükler. Eklenti tabanlı sistemlerde aynı sonuç ek araç ve düzenli bakımla alınır; karşılaştırma için [Next.js mi WordPress mi](/rehber/nextjs-mi-wordpress-mi) rehberine bakın.",
      },
      {
        type: "callout",
        title: "KARNER'de hız teslimin parçasıdır",
        text: "KARNER siteleri Next.js ve Astro ile kurar; hızlı açılış, yapısal veri ve yapay zekâ botlarına açık altyapıyı teslimin parçası sayar. 3D sahne içeren sitelerde sahne yalnızca ekrana geldiğinde yüklenir; ayrıntı için [3D web sitesi rehberi](/3d-web-sitesi) ve [web sitesi geliştirme hizmeti](/hizmetler/web-sitesi-gelistirme).",
      },
      { type: "h2", text: "Hızlı site nasıl anlaşılır? Kontrol listesi" },
      {
        type: "ol",
        items: [
          "PageSpeed Insights'ta mobil sekmesini açın; üç Core Web Vitals metriği de yeşil bantta mı?",
          "Sayfayı telefonda mobil veriyle açın; ana görsel ve başlık hemen görünüyor mu, yoksa boş ekran mı bekliyorsunuz?",
          "Sayfa yüklenirken metin ve düğmeler yerinden kayıyor mu? Kayıyorsa boyutsuz medya veya font sorunu vardır.",
          "Menüye, düğmeye, forma dokunun; tepki anında mı geliyor?",
          "Görsele sağ tıklayıp yeni sekmede açın; uzantı .avif veya .webp mi, yoksa büyük .jpg/.png mi?",
          "Sayfa kaynağında fontlar kendi alan adından mı geliyor, üçüncü taraf servisten mi?",
          "Aşağı kaydırmadan önce ağ panelinde tüm görseller yükleniyor mu? Yükleniyorsa lazy loading yoktur.",
          "Search Console Core Web Vitals raporunda zayıf gruptaki sayfa var mı?",
        ],
      },
      {
        type: "p",
        text: "Bu listede takılan her madde, ajansa sorulacak somut bir soruya dönüşür. Teklif aşamasında hız ölçütünü yazılı istemek için [web sitesi yaptırmadan önce sorulacak sorular](/rehber/web-sitesi-yaptirmadan-once-sorulacak-sorular) rehberindeki maddeleri kullanabilirsiniz. Tüm web rehberleri [rehber merkezinde](/rehber) listelenir.",
      },
    ],
    faq: [
      {
        q: "Sitem hızlı mı yavaş mı, nasıl anlarım?",
        a: "En hızlı yol PageSpeed Insights'a adresi yapıştırmaktır. Mobil sekmesinde Core Web Vitals metrikleri yeşilse site iyi bantta demektir. Ardından sayfayı telefonda mobil veriyle açıp gözle kontrol edin: ana görsel hemen geliyor mu, içerik kayıyor mu, düğmeler anında tepki veriyor mu. Rehberdeki sekiz maddelik kontrol listesi bu gözlemi sistemleştirir.",
      },
      {
        q: "Görselleri AVIF veya WebP'ye çevirmek kaliteyi düşürür mü?",
        a: "Görünür kalite korunurken dosya boyutu belirgin biçimde küçülür; fark çoğu görselde gözle ayırt edilmez. Modern çatılar dönüştürmeyi otomatik yapar ve eski tarayıcılar için JPEG/PNG yedeğini birlikte sunar. Dikkat edilmesi gereken tek nokta, sıkıştırma oranını aşırıya kaçırmamaktır; varsayılan ayarlar genellikle doğru dengeyi verir.",
      },
      {
        q: "CDN her site için gerekli mi?",
        a: "Yalnızca Türkiye'den ziyaret alan küçük bir site için zorunlu değildir; iyi bir sunucu ve önbellek yeterli olabilir. Yurt dışından ziyaretçi, çok görselli sayfa veya trafik dalgalanması varsa CDN fark yaratır. Modern barındırma servislerinin çoğu CDN'i varsayılan olarak sunar; bu durumda ek karar gerekmez.",
      },
      {
        q: "Hızlı site için tasarımdan ödün vermek gerekir mi?",
        a: "Gerekmez. Görsel zenginlik, animasyon ve 3D sahne hızla çelişmez; koşul, ağır öğelerin ilk açılışı engellememesidir. Ana görsel hafif tutulur, sahne ve video ekrana gelince yüklenir, betikler ertelenir. Yavaşlık genellikle tasarımın kendisinden değil, optimize edilmemiş dosyalardan ve birikmiş eklentilerden gelir.",
      },
      {
        q: "Site hızı bir kez ayarlanınca kalıcı mı?",
        a: "Kalıcı değildir. Her yeni görsel, eklenen betik veya içerik bölümü hızı etkileyebilir. Modern çatılarda görsel ve betik yönetimi otomatik olduğu için bozulma daha yavaş gelir; eklenti tabanlı sistemlerde düzenli kontrol gerekir. Her büyük değişiklikten sonra PageSpeed Insights ile tek kontrol yeterlidir.",
      },
    ],
    related: [
      "core-web-vitals-nedir",
      "nextjs-mi-wordpress-mi",
      "web-sitesi-yaptirmadan-once-sorulacak-sorular",
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
];
