import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** vurgulanacak (mor gradient) kelime — opsiyonel */
  highlight?: string;
  subtitle?: string;
  className?: string;
};

/**
 * Tüm bölümler için tutarlı başlık: üst etiket + h2 + alt metin.
 * Girişler saf CSS (.reveal) — framer-motion ana pakete girmesin diye;
 * sunucudan görünür gelir, JavaScript çalışmasa da okunur.
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  className,
}: SectionHeadingProps) {
  const words = title.split(" ");

  return (
    <div className={cn("text-center", className)}>
      <p className="reveal text-sm uppercase tracking-[0.3em] text-accent-light">
        {eyebrow}
      </p>

      <h2
        aria-label={title}
        className="reveal mt-4 flex flex-wrap justify-center gap-x-3 text-4xl font-semibold sm:text-5xl"
      >
        {words.map((word, i) => {
          const isHi = highlight && word === highlight;
          return (
            <span
              key={`${word}-${i}`}
              aria-hidden
              className={cn(
                "inline-block",
                isHi &&
                  "bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent"
              )}
            >
              {word}
            </span>
          );
        })}
      </h2>

      {subtitle ? (
        <p className="reveal mx-auto mt-5 max-w-2xl text-lg text-white/60">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
