import { HOME_FAQ } from "@/data/home-faq";
import SectionHeading from "@/components/ui/section-heading";

/**
 * Ana sayfa SSS — sunucudan render edilen native <details> akordeon.
 * FAQPage schema (app/page.tsx) birebir aynı veriden üretilir; JS çalışmasa
 * da içerik HTML'de durur (AI botları ve Googlebot ham HTML'i okur).
 */
export default function HomeFaq() {
  return (
    <section id="sss" className="relative bg-background py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(123,63,228,0.10),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="Sık Sorulanlar"
          title="Merak edilenler, kısa cevaplar"
          highlight="kısa"
          subtitle="Görüşmeden önce en sık gelen sorular ve çalışma biçimimizin özeti."
        />
        <div className="mt-12 space-y-3">
          {HOME_FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-accent/40 open:border-accent/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
                <h3 className="text-base sm:text-lg">{f.q}</h3>
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition group-open:rotate-45 group-open:border-accent/60 group-open:text-accent-light"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-white/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
