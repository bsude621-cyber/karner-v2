"use client";

import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "karner-theme";
type Theme = "dark" | "light";

/**
 * Gece/gündüz düğmesi. Varsayılan = cihazın sistem modu (layout'taki satır içi
 * script). Tıklanınca tercih localStorage'a yazılır ve sistem modunu ezer.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const read = () =>
      setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  const toggle = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* gizli mod vb. — tema yine de bu oturumda değişir */
      }
      setTheme(next);
    };
    // Dairesel "mürekkep/kâğıt" dalgası: düğmenin merkezinden yayılır.
    // 1) Tarayıcı View Transitions destekliyorsa (Chrome/Edge/Safari 18+) onunla,
    // 2) desteklemiyorsa (eski iOS vb.) aynı efekt fixed bir katmanla (WAAPI) — mobilde
    //    de görünsün (Sude 2026-08-23: "mod değişim hareketi mobilde yok").
    // "Hareketi azalt" açıkken daha kısa (0.35 s) ama yine var.
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    root.style.setProperty("--wash-x", `${x}px`);
    root.style.setProperty("--wash-y", `${y}px`);
    root.style.setProperty("--wash-r", `${radius}px`);
    root.style.setProperty("--wash-dur", reduce ? "0.35s" : "0.7s");
    if (doc.startViewTransition) {
      doc.startViewTransition(apply);
      return;
    }
    // Yedek: hedef tema renginde daire büyür, tepe noktasında tema değişir, katman silinir
    const overlay = document.createElement("div");
    overlay.setAttribute("aria-hidden", "true");
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "2147483646",
      pointerEvents: "none",
      background: next === "light" ? "#f6f3ee" : "#05060a",
      clipPath: `circle(0px at ${x}px ${y}px)`,
    } as CSSStyleDeclaration);
    document.body.appendChild(overlay);
    const dur = reduce ? 350 : 650;
    const grow = overlay.animate(
      [{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${radius}px at ${x}px ${y}px)` }],
      { duration: dur, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
    );
    grow.onfinish = () => {
      apply();
      const fade = overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: "forwards" });
      fade.onfinish = () => overlay.remove();
    };
  };

  const label = theme === "dark" ? "Gündüz moduna geç" : "Gece moduna geç";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-accent/60 hover:text-white ${className}`}
    >
      {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}
