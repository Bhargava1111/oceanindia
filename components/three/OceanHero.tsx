"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Subtle 3D wave field: a plane of points displaced by layered sines,
 * tinted aqua→violet. Lightweight (no drei, no post-processing).
 */
function WaveField({ dark }: { dark: boolean }) {
  const ref = React.useRef<THREE.Points>(null);
  const COUNT_X = 90, COUNT_Y = 45;
  const { positions, colors } = React.useMemo(() => {
    const pos = new Float32Array(COUNT_X * COUNT_Y * 3);
    const col = new Float32Array(COUNT_X * COUNT_Y * 3);
    const a = new THREE.Color("#22D3EE"), b = new THREE.Color("#8B5CF6"), c = new THREE.Color("#2DD4BF");
    let i = 0;
    for (let y = 0; y < COUNT_Y; y++) {
      for (let x = 0; x < COUNT_X; x++) {
        pos[i * 3] = (x / COUNT_X - 0.5) * 16;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = (y / COUNT_Y - 0.5) * 8;
        const t = x / COUNT_X;
        const mixed = t < 0.5 ? a.clone().lerp(c, t * 2) : c.clone().lerp(b, (t - 0.5) * 2);
        col[i * 3] = mixed.r; col[i * 3 + 1] = mixed.g; col[i * 3 + 2] = mixed.b;
        i++;
      }
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock, pointer }) => {
    const pts = ref.current; if (!pts) return;
    const t = clock.getElapsedTime();
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i], z = arr[i + 2];
      arr[i + 1] = Math.sin(x * 0.6 + t * 0.9) * 0.35 + Math.cos(z * 0.9 + t * 0.6) * 0.25 + Math.sin((x + z) * 0.4 + t * 0.4) * 0.2;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    pts.rotation.z = THREE.MathUtils.lerp(pts.rotation.z, pointer.x * 0.05, 0.05);
    pts.rotation.x = THREE.MathUtils.lerp(pts.rotation.x, -0.9 + pointer.y * 0.05, 0.05);
  });

  return (
    <points ref={ref} rotation={[-0.9, 0, 0]} position={[1.5, -1.6, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} vertexColors transparent opacity={dark ? 0.55 : 0.4} sizeAttenuation depthWrite={false} blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending} />
    </points>
  );
}

export default function OceanHero({ dark = true }: { dark?: boolean }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2.2, 6], fov: 55 }} gl={{ antialias: false, alpha: true, powerPreference: "low-power" }} style={{ position: "absolute", inset: 0 }} aria-hidden>
      <WaveField dark={dark} />
    </Canvas>
  );
}
