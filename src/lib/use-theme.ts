"use client";

import { useEffect, useState } from "react";

/**
 * Aydınlık mod açık mı? `data-theme` özniteliğini izler (layout'taki satır içi
 * script ve ThemeToggle bu özniteliği yönetir).
 *
 * Sunucuda ve ilk boyamada `false` döner — yani varsayılan KARANLIK moddur.
 * Aydınlığa özel katmanlar bu yüzden hidrasyondan sonra gelir; karanlık mod
 * ilk karede doğru görünür.
 */
export function useIsLight(): boolean {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const read = () =>
      setLight(document.documentElement.dataset.theme === "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => mo.disconnect();
  }, []);

  return light;
}
