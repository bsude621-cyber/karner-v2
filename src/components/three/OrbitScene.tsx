"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ParticleSphere } from "@/components/ui/3d-orbit-gallery";

export default function OrbitScene() {
  return (
    <Canvas camera={{ position: [-10, 1.5, 10], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ParticleSphere />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  );
}
