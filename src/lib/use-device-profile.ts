"use client";

import { useEffect, useState } from "react";
import {
  detectDeviceProfile,
  SERVER_PROFILE,
  type DeviceProfile,
} from "@/lib/device";

/**
 * Cihaz profilini verir ve ziyaret sırasında değişebilen şeyleri izler:
 * ekranı döndürme / pencereyi daraltma (mobile), "hareketi azalt" tercihi,
 * bağlantının 4g'den 3g'ye düşmesi.
 *
 * İlk render'da SERVER_PROFILE döner (orta kademe) — bileşenlerin ilk
 * boyaması hiçbir ölçümü beklemez; gerçek değerler mount'tan hemen sonra gelir.
 */
export function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(SERVER_PROFILE);

  useEffect(() => {
    const update = () => setProfile(detectDeviceProfile());
    update();

    const queries = [
      window.matchMedia("(max-width: 1023px)"),
      window.matchMedia("(pointer: coarse)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];
    queries.forEach((q) => q.addEventListener("change", update));

    // Network Information API — Safari'de yok, o yüzden opsiyonel zincir.
    const conn = (navigator as Navigator & { connection?: EventTarget }).connection;
    conn?.addEventListener("change", update);

    return () => {
      queries.forEach((q) => q.removeEventListener("change", update));
      conn?.removeEventListener("change", update);
    };
  }, []);

  return profile;
}
