import type { Guide } from "./types";

/**
 * Video kümesi rehberleri — pillar: /yapay-zeka-reklam-videosu
 * Kural: genel teknik bilgi + belgeli KARNER gerçeği. Sayı/fiyat/süre garantisi yok.
 * Model özellikleri hızla değişir; "bu yazının tarihi itibarıyla" dili kullanılır.
 */
export const VIDEO_GUIDES: Guide[] = [
  {
    slug: "ai-video-araclari-veo-kling-karsilastirma",
    title: "AI Video Araçları: Veo, Kling, Runway, Luma ve Seedance Karşılaştırması",
    seoTitle: "AI Video Araçları: Veo, Kling ve Rakipleri | KARNER",
    seoDescription:
      "Veo, Kling, Runway, Luma, Seedance ve Hailuo: text-to-video ile image-to-video farkı, tutarlılık, ses durumu, hangi iş için hangi model ve AI izi nasıl azaltılır.",
    summary:
      "Bu yazının tarihi itibarıyla öne çıkan yapay zekâ video modelleri Google Veo, Kling, Runway, Luma, Seedance ve Hailuo'dur. Hepsi kısa klip üretir; fark tutarlılıkta, ses desteğinde ve referans görselden ne kadar sadık çalıştığındadır. Reklam işinde en güvenilir yol, gerçek ürün görselinden yola çıkan image-to-video ve kısa klipleri kurguda birleştirmektir.",
    cluster: "video",
    pillar: { href: "/yapay-zeka-reklam-videosu", label: "Yapay Zekâ ile Reklam Videosu" },
    serviceSlug: "ai-video-reklam",
    blocks: [
      { type: "h2", text: "Yapay zekâ video aracı nedir?" },
      {
        type: "dl",
        items: [
          {
            term: "Yapay zekâ video modeli",
            def: "Metin ya da görsel girdisinden hareketli görüntü üreten üretken model. Çıktı birkaç saniyelik kliplerdir; uzun video bu kliplerin kurgusuyla oluşur.",
          },
          {
            term: "Text-to-video",
            def: "Yalnızca yazılı betimlemeden sahne üretme. Hızlı ve özgür; ürün ve karakter sadakati düşük.",
          },
          {
            term: "Image-to-video",
            def: "Bir başlangıç karesinden (fotoğraf, render, tasarım) hareket üretme. Ürün ve marka tutarlılığı için temel yöntem.",
          },
          {
            term: "AI izi",
            def: "Eriyip şekil değiştiren nesneler (morph), bozuk eller ve yazılar, fizik dışı hareket, aşırı pürüzsüz yüzeyler. İzleyicinin 'bu yapay' demesine yol açan işaretler.",
          },
        ],
      },
      {
        type: "p",
        text: "Model özellikleri aylar içinde değişiyor. Bu yüzden bu rehber sürüm numarası ve teknik sınır ezberletmez; **hangi tip aracın hangi işe yaradığını** ve seçim mantığını anlatır. Güncel sınırlar için aracın kendi belgelerine bakılmalıdır.",
      },
      { type: "h2", text: "Hangi AI video modelleri öne çıkıyor?" },
      {
        type: "p",
        text: "Aşağıdaki tablo bu yazının tarihi itibarıyla genel bir haritadır. Her modelin sürümleri ve erişim yolları değişebilir.",
      },
      {
        type: "table",
        caption: "Öne çıkan yapay zekâ video modelleri — genel karakter (bu yazının tarihi itibarıyla)",
        head: ["Model", "Erişim", "Güçlü yanı", "Dikkat edilecek nokta"],
        rows: [
          ["Google Veo", "Flow ve Gemini üzerinden; API", "Sinematik kalite, istemle birlikte ses üretebilme, gerçekçi ışık", "Erişim ve kota bölgeye ve plana göre değişir"],
          ["Kling", "Kendi web arayüzü; üçüncü taraf API'ler", "Image-to-video sadakati, hareket kontrolü, karakter tutarlılığı seçenekleri", "Uzun istemlerde sahne kayabilir"],
          ["Runway", "Kendi platformu", "Kurgu odaklı araç seti, kamera kontrolü, profesyonel iş akışı", "Stil bazen fazla 'temiz' ve dijital durur"],
          ["Luma", "Kendi platformu; API", "Hızlı üretim, yumuşak kamera hareketi, başlangıç-bitiş karesi", "Karmaşık sahnelerde detay kaybı"],
          ["Seedance", "Üçüncü taraf platformlar; API", "Çok çekimli anlatı, hareket tutarlılığı, tek istemden sahne dizisi", "Erişim yolu platforma göre farklılaşır"],
          ["Hailuo", "Kendi platformu; API", "Canlı karakter hareketi, ifade", "İnce ürün detayında sapma olabilir"],
        ],
      },
      {
        type: "p",
        text: "Pratikte tek model yoktur. Bir reklamda ürün çekimi bir modelden, atmosfer sahnesi başka modelden çıkabilir. Seçim, sahnenin ihtiyacına göre yapılır.",
      },
      { type: "h2", text: "Text-to-video mu, image-to-video mu?" },
      {
        type: "p",
        text: "Text-to-video özgürlük verir: 'yağmurlu bir caddede neon ışıklar' yazarsınız, sahne gelir. Ama markanın ürününü, logosunu ya da mekânını birebir vermez; model her seferinde kendi yorumunu üretir.",
      },
      {
        type: "p",
        text: "Image-to-video ise gerçek bir kareden başlar. Ürünün fotoğrafı, mağazanın görüntüsü ya da tasarlanmış bir afiş başlangıç karesi olur; model bu kareyi hareketlendirir. **Ürünün gerçek kalması gereken her sahnede image-to-video tek güvenilir yoldur.**",
      },
      {
        type: "p",
        text: "Kural şu: atmosfer, geçiş ve duygu sahneleri text-to-video'dan; ürün, marka ve mekân sahneleri image-to-video'dan. Reklamın iskeleti gerçek görselle kurulur, dolgusu yapay zekâyla.",
      },
      { type: "h2", text: "Karakter ve ürün tutarlılığı nasıl sağlanır?" },
      {
        type: "p",
        text: "Tutarlılık, aynı karakterin ya da ürünün klipten klibe aynı görünmesidir. Yapay zekâ videonun en zayıf noktası buradadır; her üretim biraz farklı çıkar.",
      },
      {
        type: "ul",
        items: [
          "Referans görsel: Karakter ya da ürün için önce tek bir sabit görsel üretilir veya fotoğraflanır; tüm klipler bu görselden türetilir.",
          "Başlangıç ve bitiş karesi: Destekleyen modellerde klibin ilk ve son karesi verilir; model arasını doldurur, sapma azalır.",
          "Kısa klip: Klip uzadıkça model referanstan uzaklaşır. Kısa üretim, kurguda birleştirme.",
          "Sabit istem çekirdeği: Karakteri tanımlayan cümle her istemde aynen tekrarlanır; yalnızca sahne kısmı değişir.",
          "Ürünü dokunulmaz bırakmak: Ürün kadrajda küçükse veya yazı içeriyorsa, gerçek görsel post-prodüksiyonda üstüne bindirilir.",
        ],
      },
      { type: "h2", text: "Ses ve dudak senkronu hangi durumda?" },
      {
        type: "p",
        text: "Bu yazının tarihi itibarıyla bazı modeller görüntüyle birlikte ortam sesi ve diyalog üretebiliyor; bazıları yalnızca sessiz görüntü veriyor. Dudak senkronu destekleyen araçlar var, ancak Türkçe konuşmada doğallık değişken.",
      },
      {
        type: "p",
        text: "Reklam işinde güvenli yol: görüntüyü modelden, seslendirmeyi ayrı bir araçtan ya da gerçek seslendirme sanatçısından almak; müziği lisanslı kaynaktan seçmek; altyazıyı her koşulda eklemek. Konuşan yüz gerekiyorsa kısa ve yakın plan tercih edilir, uzun monolog değil.",
      },
      { type: "h2", text: "Hangi iş için hangi tip araç?" },
      {
        type: "table",
        caption: "İş türüne göre araç tipi seçimi",
        head: ["İş", "Tercih edilen tip", "Neden"],
        rows: [
          ["Ürün tanıtımı (e-ticaret, yerel hizmet)", "Image-to-video + gerçek ürün görseli", "Ürün birebir kalır, sahne sinematik olur"],
          ["Sosyal medya serisi", "Sabit referans + kısa klipler", "Aynı görsel dil, hızlı tekrar"],
          ["Konsept ve marka filmi", "Text-to-video atmosfer + image-to-video ürün", "Gerçekte çekilmesi zor sahneler"],
          ["Kampanya duyurusu", "Şablon başlangıç karesi + metin katmanı", "Metin değişince video yeniden kurulmaz"],
          ["Konuşan sunucu / sözcü", "Lip-sync aracı veya gerçek çekim", "Uzun konuşmada yapay zekâ hâlâ riskli"],
          ["Mekân tanıtımı (dükkân, otel)", "Gerçek fotoğraftan image-to-video", "Mekân sadakati metinle sağlanamaz"],
        ],
      },
      { type: "h2", text: "AI izi nasıl azaltılır?" },
      {
        type: "p",
        text: "İzleyici yapay zekâyı görüntü kalitesinden değil hatalardan anlar. Eriyen el, kayan logo, fizik dışı sıçrama. Bu izler üretim disipliniyle büyük ölçüde önlenir.",
      },
      {
        type: "ol",
        items: [
          "Kısa klip üret: Hata süresi uzadıkça birikir. Kısa klipler, kurguda birleştirme.",
          "Image-to-video tercih et: Gerçek başlangıç karesi modeli sınırlar; şekil kayması azalır.",
          "Gerçek ürün referansı ver: Ürün, logo ve yazı gerçek görselden gelsin; gerekirse post-prodüksiyonda üstüne bindirilsin.",
          "El, yazı ve yüzü kadrajdan çıkar ya da küçült: En çok bozulan üç öğe. Gerekmiyorsa gösterme.",
          "Hareketi sade tut: Yavaş kamera, tek eksen hareket. Hızlı pan ve karmaşık koreografi morph üretir.",
          "Çok üret, seç: Aynı istemden birkaç deneme; en temiz klip kurguya girer.",
          "Post-prodüksiyonda kapat: Renk düzeltme, hafif grain, kesme hızı ve gerçek müzik; aşırı pürüzsüz dijital hissi kırar.",
        ],
      },
      {
        type: "callout",
        title: "KARNER bu alanda ne yapar?",
        text: "KARNER reklam videolarını Veo ve Kling gibi modellerle üretir, senaryo ve marka dilini insan eliyle yazar. Sürecin tamamı için [Yapay Zekâ ile Reklam Videosu](/yapay-zeka-reklam-videosu) rehberine ve [AI Video & Reklam](/hizmetler/ai-video-reklam) hizmet sayfasına bakabilirsiniz.",
      },
      {
        type: "p",
        text: "Senaryo tarafı için [Reels reklam senaryosu nasıl yazılır](/rehber/reels-reklam-senaryosu-nasil-yazilir), diğer konular için [rehber ana sayfası](/rehber).",
      },
    ],
    faq: [
      {
        q: "En iyi yapay zekâ video aracı hangisi?",
        a: "Tek cevap yok. Ürün sadakati gerekiyorsa image-to-video'da güçlü modeller, sinematik atmosfer gerekiyorsa ışık ve kamera dili iyi olan modeller öne çıkar. Profesyonel iş akışında aynı projede birden fazla model kullanılır; seçim sahnenin ihtiyacına göre yapılır ve araçlar sık sık güncellendiği için düzenli yeniden değerlendirilir.",
      },
      {
        q: "Yapay zekâ videoda ürünüm birebir görünür mü?",
        a: "Ürünün gerçek fotoğrafı başlangıç karesi olarak verilirse büyük ölçüde evet. Yine de ince detay, yazı ve logo sapabilir; bu yüzden ürün sahnelerinde kısa klip üretilir ve gerekirse gerçek görsel post-prodüksiyonda üstüne bindirilir. Metinden üretimde birebir ürün beklenmemelidir.",
      },
      {
        q: "Uzun bir tanıtım filmi yapay zekâyla yapılabilir mi?",
        a: "Evet, ama tek klip olarak değil. Modeller kısa klip üretir; uzun film bu kliplerin senaryoya göre kurgulanmasıyla oluşur. Bu aslında klasik prodüksiyonla aynı mantıktır: sahne sahne çekilir, kurguda birleşir. Tutarlılık için tüm klipler aynı referans görselden türetilir.",
      },
      {
        q: "Yapay zekâ video Türkçe seslendirme yapabilir mi?",
        a: "Görüntü modeli ve ses aracı genellikle ayrı ele alınır. Türkçe dahil pek çok dilde yapay zekâ seslendirme üreten araçlar vardır; dudak senkronu ise daha sınırlı ve değişkendir. Güvenli yol görüntüyü modelden, seslendirmeyi ayrı araçtan ya da gerçek sanatçıdan almak ve altyazıyı her durumda eklemektir.",
      },
      {
        q: "Üretilen videoyu reklamda kullanmak serbest mi?",
        a: "Kullanım hakları aracın lisans koşullarına bağlıdır; çoğu platform ücretli planlarda ticari kullanıma izin verir. Müzik ve seslendirme için ayrıca lisans gerekir. Marka öğeleri zaten size aittir. Üretim öncesinde aracın güncel kullanım koşulları okunmalı; çıktıda üçüncü kişilere ait marka ya da yüz bulunmamalıdır.",
      },
    ],
    related: ["reels-reklam-senaryosu-nasil-yazilir"],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
  {
    slug: "reels-reklam-senaryosu-nasil-yazilir",
    title: "Reels Reklam Senaryosu Nasıl Yazılır? Kanca, Vaat, Çağrı",
    seoTitle: "Reels Reklam Senaryosu Nasıl Yazılır? Adım Adım | KARNER",
    seoDescription:
      "Kısa Reels ve Shorts reklamı için senaryo: ilk saniyelerde kanca, tek vaat, üç perde, altyazı, dikey format, CTA. AI üretim için shot listesi ve örnek iskelet.",
    summary:
      "Reels reklam senaryosu; ilk saniyelerde dikkati yakalayan bir kanca, tek bir vaat ve net bir çağrıdan oluşur. Yapı üç perdedir: sorun, çözüm, çağrı. Video sessiz izlenir varsayımıyla altyazı zorunludur; format dikey 9:16'dır ve marka ilk saniyelerde görünür. Yapay zekâ üretimi için senaryo, sahne sahne shot listesine çevrilir.",
    cluster: "video",
    pillar: { href: "/yapay-zeka-reklam-videosu", label: "Yapay Zekâ ile Reklam Videosu" },
    serviceSlug: "ai-video-reklam",
    blocks: [
      { type: "h2", text: "Reels reklam senaryosu nedir?" },
      {
        type: "dl",
        items: [
          {
            term: "Reels reklam senaryosu",
            def: "Kısa dikey video için yazılmış, saniye bazında planlanmış anlatım metni. Ne görüneceğini, ne duyulacağını ve ekranda ne yazacağını birlikte tarif eder.",
          },
          {
            term: "Kanca (hook)",
            def: "İlk saniyelerde kaydırmayı durduran görüntü ya da cümle. Soru, beklenmedik görüntü, doğrudan hitap.",
          },
          {
            term: "Tek vaat",
            def: "Videonun izleyiciye söylediği tek şey. İkinci vaat eklendiğinde ilki zayıflar.",
          },
          {
            term: "Shot listesi",
            def: "Senaryonun sahne sahne görsel tarife dönüşmüş hâli. Yapay zekâ üretiminde her satır bir klip istemidir.",
          },
        ],
      },
      {
        type: "p",
        text: "Kısa reklam uzun reklamın kısaltılmışı değildir. Ayrı bir türdür: **tek fikir, tek duygu, tek eylem.** Televizyon reklamı gibi giriş-gelişme-sonuç kurmaya vakit yoktur; ilk kare zaten gelişmedir.",
      },
      { type: "h2", text: "İlk saniyelerde kanca nasıl kurulur?" },
      {
        type: "p",
        text: "İzleyici kaydırma hâlindedir. Kanca, başparmağı durduran şeydir. Üç güvenilir yol vardır: izleyicinin kendi sorununu yüzüne söyleyen cümle, açıklama gerektiren beklenmedik görüntü ve doğrudan 'sen' hitabı.",
      },
      {
        type: "p",
        text: "Kanca görsel ve yazılı olarak aynı anda çalışmalıdır. Ses kapalı olabilir; bu yüzden ilk karede ekran yazısı vardır. Logo ile açılmak kancayı öldürür; marka kancadan hemen sonra, ama yine ilk saniyelerde görünür.",
      },
      {
        type: "ul",
        items: [
          "Soru kancası: İzleyicinin kendine sorduğu soruyu ekrana yaz.",
          "Görsel kanca: Sonucu önce göster, nedenini sonra anlat.",
          "Karşıtlık kancası: Önce/sonra, eski/yeni, karmaşık/sade.",
          "Hitap kancası: 'Eğer ... yapıyorsan' ile izleyiciyi seç.",
        ],
      },
      { type: "h2", text: "Üç perde nasıl kurulur? Sorun, çözüm, çağrı" },
      {
        type: "p",
        text: "Kısa reklamın iskeleti üç perdedir. Her perde tek iş yapar. Perdeler arasında geçiş yazıyla değil görüntüyle olur; **gösterme anlatmadan güçlüdür.**",
      },
      {
        type: "ol",
        items: [
          "Sorun perdesi: İzleyicinin tanıdığı bir an. Bozuk, yavaş, karışık ya da eksik olan şey gösterilir. Anlatılmaz; sahnede görünür.",
          "Çözüm perdesi: Ürün ya da hizmet sahneye girer, sorun gözle görülür biçimde çözülür. Özellik listesi değil, değişimin kendisi.",
          "Çağrı perdesi: Tek eylem. Mesaj at, siteye gel, randevu al. Ekranda yazılı, seste söylenmiş, marka görünür.",
        ],
      },
      {
        type: "p",
        text: "Üç perdenin süre dağılımı eşit değildir. Sorun kısa, çözüm en uzun, çağrı net ve son kareye kadar ekranda kalacak kadar uzun.",
      },
      { type: "h2", text: "Altyazı, format ve marka yerleşimi kuralları neler?" },
      {
        type: "table",
        caption: "Kısa dikey reklam için teknik ve anlatım kuralları",
        head: ["Konu", "Kural", "Neden"],
        rows: [
          ["Format", "Dikey 9:16, güvenli alan ortada", "Telefon ekranı tam dolar; alt ve üst arayüz yazıyı kapatmasın"],
          ["Altyazı", "Her konuşma ve ana mesaj ekranda yazılı", "Video büyük ölçüde sessiz izlenir"],
          ["Marka", "İlk saniyelerde görünür, son karede sabit", "İzleyici videoyu yarıda bıraksa da markayı görür"],
          ["Vaat", "Tek cümle, tek fayda", "Birden fazla mesaj hiçbirini hatırlatmaz"],
          ["Ses", "Müzik + kısa seslendirme; sessiz de anlaşılır", "Ses açıksa güçlendirir, kapalıysa engellemez"],
          ["Çağrı (CTA)", "Tek eylem, yazılı ve sesli", "Karar yükü düşer, eylem artar"],
          ["Tempo", "Sık kesme ama okunabilir yazı", "Dikkat tutulur, mesaj kaçmaz"],
        ],
      },
      { type: "h2", text: "Yapay zekâ üretimi için shot listesi nasıl çıkarılır?" },
      {
        type: "p",
        text: "Senaryo onaylanınca her perde sahnelere bölünür. Her sahne tek bir klip istemine dönüşür. Shot listesi, senaryonun üretim diline çevrilmiş hâlidir; yapay zekâ modeli senaryoyu değil bu satırları okur.",
      },
      {
        type: "ol",
        items: [
          "Her perdeyi sahnelere böl: Sorun için bir-iki sahne, çözüm için birkaç sahne, çağrı için tek sahne.",
          "Her sahneye tek hareket yaz: 'Kamera yavaşça yaklaşır', 'el ürünü masaya koyar'. Birden fazla hareket morph üretir.",
          "Başlangıç karesini belirle: Ürün ve mekân sahnelerinde gerçek fotoğraf; atmosfer sahnelerinde üretilmiş görsel.",
          "Işık, açı ve mekânı sabit tut: Tüm sahnelerde aynı ışık yönü ve renk sıcaklığı; yoksa kurguda kopuk durur.",
          "Ekran yazısını ayrı sütuna yaz: Klibe yazı ürettirme; yazı kurguda eklenir.",
          "Yedek iste: Kritik sahneler için birkaç varyant üret, en temizini seç.",
        ],
      },
      { type: "h2", text: "Örnek senaryo iskeleti nasıl görünür?" },
      {
        type: "p",
        text: "Aşağıdaki iskelet sektör bağımsızdır. Ürün yerine kendi ürününüzü, sorun yerine müşterinizin gerçek derdini koyun. Marka adı ve iddia içermez; yapı gösterir.",
      },
      {
        type: "table",
        caption: "Sektör-nötr Reels reklam iskeleti",
        head: ["Perde", "Görüntü", "Ekran yazısı", "Ses"],
        rows: [
          ["Kanca", "Sorunun en görünür anı, yakın plan", "İzleyicinin kendine sorduğu soru", "Tek kısa cümle ya da sessizlik"],
          ["Sorun", "Aynı sahne biraz geri çekilir, bağlam görünür", "Sorunun adı, tek kelime grubu", "Müzik girer"],
          ["Çözüm", "Ürün/hizmet sahneye girer, değişim görünür", "Tek vaat cümlesi", "Seslendirme vaadi söyler"],
          ["Kanıt", "Sonuç sahnesi, kullanım anı", "Somut ve onaylı bilgi varsa; yoksa boş", "Müzik yükselir"],
          ["Çağrı", "Marka ve iletişim yolu sabit kare", "Tek eylem + marka adı", "Eylem cümlesi sesli"],
        ],
      },
      {
        type: "p",
        text: "Kanıt perdesi isteğe bağlıdır ve yalnızca onaylı, doğrulanabilir bilgi varsa kullanılır. Uydurulmuş sayı ya da müşteri sözü reklamı değil markayı zayıflatır.",
      },
      { type: "h2", text: "Hangi klişelerden kaçınılmalı?" },
      {
        type: "ul",
        items: [
          "Logoyla açılış: Kanca yerine marka. İzleyici kaydırır.",
          "Özellik listesi: 'Hızlı, güvenilir, kaliteli'. Gösterilmeyen sıfat mesaj değildir.",
          "Birden fazla vaat: Hem ucuz hem hızlı hem yakın. Hiçbiri kalmaz.",
          "Anlatılan ama gösterilmeyen dönüşüm: Seslendirme 'hayatınız değişecek' der, ekranda hiçbir şey değişmez.",
          "Genel stok görüntü ve yapay zekâ klişesi: Gülümseyen ekip, el sıkışma, kayan neon. Markaya özgü hiçbir şey söylemez.",
          "Altyazısız konuşma: Sessiz izleyen için video yok demektir.",
          "Çağrısız bitiş: Güzel video, ne yapacağı belli değil.",
        ],
      },
      {
        type: "callout",
        title: "KARNER bu alanda ne yapar?",
        text: "KARNER reklam videolarını Veo ve Kling gibi modellerle üretir, senaryo ve marka dilini insan eliyle yazar. Üretim sürecinin tamamı [Yapay Zekâ ile Reklam Videosu](/yapay-zeka-reklam-videosu) rehberinde; hizmet kapsamı [AI Video & Reklam](/hizmetler/ai-video-reklam) sayfasında.",
      },
      {
        type: "p",
        text: "Araç seçimi için [AI video araçları karşılaştırması](/rehber/ai-video-araclari-veo-kling-karsilastirma), diğer konular için [rehber ana sayfası](/rehber).",
      },
    ],
    faq: [
      {
        q: "Reels reklamı ne kadar uzun olmalı?",
        a: "Kısa. Tek vaat ve tek çağrı için gereken kadar; fazlası kaydırmayı davet eder. Süreyi kural değil mesaj belirler: kanca, sorun, çözüm ve çağrı tek nefeste anlatılabiliyorsa video yeterince uzundur. Platform önerileri değişir; güncel rehberlere bakılır.",
      },
      {
        q: "Seslendirme şart mı?",
        a: "Hayır. Video sessiz izlenir varsayımıyla kurulur; altyazı ve ekran yazısı mesajı tek başına taşımalıdır. Seslendirme ses açık izleyen için güçlendiricidir. Müzik ise tempo ve duygu verir; lisanslı kaynaktan seçilmelidir. Kural: sesi kapat, video hâlâ anlaşılıyorsa senaryo doğrudur.",
      },
      {
        q: "Yapay zekâ ile üretilen Reels'te marka nasıl gerçek kalır?",
        a: "Ürün, logo ve mekân sahneleri gerçek görselden başlar; yapay zekâ bu karelerin etrafındaki hareketi ve atmosferi üretir. Yazı ve logo kurguda eklenir, modele ürettirilmez. Senaryo ve marka dili insan tarafından yazılır. Böylece sinematik görüntü ile gerçek marka aynı karede buluşur.",
      },
      {
        q: "Aynı senaryo TikTok ve YouTube Shorts için de kullanılır mı?",
        a: "Büyük ölçüde evet; üçü de dikey ve kısa formattır. Farklar kurguda çıkar: güvenli alanlar, altyazı alışkanlığı ve müzik kullanımı platforma göre ayarlanır. Senaryo iskeleti aynı kalır, her platform için ayrı kurgu teslim edilir.",
      },
      {
        q: "Reklamda sayı ya da müşteri yorumu kullanabilir miyim?",
        a: "Yalnızca gerçek, belgeli ve izinli olanları. Onaylı bir müşteri yorumu ya da doğrulanabilir bir bilgi kanıt perdesine girer. Uydurulmuş sayı, abartılı iddia ve izinsiz yorum hem güveni hem de reklam mevzuatı açısından markayı riske atar. Kanıt yoksa perde boş bırakılır.",
      },
    ],
    related: ["ai-video-araclari-veo-kling-karsilastirma"],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
];
