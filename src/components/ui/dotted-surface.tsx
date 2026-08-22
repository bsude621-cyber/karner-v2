"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
// Yalnızca tip — çalışma zamanında silinir. three'nin kendisi aşağıda,
// bölüm viewport'a yaklaşınca dinamik import edilir; statik import edilseydi
// ~600KB'lık kütüphane ana pakete girer, açılışta 2+ sn script yerdi.
import type * as ThreeNS from "three";

type DottedSurfaceProps = React.ComponentProps<"div">;

const BRAND = {
  bg: 0x05060a,
  fog: 0x1a0a2e,
  accent: { r: 123, g: 63, b: 228 },
  accent2: { r: 75, g: 29, b: 150 },
  silver: { r: 166, g: 169, b: 173 },
  gray: { r: 92, g: 95, b: 102 },
};

export function DottedSurface({
  className,
  children,
  ...props
}: DottedSurfaceProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    let cancelled = false;
    let cleanupScene: (() => void) | undefined;

    const start = async () => {
      const THREE: typeof ThreeNS = await import("three");
      if (cancelled) return;

      const SEPARATION = 150;
      const AMOUNTX = 40;
      const AMOUNTY = 60;

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(BRAND.fog, 1800, 9000);

      const camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
      camera.position.set(0, 355, 1220);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // Tema: zemin saydam (sayfa arka planı görünür), açık temada noktalar koyulaşır
      const isLight = () =>
        document.documentElement.dataset.theme === "light" && !wrapper.closest(".night-section");
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const positions: number[] = [];
      const colors: number[] = [];

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          positions.push(x, 0, z);

          const mix = (ix / AMOUNTX + iy / AMOUNTY) / 2;
          const c =
            mix > 0.55
              ? BRAND.accent
              : mix > 0.3
                ? BRAND.silver
                : BRAND.accent2;

          colors.push(
            c.r / 255 + (BRAND.gray.r / 255) * 0.15,
            c.g / 255 + (BRAND.gray.g / 255) * 0.15,
            c.b / 255 + (BRAND.gray.b / 255) * 0.15
          );
        }
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );

      // Yuvarlak nokta dokusu: büyük boyutlarda (mobil) kare piksel yerine
      // yumuşak disk görünsün.
      const dotCanvas = document.createElement("canvas");
      dotCanvas.width = dotCanvas.height = 32;
      const dctx = dotCanvas.getContext("2d");
      if (dctx) {
        const grd = dctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grd.addColorStop(0, "rgba(255,255,255,1)");
        grd.addColorStop(0.55, "rgba(255,255,255,0.9)");
        grd.addColorStop(1, "rgba(255,255,255,0)");
        dctx.fillStyle = grd;
        dctx.fillRect(0, 0, 32, 32);
      }
      const dotTexture = new THREE.CanvasTexture(dotCanvas);

      const material = new THREE.PointsMaterial({
        size: 7,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
        map: dotTexture,
        alphaMap: dotTexture,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const applyTheme = () => {
        // vertexColors × material.color: açıkta koyu-mor çarpan, koyuda nötr
        if (isLight()) material.color.setRGB(0.23, 0.12, 0.48); // v7 mürekkep menekşe
        else material.color.setRGB(1, 1, 1);
        scene.fog = isLight() ? null : new THREE.Fog(BRAND.fog, 1800, 9000);
      };
      applyTheme();
      const themeObs = new MutationObserver(applyTheme);
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

      let count = 0;
      let animationId = 0;

      // Mobilde (dar ekran) noktalar daha büyük/parlak ve kamera daha yakın —
      // dar görüş açısında alan uzakta kalıyor, yıldızlar silikleşiyordu
      // (Sude 2026-08-21: "mobilde yıldızlar çok görünmüyor").
      const resize = () => {
        const { width, height } = wrapper.getBoundingClientRect();
        if (width === 0 || height === 0) return;
        const narrow = width < 640;
        camera.aspect = width / height;
        camera.position.set(0, narrow ? 330 : 355, narrow ? 760 : 1220);
        camera.updateProjectionMatrix();
        material.size = narrow ? 11 : 8;
        material.opacity = narrow ? 0.95 : 0.8;
        material.needsUpdate = true;
        renderer.setSize(width, height);
      };

      let visible = true;

      // Kare tavanı: mobil 30 fps, masaüstü 60 fps (yüksek Hz ekranlarda boşa yük)
      const minFrameMs = window.matchMedia("(max-width: 639px)").matches ? 1000 / 30 : 1000 / 60;
      let lastFrame = 0;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        if (!visible) return; // ekran dışındayken çizme (performans)
        const nowMs = performance.now();
        if (nowMs - lastFrame < minFrameMs - 1) return;
        lastFrame = nowMs;

        const positionAttribute = geometry.attributes.position;
        const pos = positionAttribute.array as Float32Array;

        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            const index = i * 3;
            pos[index + 1] =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50;
            i++;
          }
        }

        positionAttribute.needsUpdate = true;
        renderer.render(scene, camera);
        count += 0.1;
      };

      resize();
      animate();

      const observer = new ResizeObserver(resize);
      observer.observe(wrapper);

      const visIo = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0.01 }
      );
      visIo.observe(wrapper);

      cleanupScene = () => {
        themeObs.disconnect();
        observer.disconnect();
        visIo.disconnect();
        cancelAnimationFrame(animationId);

        geometry.dispose();
        material.dispose();
        renderer.dispose();

        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    // three ancak bölüm viewport'a yaklaşınca inmeye başlar
    const loadIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadIo.disconnect();
          void start();
        }
      },
      { rootMargin: "300px" }
    );
    loadIo.observe(wrapper);

    return () => {
      cancelled = true;
      loadIo.disconnect();
      cleanupScene?.();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn("relative overflow-hidden bg-background", className)}
      {...props}
    >
      <div
        ref={containerRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      />
      {children}
    </div>
  );
}
