"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  Sphere,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function DistortedKnot() {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.15;
    mesh.current.rotation.y = t * 0.2;
    // subtle follow of pointer
    mesh.current.position.x = state.pointer.x * 0.4;
    mesh.current.position.y = state.pointer.y * 0.3;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <Sphere ref={mesh} args={[1.6, 128, 128]}>
        <MeshDistortMaterial
          color="#7b3fe4"
          emissive="#4b1d96"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.9}
          distort={0.45}
          speed={1.8}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -3, 2]} intensity={3} color="#7b3fe4" />
        <DistortedKnot />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
