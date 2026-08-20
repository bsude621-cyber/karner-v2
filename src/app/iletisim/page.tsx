import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import TeklifForm from "@/components/TeklifForm";
import Footer from "@/components/Footer";
import SubpageHeader from "@/components/seo/SubpageHeader";
import Breadcrumb from "@/components/seo/Breadcrumb";
import FaqList from "@/components/seo/FaqList";
import { pageDates } from "@/data/dates";
import { CONTACT, SITE_URL, breadcrumbJsonLd, type Crumb } from "@/lib/site";

const PATH = "/iletisim";
const pageUrl = `${SITE_URL}${PATH}`;
const dates = pageDates(PATH);
const TITLE = "İletişim — Teklif ve Keşif Görüşmesi | KARNER";
const DESCRIPTION =
  "KARNER ile iletişime geçin: telefon, e-posta veya form. Muğla ve Ankara merkezli, Türkiye genelinde çalışan yazılım ve medya ajansı. Kısa keşif görüşmesi, yazılı kapsam, net teklif.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PATH },
};

const crumbs: Crumb[] = [
  { name: "Ana Sayfa", href: "/" },
  { name: "İletişim", href: PATH },
];

const STEPS = [
  {
    no: "1",
    t: "Mesajınız ekibe anında düşer",
    d: "Form, telefon ya da e-posta — hangisi kolaysa. Mesaj ekibimize bildirim olarak gelir, kaybolmaz.",
  },
  {
    no: "2",
    t: "Kısa keşif görüşmesi",
    d: "Telefon veya çevrim içi, 20–30 dakika: hedefiniz, mevcut durum, ne istediğiniz. Satış konuşması değil, dinleme.",
  },
  {
    no: "3",
    t: "Yazılı kapsam ve teklif",
    d: "Neyin dâhil, neyin hariç olduğu yazılı; fiyat kapsama göre. Karar sizin, acele yok.",
  },
];

const FAQ = [
  {
    q: "Ne kadar sürede dönüş alırım?",
    a: "Form ve e-posta mesajlarına kısa sürede dönüyoruz; telefonla ulaşamazsanız kısa bir mesaj bırakın, arayalım. İlk görüşme kısa bir keşiftir: hedefi ve mevcut durumu anlarız, sonra yazılı kapsam göndeririz.",
  },
  {
    q: "Görüşme için ofise gelmem gerekir mi?",
    a: "Gerekmez. Keşif, tasarım onayı ve teslim süreçlerini çevrim içi yürütüyoruz; Türkiye genelindeki işletmelerle bu şekilde çalışıyoruz. İstenirse yüz yüze görüşme de planlanabilir.",
  },
  {
    q: "Teklif almak ücretli mi?",
    a: "Hayır. Keşif görüşmesi ve yazılı teklif ücretsizdir; teklifte kapsam, teslim edilecekler ve bedel açıkça yazar.",
  },
  {
    q: "Hangi bilgileri hazırlamalıyım?",
    a: "Hiçbir şey zorunlu değil; ama varsa mevcut sitenizin adresi, sosyal medya hesaplarınız ve 'en çok şunu istiyorum' dediğiniz tek cümle görüşmeyi hızlandırır. Gerisini keşifte birlikte çıkarırız.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "tr",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      mainEntity: { "@id": `${SITE_URL}/#organization` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      datePublished: dates.published,
      dateModified: dates.modified,
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-summary"] },
    },
    breadcrumbJsonLd(pageUrl, crumbs),
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHeader />

      {/* Başlık */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(123,63,228,0.18),transparent_65%)] blur-2xl" />
        <div className="relative mx-auto max-w-6xl px-6 pb-4 pt-16 sm:pt-24">
          <Breadcrumb crumbs={crumbs} />
          <p className="mb-4 mt-8 text-sm uppercase tracking-[0.35em] text-accent-light">İletişim</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Projenizi konuşalım
          </h1>
          <p className="speakable-summary mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            <strong className="text-white">
              Kısa bir keşif görüşmesi, yazılı kapsam, net teklif — karar sizin.
            </strong>{" "}
            Formu doldurun ya da doğrudan arayın; mesajınız ekibimize anında düşer.
          </p>
        </div>
      </section>

      {/* Gövde: sol kanallar + süreç, sağ form */}
      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          {/* Sol */}
          <div className="flex flex-col gap-8">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <li>
                <a
                  href={`tel:${CONTACT.phoneE164}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/50 hover:bg-white/[0.06]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2">
                    <Phone className="h-5 w-5 text-white" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-white/55">Telefon</span>
                    <span className="block text-lg font-medium text-white">{CONTACT.phoneDisplay}</span>
                    <span className="block text-xs text-white/50">Ulaşamazsanız mesaj bırakın, arayalım</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-accent/50 hover:bg-white/[0.06]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2">
                    <Mail className="h-5 w-5 text-white" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-white/55">E-posta</span>
                    <span className="block truncate text-lg font-medium text-white">{CONTACT.email}</span>
                    <span className="block text-xs text-white/50">Dosya ve bağlantı göndermek için</span>
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2">
                    <MapPin className="h-5 w-5 text-white" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-white/55">Konum</span>
                    <span className="block text-lg font-medium text-white">Muğla &amp; Ankara</span>
                    <span className="block text-xs text-white/50">Türkiye genelinde uzaktan çalışıyoruz</span>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2">
                    <Clock className="h-5 w-5 text-white" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-white/55">Keşif görüşmesi</span>
                    <span className="block text-lg font-medium text-white">Ücretsiz, 20–30 dk</span>
                    <span className="block text-xs text-white/50">Telefon ya da çevrim içi</span>
                  </span>
                </div>
              </li>
            </ul>

            <div className="rounded-2xl border border-accent/25 bg-accent/[0.06] p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-accent-light">Sonra ne olur?</p>
              <ol className="mt-4 space-y-4">
                {STEPS.map((s) => (
                  <li key={s.no} className="flex gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/50 text-xs font-semibold text-accent-light">
                      {s.no}
                    </span>
                    <span>
                      <span className="block font-medium text-white">{s.t}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-white/65">{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <Link
                href="/surec"
                className="group mt-5 inline-flex items-center gap-2 text-sm text-accent-light transition hover:text-white"
              >
                Çalışma sürecimizin tamamı
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>

            <p className="flex items-start gap-2 text-xs leading-relaxed text-white/45">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-light/70" />
              <span>
                Bilgileriniz yalnızca talebinize dönüş için kullanılır; reklam listesine eklenmez, üçüncü
                tarafla paylaşılmaz.{" "}
                <Link href="/gizlilik" className="underline underline-offset-4 hover:text-white">
                  Gizlilik ve KVKK metni
                </Link>
              </span>
            </p>
          </div>

          {/* Sağ: form */}
          <div>
            <TeklifForm />
            <p className="mt-4 text-center text-xs text-white/45">
              Paket seçerek geldiyseniz mesaj alanı ona göre dolu gelir; değiştirebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="max-w-3xl">
          <FaqList items={FAQ} title="İletişimle ilgili sık sorulanlar" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
