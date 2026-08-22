/**
 * Gündüz modu "Mühendis Kâğıdı" hero süsü: teknik çizim dili — köşe kesim
 * işaretleri, başlığın üstünde/altında ölçü çizgileri, sağ altta çizim anteti.
 * Tüm çizgiler yüklenince kendini çizer (stroke-dashoffset, saf CSS).
 * Sunucu bileşeni, JS yok; koyu modda CSS ile gizli (.drafting). Sayı/iddia yok —
 * etiketler dekoratif (ÇİZİM 001 · ÖLÇEK 1:1 · REV 08.2026).
 */
export default function HeroDrafting() {
  const ink = "rgba(26, 20, 48, 0.55)";
  const inkSoft = "rgba(26, 20, 48, 0.32)";
  // Köşe kesim işaretleri: [yatay çizgi, dikey çizgi] × 4 köşe (yüzde koordinat)
  const corners: Array<[string, string]> = [
    ["3%", "15%"],
    ["97%", "15%"],
    ["3%", "92%"],
    ["97%", "92%"],
  ];
  return (
    <div aria-hidden className="drafting pointer-events-none absolute inset-0 z-[15] hidden sm:block">
      <svg className="h-full w-full" width="100%" height="100%" fill="none">
        <g stroke={ink} strokeWidth="1" className="draft-line draft-d1">
          {corners.map(([x, y]) => (
            <svg key={`${x}-${y}`} x={x} y={y} overflow="visible">
              <line x1="-16" y1="0" x2="16" y2="0" pathLength={1} />
              <line x1="0" y1="-16" x2="0" y2="16" pathLength={1} />
            </svg>
          ))}
        </g>

        {/* Ölçü çizgisi — başlığın üstü (uçlarda tik) */}
        <g stroke={inkSoft} strokeWidth="1" className="draft-line draft-d2">
          <line x1="31%" y1="15.5%" x2="69%" y2="15.5%" pathLength={1} />
          <line x1="31%" y1="14.5%" x2="31%" y2="16.5%" pathLength={1} />
          <line x1="69%" y1="14.5%" x2="69%" y2="16.5%" pathLength={1} />
        </g>
        {/* Dikey ölçü — sol robotun yanında */}
        <g stroke={inkSoft} strokeWidth="1" className="draft-line draft-d3">
          <line x1="9%" y1="30%" x2="9%" y2="78%" pathLength={1} />
          <line x1="8%" y1="30%" x2="10%" y2="30%" pathLength={1} />
          <line x1="8%" y1="78%" x2="10%" y2="78%" pathLength={1} />
        </g>
      </svg>

      {/* Çizim anteti (title block) — sağ alt */}
      <div className="draft-block absolute bottom-10 right-10 hidden w-[17rem] text-[10px] uppercase tracking-[0.22em] text-(--ink) lg:block">
        <div className="draft-row flex items-center justify-between px-3 py-2">
          <span className="font-semibold tracking-[0.3em]">KARNER</span>
          <span className="opacity-70">Yazılım · Medya</span>
        </div>
        <div className="draft-row flex items-center justify-between px-3 py-2">
          <span className="opacity-70">Proje</span>
          <span>Geleceği inşa etmek</span>
        </div>
        <div className="draft-row flex items-center justify-between px-3 py-2">
          <span className="opacity-70">Çizim 001 · Ölçek 1:1</span>
          <span>Rev 08.2026</span>
        </div>
      </div>
    </div>
  );
}
