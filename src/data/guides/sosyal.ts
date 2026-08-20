import type { Guide } from "./types";

/**
 * "sosyal" kümesi — sosyal medya içerik yönetimi rehberleri.
 * Pillar: /hizmetler/sosyal-medya-icerik-yonetimi
 * Kural: genel bilgi; sayı/yüzde iddiası, algoritma "sırrı", müşteri sözü yok.
 */
const PILLAR = {
  href: "/hizmetler/sosyal-medya-icerik-yonetimi",
  label: "Sosyal Medya İçerik Yönetimi",
};

export const SOSYAL_GUIDES: Guide[] = [
  {
    slug: "instagram-icerik-takvimi-nasil-kurulur",
    title: "Instagram içerik takvimi nasıl kurulur? KOBİ için aylık plan",
    seoTitle: "Instagram İçerik Takvimi Nasıl Kurulur? Aylık Plan | KARNER",
    seoDescription:
      "Küçük işletme için Instagram içerik takvimi: içerik sütunları, haftalık ritim, post/reels dengesi, üretim ve yayın akışı. Şablon iskeleti ve sık yapılan hatalar.",
    summary:
      "İçerik takvimi, bir ay boyunca ne zaman ne paylaşacağınızı önceden yazdığınız tablodur. Üç-dört içerik sütunu seçilir, haftalık ritim belirlenir, içerikler toplu üretilir ve günü gelince yayınlanır. Takvim olmadan hesap ya susar ya da aynı şeyi tekrar eder.",
    cluster: "sosyal",
    pillar: PILLAR,
    serviceSlug: "sosyal-medya-icerik-yonetimi",
    blocks: [
      { type: "h2", text: "İçerik takvimi nedir, neden gerekir?" },
      {
        type: "dl",
        items: [
          {
            term: "İçerik takvimi",
            def: "Hangi gün, hangi formatta (post, carousel, reels, hikâye), hangi konuda ve hangi amaçla paylaşım yapılacağını gösteren aylık plan. Üretim, onay ve yayın adımlarını tek tabloda toplar.",
          },
          {
            term: "İçerik sütunu",
            def: "Hesabın düzenli döndüğü 3–4 ana konu başlığı (ör. işin arkası, müşteri sorusu, ürün/hizmet, yerel). Takvim bu sütunların dönüşümlü sıralanmasıdır.",
          },
        ],
      },
      {
        type: "p",
        text: "Takvimsiz hesapların ortak kaderi aynıdır: ilk iki hafta hevesle paylaşım, sonra sessizlik, sonra toplu ve alakasız paylaşımlar. **Takvim, yaratıcılığı değil düzensizliği ortadan kaldırır.** İçerik fikri o gün bulunmaz; ay başında bulunur, toplu üretilir, yayını takvim yönetir.",
      },
      { type: "h2", text: "İçerik sütunları nasıl seçilir?" },
      {
        type: "p",
        text: "Sütun, hesabın kimliğini belirler. İşletme için işe yarayan dört sütun tipi vardır; üçünü ya da dördünü seçip dönüşümlü kullanın:",
      },
      {
        type: "ul",
        items: [
          "**İşin arkası** — atölye, ekip, süreç, hazırlık. Güven kurar; stok görselin yapamadığını yapar.",
          "**Müşterinin sorusu** — en sık sorulan 10 soruya kısa cevap. Aynı zamanda [yapay zekâ aramasında görünmek](/yapay-zeka-aramasinda-gorunmek) için sitede yazılacak SSS'nin kaynağıdır.",
          "**Ürün / hizmet** — tek ürün, tek fayda, tek görsel. Katalog değil, her seferinde bir şey.",
          "**Yerel / güncel** — şehir, mevsim, yerel etkinlik, sezon ihtiyacı. Hesabı \"buralı\" yapar.",
        ],
      },
      { type: "h2", text: "Haftalık ritim nasıl belirlenir?" },
      {
        type: "p",
        text: "Sürdürebileceğiniz ritmi seçin; tutamayacağınız sıklık en kötü ritimdir. Küçük ekip için gerçekçi başlangıç: haftada 2 post + 1 reels + günlük 1–2 hikâye. Ritim oturunca artırılır.",
      },
      {
        type: "table",
        caption: "Örnek haftalık iskelet (işletmeye göre uyarlanır)",
        head: ["Gün", "Format", "Sütun", "Amaç"],
        rows: [
          ["Pazartesi", "Carousel", "Müşterinin sorusu", "Kaydetme, bilgi"],
          ["Çarşamba", "Reels (15–30 sn)", "İşin arkası", "Erişim, güven"],
          ["Cuma", "Tek görsel", "Ürün / hizmet", "Mesaj / tıklama"],
          ["Her gün", "Hikâye", "Güncel", "Hatırlatma, yakınlık"],
        ],
      },
      { type: "h2", text: "Aylık akış: plan, üretim, onay, yayın" },
      {
        type: "ol",
        items: [
          "**Ay başı planlama (1 saat):** sütunlara göre 8–16 konu başlığı yaz; kampanya ve sezon tarihlerini takvime işaretle.",
          "**Toplu üretim (tek gün):** fotoğraf/video çekimi ve yapay zekâ destekli görseller aynı oturumda; metinler ve altyazılar birlikte yazılır.",
          "**Onay:** içerikler tek tabloda işletme sahibine gider; yanlış bilgi, fiyat, iddia burada elenir.",
          "**Yayın:** planlama aracı ya da elle; yayın saati hedef kitlenin aktif olduğu dilime göre.",
          "**Ay sonu bakış (15 dakika):** hangi sütun izlendi, hangisi sessiz kaldı — bir sonraki ayın dağılımı buna göre.",
        ],
      },
      { type: "h2", text: "Sık yapılan hatalar nelerdir?" },
      {
        type: "ul",
        items: [
          "Her gün paylaşıp iki haftada tükenmek — ritim, sıklıktan önemlidir.",
          "Tek sütunda kalmak (sürekli ürün fotoğrafı) — hesap katalog olur, kimse takip etmez.",
          "Stok görsel ve hazır şablonla doldurmak — gerçek mekân, gerçek insan, gerçek iş her zaman daha çok izlenir.",
          "Altyazısız video — izleyenlerin çoğu sessiz izler.",
          "Site ve profil uyumsuzluğu — profildeki bağlantı, hizmet ve iletişim bilgisi siteyle aynı olmalı; [işletme kimliği tutarlılığı](/rehber/chatgpt-firmami-neden-onermiyor) arama tarafını da etkiler.",
        ],
      },
      {
        type: "callout",
        title: "KARNER'da nasıl işliyor",
        text: "Sosyal Medya İçerik Yönetimi paketlerinde takvim, üretim ve yayın bu akışla yürür; içerik onayı işletmede kalır, DM/yorum yönetimi kapsam dışıdır. Ayrıntı: [hizmet sayfası](/hizmetler/sosyal-medya-icerik-yonetimi) ve [paketler](/paketler#sosyal-medya).",
      },
    ],
    faq: [
      {
        q: "Ayda kaç paylaşım yeterli?",
        a: "Tek bir doğru sayı yok; tutarlı sürdürebildiğiniz ritim yeterlidir. Küçük işletme için haftada iki-üç içerik ve düzenli hikâye gerçekçi bir başlangıçtır. Sayıyı artırmadan önce üretim düzenini oturtun; düzensiz yüksek sıklık, düzenli düşük sıklıktan kötüdür.",
      },
      {
        q: "Reels mi post mu?",
        a: "İkisi farklı iş yapar: reels yeni insanlara ulaşır, post ve carousel mevcut takipçiyle bilgi ve güven kurar. İkisini birlikte, takvimde belirli oranda kullanmak en sağlıklısı; yalnızca reels yapan hesabın profili boş, yalnızca post yapan hesabın erişimi dar kalır.",
      },
      {
        q: "İçeriği kim onaylar?",
        a: "İşletme sahibi ya da yetkilendirdiği kişi. Fiyat, kampanya koşulu, ürün bilgisi ve iddialar yalnızca onayla yayınlanır; içerik ekibi taslağı hazırlar, onay tabloda görünür şekilde verilir.",
      },
      {
        q: "Yapay zekâ ile üretilen görsel kullanılabilir mi?",
        a: "Destekleyici olarak evet: ürün görseli, kampanya arka planı, kısa reels sahneleri. Ancak işletmenin gerçek mekânı, ekibi ve işi takvimin omurgası olmalı; izleyici gerçek olanı ayırt eder ve ona güvenir.",
      },
    ],
    related: ["kobi-icin-sosyal-medyada-ne-paylasilir", "reels-reklam-senaryosu-nasil-yazilir"],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
  {
    slug: "kobi-icin-sosyal-medyada-ne-paylasilir",
    title: "Küçük işletme sosyal medyada ne paylaşmalı? 12 içerik fikri",
    seoTitle: "KOBİ Sosyal Medyada Ne Paylaşmalı? 12 İçerik Fikri | KARNER",
    seoDescription:
      "Esnaf, klinik, emlak, hizmet işletmesi için sosyal medyada işe yarayan 12 içerik fikri: işin arkası, müşteri sorusu, önce-sonra, yerel takvim. Neyi paylaşmamalı, neden.",
    summary:
      "Küçük işletmenin sosyal medyası ürün kataloğu değil, güven inşasıdır. En çok işe yarayan içerikler işin arkasını gösteren, müşterinin gerçek sorusuna cevap veren ve işletmeyi yerel hayata bağlayan paylaşımlardır. Aşağıda 12 fikir ve her birinin neden çalıştığı var.",
    cluster: "sosyal",
    pillar: PILLAR,
    serviceSlug: "sosyal-medya-icerik-yonetimi",
    blocks: [
      { type: "h2", text: "Sosyal medyada işletme ne için var?" },
      {
        type: "dl",
        items: [
          {
            term: "İşletme hesabının işi",
            def: "Satış sayfası olmak değil; işletmeyi tanıdık, güvenilir ve ulaşılabilir kılmak. Müşteri çoğu zaman bir şey almadan önce haftalarca izler, sonra arar.",
          },
        ],
      },
      {
        type: "p",
        text: "**Takipçi, ürününüzü değil işletmenizi takip eder.** Bu yüzden en çok izlenen içerikler en parlak ürün fotoğrafı değil; ustanın eli, ekibin sabahı, müşterinin sorusuna verilen net cevaptır. Aşağıdaki fikirler bu ilkeye göre seçildi.",
      },
      { type: "h2", text: "12 içerik fikri ve neden çalıştıkları" },
      {
        type: "ol",
        items: [
          "**İşin arkası** — hazırlık, atölye, montaj, temizlik, teslim anı. Gerçek süreç, güvenin en kısa yolu.",
          "**Müşterinin sorusu** — \"en çok ne soruluyor?\" listesinden her hafta bir soru, 30 saniyede cevap. Aynı cevaplar sitenizdeki SSS'de de durur; [arama tarafı](/rehber/aeo-nedir-cevap-motoru-optimizasyonu) de bundan beslenir.",
          "**Önce / sonra** — temizlik, tadilat, tasarım, bakım işlerinde en güçlü format. İzin alınmış, gerçek iş.",
          "**Tek ürün, tek fayda** — katalog değil; bir ürün, ne işe yaradığı, kime uygun olduğu.",
          "**Ekip tanıtımı** — kim kimdir, ne yapar. Küçük işletmenin en büyük farkı insanlardır.",
          "**Yerel takvim** — şehirde/ilçede olan biten, mevsim, sezon ihtiyacı (kış öncesi bakım, yaz öncesi klima gibi).",
          "**Nasıl yapılır mini rehber** — müşterinin kendi başına yapabileceği küçük şey; \"bize gerek kalmadı\" dedirtmez, \"bunlar işi biliyor\" dedirtir.",
          "**Yanlış bilinenler** — sektörde yaygın yanlış inanışlara kısa düzeltme. Uzmanlık sinyali.",
          "**Araç ve malzeme** — hangi ekipman, neden o; kaliteyi görünür kılar.",
          "**Müşteri yolculuğu** — arama → keşif → teklif → teslim: ne bekleneceğini anlatır, ilk teması kolaylaştırır.",
          "**Kampanya / dönem duyurusu** — net koşul, net tarih; haftada en fazla bir kez.",
          "**Teşekkür ve izinli paylaşım** — tamamlanan iş, izin alınmış fotoğraf; övgü yazısı değil, işin kendisi.",
        ],
      },
      { type: "h2", text: "Neyi paylaşmamalı?" },
      {
        type: "ul",
        items: [
          "Stok fotoğraf ve jenerik motivasyon sözleri — işletmeyle bağı yok, izleyici geçer.",
          "Doğrulanamayan iddia ve garanti cümleleri — güveni kurmaz, riske atar.",
          "İzinsiz müşteri görüntüsü ve kişisel veri — hem etik hem yasal sorun.",
          "Rakip eleştirisi — kısa vadeli ilgi, uzun vadeli itibar kaybı.",
          "Her gün kampanya — hesabı indirim panosuna çevirir; kampanya etkisini de öldürür.",
        ],
      },
      { type: "h2", text: "Hangi format, hangi fikre uyar?" },
      {
        type: "table",
        head: ["Fikir", "En uygun format", "Not"],
        rows: [
          ["İşin arkası, önce/sonra", "Reels (15–30 sn)", "Altyazı şart; ilk 2 saniye sonucu göster"],
          ["Müşterinin sorusu, yanlış bilinenler", "Carousel (4–6 kare)", "Kaydedilir, sonra okunur"],
          ["Tek ürün, ekip, teşekkür", "Tek görsel", "Gerçek çekim, sade metin"],
          ["Yerel takvim, duyuru", "Hikâye", "Günlük, geçici; profil sabitine taşınmaz"],
        ],
      },
      {
        type: "callout",
        title: "Başlangıç için",
        text: "Bu 12 fikirden 3–4 sütun seçip [içerik takvimine](/rehber/instagram-icerik-takvimi-nasil-kurulur) yerleştirin. Video üretimi için [Reels senaryosu rehberi](/rehber/reels-reklam-senaryosu-nasil-yazilir) ve [AI video](/yapay-zeka-reklam-videosu) sayfasına bakın.",
      },
    ],
    faq: [
      {
        q: "Fiyat paylaşmalı mıyım?",
        a: "Sektöre göre değişir. Fiyatı net ve sabit olan ürünlerde paylaşmak soruyu azaltır; keşif gerektiren hizmetlerde \"başlangıç\" ya da \"teklif alın\" dili daha doğrudur. Paylaşılan fiyat güncel tutulmalı; eski kampanya görseli profilde kalmamalı.",
      },
      {
        q: "Müşteri fotoğrafı paylaşabilir miyim?",
        a: "Yalnızca açık izinle. Kişinin yüzü, adı ya da adresi görünüyorsa yazılı izin alın; klinik gibi hassas alanlarda ek mevzuat dikkat ister. İzin yoksa işi gösterin, kişiyi değil.",
      },
      {
        q: "Takipçi sayısı önemli mi?",
        a: "İşletme için takipçi sayısı değil, doğru kişinin görmesi ve iletişime geçmesi önemlidir. Bin yerel takipçi, on bin alakasız takipçiden değerlidir; ölçü, gelen mesaj ve arama sayısıdır.",
      },
      {
        q: "Sitem yokken sosyal medya yeter mi?",
        a: "Başlangıç için görünürlük sağlar ama arama motorunda ve yapay zekâ araçlarında bulunmak için site gerekir; sosyal hesaplar oralarda zayıf kaynak sayılır. İkisi birlikte çalışır: sosyal medya tanıştırır, site ikna eder.",
      },
    ],
    related: ["instagram-icerik-takvimi-nasil-kurulur", "reels-reklam-senaryosu-nasil-yazilir", "ai-video-araclari-veo-kling-karsilastirma"],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
];
