/* ============================================================
   3D TOOTH SCENE — hyper-realistic anatomical molar (GLB asset)
   Model: mandibular first molar extracted from the SDF-built
   "cariology" study asset (github.com/kwibuloy/Oralis) —
   surfaces faithfully within ~0.02 mm of true dental anatomy,
   25.3k-vert enamel shell + 52.8k-vert cementum (root) shell,
   full 22 mm real-scale proportions. KHR-quantized → 2.05 MB.
   Source repo: educational asset, MIT-licensed code; demo use.

   Material pass: no baked maps (scan geometry carries the
   micro-detail), so we author premium ceramic procedurally —
   warm ivory enamel with glazed clearcoat + sheen thin-edge
   glow, cooler cementum roots, plus runtime cylindrical UV
   projection driving a subtle procedural roughness/bump grain
   so the surface never reads as sterile CGI.

   Perf rules honoured:
   · dpr capped at 1.75, no shadow maps, 128px local env map
   · frameloop pauses off-screen (IntersectionObserver)
   · lazy-loaded via Home + 2D fallback while streaming,
     on WebGL error, or when reduced-motion is requested
   ============================================================ */
import React, { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment, Lightformer, Sparkles, ContactShadows, Float,
  useGLTF, PerspectiveCamera, useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import { FallbackTooth } from "./ToothFallback.jsx";

const MODEL_URL = "/models/tooth.glb";

/* ---------- Procedural micro-grain (canvas-generated, memoized) ---------- */
let _noiseTex = null;
function makeNoiseTexture() {
  if (_noiseTex) return _noiseTex;
  const S = 256;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d");
  /* Mid-luminance base: roughness neutral / bump neutral */
  ctx.fillStyle = "#b9b9b9";
  ctx.fillRect(0, 0, S, S);
  /* Fine organic speckle — ±variance, mostly soft mid-tones */
  for (let i = 0; i < 5200; i++) {
    const g = 150 + Math.random() * 90;
    ctx.fillStyle = `rgba(${g},${g},${g},${0.06 + Math.random() * 0.1})`;
    const r = 0.4 + Math.random() * 1.8;
    ctx.beginPath();
    ctx.arc(Math.random() * S, Math.random() * S, r, 0, Math.PI * 2);
    ctx.fill();
  }
  /* A few soft cloudy patches for non-uniform sheen */
  for (let i = 0; i < 26; i++) {
    const g = 165 + Math.random() * 55;
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 18 + Math.random() * 34);
    grad.addColorStop(0, `rgba(${g},${g},${g},0.10)`);
    grad.addColorStop(1, "rgba(185,185,185,0)");
    ctx.save();
    ctx.translate(Math.random() * S, Math.random() * S);
    ctx.fillStyle = grad;
    ctx.fillRect(-40, -40, 80, 80);
    ctx.restore();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2.2, 2.2);
  tex.anisotropy = 4;
  _noiseTex = tex;
  return tex;
}

/* ---------- Runtime UVs: cylindrical projection (asset ships none) ---------- */
function ensureUVs(geo) {
  if (geo.attributes.uv) return;
  geo.computeBoundingBox();
  const bb = geo.boundingBox;
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  const rangeY = Math.max(bb.max.y - bb.min.y, 1e-4);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    uv[i * 2] = (Math.atan2(x, z) / (Math.PI * 2) + 0.5) % 1;
    uv[i * 2 + 1] = (y - bb.min.y) / rangeY;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
}

/* ============================================================
   ANATOMICAL MOLAR — loads the GLB, generates UVs, applies
   dual ceramic/cementum materials, normalizes scale + framing
   ============================================================ */
function AnatomicalTooth({ onReady }) {
  const { scene } = useGLTF(MODEL_URL);

  /* Two tuned physical materials keyed by tissue type */
  const materials = useMemo(() => {
    const noise = makeNoiseTexture();
    return {
      /* Glazed ivory ceramic crown */
      enamel: new THREE.MeshPhysicalMaterial({
        color: "#faf5ea",
        roughness: 0.42,
        roughnessMap: noise,
        bumpMap: noise,
        bumpScale: 0.6,
        metalness: 0,
        clearcoat: 0.55,                  // porcelain glaze layer
        clearcoatRoughness: 0.28,
        specularIntensity: 0.55,
        specularColor: new THREE.Color("#ffffff"),
        ior: 1.5,
        sheen: 0.3,                       // thin-edge enamel translucency feel
        sheenColor: new THREE.Color("#fff3da"),
        sheenRoughness: 0.5,
        envMapIntensity: 0.8,
      }),
      /* Root tissue: warmer, chalkier, gently rougher */
      cementum: new THREE.MeshPhysicalMaterial({
        color: "#f0e6d0",
        roughness: 0.58,
        roughnessMap: noise,
        bumpMap: noise,
        bumpScale: 1.1,
        metalness: 0,
        clearcoat: 0.14,
        clearcoatRoughness: 0.5,
        specularIntensity: 0.35,
        ior: 1.45,
        sheen: 0.12,
        sheenColor: new THREE.Color("#f5e8c8"),
        envMapIntensity: 0.55,
      }),
    };
  }, []);

  /* Normalize: real mm scale → ~2.3 world units tall, centered,
     resting just above the contact-shadow plane */
  const { clone, scale, pos } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      if (!o.isMesh) return;
      ensureUVs(o.geometry);
      const matName = (o.material?.name || "").toLowerCase();
      o.material = matName.includes("cementum") ? materials.cementum : materials.enamel;
      o.castShadow = false;
      o.receiveShadow = false;
      o.frustumCulled = true;
    });
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = 2.3 / size.y;
    return {
      clone,
      scale: s,
      pos: [-center.x, -box.min.y - 1.02 / s, -center.z],
    };
  }, [scene, materials]);

  useEffect(() => onReady?.(), [onReady]);
  useEffect(
    () => () => {
      materials.enamel.dispose();
      materials.cementum.dispose();
    },
    [materials]
  );

  return (
    <group scale={scale}>
      <primitive object={clone} position={pos} />
    </group>
  );
}

