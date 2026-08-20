import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Çok küçük satır içi biçimlendirme: **kalın** ve [metin](/yol).
 * Tam markdown değil — içerik verisi (guides/sectors/cases) yalnızca bu ikisini kullanır.
 * Dış bağlantılar (http...) yeni sekmede, iç bağlantılar next/link ile açılır.
 */
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

export default function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  const out: ReactNode[] = parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m) {
      const [, label, href] = m;
      const external = /^https?:\/\//.test(href);
      return external ? (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-light underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
        >
          {label}
        </a>
      ) : (
        <Link
          key={i}
          href={href}
          className="text-accent-light underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
        >
          {label}
        </Link>
      );
    }
    return part;
  });
  return <>{out}</>;
}
