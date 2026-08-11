/** Bölümler arası ince, ortada parlayan gradient ayraç. */
export default function SectionDivider() {
  return (
    <div
      aria-hidden
      className="relative mx-auto flex h-px w-full max-w-5xl items-center justify-center bg-background"
    >
      <span className="section-divider" />
      <span className="absolute h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_14px_rgba(123,63,228,0.9)]" />
    </div>
  );
}
