"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import {
  assistantQuestions as questions,
  scrollToSection as scrollTo,
} from "@/lib/assistant";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content: "Merhaba! Ben KARNER Asistan. Size nasıl yardımcı olabilirim?",
};

/**
 * Sağ-altta sabit sohbet asistanı (tüm ekranlar).
 * Mobilde yuvarlak buton görünür; masaüstünde buton gizli, panel
 * hero'daki "Sorunuz mu var?" balonundan gelen olayla açılır.
 * Serbest yazışma /api/chat üzerinden yanıtlanır.
 */
export default function MobileAssistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Hero balonundan gelen açılış olayı + durumu hero'ya geri bildir
  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("karner:open-assistant", openHandler);
    return () =>
      window.removeEventListener("karner:open-assistant", openHandler);
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("karner:assistant-state", { detail: { open } }),
    );
  }, [open]);

  // Yeni mesajda en alta kaydır
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [msgs, busy, open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      // Oturum kimliği (sekme bazlı) — Telegram bildiriminde aynı ziyaretçinin
      // mesajları bir arada okunsun diye. Kişisel veri içermez.
      let sessionId = "";
      try {
        sessionId = sessionStorage.getItem("karner-chat-sid") || "";
        if (!sessionId) {
          sessionId = Math.random().toString(36).slice(2, 8);
          sessionStorage.setItem("karner-chat-sid", sessionId);
        }
      } catch {}
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.slice(1),
          sessionId,
          page: window.location.pathname,
          turn: next.slice(1).filter((m) => m.role === "user").length,
        }),
      });
      const data = await res.json();
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            res.ok && data.reply
              ? data.reply
              : "Şu anda yanıt veremiyorum. Bize 0544 218 8645 numarasından veya karneryazilim@gmail.com adresinden ulaşabilirsiniz.",
        },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Bağlantı sorunu yaşadım. Bize 0544 218 8645 numarasından veya karneryazilim@gmail.com adresinden ulaşabilirsiniz.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  // Hazır soru: hem sohbete gönder hem ilgili bölüme kaydır
  function ask(q: string, target: string) {
    scrollTo(target);
    void send(q);
  }

  const showChips = msgs.length === 1;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex max-h-[70vh] w-[85vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-accent/40 bg-(--card-top) shadow-2xl shadow-accent/25 backdrop-blur-xl"
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

            {/* Mesaj akışı */}
            <div
              ref={listRef}
              className="flex min-h-[12rem] flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-3"
            >
              {msgs.map((m, i) =>
                m.role === "assistant" ? (
                  <div
                    key={i}
                    className="max-w-[85%] self-start rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white/90"
                  >
                    {m.content}
                  </div>
                ) : (
                  <div
                    key={i}
                    className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-accent/80 px-3 py-2 text-sm text-white"
                  >
                    {m.content}
                  </div>
                ),
              )}

              {busy && (
                <div className="flex items-center gap-1 self-start rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.05] px-3 py-2.5">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-light"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
              )}

              {showChips && !busy && (
                <div className="mt-1 flex flex-col gap-2">
                  {questions.map((item) => (
                    <button
                      key={item.q}
                      type="button"
                      onClick={() => ask(item.q, item.target)}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-sm text-white/85 transition hover:border-accent/50 hover:bg-accent/10"
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Yazma alanı */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 px-3 py-2.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mesajınızı yazın..."
                maxLength={500}
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Gönder"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent text-white transition enabled:hover:scale-105 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Asistanı kapat" : "Asistanı aç"}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/40 transition hover:scale-105 lg:hidden"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent-2 ring-2 ring-(--card-top)" />
          </span>
        )}
      </button>
    </div>
  );
}
