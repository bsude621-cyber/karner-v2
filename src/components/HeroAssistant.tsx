"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, ArrowRight } from "lucide-react";
import { assistantQuestions as questions, scrollToSection as scrollTo } from "@/lib/assistant";

/** Hero üzerindeki konuşma balonları: sol robot karşılar, sağ robot asistan. */
export default function HeroAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 z-[25] hidden lg:block">
      {/* Asistan robotun üzerinde görünmez tıklama alanı — robota tıklayınca panel açılır */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Asistanla konuş"
          className="pointer-events-auto absolute right-[1.5%] top-[24%] h-[50%] w-[13%] cursor-pointer rounded-3xl ring-accent/0 transition hover:bg-accent/5 hover:ring-2 hover:ring-accent/30"
        />
      )}

      {/* SOL — karşılayıcı balonu */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
        transition={{
          opacity: { duration: 0.5, delay: 1.2 },
          scale: { duration: 0.5, delay: 1.2 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
        }}
        className="absolute left-[14.5%] top-[16.5%]"
      >
        {/* backdrop-blur yok: altındaki canvas her karede değiştiği için
            tarayıcı bulanıklığı her karede yeniden hesaplardı. */}
        <div className="relative rounded-2xl border border-accent/40 bg-[#120a1c]/95 px-4 py-2.5 text-sm font-medium text-white shadow-xl shadow-accent/20">
          Hoş geldiniz!
          {/* kuyruk — aşağı, robota doğru */}
          <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-accent/40 bg-[#120a1c]/90" />
        </div>
      </motion.div>

      {/* SAĞ — asistan balonu */}
      <div className="absolute right-[6%] top-[16.5%] flex flex-col items-end gap-2">
        <AnimatePresence>
          {!open ? (
            <motion.button
              key="prompt"
              type="button"
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              transition={{ duration: 0.4, delay: 1.4 }}
              className="pointer-events-auto group relative flex items-center gap-2 rounded-2xl rounded-br-sm border border-accent/40 bg-[#120a1c]/95 px-4 py-2.5 text-sm font-medium text-white shadow-xl shadow-accent/20 transition hover:border-accent hover:bg-accent/15"
            >
              <MessageCircle className="h-4 w-4 text-accent-light" />
              Sorunuz mu var? Bana sorun
              {/* dikkat çeken nabız */}
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
              </span>
              <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-accent/40 bg-[#120a1c]/90" />
            </motion.button>
          ) : (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.28 }}
              className="pointer-events-auto w-[19rem] overflow-hidden rounded-2xl rounded-br-sm border border-accent/40 bg-[#120a1c] shadow-2xl shadow-accent/25"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/20 ring-1 ring-inset ring-accent/30">
                    <MessageCircle className="h-4 w-4 text-accent-light" />
                  </span>
                  <span className="text-sm font-semibold text-white">
                    KARNER Asistan
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Kapat"
                  className="text-white/50 transition hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-4 py-3">
                <p className="mb-3 text-xs text-white/60">
                  Merhaba! Size nasıl yardımcı olabilirim? Aşağıdakilerden birini
                  seçin:
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

              <span className="absolute -bottom-1.5 right-5 h-3 w-3 rotate-45 border-b border-r border-accent/40 bg-[#120a1c]/95" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
