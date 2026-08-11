"use client";

import type React from "react";
import { MeshGradient } from "@paper-design/shaders-react";

interface ShaderBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * KARNER marka renkleriyle (mor tonları) animasyonlu shader arka planı.
 * Renkler: #7B3FE4 (parlak mor), #4B1D96 (derin mor) — bkz. BRAND.md
 */
export function ShaderBackground({
  children,
  className = "",
}: ShaderBackgroundProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Ana mesh gradyan */}
      <MeshGradient
        className="absolute inset-0 h-full w-full"
        colors={["#05060a", "#7b3fe4", "#4b1d96", "#0a0a16", "#a6a9ad"]}
        speed={0.35}
        distortion={0.8}
        swirl={0.6}
      />
      {/* İkinci katman — derinlik için, hafif şeffaf */}
      <MeshGradient
        className="absolute inset-0 h-full w-full opacity-50"
        colors={["#05060a", "#7b3fe4", "#4b1d96", "#05060a"]}
        speed={0.2}
        distortion={1}
        swirl={0.9}
      />

      {children}
    </div>
  );
}

export default ShaderBackground;
