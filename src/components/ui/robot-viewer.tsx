"use client";

import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Lightformer,
  Html,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

type RobotViewerProps = {
  /** public/ altındaki .glb yolu, örn. "/models/robot-a.glb" */
  src: string;
  className?: string;
  /** kendiliğinden dönsün mü */
  autoRotate?: boolean;
  /** tekerlekle yakınlaştırmaya izin ver */
  enableZoom?: boolean;
};

/** Modeli merkeze alıp ~2 birime ölçekler (her boyuttaki glb'yi çerçeveler). */
function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  const groupRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.1 / maxDim;
    group.scale.setScalar(scale);
    // merkeze hizala (ölçekten sonra)
    group.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="flex items-center gap-2 text-xs text-white/70">
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-accent" />
        3B model yükleniyor…
      </div>
    </Html>
  );
}

export function RobotViewer({
  src,
  className = "",
  autoRotate = true,
  enableZoom = false,
}: RobotViewerProps) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.1, 3.15], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        onCreated={({ gl }) => {
          gl.toneMappingExposure = 1.15;
        }}
      >
        {/* temel ışıklar — gümüş metali ortaya çıkaracak beyaz ağırlıklı */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 5, 4]} intensity={2.6} castShadow />
        <directionalLight position={[-4, 2, 2]} intensity={1.1} color="#ffffff" />
        {/* arkadan hafif mor kenar ışığı (marka vurgusu) */}
        <directionalLight position={[-1, 3, -4]} intensity={1.2} color="#7B3FE4" />

        {/* HDR dosyası olmadan, prosedürel stüdyo ortamı (metalik yansımalar için) */}
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={3.2}
            position={[0, 3, 3]}
            scale={[8, 4, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={2}
            position={[-5, 1, 2]}
            scale={[3, 5, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={1.6}
            position={[5, 0, 1]}
            scale={[3, 5, 1]}
            color="#c4b5fd"
          />
        </Environment>

        <Suspense fallback={<Loader />}>
          <Model src={src} />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={enableZoom}
          autoRotate={autoRotate}
          autoRotateSpeed={0.9}
          enableDamping
          dampingFactor={0.08}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}

export default RobotViewer;
