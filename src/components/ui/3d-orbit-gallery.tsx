"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * KARNER marka moruna boyanmış parçacık küresi + etrafında dönen
 * mor parlayan cam paneller. Dış görsel gerektirmez.
 * (İleride paneller proje ekran görüntüleriyle değiştirilebilir.)
 */

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const SERVICES = [
  "Web Sitesi\nGeliştirme",
  "Mobil\nUygulama",
  "AI Video &\nReklam",
  "AI Ürün\nGörseli",
];

function makeServiceTexture(title: string): THREE.CanvasTexture {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;

  const pad = 30;
  const r = 56;
  const grd = ctx.createLinearGradient(0, 0, size, size);
  grd.addColorStop(0, "#7b3fe4");
  grd.addColorStop(1, "#4b1d96");

  ctx.fillStyle = grd;
  roundRect(ctx, pad, pad, size - 2 * pad, size - 2 * pad, r);
  ctx.fill();

  // kenar parlaması
  ctx.strokeStyle = "rgba(255,255,255,0.30)";
  ctx.lineWidth = 6;
  roundRect(ctx, pad, pad, size - 2 * pad, size - 2 * pad, r);
  ctx.stroke();

  // üstte ışık yansıması
  const sheen = ctx.createLinearGradient(0, pad, 0, size / 2);
  sheen.addColorStop(0, "rgba(255,255,255,0.22)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen;
  roundRect(ctx, pad, pad, size - 2 * pad, (size - 2 * pad) / 2, r);
  ctx.fill();

  // hizmet metni (çok satırlı, ortalı)
  const lines = title.split("\n");
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 58px system-ui, sans-serif";
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = 8;
  const lineHeight = 70;
  const startY = size / 2 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, size / 2, startY + i * lineHeight);
  });

  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export function ParticleSphere() {
  const PARTICLE_COUNT = 1300;
  const PARTICLE_SIZE_MIN = 0.005;
  const PARTICLE_SIZE_MAX = 0.011;
  const SPHERE_RADIUS = 9;
  const POSITION_RANDOMNESS = 4;
  const ROTATION_SPEED_Y = 0.0006;

  const IMAGE_COUNT = 8; // 4 hizmet x 2 tur
  const IMAGE_SIZE = 2.6;

  const groupRef = useRef<THREE.Group>(null);

  const serviceTextures = useMemo(
    () => SERVICES.map((t) => makeServiceTexture(t)),
    []
  );

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
      const radiusVariation =
        SPHERE_RADIUS + (Math.random() - 0.5) * POSITION_RANDOMNESS;

      const x = radiusVariation * Math.cos(theta) * Math.sin(phi);
      const y = radiusVariation * Math.cos(phi);
      const z = radiusVariation * Math.sin(theta) * Math.sin(phi);

      // KARNER moru: hue ~0.72, bazı parçacıklar daha açık (parıltı)
      const sparkle = Math.random() > 0.85;
      arr.push({
        position: [x, y, z] as [number, number, number],
        scale:
          Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) +
          PARTICLE_SIZE_MIN,
        color: new THREE.Color().setHSL(
          0.7 + Math.random() * 0.07,
          sparkle ? 0.4 : 0.85,
          sparkle ? 0.9 : 0.5 + Math.random() * 0.3
        ),
      });
    }
    return arr;
  }, []);

  const orbitingPanels = useMemo(() => {
    const images = [];
    for (let i = 0; i < IMAGE_COUNT; i++) {
      const angle = (i / IMAGE_COUNT) * Math.PI * 2;
      const x = SPHERE_RADIUS * Math.cos(angle);
      const y = 0;
      const z = SPHERE_RADIUS * Math.sin(angle);

      const position = new THREE.Vector3(x, y, z);
      const center = new THREE.Vector3(0, 0, 0);
      const outwardDirection = position.clone().sub(center).normalize();

      const euler = new THREE.Euler();
      const matrix = new THREE.Matrix4();
      matrix.lookAt(
        position,
        position.clone().add(outwardDirection),
        new THREE.Vector3(0, 1, 0)
      );
      euler.setFromRotationMatrix(matrix);

      images.push({
        position: [x, y, z] as [number, number, number],
        rotation: [euler.x, euler.y, euler.z] as [number, number, number],
        textureIndex: i % SERVICES.length,
      });
    }
    return images;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += ROTATION_SPEED_Y;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          position={particle.position}
          scale={particle.scale}
        >
          <sphereGeometry args={[1, 8, 6]} />
          <meshBasicMaterial color={particle.color} transparent opacity={1} />
        </mesh>
      ))}

      {orbitingPanels.map((panel, index) => (
        <mesh key={`panel-${index}`} position={panel.position} rotation={panel.rotation}>
          <planeGeometry args={[IMAGE_SIZE, IMAGE_SIZE]} />
          <meshBasicMaterial
            map={serviceTextures[panel.textureIndex]}
            transparent
            opacity={0.97}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default ParticleSphere;
