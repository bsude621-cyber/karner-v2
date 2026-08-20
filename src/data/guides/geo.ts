import type { Guide } from "./types";

/**
 * "geo" kümesi — yapay zekâ araması, AEO ve yapısal veri rehberleri.
 * Pillar: /yapay-zeka-aramasinda-gorunmek · Hizmet: /hizmetler/seo-geo-aeo
 *
 * Kural: yalnızca genel teknik bilgi ve belgeli KARNER gerçeği.
 * Fiyat, süre garantisi, sayı/yüzde iddiası, müşteri sözü YAZILMAZ.
 */

const PILLAR = {
  href: "/yapay-zeka-aramasinda-gorunmek",
  label: "Yapay Zekâ Aramasında Görünmek",
} as const;

const KARNER_CALLOUT =
  "KARNER kurduğu her sitede robots.txt AI bot izinleri, llms.txt/llms-full.txt, @id ile bağlı schema.org graph'ı ve hızlı açılış altyapısını teslimin parçası olarak kurar.";

export const GEO_GUIDES: Guide[] = [
  /* ------------------------------------------------------------------ */
  /* 1. llms.txt nedir                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "llms-txt-nedir",
    title: "llms.txt ve llms-full.txt nedir, nasıl yazılır, kim okur?",
    seoTitle: "llms.txt Nedir, Nasıl Yazılır? Örnek İskelet | KARNER",
    seoDescription:
      "llms.txt ve llms-full.txt nedir, yapay zekâ araçları bu dosyaları nasıl kullanır? llmstxt.org standardına uygun örnek iskelet, bölüm yapısı ve sık hatalar.",
    summary:
      "llms.txt, sitenin kök dizininde duran ve yapay zekâ araçlarına sitenin ne anlattığını özetleyen Markdown dosyasıdır; llms-full.txt ise önemli içeriğin tamamını tek dosyada sunar. Standart Eylül 2024'te Jeremy Howard tarafından llmstxt.org'da önerildi: tek H1 başlık, kısa blockquote özet ve açıklamalı bağlantı listeleriyle yazılır.",
    cluster: "geo",
    pillar: PILLAR,
    serviceSlug: "seo-geo-aeo",
    blocks: [
      { type: "h2", text: "llms.txt nedir?" },
      {
        type: "dl",
        items: [
          {
            term: "llms.txt",
            def: "Sitenin kök dizininde (/llms.txt) duran, Markdown biçiminde yazılmış bir site özetidir. Yapay zekâ araçlarına hangi sayfada ne olduğunu kısa ve düzenli biçimde anlatır.",
          },
          {
            term: "llms-full.txt",
            def: "Aynı dizinde duran ikinci dosyadır. Sitenin önemli içeriğinin tamamını tek bir Markdown dosyasında birleştirir; araç tek istekle bütün metne ulaşır.",
          },
        ],
      },
      {
        type: "p",
        text: "Öneri, Eylül 2024'te llmstxt.org adresinde yayımlandı. Yazarı, Answer.AI kurucu ortağı Jeremy Howard'dır. Amaç basitti: bir web sayfası insan için tasarlanır, menü, reklam, çerez uyarısı ve script ile dolar. Dil modeli ise sınırlı bir bağlam penceresiyle çalışır ve bu gürültüyü ayıklamak zorunda kalır.",
      },
      {
        type: "p",
        text: "**llms.txt, siteyi yapay zekâ araçlarına kendi diliyle, temiz metin olarak tanıtan bir kapı dosyasıdır.** Sitemap.xml nasıl arama motoruna sayfa listesi veriyorsa, llms.txt de dil modeline “bu site ne anlatır, nereye bakmalısın” bilgisini verir. Fark şu: sitemap yalnızca URL listeler, llms.txt açıklama ve öncelik de taşır.",
      },
      {
        type: "p",
        text: "Bu dosya robots.txt'in yerini almaz. robots.txt erişimi düzenler; llms.txt içeriği tanıtır. İkisi birlikte çalışır: önce botlara kapıyı açarsınız, sonra llms.txt ile içeriyi anlatırsınız. Botlara kapının nasıl açılacağını [yapay zekâ botlarına site nasıl açılır](/rehber/yapay-zeka-botlarina-site-nasil-acilir) rehberinde ayrıca anlattık.",
      },

      { type: "h2", text: "llms.txt dosyasını kim okur?" },
      {
        type: "p",
        text: "Dürüst cevap: standart gönüllüdür ve henüz gençtir. Bugün en yaygın kullanıcıları geliştirici dokümantasyon siteleridir; Anthropic ve Cloudflare gibi şirketlerin dokümantasyon siteleri llms.txt yayımlar ve birçok dokümantasyon platformu bu dosyayı otomatik üretir.",
      },
      {
        type: "p",
        text: "Büyük arama ürünleri llms.txt'yi resmî bir sıralama sinyali olarak tanımadı. Google tarafı dosyayı kullanmadığını açıkça belirtti. Dolayısıyla llms.txt'nin tek başına sizi ChatGPT'de ya da Google AI Bakışı'nda öne çıkardığı iddiası doğru değildir.",
      },
      {
        type: "p",
        text: "Buna rağmen dosyanın pratik okuyucuları vardır: kullanıcı adına sayfa getiren ajanlar, kod asistanları, özel RAG kurulumları ve bir kullanıcının ChatGPT'ye ya da Claude'a site adresini yapıştırdığı anlar. Bu senaryolarda temiz Markdown, gürültülü HTML'den her zaman daha iyi anlaşılır.",
      },
      {
        type: "p",
        text: "**llms.txt'nin maliyeti düşük, olası faydası gerçektir; bu yüzden kurulmasını tavsiye ederiz, ama ondan sihir beklemeyiz.** Asıl görünürlük; bot erişimi, yapısal veri ve alıntılanabilir içerikle gelir. Bu bütünün nasıl kurulduğunu [Yapay Zekâ Aramasında Görünmek](/yapay-zeka-aramasinda-gorunmek) rehberinde anlatıyoruz.",
      },

      { type: "h2", text: "llms.txt nasıl yazılır?" },
      {
        type: "p",
        text: "llmstxt.org standardı dosyanın biçimini sabitler. Sıra önemlidir; çünkü dosyayı okuyan araç, bölümleri bu sıraya göre ayrıştırır.",
      },
      {
        type: "ol",
        items: [
          "Dosyanın ilk satırı tek bir H1 başlıktır ve zorunludur. Genellikle site ya da firma adı yazılır.",
          "Hemen altına bir blockquote (> ile başlayan) kısa özet gelir. Bir-iki cümleyle site ne anlatır, kime hitap eder sorusuna cevap verir.",
          "İsteğe bağlı olarak başlıksız birkaç paragraf veya liste eklenebilir. Burada bağlam verilir: hizmet bölgesi, uzmanlık alanı, sitenin yapısı.",
          "Sonra H2 başlıklarla bölümler açılır. Her bölüm, Markdown bağlantı listesinden oluşur: - [Sayfa adı](tam URL): bir cümle açıklama.",
          "En sona isteğe bağlı bir “Optional” bölümü eklenebilir. Araç bağlam penceresi dolduğunda bu bölümü atlayabilir; ikincil içerik buraya konur.",
        ],
      },
      {
        type: "p",
        text: "Bir hizmet işletmesi için iskelet şöyle görünür:",
      },
      {
        type: "ul",
        items: [
          "# Firma Adı — tek H1, dosyanın ilk satırı",
          "> Firma ne yapar, nerede hizmet verir, kime hitap eder — iki cümlelik blockquote",
          "## Hizmetler — her satır: - [Hizmet adı](https://site.com/hizmetler/x): tek cümle açıklama",
          "## Rehberler — sitenin teknik/bilgi içerikleri, aynı biçimde",
          "## İletişim ve kurumsal — hakkımızda, iletişim, yasal sayfalar",
          "## Optional — eski blog yazıları, ikincil sayfalar",
        ],
      },
      {
        type: "p",
        text: "Bağlantılar mutlaka tam URL olmalıdır; göreli yol (/hizmetler/x) dosya başka bağlamda okunduğunda kırılır. Açıklamalar sitedeki gerçek içerikle birebir uyumlu olmalıdır. llms.txt'de yazan hizmeti sitede bulamayan araç, dosyaya güvenmeyi bırakır.",
      },

      { type: "h2", text: "llms-full.txt ne zaman gerekir?" },
      {
        type: "p",
        text: "llms-full.txt, sitenin önemli sayfalarının tam metnini tek Markdown dosyasında birleştirir. Büyük dokümantasyon siteleri için neredeyse zorunludur; araç tek istekle bütün bilgiye ulaşır.",
      },
      {
        type: "p",
        text: "Küçük bir hizmet sitesi için de anlamlıdır. Sayfa sayısı azsa içeriğin tamamı rahatça sığar ve araç, hizmet detaylarını menülerden ayıklamak zorunda kalmaz. Şart olan, dosyanın güncel kalmasıdır: en sağlıklı yöntem, llms-full.txt'nin her derlemede (build) sayfa içeriğinden otomatik üretilmesidir. Elle kopyalanan dosya birkaç güncelleme sonra siteyle çelişmeye başlar.",
      },
      {
        type: "table",
        caption: "Kök dizindeki dört dosya ne işe yarar?",
        head: ["Dosya", "Okuyucu", "Ne anlatır"],
        rows: [
          ["robots.txt", "Tüm botlar", "Kim nereye girebilir"],
          ["sitemap.xml", "Arama motoru botları", "Hangi URL'ler var, ne zaman değişti"],
          ["llms.txt", "Dil modeli ve ajanlar", "Site ne anlatır, önce nereye bakılmalı"],
          ["llms-full.txt", "Dil modeli ve ajanlar", "Önemli içeriğin tam metni, tek dosyada"],
        ],
      },

      { type: "h2", text: "Sık yapılan hatalar nelerdir?" },
      {
        type: "ul",
        items: [
          "Dosyayı alt klasöre koymak: standart kök dizini (/llms.txt) bekler; /docs/llms.txt çoğu araç tarafından aranmaz.",
          "Markdown yerine HTML ya da düz reklam metni yazmak: dosya okunabilir ama amacını kaybeder.",
          "Pazarlama sloganlarıyla doldurmak: araç, cevabına taşıyacağı somut bilgi arar; “sektörün lideri” gibi cümleler işe yaramaz.",
          "Sitedeki içerikle çelişen bilgi vermek: farklı telefon, farklı hizmet listesi, eski adres.",
          "Dosyayı bir kez yazıp unutmak: yeni hizmet sayfası eklendiğinde llms.txt güncellenmezse eksik harita sunulur.",
          "robots.txt'te yapay zekâ botlarını engelleyip llms.txt yayımlamak: kapıyı kapatıp içeride tabela asmak gibidir.",
          "Yalnızca URL listelemek: açıklamasız bağlantı, sitemap'ten farksızdır; her satıra tek cümle açıklama eklenmelidir.",
        ],
      },
      {
        type: "p",
        text: "Yazdığınız dosyayı test etmenin en basit yolu, adresini bir yapay zekâ aracına yapıştırıp “bu site ne yapıyor, hangi hizmetleri veriyor?” diye sormaktır. Aracın cevabı sitenizi doğru anlatıyorsa dosya işini görüyordur.",
      },
      {
        type: "callout",
        title: "KARNER teslimlerinde",
        text: KARNER_CALLOUT,
      },
      {
        type: "p",
        text: "llms.txt tek başına bir parça; bütünü [SEO / GEO / AEO hizmeti](/hizmetler/seo-geo-aeo) sayfasında, diğer parçaları [yapısal veri rehberinde](/rehber/schema-org-yapisal-veri-nedir) ve [rehber merkezinde](/rehber) bulabilirsiniz.",
      },
    ],
    faq: [
      {
        q: "llms.txt ile sitemap.xml aynı şey mi?",
        a: "Hayır. sitemap.xml arama motorlarına sayfa adreslerini ve değişiklik tarihlerini XML biçiminde listeler; içerik hakkında açıklama taşımaz. llms.txt ise Markdown'dır, insan ve dil modeli tarafından okunabilir, her bağlantının yanında açıklama taşır ve öncelik belirtir. İkisi birbirini tamamlar; biri diğerinin yerine geçmez.",
      },
      {
        q: "llms.txt dosyası WordPress sitesine nasıl eklenir?",
        a: "İki yol vardır: dosyayı elle yazıp FTP ya da dosya yöneticisiyle sitenin kök dizinine yüklemek, ya da llms.txt üreten bir SEO eklentisi kullanmak. Hangi yol seçilirse seçilsin sonuç, site.com/llms.txt adresinde düz metin olarak açılmalı ve içerik her yeni sayfada güncellenmelidir.",
      },
      {
        q: "llms.txt olmayan site yapay zekâ aramasında görünmez mi?",
        a: "Görünür. llms.txt bir ön koşul değil, kolaylaştırıcıdır. Yapay zekâ araçları siteyi robots.txt izinleri, HTML içerik ve yapısal veri üzerinden zaten okur. Dosya; aracın siteyi daha hızlı ve daha doğru anlamasına yardım eder, özellikle kullanıcı siteyi doğrudan araca verdiğinde fark yaratır.",
      },
      {
        q: "llms.txt içinde fiyat ya da kampanya bilgisi verilmeli mi?",
        a: "Sık değişen bilgiler llms.txt'ye yazılmamalıdır. Dosya güncellenmezse araç eski fiyatı cevap olarak sunabilir ve bu müşteri tarafında güven kaybı yaratır. Dosyada kalıcı bilgiler durmalıdır: hizmetler, hizmet bölgesi, uzmanlık alanları ve ilgili sayfaların bağlantıları. Değişken bilgi için ilgili sayfaya bağlantı vermek yeterlidir.",
      },
      {
        q: "Dosyanın doğru çalıştığını nasıl kontrol ederim?",
        a: "Üç kontrol yeterlidir: tarayıcıda site.com/llms.txt adresini açıp düz metin döndüğünü görmek, sunucunun dosyayı text/plain ya da text/markdown içerik tipiyle sunduğunu doğrulamak ve dosyadaki her bağlantının gerçekten açıldığını test etmek. Kırık bağlantı ve 404 dönen dosya, en sık görülen iki sorundur.",
      },
    ],
    related: [
      "yapay-zeka-botlarina-site-nasil-acilir",
      "schema-org-yapisal-veri-nedir",
      "chatgpt-firmami-neden-onermiyor",
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },

  /* ------------------------------------------------------------------ */
  /* 2. Google AI Overview                                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "google-ai-overview-nasil-cikilir",
    title: "Google AI Overview'da nasıl çıkılır? Hangi sayfalar alıntılanır?",
    seoTitle: "Google AI Overview'da Çıkmak: Kaynak Seçilme | KARNER",
    seoDescription:
      "Google AI Bakışı (AI Overview) hangi sayfaları alıntılar, AI Mode farkı ne? Üst sıra, alıntılanabilir pasaj, yapısal veri ve güncellikle hazırlık adımları.",
    summary:
      "Google AI Overview (Türkçe arayüzde AI Bakışı), arama sonuçlarının üstünde yapay zekâ ile üretilen ve kaynak bağlantıları gösteren özet kutusudur. Kaynak olarak genellikle o sorgu için zaten iyi sıralanan, soruya kısa ve net pasajla cevap veren, yapısal verisi düzgün ve güncel sayfalar seçilir.",
    cluster: "geo",
    pillar: PILLAR,
    serviceSlug: "seo-geo-aeo",
    blocks: [
      { type: "h2", text: "Google AI Overview nedir?" },
      {
        type: "dl",
        items: [
          {
            term: "AI Overview (AI Bakışı)",
            def: "Google aramada, bazı sorgularda klasik sonuç listesinin üstünde görünen, Gemini modeliyle üretilmiş özet kutusudur. Özetin yanında ya da içinde bilgilerin alındığı sayfalara bağlantılar gösterilir.",
          },
          {
            term: "AI Mode",
            def: "Google aramanın ayrı bir sekmesidir. Kullanıcı sohbet eder gibi soru sorar, Google soruyu birden çok alt sorguya böler ve uzun, kaynaklı bir cevap üretir.",
          },
        ],
      },
      {
        type: "p",
        text: "AI Overview, Mayıs 2024'te Google I/O'da duyuruldu ve önce ABD'de açıldı. Sonraki dönemde Türkiye dâhil birçok ülkeye ve Türkçe sorgulara genişledi. Bugün bilgi arayan sorguların önemli bir bölümünde bu kutu görünür; işlem ya da marka sorgularında daha seyrek çıkar.",
      },
      {
        type: "p",
        text: "**AI Bakışı'nda kaynak gösterilmek, sıralamadan ayrı bir görünürlük katmanıdır: kullanıcı listeyi kaydırmadan önce özeti okur.** Özette adı geçen sayfa tıklanmasa bile görülür; geçmeyen sayfa, o kullanıcı için görünmez kalır.",
      },
      {
        type: "p",
        text: "AI Mode ise Mayıs 2025'te ABD'de açıldı ve ardından başka ülkelere ve dillere genişletildi. Farkı derinliktir: AI Bakışı tek soruya kısa özet verir, AI Mode çok turlu sohbete ve karşılaştırmaya izin verir. Her ikisi de aynı temel mantıkla çalışır: web'den sayfa çeker, pasaj seçer, cevap yazar.",
      },

      { type: "h2", text: "AI Overview hangi sayfaları alıntılar?" },
      {
        type: "p",
        text: "Google, AI Bakışı'nın temel arama sıralama sistemlerini kullandığını ve özel bir işaretleme gerektirmediğini açıklar. Yani kaynak havuzu, o sorgu için zaten dizine girmiş ve iyi sıralanan sayfalardan oluşur. Dizinde olmayan ya da çok geride kalan sayfanın alıntılanma şansı düşüktür.",
      },
      {
        type: "p",
        text: "Ancak üst sıra tek başına yetmez. Model, cevabı yazarken sayfaların tamamını değil, soruya doğrudan karşılık gelen pasajları kullanır. Bu yüzden aynı konuda daha geride olan ama soruya iki cümlede net cevap veren bir sayfa, lider sayfanın önüne geçebilir.",
      },
      {
        type: "p",
        text: "**AI Bakışı'nın alıntıladığı sayfaların ortak özelliği dörtlüdür: o sorgu için iyi sıralanır, soruya kısa ve bağımsız okunabilen pasajla cevap verir, yapısal verisi düzgündür ve içeriği günceldir.** Bu dört koşulu birlikte sağlayan sayfa, aday listesinde öne çıkar.",
      },
      {
        type: "table",
        caption: "AI Bakışı'nın kaynak seçiminde rol oynayan sinyaller",
        head: ["Sinyal", "Ne demek", "Sayfada nasıl görünür"],
        rows: [
          ["Sıralama", "Sorgu için dizinde ve üst sonuçlarda olmak", "Klasik SEO: teknik sağlık, iç bağlantı, otorite"],
          ["Alıntılanabilir pasaj", "Soruya tek başına anlamlı, kısa cevap", "Soru biçimli H2 + hemen altında 40-60 kelimelik cevap"],
          ["Yapısal veri", "Sayfanın ve işletmenin makine-okunur tanımı", "JSON-LD: Article, FAQPage, Organization, Service"],
          ["Güncellik", "İçeriğin ve tarihin taze olması", "Görünür tarih + dateModified + gerçekten güncellenen metin"],
          ["Tutarlılık", "Farklı kaynaklarda aynı bilgi", "Site, Google İşletme Profili ve dizinlerde aynı ad, adres, hizmet"],
        ],
      },

      { type: "h2", text: "AI Overview'a nasıl hazırlanılır?" },
      {
        type: "ol",
        items: [
          "Sayfanın dizine girdiğini ve hedef sorguda ilk sonuçlar arasında olduğunu Search Console'dan doğrulayın. Burada değilseniz önce klasik SEO temeli kurulmalıdır.",
          "Her önemli bölümü soru biçiminde H2 ile açın ve hemen altına soruya doğrudan cevap veren kısa bir paragraf yazın. Cevap, sayfadan koparılıp tek başına okunduğunda da anlamlı olmalıdır.",
          "Tanımları, adımları ve karşılaştırmaları listeye ya da tabloya dökün. Model, yapılandırılmış metni serbest paragraftan daha kolay alıntılar.",
          "Sayfa türüne uygun yapısal veri ekleyin ve işletme kimliğini Organization düğümüne bağlayın. Ayrıntı için [schema.org yapısal veri rehberine](/rehber/schema-org-yapisal-veri-nedir) bakın.",
          "İçeriği gerçekten güncelleyin ve tarihi görünür yazın. Yalnızca tarihi değiştirip metni bırakmak işe yaramaz; modeller metindeki değişikliği de görür.",
          "Sayfanın hızlı açıldığını ve içeriğin sunucudan gelen HTML'de bulunduğunu kontrol edin. Geç yüklenen içerik, bazı botlar için yok hükmündedir.",
          "Hedef soruları düzenli aralıklarla Google'da arayın ve AI Bakışı kutusunda kaynak olarak çıkıp çıkmadığınızı not edin. Bu test, sıralama raporunun göstermediği katmanı ölçer.",
        ],
      },
      {
        type: "p",
        text: "Bu adımların çoğu, [AEO — cevap motoru optimizasyonu](/rehber/aeo-nedir-cevap-motoru-optimizasyonu) ile örtüşür. Öne çıkan snippet için yazılmış sayfa, AI Bakışı için de iyi hammaddedir.",
      },

      { type: "h2", text: "Google-Extended engeli AI Overview'ı etkiler mi?" },
      {
        type: "p",
        text: "Hayır. Bu, en sık karıştırılan noktadır. Google-Extended, robots.txt'te Gemini modellerinin eğitimi ve bağlantılı kullanımı için tanımlanmış ayrı bir kontroldür. AI Bakışı ve AI Mode ise normal Googlebot taramasıyla çalışır; Google-Extended engellense de sayfa AI Bakışı'nda görünmeye devam edebilir.",
      },
      {
        type: "p",
        text: "Bir sayfanın AI Bakışı'nda alıntılanmasını gerçekten sınırlamak isteyen site, snippet kontrollerini kullanır: nosnippet, max-snippet ve data-nosnippet. Bu kontroller klasik sonuçlardaki açıklama metnini de etkiler; yani AI Bakışı'ndan çıkmanın bedeli, normal sonuçlarda da daha az metinle görünmektir. Bot izinlerinin tam listesi için [yapay zekâ botlarına site nasıl açılır](/rehber/yapay-zeka-botlarina-site-nasil-acilir) rehberine bakabilirsiniz.",
      },

      { type: "h2", text: "AI Overview görünürlüğü nasıl ölçülür?" },
      {
        type: "p",
        text: "Search Console, AI Bakışı'ndan gelen gösterim ve tıklamaları ayrı bir rapor olarak sunmaz; bu veriler web arama raporunun içinde toplanır. Dolayısıyla ayrı bir “AI Bakışı trafiği” sütunu aramak boşunadır.",
      },
      {
        type: "p",
        text: "Pratik ölçüm yöntemi düzenli sorgu testidir: hedef sorular belirli aralıklarla, tercihen oturum açılmamış bir tarayıcıda aranır; AI Bakışı çıkıyor mu, kaynaklar arasında siteniz var mı, hangi pasaj alınmış kayıt altına alınır. Aynı test ChatGPT ve Perplexity için de yapılır; bütünü [Yapay Zekâ Aramasında Görünmek](/yapay-zeka-aramasinda-gorunmek) rehberinde anlatıyoruz.",
      },
      {
        type: "callout",
        title: "KARNER teslimlerinde",
        text: KARNER_CALLOUT,
      },
      {
        type: "p",
        text: "Bu çalışmayı kendi siteniz için kurdurmak isterseniz [SEO / GEO / AEO hizmeti](/hizmetler/seo-geo-aeo) sayfasında kapsamı anlattık; diğer teknik konular [rehber merkezinde](/rehber).",
      },
    ],
    faq: [
      {
        q: "AI Overview her aramada çıkar mı?",
        a: "Hayır. Google bu kutuyu, üretken bir özetin kullanıcıya gerçekten yardım edeceğini düşündüğü sorgularda gösterir. Bilgi ve nasıl-yapılır sorgularında sık, marka adı, gezinme ve işlem sorgularında seyrek görünür. Aynı sorguda bir gün çıkıp ertesi gün çıkmaması da olağandır; bu yüzden ölçüm tek bir arama ile değil tekrar eden testlerle yapılır.",
      },
      {
        q: "AI Overview'da kaynak olmak tıklama getirir mi?",
        a: "Her zaman değil. Kullanıcı cevabı özet kutusunda bulup tıklamadan ayrılabilir. Buna karşılık kaynak olarak gösterilmek marka görünürlüğü ve güven sağlar; özellikle yerel hizmet sorgularında kullanıcı firmayı özet üzerinden öğrenir ve sonra doğrudan arayabilir. Görünürlük ve tıklama iki ayrı hedef olarak ele alınmalıdır.",
      },
      {
        q: "Yeni açılan bir site AI Overview'da çıkabilir mi?",
        a: "Çıkabilir, ama önce dizine girmesi ve hedef sorguda makul bir sıraya gelmesi gerekir. Yeni sitede en hızlı yol niş ve yerel sorgulardır: rekabet düşük olduğu için üst sıraya ulaşmak kolaydır ve soruya net cevap veren sayfa kaynak olarak seçilebilir. Genel ve rekabetçi sorgularda süreç daha uzundur.",
      },
      {
        q: "AI Mode için farklı bir hazırlık gerekir mi?",
        a: "Temel hazırlık aynıdır; AI Mode de aynı dizinden beslenir ve pasaj seçer. Fark, AI Mode'un soruyu alt sorgulara bölmesidir: tek bir soru, hizmet, fiyat aralığı, süreç ve bölge gibi birkaç alt soruya dönüşür. Bu yüzden sayfanın konunun alt başlıklarını da ayrı ayrı, soru biçiminde ele alması AI Mode'da daha çok işe yarar.",
      },
    ],
    related: [
      "aeo-nedir-cevap-motoru-optimizasyonu",
      "schema-org-yapisal-veri-nedir",
      "chatgpt-firmami-neden-onermiyor",
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },

  /* ------------------------------------------------------------------ */
  /* 3. ChatGPT firmamı neden önermiyor                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: "chatgpt-firmami-neden-onermiyor",
    title: "ChatGPT firmamı neden önermiyor? Beş sebep ve çözümü",
    seoTitle: "ChatGPT Firmamı Neden Önermiyor? 5 Sebep, Çözüm | KARNER",
    seoDescription:
      "ChatGPT ve Perplexity neden bazı firmaları önerir, bazılarını görmez? Kapalı robots.txt, JavaScript içerik, belirsiz kimlik, dizin eksikliği: tanı ve çözüm.",
    summary:
      "ChatGPT ve Perplexity bir firmayı önermek için önce onu web'de bulmalı, sayfasını okuyabilmeli ve kim olduğunu doğrulayabilmelidir. Önerilmeyen firmalarda genellikle beş sorundan biri vardır: botlara kapalı robots.txt, JavaScript ile yüklenen içerik, belirsiz işletme kimliği, dizinlerde ve haritada yokluk, güncellenmeyen içerik.",
    cluster: "geo",
    pillar: PILLAR,
    serviceSlug: "seo-geo-aeo",
    blocks: [
      { type: "h2", text: "ChatGPT firmaları nasıl seçer?" },
      {
        type: "dl",
        items: [
          {
            term: "Yapay zekâ araması",
            def: "ChatGPT, Perplexity ve Gemini gibi araçların bir soruya cevap verirken web'de arama yapması, bulduğu sayfalardan pasaj seçmesi ve tek bir cevap yazmasıdır. Firma, bu cevapta adı geçerse önerilmiş olur.",
          },
        ],
      },
      {
        type: "p",
        text: "ChatGPT'nin web araması, Ekim 2024'te açıldı. OpenAI, arama sonuçları için Bing dizininden yararlandığını ve kendi tarayıcısı OAI-SearchBot'u kullandığını açıklar. Bu yüzden Bing'de dizine girmemiş bir site, ChatGPT araması için de büyük ölçüde görünmezdir.",
      },
      {
        type: "p",
        text: "Perplexity kendi dizinini PerplexityBot ile kurar ve kullanıcı sorusu geldiğinde canlı arama yapar. Gemini ve Google AI Bakışı ise Google dizinini kullanır. Üç aracın ortak noktası şudur: **yapay zekâ araçları firmayı uydurmaz; web'de bulduğunu, okuyabildiğini ve doğrulayabildiğini önerir.**",
      },
      {
        type: "p",
        text: "Seçim mantığı kabaca üç adımdır: soruyu arama sorgularına çevir, gelen sayfaları oku, soruya en net cevap veren ve kimliği en tutarlı olanı cevaba taşı. Bu zincirin herhangi bir halkası kopuksa firma listeye giremez. Zincirin tamamını [Yapay Zekâ Aramasında Görünmek](/yapay-zeka-aramasinda-gorunmek) rehberinde anlatıyoruz.",
      },

      { type: "h2", text: "Firmam neden önerilmiyor? Beş sebep" },
      {
        type: "h3",
        text: "1. robots.txt yapay zekâ botlarına kapalı",
      },
      {
        type: "p",
        text: "Birçok sitede robots.txt ya hiç düşünülmemiştir ya da bir güvenlik eklentisi tarafından “bilinmeyen botlar” engellenmiştir. GPTBot, OAI-SearchBot, ClaudeBot veya PerplexityBot engellenmişse araç sayfayı okuyamaz. Okunamayan sayfa önerilemez. Ayrıca bazı altyapı sağlayıcıları yapay zekâ botlarını panelden varsayılan olarak engelleyebilir; bu ayar da kontrol edilmelidir.",
      },
      {
        type: "h3",
        text: "2. İçerik JavaScript ile yükleniyor",
      },
      {
        type: "p",
        text: "**Yapay zekâ botlarının çoğu tarayıcı gibi JavaScript çalıştırmaz; yalnızca sunucudan gelen HTML'i okur.** Hizmet listesi, adres ve açıklamalar sayfa açıldıktan sonra script ile ekleniyorsa bot boş ya da yarım bir sayfa görür. Tek sayfa uygulama (SPA) mimarisiyle kurulmuş ve sunucu tarafı render kullanmayan siteler bu tuzağa en sık düşenlerdir.",
      },
      {
        type: "h3",
        text: "3. İşletme kimliği belirsiz",
      },
      {
        type: "p",
        text: "Site kimin sitesi, hangi şehirde, tam olarak ne yapıyor sorularına tek bir yerden net cevap vermiyorsa model, firmayı sınıflandıramaz. Logo altında sadece slogan olan, hakkımızda sayfası olmayan, şirket adı ile marka adı farklı olup bağlantısı kurulmayan siteler bu grubu oluşturur. Yapısal veri eksikliği sorunu büyütür.",
      },
      {
        type: "h3",
        text: "4. Dizinlerde ve haritada yok",
      },
      {
        type: "p",
        text: "Araçlar, firmayı yalnızca kendi sitesinden değil, üçüncü taraf kaynaklardan da doğrular: Google İşletme Profili, Bing Places, sektör dizinleri, oda kayıtları, yerel basın. Siteden başka hiçbir yerde izi olmayan firma, doğrulanamayan firmadır; model doğrulayabildiği rakibi öne alır.",
      },
      {
        type: "h3",
        text: "5. İçerik eski ya da cevap vermiyor",
      },
      {
        type: "p",
        text: "Son güncellemesi yıllar önce yapılmış, hizmetleri genel başlıklarla geçiştiren, kullanıcının sorduğu somut soruya (“hangi bölgelerde hizmet veriyor, süreç nasıl işliyor”) cevap içermeyen sayfadan alıntılanacak cümle çıkmaz. Model, cevabına taşıyabileceği net cümle arar.",
      },

      { type: "h2", text: "Sorun nasıl teşhis edilir?" },
      {
        type: "table",
        caption: "Belirtiden sebebe: hızlı tanı tablosu",
        head: ["Belirti", "Olası sebep", "Kontrol yöntemi"],
        rows: [
          ["Araç siteyi hiç bilmiyor", "Bot engeli veya dizinde yok", "site.com/robots.txt'i aç; Bing ve Google'da site:site.com ara"],
          ["Araç siteyi biliyor ama hizmetleri yanlış sayıyor", "İçerik JavaScript'te, HTML boş", "Tarayıcıda JavaScript'i kapatıp sayfayı yenile; içerik kayboluyor mu?"],
          ["Araç firmayı başka firmayla karıştırıyor", "Kimlik belirsiz, yapısal veri yok", "Google Rich Results Test ile Organization düğümü var mı bak"],
          ["Rakip öneriliyor, siz değil", "Üçüncü taraf doğrulama eksik", "Google İşletme Profili ve Bing Places kaydı var mı, bilgiler siteyle aynı mı?"],
          ["Araç eski bilgi veriyor", "İçerik ve tarih güncel değil", "Sayfadaki son güncelleme tarihine ve metne bak"],
        ],
      },
      {
        type: "p",
        text: "Tanıyı kendi elinizle doğrulamanın en hızlı yolu, aracın kendisine sormaktır: ChatGPT'de web aramasını açıp “site.com hangi hizmetleri veriyor?” diye yazın. Cevap boşsa ya da yanlışsa zincirin ilk halkaları (erişim, HTML içerik) kırıktır; cevap doğru ama hedef sorgularda öneri yoksa kimlik ve doğrulama tarafı eksiktir.",
      },

      { type: "h2", text: "Çözüm adımları nelerdir?" },
      {
        type: "ol",
        items: [
          "robots.txt'i açın ve yapay zekâ botlarına açıkça izin verin. Tam bot listesi ve örnek dosya için [yapay zekâ botlarına site nasıl açılır](/rehber/yapay-zeka-botlarina-site-nasil-acilir) rehberine bakın. Altyapı panelindeki (CDN, güvenlik eklentisi) bot engellerini de kaldırın.",
          "Siteyi Bing Webmaster Tools'a kaydedin ve site haritasını gönderin. ChatGPT araması Bing dizininden beslendiği için bu adım Google Search Console kadar önemlidir. IndexNow desteği varsa açın; yeni ve güncellenen sayfalar anında bildirilir.",
          "Önemli içeriğin sunucudan gelen HTML'de bulunduğundan emin olun. Sunucu tarafı render ya da statik üretim kullanın; hizmet, adres ve iletişim bilgilerini script ile sonradan yüklemeyin.",
          "İşletme kimliğini yapısal veriyle sabitleyin: Organization (ya da LocalBusiness), WebSite ve Service düğümlerini @id ile birbirine bağlayın. Ayrıntı için [schema.org yapısal veri rehberi](/rehber/schema-org-yapisal-veri-nedir).",
          "Google İşletme Profili ve Bing Places kaydı açın; ad, adres, telefon ve hizmet listesini siteyle birebir aynı yazın. Sektörünüzde resmî yetki listesi ya da dizin varsa orada da görünün.",
          "Hizmet sayfalarını cevap formatına getirin: soru biçimli başlıklar, kısa doğrudan cevaplar, hizmet bölgesi ve süreç bilgisi. llms.txt ile siteyi araçlara tanıtın; bkz. [llms.txt nedir](/rehber/llms-txt-nedir).",
          "Hedef soruları ChatGPT, Perplexity ve Gemini'ye düzenli aralıklarla sorun; cevapları kaydedin ve değişimi izleyin.",
        ],
      },
      {
        type: "p",
        text: "**Sıra önemlidir: önce erişim, sonra okunabilirlik, sonra kimlik, en son içerik.** Botlara kapalı bir sitede içerik iyileştirmek, kapalı dükkâna vitrin düzenlemek gibidir.",
      },

      { type: "h2", text: "Ne kadar sürede önerilmeye başlanır?" },
      {
        type: "p",
        text: "Kesin bir süre vermek doğru olmaz; sorgunun rekabeti, sitenin mevcut durumu ve aracın dizinini ne sıklıkla tazelediği belirleyicidir. Genel eğilim şudur: yerel ve niş sorgularda araçlar kaynaklarını sık tazelediği için değişim daha erken görülür; genel ve rekabetçi sorgularda daha uzun sürer. Bu yüzden çalışma bir defalık düzeltme değil, ölçüm ve ayar döngüsüdür.",
      },
      {
        type: "callout",
        title: "KARNER teslimlerinde",
        text: KARNER_CALLOUT,
      },
      {
        type: "p",
        text: "Bu tanıyı ve çözüm adımlarını kendi siteniz için kurdurmak isterseniz [SEO / GEO / AEO hizmeti](/hizmetler/seo-geo-aeo) sayfasına; komşu konular için [rehber merkezine](/rehber) bakabilirsiniz.",
      },
    ],
    faq: [
      {
        q: "ChatGPT'de çıkmak için OpenAI'ye başvuru ya da ödeme gerekir mi?",
        a: "Hayır. ChatGPT'nin arama cevaplarında yer almak için bir başvuru formu ya da ücretli liste yoktur. Araç, Bing dizini ve kendi tarayıcısı üzerinden web'de bulduğu sayfaları kullanır. Yapılması gereken, sitenin bu tarayıcılara açık, okunabilir ve doğrulanabilir olmasını sağlamaktır; kalanı içerik sinyalleriyle gelir.",
      },
      {
        q: "Google'da ilk sayfadayım, ChatGPT neden hâlâ önermiyor?",
        a: "İki sebep öne çıkar. Birincisi dizin farkı: ChatGPT araması Bing dizininden beslenir, Google'da güçlü olan site Bing'de zayıf ya da hiç kayıtlı olmayabilir. İkincisi bot farkı: Googlebot JavaScript çalıştırır, yapay zekâ botlarının çoğu çalıştırmaz. Google'ın gördüğü içeriği OAI-SearchBot görmüyor olabilir.",
      },
      {
        q: "Perplexity ile ChatGPT aynı kaynakları mı kullanır?",
        a: "Hayır. Perplexity kendi tarayıcısı PerplexityBot ile kendi dizinini kurar ve her soruda canlı arama yapar; ChatGPT ise Bing dizini ve OAI-SearchBot üzerinden çalışır. Bu yüzden bir araçta görünen site diğerinde görünmeyebilir. İki aracın tarayıcısına da robots.txt'te izin vermek ve her ikisinde ayrı ayrı test yapmak gerekir.",
      },
      {
        q: "Sosyal medya hesaplarım güçlü, bu yeterli değil mi?",
        a: "Tek başına yetmez. Yapay zekâ araçları sosyal medya gönderilerini sınırlı biçimde tarar ve işletme bilgisini öncelikle web sitesi, harita kaydı ve dizinlerden doğrular. Sosyal hesaplar kimlik tutarlılığına katkı sağlar; site ve Google İşletme Profili'ndeki bilgilerle aynı ad, telefon ve adres kullanıldığında doğrulama zincirini güçlendirir.",
      },
      {
        q: "Önerilmeye başladıktan sonra çalışma biter mi?",
        a: "Bitmez, seyrekleşir. Araçlar dizinlerini sürekli tazeler; rakipler içerik ekler; sizin içeriğiniz eskir. Düzenli sorgu testleri, yeni hizmet sayfalarının aynı standartla açılması ve işletme bilgilerinin her yerde güncel tutulması sürdürme çalışmasının özüdür. Bir defalık düzeltme ile kalıcı görünürlük elde edilmez.",
      },
    ],
    related: [
      "yapay-zeka-botlarina-site-nasil-acilir",
      "schema-org-yapisal-veri-nedir",
      "llms-txt-nedir",
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },

  /* ------------------------------------------------------------------ */
  /* 4. schema.org yapısal veri                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "schema-org-yapisal-veri-nedir",
    title: "Schema.org yapısal veri nedir, JSON-LD graph neden önemli?",
    seoTitle: "Schema.org ve JSON-LD Nedir? @id ile Graph Kurulumu | KARNER",
    seoDescription:
      "Schema.org yapısal veri ve JSON-LD nedir? Organization, WebSite, Service, FAQPage düğümlerini @id ile tek graph'a bağlamak neden önemli, sık hatalar neler?",
    summary:
      "Schema.org, web sayfalarındaki bilgiyi makinelerin anlayacağı ortak sözlükle etiketleme standardıdır; JSON-LD ise bu etiketlerin sayfaya eklendiği biçimdir. Organization, WebSite, WebPage, Service ve FAQPage gibi düğümler @id ile birbirine bağlandığında tek bir graph oluşur. Bu graph, Google'ın zengin sonuçlarını ve dil modellerinin işletme kimliğini çözmesini besler.",
    cluster: "geo",
    pillar: PILLAR,
    serviceSlug: "seo-geo-aeo",
    blocks: [
      { type: "h2", text: "Schema.org yapısal veri nedir?" },
      {
        type: "dl",
        items: [
          {
            term: "Schema.org",
            def: "2011'de Google, Bing ve Yahoo'nun ortak kurduğu, daha sonra Yandex'in katıldığı açık sözlüktür. Kuruluş, hizmet, ürün, makale, soru-cevap gibi kavramları ve özelliklerini standart adlarla tanımlar.",
          },
          {
            term: "JSON-LD",
            def: "Schema.org sözlüğünün sayfaya eklenme biçimlerinden biridir. HTML içine bir script etiketiyle yerleştirilen JSON bloğudur; görünür içeriğe dokunmaz. Google'ın önerdiği biçimdir.",
          },
        ],
      },
      {
        type: "p",
        text: "Bir insan sayfaya bakınca “bu bir klima servisi firması, Ankara'da, şu hizmetleri veriyor” sonucunu çıkarır. Makine için aynı sayfa, birbirinden bağımsız metin parçalarıdır. Yapısal veri, bu çıkarımı makineye hazır verir: şu metin bir kuruluş adı, şu metin bir hizmet, şu liste bir soru-cevap.",
      },
      {
        type: "p",
        text: "**Yapısal veri, sayfanın görünür içeriğini makineler için tercüme eder; yeni bilgi eklemez, var olanı etiketler.** Bu ilke aynı zamanda en önemli kuraldır: schema'da yazan her şey sayfada görünür olmalıdır. Görünmeyen içerik için yazılmış işaretleme, Google'ın yapısal veri kurallarına aykırıdır ve zengin sonuç hakkını kaybettirir.",
      },

      { type: "h2", text: "@id ile graph kurmak neden önemli?" },
      {
        type: "p",
        text: "Çoğu site yapısal veriyi dağınık kurar: bir sayfada Organization, başka sayfada LocalBusiness, bir başkasında yalnızca FAQPage. Her blok kendi başına doğrudur ama birbirinden habersizdir. Makine, bu blokların aynı işletmeye ait olduğunu çıkarmak zorunda kalır.",
      },
      {
        type: "p",
        text: "@id, her düğüme kalıcı bir adres verir: örneğin https://site.com/#organization. Başka bir düğüm bu adresi referans gösterdiğinde iki düğüm bağlanır. WebSite düğümü publisher olarak Organization'a, WebPage düğümü isPartOf ile WebSite'a, Service düğümü provider ile Organization'a bağlanır. Sonuç, tek bir @graph içinde birbirine düğümlenmiş bir ağdır.",
      },
      {
        type: "p",
        text: "**@id ile bağlı graph, işletmenin tüm sayfalarındaki işaretlemeyi tek bir kimlik etrafında toplar; makine tahmin etmez, okur.** Dil modelleri için bu özellikle değerlidir: firma adı, adresi, hizmetleri ve sayfaları tek zincirde göründüğünde model işletmeyi başka bir firmayla karıştırmaz ve cevabına güvenle taşır. Bu zincirin yapay zekâ aramasındaki yerini [Yapay Zekâ Aramasında Görünmek](/yapay-zeka-aramasinda-gorunmek) rehberinde anlatıyoruz.",
      },
      {
        type: "table",
        caption: "Bir hizmet sitesinde temel düğümler ve bağlantıları",
        head: ["Düğüm", "Ne tanımlar", "Neye bağlanır"],
        rows: [
          ["Organization / LocalBusiness", "İşletmenin kendisi: ad, logo, adres, iletişim, sameAs", "Graph'ın merkezi; diğer düğümler buna işaret eder"],
          ["WebSite", "Sitenin kendisi: ad, URL, dil", "publisher → Organization"],
          ["WebPage", "Tek bir sayfa: başlık, açıklama, tarihler", "isPartOf → WebSite, about → Service, breadcrumb → BreadcrumbList"],
          ["Service", "Verilen hizmet: ad, açıklama, hizmet bölgesi", "provider → Organization"],
          ["FAQPage", "Sayfadaki görünür soru-cevap listesi", "mainEntity → Question/Answer; sayfanın WebPage düğümüyle aynı URL"],
          ["BreadcrumbList", "Sayfanın site içindeki yolu", "WebPage.breadcrumb ile bağlanır"],
          ["Article / TechArticle", "Rehber ve blog içerikleri", "author, publisher → Organization; mainEntityOfPage → WebPage"],
        ],
      },

      { type: "h2", text: "Google zengin sonuçları ne kazandırır?" },
      {
        type: "p",
        text: "Google, bazı yapısal veri türlerini arama sonuçlarında görsel zenginleştirme için kullanır. BreadcrumbList, sonuç altındaki URL yerine okunabilir yol gösterir. Article, tarih ve görsel bilgisini taşır. Organization düğümündeki logo ve sameAs bağlantıları, marka panelini ve bilgi kartını besler.",
      },
      {
        type: "p",
        text: "Beklentiyi doğru kurmak gerekir. Google, Ağustos 2023'ten itibaren FAQ zengin sonucunu yalnızca tanınmış resmî kurum ve sağlık sitelerinde göstermeye başladı; HowTo zengin sonucunu ise kaldırdı. Sitelinks arama kutusu işaretlemesi de Kasım 2024'te kullanımdan çıkarıldı. Yani bir hizmet sitesinde FAQPage, arama sonucunda açılır soru kutuları üretmez.",
      },
      {
        type: "p",
        text: "FAQPage yine de değerlidir; sebebi artık Google zengin sonucu değil, sayfadaki soru-cevap yapısının makine tarafından net okunmasıdır. Dil modelleri ve cevap motorları bu yapıyı alıntılamak için kullanır. Bu konuyu [AEO rehberinde](/rehber/aeo-nedir-cevap-motoru-optimizasyonu) ayrıntılı anlattık.",
      },

      { type: "h2", text: "Yapısal veri graph'ı nasıl kurulur?" },
      {
        type: "ol",
        items: [
          "İşletmenin kimliğini tek düğümde sabitleyin: site genelinde aynı @id ile Organization (yerel işletmeyse LocalBusiness) yazın; ad, logo, adres, telefon ve sameAs (sosyal hesaplar, harita kaydı) ekleyin.",
          "WebSite düğümünü kurun ve publisher olarak Organization'ı gösterin. Site adı ve URL burada tanımlanır.",
          "Her sayfaya kendi WebPage düğümünü ekleyin: URL, başlık, açıklama, datePublished, dateModified; isPartOf ile WebSite'a bağlayın.",
          "Hizmet sayfalarında Service düğümü, rehberlerde Article düğümü açın ve provider/author/publisher alanlarıyla Organization'a bağlayın.",
          "Sayfada görünür soru-cevap varsa FAQPage, her sayfada BreadcrumbList ekleyin; içerik görünür metinle birebir aynı olsun.",
          "Tüm düğümleri tek bir JSON-LD bloğunda @graph dizisi içinde yayımlayın; her düğüme tekrar edilebilir, kalıcı @id verin.",
          "Google Rich Results Test ve Schema Markup Validator ile doğrulayın; hata ve uyarıları giderin, sonra Search Console'da zenginleştirme raporlarını izleyin.",
        ],
      },

      { type: "h2", text: "Sık yapılan hatalar nelerdir?" },
      {
        type: "ul",
        items: [
          "Görünür içerikle uyuşmayan schema: sayfada olmayan soru-cevap, sayfada yazmayan hizmet, farklı telefon. Bu, kural ihlalidir ve zengin sonuç hakkını kaybettirir.",
          "Her sayfada farklı @id ya da hiç @id kullanmamak: düğümler bağlanmaz, işletme kimliği parçalanır.",
          "Organization ile LocalBusiness'ı aynı işletme için ayrı ayrı, birbirinden habersiz tanımlamak: tek düğüm seçilmeli ve tutarlı kullanılmalıdır.",
          "Puan ve yorum (AggregateRating) işaretlemesini sayfada gerçek, görünür yorum olmadan eklemek: manuel ceza sebebidir.",
          "Tarihleri güncellemeden dateModified değerini ileri almak: metin değişmeden tarih değişirse sinyal güvenilirliğini yitirir.",
          "Yapısal veriyi JavaScript ile sonradan enjekte etmek: yapay zekâ botlarının çoğu bunu görmez; JSON-LD sunucudan gelen HTML'de olmalıdır.",
          "Şablon eklentisinin ürettiği veriyi hiç kontrol etmemek: eklentiler genellikle eksik ya da birbirini tekrar eden düğümler üretir.",
        ],
      },
      {
        type: "p",
        text: "Yapısal verinin yapay zekâ araçları için değerini gösteren en iyi test, modelin kendisine sormaktır: ChatGPT ya da Perplexity'ye “site.com kimin sitesi, hangi hizmetleri veriyor, nerede?” diye sorun. Graph doğru kurulmuşsa cevap, Organization ve Service düğümlerinde yazanla örtüşür. Firmanızın neden önerilmediğini düşünüyorsanız [ChatGPT firmamı neden önermiyor](/rehber/chatgpt-firmami-neden-onermiyor) rehberi tanı listesi sunar.",
      },
      {
        type: "callout",
        title: "KARNER teslimlerinde",
        text: KARNER_CALLOUT,
      },
      {
        type: "p",
        text: "Graph kurulumu, [SEO / GEO / AEO hizmetinin](/hizmetler/seo-geo-aeo) teknik katmanıdır; diğer katmanlar için [rehber merkezine](/rehber) göz atabilirsiniz.",
      },
    ],
    faq: [
      {
        q: "JSON-LD yerine Microdata ya da RDFa kullanılabilir mi?",
        a: "Kullanılabilir; üçü de Schema.org sözlüğünü taşır ve Google üçünü de okur. JSON-LD tercih edilir çünkü görünür HTML'e karışmaz, tek blokta toplanır, @graph ile düğümleri bağlamak kolaydır ve şablon değişikliklerinde bozulmaz. Microdata ve RDFa, etiketleri HTML öğelerine dağıttığı için bakımı zordur.",
      },
      {
        q: "Yapısal veri sıralamayı doğrudan yükseltir mi?",
        a: "Google, yapısal verinin tek başına bir sıralama faktörü olmadığını belirtir. Katkısı dolaylıdır: sayfanın ne hakkında olduğunu kesinleştirir, zengin sonuçlarla görünürlüğü artırır ve yapay zekâ araçlarının işletmeyi doğru tanımasını sağlar. Doğru sınıflanan ve güvenle alıntılanan sayfa, dolaylı olarak daha iyi performans gösterir.",
      },
      {
        q: "Tek sayfalık bir sitede de graph gerekir mi?",
        a: "Gerekir, hatta daha kolaydır. Tek sayfada Organization, WebSite, WebPage ve Service düğümlerini aynı @graph içinde yazmak birkaç dakikalık iştir. Site büyüdüğünde yeni sayfalar aynı Organization @id'sine bağlanır ve kimlik dağılmaz. Graph'ı baştan doğru kurmak, sonradan toparlamaktan çok daha ucuzdur.",
      },
      {
        q: "Yapısal verideki hataları nasıl fark ederim?",
        a: "Üç araç yeterlidir: Google Rich Results Test sayfanın hangi zengin sonuçlara uygun olduğunu ve hataları gösterir; Schema Markup Validator sözlük uyumunu denetler; Search Console'daki zenginleştirme raporları site genelindeki hata ve uyarıları zamanla listeler. Her yayından sonra ilk ikisini, aylık olarak üçüncüsünü kontrol etmek iyi bir alışkanlıktır.",
      },
    ],
    related: [
      "aeo-nedir-cevap-motoru-optimizasyonu",
      "chatgpt-firmami-neden-onermiyor",
      "llms-txt-nedir",
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },

  /* ------------------------------------------------------------------ */
  /* 5. AEO                                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "aeo-nedir-cevap-motoru-optimizasyonu",
    title: "AEO nedir? Cevap motoru optimizasyonu nasıl yapılır?",
    seoTitle: "AEO Nedir? Cevap Motoru Optimizasyonu Rehberi | KARNER",
    seoDescription:
      "AEO (Answer Engine Optimization) nedir, SEO ve GEO'dan farkı ne? Snippet ve sesli asistan için soru başlığı, 40-60 kelimelik cevap, FAQPage ve Speakable.",
    summary:
      "AEO (Answer Engine Optimization), içeriği arama motorlarının ve sesli asistanların doğrudan cevap olarak gösterebileceği biçimde yazma çalışmasıdır. Hedef yüzeyler öne çıkan snippet, “Diğer sorular” kutuları ve sesli cevaplardır. Yöntem: soru biçimli başlık, hemen altında 40-60 kelimelik doğrudan cevap, tanım kutusu, tablo ve liste, FAQPage ile Speakable işaretlemesi.",
    cluster: "geo",
    pillar: PILLAR,
    serviceSlug: "seo-geo-aeo",
    blocks: [
      { type: "h2", text: "AEO nedir?" },
      {
        type: "dl",
        items: [
          {
            term: "AEO (Answer Engine Optimization — Cevap Motoru Optimizasyonu)",
            def: "Bir sayfanın, kullanıcının sorusuna arama sonucu listesi yerine doğrudan cevap olarak sunulmasını hedefleyen içerik ve işaretleme çalışmasıdır.",
          },
          {
            term: "Cevap motoru",
            def: "Soruya bağlantı listesi değil cevap döndüren her yüzey: Google'ın öne çıkan snippet'i ve “Diğer sorular” kutusu, sesli asistanlar, AI Bakışı ve sohbet tabanlı yapay zekâ araçları.",
          },
        ],
      },
      {
        type: "p",
        text: "Klasik SEO, sayfanın listede üst sırada görünmesini hedefler. AEO ise sayfadan alınan bir pasajın cevabın kendisi olmasını hedefler. Kullanıcı bazen sonuç listesine hiç inmez; cevabı okur ya da dinler ve ayrılır.",
      },
      {
        type: "p",
        text: "**AEO'nun özü tek cümledir: soruyu başlığa yaz, cevabı hemen altına kısa ve bağımsız okunabilir biçimde koy.** Geri kalan her şey bu çekirdeğin etrafındaki destek katmanlarıdır: yapısal veri, tablo, liste, güncellik.",
      },

      { type: "h2", text: "AEO hangi yüzeyleri hedefler?" },
      {
        type: "p",
        text: "Öne çıkan snippet (featured snippet), Google'da bazı sorgularda sonuçların en üstünde çerçeve içinde gösterilen cevap kutusudur. Paragraf, liste ya da tablo biçiminde olabilir. İçeriği tek bir sayfadan alınır ve kaynağın bağlantısı kutunun altında görünür.",
      },
      {
        type: "p",
        text: "“Diğer sorular” (People Also Ask) kutusu, ilgili soruların açılır listesidir. Her soru açıldığında bir sayfadan alınmış kısa cevap ve bağlantı görünür. Bir sayfa, birden çok soru için cevap kaynağı olabilir; bu yüzden konunun alt sorularını ayrı ayrı ele almak işe yarar.",
      },
      {
        type: "p",
        text: "Sesli asistanlar (Google Asistan, Siri, Alexa) cevabı okuyarak verir. Okunabilir, kısa ve tek cümlelik cevaplar burada öne çıkar; tablo ya da uzun liste sesle aktarılamaz. Yapay zekâ sohbet araçları ve AI Bakışı da aynı hammaddeyi kullanır; bu yüzden AEO ile GEO büyük ölçüde örtüşür.",
      },

      { type: "h2", text: "SEO, GEO ve AEO arasındaki fark nedir?" },
      {
        type: "table",
        caption: "Üç disiplinin karşılaştırması",
        head: ["", "SEO", "AEO", "GEO"],
        rows: [
          ["Hedef", "Sonuç listesinde üst sıra", "Soruya doğrudan cevap olarak gösterilmek", "Yapay zekâ cevabında kaynak gösterilmek ve önerilmek"],
          ["Ana yüzey", "Google / Bing organik sonuçlar", "Öne çıkan snippet, Diğer sorular, sesli asistan", "ChatGPT, Perplexity, Gemini, AI Bakışı, AI Mode"],
          ["Ödüllendirdiği içerik", "Konu bütünlüğü, teknik sağlık, otorite", "Soru biçimli başlık + kısa, net cevap", "Alıntılanabilir, kaynaklı, güncel bilgi ve tutarlı kimlik"],
          ["Kritik teknik parça", "Tarama, dizin, hız, iç bağlantı", "FAQPage, Speakable, tanım ve tablo yapısı", "AI bot izinleri, HTML içerik, @id graph, llms.txt"],
          ["Ölçüm", "Sıralama ve tıklama raporları", "Snippet ve soru kutusu görünümleri", "Araçlara düzenli sorgu testleri"],
        ],
      },
      {
        type: "p",
        text: "Üç disiplin birbirinin alternatifi değildir; aynı sayfa üçünü birden besler. Teknik temel SEO'yu, cevap formatı AEO'yu, bot erişimi ve yapısal kimlik GEO'yu taşır. Bu bütünü [Yapay Zekâ Aramasında Görünmek](/yapay-zeka-aramasinda-gorunmek) rehberinde, AI Bakışı tarafını ise [Google AI Overview rehberinde](/rehber/google-ai-overview-nasil-cikilir) anlattık.",
      },

      { type: "h2", text: "Cevap motoru için sayfa nasıl yazılır?" },
      {
        type: "ol",
        items: [
          "Hedef soruyu kullanıcı nasıl soruyorsa öyle H2 başlığına yazın: “X nedir?”, “X nasıl yapılır?”, “X ile Y arasındaki fark nedir?”.",
          "Başlığın hemen altına 40-60 kelimelik doğrudan cevap yazın. Cevap, sayfadan kopartılıp tek başına okunduğunda da anlamlı olmalı; “yukarıda anlattığımız gibi” türü bağımlı ifadeler içermemelidir.",
          "Tanım gerektiren kavramlar için tanım kutusu (dl) kullanın: terim + bir-iki cümle tanım. Snippet ve dil modelleri tanımı buradan alır.",
          "Adımları numaralı listeye, karşılaştırmaları tabloya dökün. Liste ve tablo snippet'leri için bu yapı doğrudan hammaddedir.",
          "Sayfadaki görünür soru-cevap bölümünü FAQPage ile işaretleyin; başlık ve özet için Speakable ekleyin. İşaretleme görünür metinle birebir aynı olsun.",
          "Cümleleri kısa tutun, her paragrafa tek iddia koyun. Pazarlama sıfatlarını cevabın dışında bırakın; cevap motoru sıfat değil bilgi arar.",
          "Tarihi görünür yazın ve içeriği gerçekten güncel tutun. Aynı soruya daha güncel cevap veren sayfa, snippet'i devralabilir.",
        ],
      },
      {
        type: "p",
        text: "**40-60 kelime bir kural değil, gözleme dayalı bir hedef aralığıdır: snippet kutusuna sığacak kadar kısa, soruyu gerçekten cevaplayacak kadar uzun.** Cevap daha uzun gerekiyorsa önce kısa versiyonu verin, ayrıntıyı altına açın.",
      },

      { type: "h2", text: "FAQPage ve Speakable ne işe yarar?" },
      {
        type: "p",
        text: "FAQPage, sayfadaki soru-cevap listesini makine-okunur biçimde tanımlayan schema.org düğümüdür. Google, Ağustos 2023'ten beri FAQ zengin sonucunu yalnızca tanınmış resmî kurum ve sağlık sitelerinde gösterir; bu yüzden bir hizmet sitesinde FAQPage'den açılır soru kutuları beklenmemelidir. Değeri, soru-cevap yapısının dil modelleri ve cevap motorları tarafından net okunmasıdır.",
      },
      {
        type: "p",
        text: "Speakable, bir sayfanın sesle okunmaya uygun bölümlerini (örneğin başlık ve özet) CSS seçiciyle işaret eden schema.org özelliğidir. Google bu özelliği sınırlı kapsamda ve öncelikle haber içerikleri için desteklediğini belirtir. Zararı yoktur ve sesli cevaplar için hazırlık sayılır; ancak tek başına sesli asistanda okunmayı garanti etmez. Her iki işaretlemenin graph içindeki yeri için [schema.org yapısal veri rehberine](/rehber/schema-org-yapisal-veri-nedir) bakabilirsiniz.",
      },

      { type: "h2", text: "AEO başarısı nasıl ölçülür?" },
      {
        type: "p",
        text: "Search Console, öne çıkan snippet gösterimlerini ayrı bir filtreyle göstermez; ancak bir sorguda ortalama konumun 1'e yakın olup tıklama oranının sorgu tipine göre değişmesi ipucu verir. En güvenilir yöntem, hedef soruları düzenli aralıklarda aramak ve snippet ile “Diğer sorular” kutusunda hangi sayfanın çıktığını kaydetmektir.",
      },
      {
        type: "p",
        text: "Sesli asistan ve yapay zekâ araçları için test aynı mantıkla yürür: soruyu sesli sorun ya da araca yazın, cevabın kaynağına bakın. Bu testler sıralama raporlarının göstermediği katmanı ölçer; bir tabloda tutulması ve zaman içinde karşılaştırılması gerekir.",
      },
      {
        type: "callout",
        title: "KARNER teslimlerinde",
        text: KARNER_CALLOUT,
      },
      {
        type: "p",
        text: "AEO, [SEO / GEO / AEO hizmetinin](/hizmetler/seo-geo-aeo) içerik katmanıdır; komşu konuları [rehber merkezinde](/rehber) bulabilirsiniz.",
      },
    ],
    faq: [
      {
        q: "Öne çıkan snippet için ilk sırada olmak şart mı?",
        a: "Şart değil ama ilk sayfada olmak gerekir. Snippet genellikle ilk on sonuç arasından, soruya en temiz cevabı veren sayfadan seçilir; birinci sıradaki sayfa her zaman kazanmaz. Üçüncü ya da beşinci sıradaki bir sayfa, doğru formatta yazılmış kısa bir cevapla snippet'i alabilir ve görsel olarak listenin üstüne çıkar.",
      },
      {
        q: "Her sayfada SSS bölümü olmalı mı?",
        a: "Hayır. SSS, yalnızca kullanıcının o sayfada gerçekten sorduğu sorular varsa eklenmelidir. Her sayfaya aynı beş soruyu kopyalamak ya da yapay sorular üretmek değer katmaz ve tekrar içerik sorunu yaratır. İyi bir SSS, sayfanın ana metninde cevaplanmayan ama kullanıcının aklına gelen yan soruları kısa ve farklı açılardan ele alır.",
      },
      {
        q: "Uzun ve ayrıntılı içerik AEO'ya zarar verir mi?",
        a: "Vermez; sorun uzunluk değil sıralamadır. Cevap motoru, sorunun hemen altında kısa ve bağımsız bir cevap bulmak ister. O cevap verildikten sonra ayrıntı, örnek ve arka plan istenildiği kadar uzayabilir. Zarar veren, cevabı sayfanın ortasına gömmek ya da uzun bir girişten sonra vermektir.",
      },
      {
        q: "Sesli arama için ayrı bir sayfa hazırlamak gerekir mi?",
        a: "Gerekmez. Sesli asistanlar, yazılı aramanın kullandığı aynı dizin ve aynı snippet mantığından beslenir. Soru biçimli başlık ve kısa, sesle okunabilir cevap yazılmış sayfa, hem ekranda hem seste çalışır. Ayrı sayfa açmak içerik tekrarına yol açar; doğru yol, mevcut sayfanın cevap katmanını güçlendirmektir.",
      },
      {
        q: "AEO yerel işletmeler için işe yarar mı?",
        a: "Özellikle yarar. Yerel sorguların çoğu sorudur: “X ilçesinde Y hizmeti kaça yapılır”, “Z için hangi belge gerekir”. Bu soruları hizmet sayfasında başlık olarak kullanan ve hizmet bölgesini açıkça yazan yerel işletme, hem snippet hem sesli asistan hem de yapay zekâ araçlarında o bölge için kaynak olarak seçilebilir.",
      },
    ],
    related: [
      "google-ai-overview-nasil-cikilir",
      "schema-org-yapisal-veri-nedir",
      "chatgpt-firmami-neden-onermiyor",
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },

  /* ------------------------------------------------------------------ */
  /* 6. Yapay zekâ botlarına site nasıl açılır                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "yapay-zeka-botlarina-site-nasil-acilir",
    title: "Yapay zekâ botlarına site nasıl açılır? robots.txt izin listesi",
    seoTitle: "AI Botlarına robots.txt İzni: GPTBot, ClaudeBot | KARNER",
    seoDescription:
      "robots.txt'te yapay zekâ botlarına nasıl izin verilir? GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot listesi, örnek dosya ve engellemenin maliyeti.",
    summary:
      "Yapay zekâ botlarına site, robots.txt dosyasında her botun kullanıcı aracısı (User-agent) adıyla açıkça izin verilerek açılır. Başlıca botlar GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended ve CCBot'tur. Arama botlarını engellemek görünürlüğü kapatır; eğitim botlarını engellemek ise gelecek modellerin firmayı öğrenmesini sınırlar.",
    cluster: "geo",
    pillar: PILLAR,
    serviceSlug: "seo-geo-aeo",
    blocks: [
      { type: "h2", text: "Yapay zekâ botu nedir, robots.txt ile ilişkisi ne?" },
      {
        type: "dl",
        items: [
          {
            term: "Yapay zekâ botu (AI crawler)",
            def: "Bir yapay zekâ şirketinin web sayfalarını okumak için çalıştırdığı otomatik tarayıcıdır. Amacına göre üç türe ayrılır: model eğitimi için toplama, arama dizini kurma ve kullanıcı isteğiyle anlık sayfa getirme.",
          },
          {
            term: "robots.txt",
            def: "Sitenin kök dizininde duran düz metin dosyasıdır. Hangi botun (User-agent) hangi yollara girebileceğini Allow ve Disallow satırlarıyla bildirir. Bağlayıcı bir yasa değil, saygın botların uyduğu bir protokoldür.",
          },
        ],
      },
      {
        type: "p",
        text: "robots.txt'te adı geçmeyen bot, genel kural (User-agent: *) ile yönetilir. Sorun şu: birçok güvenlik eklentisi ve şablon, genel kuralı kısıtlar ya da “bilinmeyen botları” engeller. Yapay zekâ botları yenidir ve bu listelerde çoğunlukla engelli tarafta kalır.",
      },
      {
        type: "p",
        text: "**Yapay zekâ aramasında görünmenin ilk şartı, aracın botunun siteyi okuyabilmesidir; okunmayan site önerilemez.** Bu yüzden bot izinleri, içerik ve yapısal veri çalışmasından önce gelir. Bütünü [Yapay Zekâ Aramasında Görünmek](/yapay-zeka-aramasinda-gorunmek) rehberinde anlatıyoruz.",
      },

      { type: "h2", text: "Hangi yapay zekâ botları var, ne yapar?" },
      {
        type: "table",
        caption: "Başlıca yapay zekâ botları ve amaçları",
        head: ["User-agent", "Şirket", "Amaç"],
        rows: [
          ["GPTBot", "OpenAI", "Model eğitimi için içerik toplama"],
          ["OAI-SearchBot", "OpenAI", "ChatGPT arama dizini; arama sonuçlarında görünmek için gerekli"],
          ["ChatGPT-User", "OpenAI", "Kullanıcı ChatGPT'de bir sayfa istediğinde anlık getirme"],
          ["ClaudeBot", "Anthropic", "Tarama ve model eğitimi; güncel ana bot"],
          ["Claude-Web / anthropic-ai", "Anthropic", "Eski kullanıcı aracı adları; geriye dönük uyumluluk için listelenir"],
          ["PerplexityBot", "Perplexity", "Perplexity arama dizini"],
          ["Perplexity-User", "Perplexity", "Kullanıcı sorusu üzerine anlık sayfa getirme"],
          ["Google-Extended", "Google", "Gemini eğitimi ve bağlantılı kullanım kontrolü; Googlebot'tan ayrı"],
          ["Applebot-Extended", "Apple", "Apple Intelligence modelleri için eğitim kontrolü; Applebot'tan ayrı"],
          ["CCBot", "Common Crawl", "Açık web arşivi; birçok modelin eğitim verisi buradan türetilir"],
          ["Bytespider", "ByteDance", "TikTok sahibinin modelleri için toplama"],
          ["meta-externalagent", "Meta", "Meta modelleri için eğitim verisi toplama"],
          ["Amazonbot", "Amazon", "Alexa ve Amazon servisleri için tarama"],
          ["DuckAssistBot", "DuckDuckGo", "DuckAssist yapay zekâ cevapları için kaynak getirme"],
          ["MistralAI-User", "Mistral", "Le Chat kullanıcı istekleri için anlık sayfa getirme"],
        ],
      },
      {
        type: "p",
        text: "Üç tür birbirinden ayrı düşünülmelidir. Arama botları (OAI-SearchBot, PerplexityBot) engellenirse firma o araçta hiç görünmez. Kullanıcı tetikli botlar (ChatGPT-User, Perplexity-User, MistralAI-User) engellenirse kullanıcı sitenizi araca verdiğinde araç okuyamaz. Eğitim botları (GPTBot, ClaudeBot, CCBot, Google-Extended) engellenirse bugünkü arama etkilenmez, ama gelecek modeller firmayı öğrenmez.",
      },

      { type: "h2", text: "Google-Extended ile Googlebot arasındaki fark nedir?" },
      {
        type: "p",
        text: "Googlebot, Google aramasının tarayıcısıdır; dizin, klasik sonuçlar, AI Bakışı ve AI Mode onunla çalışır. Google-Extended ise ayrı bir bot değil, robots.txt'te tanınan bir kontrol belirtecidir: Gemini modellerinin eğitiminde ve bağlantılı üretimde sitenin içeriğinin kullanılıp kullanılmayacağını belirler.",
      },
      {
        type: "p",
        text: "**Google-Extended'ı engellemek sizi Google aramasından ya da AI Bakışı'ndan çıkarmaz; yalnızca Gemini'nin eğitim ve bağlantılı kullanımını kapatır.** AI Bakışı'nda görünmeyi sınırlamak isteyen site, bunu nosnippet ve max-snippet gibi snippet kontrolleriyle yapar. Ayrıntı için [Google AI Overview rehberine](/rehber/google-ai-overview-nasil-cikilir) bakabilirsiniz.",
      },
      {
        type: "p",
        text: "Applebot ve Applebot-Extended için mantık aynıdır: Applebot Siri ve Spotlight aramasını besler, Applebot-Extended ise Apple'ın model eğitimi için kontrol sağlar. CCBot ise farklı bir konumdadır: Common Crawl'un açık arşivini kurar ve bu arşiv, birçok yapay zekâ modelinin eğitim verisinde kaynak olarak kullanılır. CCBot'u engellemek bugünkü aramayı etkilemez; geleceğin modellerini etkiler.",
      },

      { type: "h2", text: "Örnek robots.txt nasıl görünür?" },
      {
        type: "p",
        text: "Bir hizmet işletmesi için tipik dosya, yapay zekâ botlarına açıkça izin verir ve yalnızca gerçekten gizli kalması gereken yolları kapatır. Her bot için ayrı blok yazmak, genel kuralın eklenti tarafından değiştirilmesine karşı güvence sağlar.",
      },
      {
        type: "ul",
        items: [
          "User-agent: * → Allow: / → Disallow: /admin/ (genel kural; yalnızca gizli yollar kapalı)",
          "User-agent: GPTBot → Allow: /",
          "User-agent: OAI-SearchBot → Allow: /",
          "User-agent: ChatGPT-User → Allow: /",
          "User-agent: ClaudeBot → Allow: /",
          "User-agent: PerplexityBot → Allow: /",
          "User-agent: Perplexity-User → Allow: /",
          "User-agent: Google-Extended → Allow: /",
          "User-agent: Applebot-Extended → Allow: /",
          "User-agent: CCBot → Allow: /",
          "Aynı kalıpla: Claude-Web, anthropic-ai, Bytespider, meta-externalagent, Amazonbot, DuckAssistBot, MistralAI-User",
          "Sitemap: https://site.com/sitemap.xml (dosyanın sonunda)",
        ],
      },
      {
        type: "p",
        text: "Dosyayı yazmak yetmez; botun gerçekten geçtiğini doğrulamak gerekir. Üç kontrol yapılmalıdır: Google Search Console'daki robots.txt raporu, CDN ya da güvenlik panelindeki bot kuralları ve sunucu erişim günlüklerinde bot adlarının görünüp görünmediği. Özellikle bazı CDN sağlayıcıları yapay zekâ botlarını panelden varsayılan olarak engelleyebilir; robots.txt açık olsa bile istek sunucuya ulaşmaz.",
      },
      {
        type: "p",
        text: "Bot geçtikten sonra siteyi araçlara tanıtmanın yolu llms.txt'dir; bkz. [llms.txt nedir](/rehber/llms-txt-nedir). İçeriğin botun okuyabildiği HTML'de olması da ayrı bir şarttır; yapay zekâ botlarının çoğu JavaScript çalıştırmaz.",
      },

      { type: "h2", text: "“Yapay zekâ içeriğimi çalıyor” itirazı haklı mı?" },
      {
        type: "p",
        text: "Kısmen haklıdır ve ciddiye alınmalıdır. Eğitim botları içeriği alır, model onu öğrenir ve kullanıcıya kaynak göstermeden cevap verebilir. Özgün araştırma, uzun dokümantasyon ya da abonelikle satılan içerik üreten bir yayıncı için bu gerçek bir kayıp olabilir. Bu yayıncıların eğitim botlarını engellemesi anlaşılır bir tercihtir.",
      },
      {
        type: "p",
        text: "Bir hizmet işletmesinin durumu farklıdır. Hizmet sitesindeki içerik, firmanın bulunması için yazılır; asıl ürün içerik değil hizmettir. Model firmayı öğrenirse, kullanıcı “bu bölgede bu hizmeti kim verir” diye sorduğunda firmayı önerebilir. Bu durumda içeriğin modele girmesi kayıp değil, görünürlüktür.",
      },
      {
        type: "p",
        text: "Orta yol mümkündür: arama ve kullanıcı tetikli botlara (OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User) izin verip yalnızca saf eğitim botlarını (GPTBot, CCBot, Bytespider) kısıtlamak. Böylece bugünkü görünürlük korunur, içerik toptan eğitim havuzuna girmez. Bu seçim işletmenin türüne göre verilmelidir; tek doğru cevap yoktur.",
      },

      { type: "h2", text: "Yapay zekâ botlarını engellemenin maliyeti nedir?" },
      {
        type: "ol",
        items: [
          "Arama botu engeli: firma o araçta hiç görünmez. ChatGPT araması, Perplexity ve DuckAssist için bu doğrudan kayıptır; rakip önerilir, siz önerilmezsiniz.",
          "Kullanıcı tetikli bot engeli: kullanıcı sitenizin adresini araca verdiğinde araç “erişemiyorum” der. Bu, satın alma anında güven kaybıdır.",
          "Eğitim botu engeli: bugün görünür bir kayıp yoktur; ancak gelecek model sürümleri firmayı, sektördeki yerini ve hizmetlerini öğrenmemiş olur. Maliyet ertelenmiştir, sıfır değildir.",
          "Yanlış yapılandırma maliyeti: genel kuralla tüm botları engellemek, Googlebot ve Bingbot'u da kapsayabilir. Bu, klasik arama görünürlüğünü de bitirir ve en sık rastlanan kazadır.",
        ],
      },
      {
        type: "p",
        text: "Karar kişisel bir tercih olsa da bilinçli verilmelidir. “robots.txt'e hiç bakmadım” cevabı, aslında bir güvenlik eklentisinin verdiği kararı kabul etmek demektir. Firmanız yapay zekâ araçlarında önerilmiyorsa ilk kontrol burasıdır; tanı listesi için [ChatGPT firmamı neden önermiyor](/rehber/chatgpt-firmami-neden-onermiyor) rehberine bakın.",
      },
      {
        type: "callout",
        title: "KARNER teslimlerinde",
        text: KARNER_CALLOUT,
      },
      {
        type: "p",
        text: "Bot izinleri, [SEO / GEO / AEO hizmetinin](/hizmetler/seo-geo-aeo) ilk adımıdır; diğer adımlar [rehber merkezinde](/rehber).",
      },
    ],
    faq: [
      {
        q: "robots.txt'te izin verdim, bot yine de gelmiyor; neden?",
        a: "Üç yer kontrol edilmelidir. Birincisi CDN ya da güvenlik katmanı: bazı sağlayıcılar yapay zekâ botlarını panelden varsayılan olarak engeller ve istek sunucuya hiç ulaşmaz. İkincisi sunucu tarafı kurallar: .htaccess ya da WAF kuralları kullanıcı aracısına göre engelleyebilir. Üçüncüsü hız sınırı: çok agresif rate-limit, botun birkaç istekten sonra vazgeçmesine yol açar.",
      },
      {
        q: "Tüm botlara izin vermek sunucuyu yorar mı?",
        a: "Çoğu hizmet sitesi için hissedilir bir yük oluşturmaz; sayfa sayısı azdır ve botlar aralıklı gelir. Büyük, binlerce sayfalı sitelerde eğitim botları trafiği artırabilir. O durumda seçenek toptan engellemek değil, Crawl-delay desteği olan botlarda tarama hızını düşürmek ve gereksiz yolları (arama sonuç sayfaları, filtre kombinasyonları) Disallow ile kapatmaktır.",
      },
      {
        q: "robots.txt'teki izin, botların uymasını garanti eder mi?",
        a: "robots.txt tavsiye niteliğindedir; yasal bağlayıcılığı yoktur. Tabloda adı geçen büyük şirketlerin botları kurallara uyduklarını belgelerinde açıklar ve kullanıcı aracılarını doğrulanabilir IP aralıklarıyla yayımlar. Kurallara uymayan kötü niyetli tarayıcılar için çözüm robots.txt değil, sunucu ya da CDN seviyesinde engellemedir.",
      },
      {
        q: "Eğitim botlarına izin verirsem içeriğim kaynak gösterilmeden kullanılır mı?",
        a: "Olabilir; eğitim verisi olarak kullanılan içerik, modelin genel bilgisine karışır ve cevaplarda kaynak gösterilmeyebilir. Bu, arama botlarından farklıdır: arama ürünleri cevabın yanında kaynak bağlantısı gösterir. İçeriğinizin kendisi ürünse eğitim botlarını kısıtlamak mantıklıdır; hizmet satıyorsanız modelin firmayı öğrenmesi çoğunlukla lehinizedir.",
      },
    ],
    related: [
      "llms-txt-nedir",
      "chatgpt-firmami-neden-onermiyor",
      "google-ai-overview-nasil-cikilir",
    ],
    published: "2026-08-20",
    modified: "2026-08-20",
  },
];
