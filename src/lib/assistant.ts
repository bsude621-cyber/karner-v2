/** KARNER asistanının hazır soruları (hem hero hem mobil asistan kullanır). */
export type AssistantQuestion = { q: string; target: string };

export const assistantQuestions: AssistantQuestion[] = [
  { q: "Hizmetleriniz neler?", target: "#hizmetler" },
  { q: "Size nasıl ulaşabilirim?", target: "#iletisim" },
  { q: "3D web sitesi yaptırmak istiyorum", target: "#iletisim" },
  { q: "Hakkınızda", target: "#hakkimizda" },
];

export function scrollToSection(target: string) {
  const el = document.querySelector<HTMLElement>(target);
  if (!el) return;
  // Native kaydırma — sitenin nav linkleriyle aynı mekanizma (Lenis 'smooth'u
  // yuttuğu için anında konumlandırma güvenilir çalışır).
  const y = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: y });
}
