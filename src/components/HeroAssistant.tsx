"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

/** Hero üzerindeki konuşma balonları: sol robot karşılar, sağ robot asistan.
 *  Balona (veya robota) tıklayınca sağ-alt köşedeki sohbet asistanı açılır. */
export default function HeroAssistant() {
  const [chatOpen, setChatOpen] = useState(false);

  // Sağ-alt asistanın açık/kapalı durumunu dinle — açıkken balon gizlenir
  useEffect(() => {
    const handler = (e: Event) =>
      setChatOpen((e as CustomEvent<{ open: boolean }>).detail.open);
    window.addEventListener("karner:assistant-state", handler);
    return () => window.removeEventListener("karner:assistant-state", handler);
  }, []);

  const openChat = () => window.dispatchEvent(new Event("karner:open-assistant"));

  return (
    <div className="pointer-events-none absolute inset-0 z-[25] hidden lg:block">
      {/* Asistan robotun üzerinde görünmez tıklama alanı — robota tıklayınca sohbet açılır */}
      {!chatOpen && (
        <button
          type="button"
          onClick={openChat}
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
          {!chatOpen && (
            <motion.button
              key="prompt"
              type="button"
              onClick={openChat}
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
