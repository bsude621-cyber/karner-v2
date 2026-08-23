"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/**
 * Gündüz modu "Mühendis Kâğıdı" — Hakkımızda: KARNER robotunun TEKNİK ÇİZİMİ.
 * Aynı GLB (hero'dan önbellekli). Her mesh için: kâğıt rengi dolgu (gizli hatları
 * örter) + kenar çizgileri (EdgesGeometry, 24°) = gerçek çizim hissi; üçgen tel
 * kafes DEĞİL. Bölüm görünür olurken robot AYAKTAN BAŞA doğru "çizilir" (kesme
 * düzlemi kaydırmayla yükselir), sonra yavaşça döner, fareyle hafif eğilir.
 * Yalnızca gündüz + görünürken çizer; koyu modda canvas hiç kurulmaz.
 */
const SRC = "/models/robot-a.opt.glb";
useGLTF.preload(SRC);

type Props = {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  progress: React.MutableRefObject<number>;
};

function WireRobot({ mouse, progress }: Props) {
  const { scene } = useGLTF(SRC);
  const { gl } = useThree();
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const planeRef = useRef(new THREE.Plane(new THREE.Vector3(0, -1, 0), 10));

  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);

  const drawing = useMemo(() => {
    const root = new THREE.Group();
    const plane = planeRef.current;
    const fill = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#f6f3ee"),
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
      clippingPlanes: [plane],
    });
    const edge = new THREE.LineBasicMaterial({
      color: new THREE.Color("#1a1430"),
      transparent: true,
      opacity: 0.78,
      clippingPlanes: [plane],
    });
    const ghost = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#1a1430"),
      wireframe: true,
      transparent: true,
      opacity: 0.05,
      clippingPlanes: [plane],
    });
    scene.updateWorldMatrix(true, true);
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh || !m.geometry) return;
      const a = new THREE.Mesh(m.geometry, fill);
      const e = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry, 24), edge);
      const lite = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
      const parts: THREE.Object3D[] = lite ? [a, e] : [a, new THREE.Mesh(m.geometry, ghost), e];
      for (const x of parts) {
        x.matrixAutoUpdate = false;
        x.matrix.copy(m.matrixWorld);
        root.add(x);
      }
      e.renderOrder = 2;
    });
    return root;
  }, [scene]);

  // Yüksekliğe göre ölçekle + merkeze al
  const bounds = useRef({ minY: -1.2, maxY: 1.2 });
  useLayoutEffect(() => {
    const g = inner.current;
    if (!g) return;
    g.scale.setScalar(1);
    g.position.set(0, 0, 0);
    const box = new THREE.Box3().setFromObject(drawing);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = 2.6 / (size.y || 1);
    g.scale.setScalar(s);
    g.position.set(-center.x * s, -center.y * s, -center.z * s);
    bounds.current = { minY: -1.3, maxY: 1.3 };
  }, [drawing]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const p = progress.current; // 0 → 1 (kaydırma)
    // kesme düzlemi: y > const olan kısım kesilir (normal -y) → const yükseldikçe robot çizilir
    const { minY, maxY } = bounds.current;
    const y = minY + (maxY - minY + 0.2) * p;
    planeRef.current.constant = y;
    // çizim tamamlanmadan yavaş, tamamlanınca normal tur
    g.rotation.y += dt * (0.12 + 0.3 * p);
    const tx = mouse.current.y * 0.1;
    const tz = -mouse.current.x * 0.05;
    g.rotation.x += (tx - g.rotation.x) * 0.05;
    g.rotation.z += (tz - g.rotation.z) * 0.05;
    g.position.y = Math.sin(t * 0.9) * 0.03;
  });

  // Döner tabla: ayak hizasında kesikli elips + iç halka (teknik çizim zemini)
  const turntable = useMemo(() => {
    const g = new THREE.Group();
    const mk = (r: number, dashed: boolean, opacity: number) => {
      const curve = new THREE.EllipseCurve(0, 0, r, r, 0, Math.PI * 2, false, 0);
      const pts = curve.getPoints(96).map((v) => new THREE.Vector3(v.x, 0, v.y));
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = dashed
        ? new THREE.LineDashedMaterial({ color: "#1a1430", dashSize: 0.09, gapSize: 0.06, transparent: true, opacity })
        : new THREE.LineBasicMaterial({ color: "#1a1430", transparent: true, opacity });
      const line = new THREE.LineLoop(geo, mat);
      line.computeLineDistances();
      return line;
    };
    g.add(mk(1.05, true, 0.55), mk(0.62, false, 0.22));
    g.position.y = -1.32;
    return g;
  }, []);
  const scanRef = useRef<THREE.Group>(null);
  useFrame(() => {
    const sc = scanRef.current;
    if (!sc) return;
    sc.position.y = planeRef.current.constant;
    const p = progress.current;
    sc.visible = p > 0.01 && p < 0.995;
  });

  return (
    <>
      <group ref={group}>
        <group ref={inner}>
          <primitive object={drawing} />
        </group>
      </group>
      <primitive object={turntable} />
      {/* Tarama çizgisi: robot çizilirken geçen ince mürekkep ışını + hafif hâle */}
      <group ref={scanRef}>
        <mesh>
          <planeGeometry args={[2.6, 0.012]} />
          <meshBasicMaterial color="#3b1f7a" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, -0.035, 0]}>
          <planeGeometry args={[2.6, 0.07]} />
          <meshBasicMaterial color="#3b1f7a" transparent opacity={0.12} />
        </mesh>
        <mesh position={[-1.36, 0, 0]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#1a1430" transparent opacity={0.9} />
        </mesh>
        <mesh position={[1.36, 0, 0]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#1a1430" transparent opacity={0.9} />
        </mesh>
      </group>
    </>
  );
}

export default function AboutWireframe({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const progress = useRef(0);
  const [light, setLight] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const read = () => setLight(document.documentElement.dataset.theme === "light");
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    // kaydırma ilerlemesi: panel ekranın altından girerken 0, üst %35'e gelince 1
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - r.top) / (vh * 0.5 + r.height * 0.5);
      progress.current = Math.min(1, Math.max(0, raw));
    };
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Canvas yalnızca bölüm yaklaşınca kurulur (WebGL bağlam sayısını düşük tut), uzaklaşınca sökülür
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0,
      rootMargin: "240px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={`pointer-events-none ${className}`} aria-hidden>
      {light && visible ? (
        <Canvas
          frameloop="always"
          camera={{ position: [0, 0.05, 5.4], fov: 34 }}
          dpr={window.matchMedia("(max-width: 767px), (pointer: coarse)").matches ? [1, 1] : [1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        >
          <WireRobot mouse={mouse} progress={progress} />
        </Canvas>
      ) : null}
    </div>
  );
}
