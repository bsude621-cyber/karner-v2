"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Spiral sadece overlay açıldığında (client'ta) yüklenir — performans için
const SpiralAnimation = dynamic(
  () =>
    import("@/components/ui/spiral-animation").then((m) => ({
      default: m.SpiralAnimation,
    })),
  { ssr: false }
);

export default function LocationOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    if (!open) {
      setTextVisible(false);
      return;
    }
    // body scroll kilidi
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const t = setTimeout(() => setTextVisible(true), 1800);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] overflow-hidden bg-black"
        >
          {/* Spiral animasyon */}
          <div className="absolute inset-0">
            <SpiralAnimation />
          </div>

          {/* Merkez yazı */}
          <div
            className={`absolute left-1/2 top-1/2 z-10 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 px-6 text-center transition-all duration-1000 ease-out ${
              textVisible
                ? "translate-y-[-50%] opacity-100"
                : "translate-y-[-40%] opacity-0"
            }`}
          >
            <motion.h2
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="bg-clip-text text-6xl font-black uppercase leading-none tracking-[0.16em] text-transparent sm:text-8xl"
              style={{
                fontFamily: "var(--font-display), system-ui, sans-serif",
                // metalik mor: açık gümüş-lila parlama → koyu mor
                backgroundImage:
                  "linear-gradient(160deg, #e9deff 0%, #b89bff 28%, #7b3fe4 55%, #4b1d96 80%, #2e1166 100%)",
              }}
            >
              KARNER
            </motion.h2>
            <p
              className="mt-6 text-base font-light uppercase tracking-[0.4em] text-paper/85 sm:text-xl"
              style={{ textShadow: "0 0 16px rgba(123,63,228,0.7)" }}
            >
              Senin Hayal Ettiğin Her Yerde
            </p>
          </div>

          {/* Sağda ince mor çizgi + anasayfaya dön */}
          <div className="absolute right-0 top-0 z-20 flex h-full items-center">
            <div className="mr-6 flex flex-col items-center gap-6 sm:mr-10">
              <button
                onClick={onClose}
                className="group flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-paper/60 transition hover:text-paper"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Anasayfaya dön
              </button>
            </div>
            {/* ince mor dikey çizgi */}
            <div className="h-full w-px bg-gradient-to-b from-transparent via-accent to-transparent shadow-[0_0_12px_rgba(123,63,228,0.9)]" />
          </div>

          {/* sol altta küçük ipucu */}
          <p className="absolute bottom-6 left-6 z-20 text-[11px] uppercase tracking-[0.3em] text-paper/55">
            esc ile kapat
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
