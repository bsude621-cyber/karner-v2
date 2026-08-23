"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Gündüz modu "Mühendis Kâğıdı": sağ kenarda dikey CETVEL — tik işaretleri, bölüm
 * etiketleri (sayfadaki id'li bölümlerden otomatik) ve kaydırmayla inen mürekkep
 * imleç. Etikete tıklayınca bölüme gider. Yalnızca gündüz + geniş ekran + fare.
 */
type Mark = { id: string; label: string; pct: number };

const LABELS: Record<string, string> = {
  hizmetler: "Hizmetler",
  isler: "Demo",
  hakkimizda: "Hakkımızda",
  sss: "SSS",
  iletisim: "İletişim",
};

export default function ScrollRuler() {
  const [on, setOn] = useState(false);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [p, setP] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1100px) and (pointer: fine)");
    const read = () => setOn(mq.matches && document.documentElement.dataset.theme === "light");
    read();
    mq.addEventListener("change", read);
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      mq.removeEventListener("change", read);
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!on) return;
    const measure = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const list: Mark[] = [];
      for (const id of Object.keys(LABELS)) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        list.push({ id, label: LABELS[id], pct: Math.min(1, Math.max(0, top / (h || 1))) });
      }
      setMarks(list);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? window.scrollY / h : 0);
      });
    };
    measure();
    onScroll();
    const t = setTimeout(measure, 1500); // geç yüklenen bölümler
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [on]);

  if (!on || marks.length === 0) return null;

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      aria-hidden
      className="scroll-ruler fixed right-4 top-1/2 z-[60] hidden h-[62vh] w-10 -translate-y-1/2 select-none lg:block"
    >
      {/* cetvel çizgisi + tikler */}
      <div className="scroll-ruler-bar absolute right-2 top-0 h-full w-px" />
      <div className="scroll-ruler-ticks absolute right-2 top-0 h-full w-2" />
      {/* bölüm etiketleri */}
      {marks.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => go(m.id)}
          className="scroll-ruler-mark group absolute right-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]"
          style={{ top: `${m.pct * 100}%` }}
        >
          <span className="scroll-ruler-label -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
            {m.label}
          </span>
          <span className="scroll-ruler-dash block h-px w-4" />
        </button>
      ))}
      {/* mürekkep imleç */}
      <div className="scroll-ruler-cursor absolute right-0 h-3 w-3 -translate-y-1/2" style={{ top: `${p * 100}%` }}>
        <span className="scroll-ruler-pct absolute right-5 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.2em]">
          {String(Math.round(p * 100)).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
