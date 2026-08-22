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
    // Dairesel "mürekkep/kâğıt" dalgası: düğmenin merkezinden yayılır (View Transitions).
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void> };
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) {
      apply();
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;
    root.style.setProperty("--wash-x", `${x}px`);
    root.style.setProperty("--wash-y", `${y}px`);
    root.style.setProperty("--wash-r", `${radius}px`);
    doc.startViewTransition(apply);
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
