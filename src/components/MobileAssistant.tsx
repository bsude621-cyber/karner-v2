"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, ArrowRight } from "lucide-react";
import {
  assistantQuestions as questions,
  scrollToSection as scrollTo,
} from "@/lib/assistant";

/**
 * Mobil/küçük ekran asistanı: sağ-altta sabit sohbet butonu.
 * Robotlar mobilde gizli olduğu için asistan deneyimini burada verir.
 * Yalnızca lg altında görünür.
 */
export default function MobileAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 lg:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[80vw] max-w-xs overflow-hidden rounded-2xl border border-accent/40 bg-[#120a1c]/95 shadow-2xl shadow-accent/25 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/20 ring-1 ring-inset ring-accent/30">
                <MessageCircle className="h-4 w-4 text-accent-light" />
              </span>
              <span className="text-sm font-semibold text-white">
                KARNER Asistan
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="mb-3 text-xs text-white/60">
                Merhaba! Size nasıl yardımcı olabilirim?
              </p>
              <ul className="flex flex-col gap-2">
                {questions.map((item) => (
                  <li key={item.q}>
                    <button
                      type="button"
                      onClick={() => {
                        scrollTo(item.target);
                        setOpen(false);
                      }}
                      className="group flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-sm text-white/85 transition hover:border-accent/50 hover:bg-accent/10"
                    >
                      {item.q}
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/60 transition group-hover:translate-x-0.5 group-hover:text-accent-light" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Asistanı kapat" : "Asistanı aç"}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/40 transition hover:scale-105"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent-2 ring-2 ring-[#120a1c]" />
          </span>
        )}
      </button>
    </div>
  );
}
