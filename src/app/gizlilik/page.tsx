import type { Metadata } from "next";
import { pageDates, formatTr } from "@/data/dates";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import { CONTACT, SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

const PATH = "/gizlilik";
const pageUrl = `${SITE_URL}${PATH}`;
const dates = pageDates(PATH);
const TITLE = "Gizlilik ve KVKK Aydınlatma Metni | KARNER";
const DESCRIPTION =
  "KARNER web sitesinde hangi veriler, hangi amaçla işlenir: iletişim formu, sohbet asistanı, sunucu kayıtları. Çerez kullanımı, üçüncü taraf hizmetler ve KVKK kapsamındaki haklarınız.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  robots: { index: true, follow: true },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Gizlilik", href: PATH },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "tr",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      datePublished: dates.published,
      dateModified: dates.modified,
      about: { "@id": `${SITE_URL}/#organization` },
    },
    breadcrumbJsonLd(pageUrl, crumbs),
  ],
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-12 text-2xl font-semibold text-white">{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-4 leading-relaxed text-white/70">{children}</p>
);

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHeader />
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-6 pb-4 pt-16 sm:pt-24">
          <Breadcrumb crumbs={crumbs} />
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">Gizlilik</p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            Gizlilik ve KVKK aydınlatma metni
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Son güncelleme: <time dateTime={dates.modified}>{formatTr(dates.modified)}</time>
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 pb-20">
        <P>
          Bu metin, <strong className="text-white">KARNER</strong> (&ldquo;biz&rdquo;) tarafından
          işletilen bu web sitesinde hangi kişisel verilerin, hangi amaçla ve ne kadar süreyle
          işlendiğini 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında açıklar.
          Veri sorumlusu: KARNER, {CONTACT.email}.
        </P>

        <H2>Hangi verileri işliyoruz?</H2>
        <ul className="mt-4 space-y-3 text-white/70">
          <li className="flex gap-3">
            <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
            <span>
              <strong className="text-white">İletişim formu:</strong> ad soyad, e-posta, telefon,
              mesaj ve varsa seçtiğiniz paket. Form verisi, talebinize dönüş yapabilmemiz için
              ekibimize anlık bildirim olarak iletilir ve kendi iş akışı sistemimizde (n8n) kayıt
              altına alınır; üçüncü taraflarla paylaşılmaz.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
            <span>
              <strong className="text-white">Sohbet asistanı:</strong> asistana yazdığınız mesajlar,
              cevap üretilmesi için bir yapay zekâ hizmet sağlayıcısına (Groq) iletilir. Mesajları
              kalıcı olarak kaydetmiyoruz; lütfen asistana kimlik, sağlık veya finans gibi hassas
              bilgi yazmayın.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
            <span>
              <strong className="text-white">Sunucu ve güvenlik kayıtları:</strong> site Vercel
              altyapısında barınır; IP adresi, tarayıcı bilgisi ve istek zamanı gibi teknik veriler
              barındırma sağlayıcısı tarafından güvenlik ve hata ayıklama amacıyla kısa süreli
              işlenebilir.
            </span>
          </li>
        </ul>

        <H2>Çerezler ve izleme</H2>
        <P>
          Bu site pazarlama veya davranış takibi amaçlı çerez kullanmaz; reklam izleyicisi yüklenmez.
          Ziyaret sayılarını ölçmek için Vercel Web Analytics kullanılır: çerez bırakmaz, IP adresini
          saklamaz, kişiyi tanımlamayan toplu sayfa görüntüleme verisi üretir. Sitenin çalışması için
          gerekli teknik çerezler dışında çerez bırakılmaz. Bu durum değişirse bu sayfa güncellenir ve
          gerekiyorsa onayınız istenir.
        </P>

        <H2>Verileri hangi amaçla kullanıyoruz?</H2>
        <P>
          Talebinize cevap vermek, teklif hazırlamak ve sizinle iletişim kurmak için. Verileriniz
          reklam listelerine eklenmez, üçüncü taraflara satılmaz. Yasal bir yükümlülük ya da
          yukarıda sayılan hizmet sağlayıcıların teknik işleyişi dışında paylaşım yapılmaz.
        </P>

        <H2>Ne kadar süre saklıyoruz?</H2>
        <P>
          İletişim e-postaları, görüşme sürdüğü ve olası bir iş ilişkisi için gerektiği sürece
          saklanır; talebiniz hâlinde silinir. Sohbet asistanı mesajları tarafımızca saklanmaz.
        </P>

        <H2>KVKK kapsamındaki haklarınız</H2>
        <P>
          KVKK&apos;nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse
          bilgi talep etme, amacına uygun kullanılıp kullanılmadığını öğrenme, eksik ya da yanlış
          işlenmişse düzeltilmesini, silinmesini veya yok edilmesini isteme haklarına sahipsiniz.
          Başvurularınızı {CONTACT.email} adresine iletebilirsiniz; en kısa sürede yanıtlanır.
        </P>

        <H2>Üçüncü taraf bağlantılar</H2>
        <P>
          Sitede müşteri sitelerine ve demo sitelere dış bağlantılar bulunur. Bu sitelerin gizlilik
          uygulamaları kendi sorumluluklarındadır.
        </P>

        <H2>Değişiklikler</H2>
        <P>
          Bu metin ihtiyaç oldukça güncellenir; güncelleme tarihi sayfanın üstünde yer alır.
        </P>
      </article>
      <Footer />
    </main>
  );
}