/* ============================================================
   ORBIT — teal halo ring + coral accent orb (unchanged design)
   ============================================================ */
function Halo() {
  const ring = useRef();
  const orb = useRef();
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    ring.current.rotation.z += delta * 0.12;
    ring.current.rotation.x = 1.06 + Math.sin(t * 0.22) * 0.045;
    orb.current.position.x = Math.cos(t * 0.45) * 2.1;
    orb.current.position.z = Math.sin(t * 0.45) * 2.1;
    orb.current.position.y = Math.sin(t * 0.6) * 0.35 + 0.35;
  });
  return (
    <group position={[0, -0.15, 0]}>
      <mesh ref={ring} rotation={[1.06, 0, 0]}>
        <torusGeometry args={[1.85, 0.02, 12, 80]} />
        <meshStandardMaterial color="#0e8f8b" roughness={0.45} metalness={0.3} envMapIntensity={0.5} />
      </mesh>
      <mesh ref={orb} position={[2.1, 0.35, 0]}>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshPhysicalMaterial color="#ff6b35" roughness={0.25} clearcoat={0.8} clearcoatRoughness={0.15} />
      </mesh>
    </group>
  );
}

/* ============================================================
   RIG — three-quarter base view, gentle perpetual spin,
   restrained pointer parallax, viewport-aware scaling
   ============================================================ */
function Rig({ onReady }) {
  const group = useRef();
  const target = useRef({ x: 0, y: 0 });
  const size = useThree((s) => s.size);

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.32;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0.55 + t * 0.18 + target.current.x, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, target.current.y * 0.3, 0.05);
    const s = THREE.MathUtils.clamp(size.width / 540, 0.78, 1);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, 0.08));
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.04} floatIntensity={0.5}>
        <Suspense fallback={null}>
          <AnatomicalTooth onReady={onReady} />
        </Suspense>
      </Float>
      <Halo />
      <Sparkles count={16} scale={[4.6, 4, 3.2]} size={1.8} speed={0.28} color="#a6efe6" opacity={0.45} />
    </group>
  );
}

/* ============================================================
   STUDIO LIGHTS — product-visualization rig:
   soft key upper-right, cool fill for detailed shadows, warm
   rim strip separating the ceramic from the mint background.
   ============================================================ */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-4, 1.5, 2.5]} intensity={0.35} color="#e4f2ff" />
      <Environment resolution={128}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer form="circle" intensity={4} color="#ffffff" position={[0, 5, -9]} scale={2.6} />
          <Lightformer form="rect" intensity={1.8} color="#f2fffc" position={[-5, 1, -1]} scale={[3.4, 0.9]} />
          <Lightformer form="rect" intensity={1.8} color="#eef8ff" position={[5, -1, -1]} scale={[3.4, 0.9]} />
          <Lightformer form="rect" intensity={2.6} color="#fff6e6" position={[-6, 3, -5]} scale={[3, 0.6]} />
          <Lightformer form="rect" intensity={1.3} color="#ffffff" position={[0, -5, 2]} scale={[4, 1.2]} />
        </group>
      </Environment>
    </>
  );
}

/* Error boundary: any WebGL/parse failure degrades to the 2D visual */
class GLBoundary extends React.Component {
  constructor(p) {
    super(p);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <FallbackTooth /> : this.props.children;
  }
}

/* ---------- Loading gate: 2D fallback until the model resolves ---------- */
function Gate({ ready, progress }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (ready) {
      const id = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(id);
    }
  }, [ready]);
  return (
    <>
      {(!ready || visible) && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`}
          aria-hidden={ready}
        >
          <FallbackTooth />
          <p className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold tracking-[0.25em] text-brand-deep/50">
            {progress}% — CERAMIC STUDIO
          </p>
        </div>
      )}
    </>
  );
}

/* ---------- Public component ---------- */
export default function ToothScene({ className = "" }) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  /* Respect prefers-reduced-motion: skip WebGL entirely */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);

  /* Pause the render loop when the hero scrolls off-screen */
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  /* Real asset-streaming progress for the loading gate label */
  useEffect(() => useProgress.subscribe((s) => setProgress(Math.round(s.progress))), []);

  if (reduced) return <div ref={wrap} className={className}><FallbackTooth /></div>;

  return (
    <div ref={wrap} className={`relative ${className}`} aria-hidden="true">
      <GLBoundary>
        <Canvas
          frameloop={visible ? "always" : "never"}
          dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.75)}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
          onCreated={({ gl }) => {
            gl.toneMappingExposure = 1.05;
          }}
        >
          {/* 33mm-flattering product lens, slight elevated three-quarter */}
          <PerspectiveCamera makeDefault position={[0, 1.2, 7]} fov={33} near={0.1} far={30} onUpdate={(c) => c.lookAt(0, 0.05, 0)} />
          <Suspense fallback={null}>
            <Lights />
            <Rig onReady={() => setReady(true)} />
            <ContactShadows position={[0, -1.45, 0]} opacity={0.22} scale={8} blur={2.8} far={3.2} color="#05668d" frames={1} />
          </Suspense>
        </Canvas>
      </GLBoundary>
      <Gate ready={ready} progress={progress} />
    </div>
  );
}
