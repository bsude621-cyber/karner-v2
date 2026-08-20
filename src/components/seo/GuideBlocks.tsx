import RichText from "@/components/seo/RichText";
import type { GuideBlock } from "@/data/guides/types";

/** Başlık metninden id üretir (Türkçe karakterler sadeleştirilir) — TOC/anchor için. */
export function slugifyHeading(t: string) {
  return t
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c").replace(/â/g, "a")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 64);
}

/**
 * İçerik bloklarını semantik HTML'e çevirir. Sunucuda render edilir;
 * AI botları ve Googlebot ham HTML'de tam metni görür.
 */
export default function GuideBlocks({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={slugifyHeading(b.text)}
                className="mt-14 scroll-mt-24 text-2xl font-semibold text-white first:mt-0"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 text-lg font-semibold text-white">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mt-4 leading-relaxed text-white/70">
                <RichText text={b.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-4 space-y-2 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 leading-relaxed text-white/70">
                    <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                    <span>
                      <RichText text={it} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-4 space-y-3 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-4 leading-relaxed text-white/70">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 text-xs font-medium text-accent-light">
                      {j + 1}
                    </span>
                    <span>
                      <RichText text={it} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "dl":
            return (
              <dl
                key={i}
                className="mt-5 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                {b.items.map((it, j) => (
                  <div key={j}>
                    <dt className="font-semibold text-white">{it.term}</dt>
                    <dd className="mt-1.5 leading-relaxed text-white/70">
                      <RichText text={it.def} />
                    </dd>
                  </div>
                ))}
              </dl>
            );
          case "table":
            return (
              <div key={i} className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full min-w-[36rem] border-collapse text-sm">
                  {b.caption ? (
                    <caption className="px-4 py-3 text-left text-xs uppercase tracking-[0.2em] text-accent-light">
                      {b.caption}
                    </caption>
                  ) : null}
                  <thead>
                    <tr className="bg-white/[0.05] text-left text-white">
                      {b.head.map((h, j) => (
                        <th key={j} scope="col" className="px-4 py-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-white/10 align-top text-white/70">
                        {r.map((c, k) => (
                          <td key={k} className="px-4 py-3 leading-relaxed">
                            <RichText text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="mt-8 rounded-2xl border border-accent/30 bg-accent/[0.07] p-6"
              >
                {b.title ? (
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-accent-light">
                    {b.title}
                  </p>
                ) : null}
                <p className="leading-relaxed text-white/85">
                  <RichText text={b.text} />
                </p>
              </aside>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
