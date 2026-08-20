import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/site";

/**
 * Görünür kırıntı — BreadcrumbList schema'sıyla aynı veriden üretilir
 * (schema + görünür UI eşleşmesi Google'ın kırıntı rich result şartı).
 */
export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Kırıntı" className="text-xs text-white/50 sm:text-sm">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 ? (
                <ChevronRight className="h-3.5 w-3.5 text-white/30" aria-hidden />
              ) : null}
              {last ? (
                <span aria-current="page" className="text-white/80">
                  {c.name}
                </span>
              ) : (
                <Link
                  href={c.href}
                  className="transition-colors hover:text-accent-light"
                >
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
