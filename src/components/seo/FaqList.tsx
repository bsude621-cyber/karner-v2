import RichText from "@/components/seo/RichText";

/** Native <details> SSS — FAQPage schema'sıyla aynı veriden, sunucuda render. */
export default function FaqList({
  items,
  title = "Sık sorulan sorular",
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  if (!items.length) return null;
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-6 space-y-3">
        {items.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-accent/40 open:border-accent/40"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
              <h3 className="text-base">{f.q}</h3>
              <span
                aria-hidden
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition group-open:rotate-45 group-open:border-accent/60 group-open:text-accent-light"
              >
                +
              </span>
            </summary>
            <p className="px-6 pb-6 leading-relaxed text-white/70">
              <RichText text={f.a} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
