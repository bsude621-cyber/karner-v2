"use client";

import { motion } from "framer-motion";
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
 * Tüm bölümler için tutarlı, animasyonlu başlık:
 * üst etiket + kelime kelime beliren h2 + alt metin.
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
      {/* initial'da opacity YOK — başlıklar sunucudan görünür gelsin.
          JavaScript çalışmasa da okunur kalır. Efekt kaydırmayla korunuyor. */}
      <motion.p
        initial={{ y: 12 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-sm uppercase tracking-[0.3em] text-accent-light"
      >
        {eyebrow}
      </motion.p>

      <h2
        aria-label={title}
        className="mt-4 flex flex-wrap justify-center gap-x-3 text-4xl font-semibold sm:text-5xl"
      >
        {words.map((word, i) => {
          const isHi = highlight && word === highlight;
          return (
            <motion.span
              key={`${word}-${i}`}
              aria-hidden
              initial={{ y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className={cn(
                "inline-block",
                isHi &&
                  "bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent"
              )}
            >
              {word}
            </motion.span>
          );
        })}
      </h2>

      {subtitle ? (
        <motion.p
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-white/60"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
