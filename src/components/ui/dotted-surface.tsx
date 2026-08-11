"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

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
  const sceneRef = useRef<{
    animationId: number;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
  } | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const SEPARATION = 150;
    const AMOUNTX = 40;
    const AMOUNTY = 60;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(BRAND.fog, 1800, 9000);

    const camera = new THREE.PerspectiveCamera(60, 1, 1, 10000);
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(BRAND.bg, 1);
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
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 7,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId = 0;

    const resize = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    let visible = true;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!visible) return; // ekran dışındayken çizme (performans)

      const positionAttribute = geometry.attributes.position;
      const pos = positionAttribute.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;
          pos[index + 1] =
            Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
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

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    io.observe(wrapper);

    sceneRef.current = { animationId, renderer, scene };

    return () => {
      observer.disconnect();
      io.disconnect();
      cancelAnimationFrame(animationId);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
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
