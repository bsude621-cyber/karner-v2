"use client";

import dynamic from "next/dynamic";
import DeferredMount from "@/components/DeferredMount";

// Statik import edilseydi framer-motion'lı asistan kodu ilk pakete girerdi;
// dynamic(ssr:false) + DeferredMount ile hem kod hem mount ertelenir.
const MobileAssistant = dynamic(() => import("@/components/MobileAssistant"), {
  ssr: false,
});

export default function DeferredAssistant() {
  return (
    <DeferredMount>
      <MobileAssistant />
    </DeferredMount>
  );
}
