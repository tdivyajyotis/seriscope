'use client';

import { Environment } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type LensPlaneProps = {
  position: [number, number, number];
  radius: number;
  tone: string;
  accent?: boolean;
  rotation?: [number, number, number];
};

function LensPlane({
  position,
  radius,
  tone,
  accent = false,
  rotation = [0, 0, 0],
}: LensPlaneProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <circleGeometry args={[radius, 80]} />
        <meshPhysicalMaterial
          color={tone}
          transmission={0.72}
          thickness={0.2}
          roughness={0.22}
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, 0, 0.025]}>
        <torusGeometry args={[radius, radius * 0.025, 20, 100]} />
        <meshStandardMaterial
          color="#aeb4af"
          metalness={0.9}
          roughness={0.24}
          transparent
          opacity={0.42}
          depthWrite={false}
        />
      </mesh>
      {accent && (
        <mesh position={[0, 0, 0.04]}>
          <torusGeometry args={[radius * 0.72, radius * 0.012, 16, 90]} />
          <meshBasicMaterial
            color="#b8ff63"
            transparent
            opacity={0.38}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

function OpticalField({ pointer }: { pointer: [number, number] }) {
  const group = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useEffect(() => {
    if (!group.current) return;
    group.current.rotation.x = -0.12 + pointer[1] * 0.025;
    group.current.rotation.y = -0.18 + pointer[0] * 0.04;
    group.current.position.x = 1.35 + pointer[0] * 0.05;
    group.current.position.y = 0.08 + pointer[1] * 0.04;
    invalidate();
  }, [pointer, invalidate]);

  return (
    <group
      ref={group}
      position={[1.35, 0.08, 0]}
      rotation={[-0.12, -0.18, 0.04]}
    >
      <mesh position={[-0.25, 0, -0.62]} rotation={[0.08, -0.2, 0.36]}>
        <boxGeometry args={[3.8, 2.8, 0.025]} />
        <meshPhysicalMaterial
          color="#707872"
          transmission={0.35}
          metalness={0.25}
          roughness={0.38}
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>

      <LensPlane
        position={[0.15, -0.45, -0.35]}
        radius={0.96}
        tone="#59615b"
        rotation={[0.05, -0.1, 0]}
        accent
      />
      <LensPlane
        position={[-1.3, 0.62, -0.08]}
        radius={0.5}
        tone="#79827c"
        rotation={[-0.08, 0.2, 0]}
      />
      <LensPlane
        position={[1.2, 0.82, 0.12]}
        radius={0.34}
        tone="#495149"
        rotation={[0.12, -0.18, 0]}
      />

      <pointLight
        position={[0.1, -0.35, 1.1]}
        color="#b8ff63"
        intensity={4.5}
        distance={4}
      />
    </group>
  );
}

export default function HeroScene() {
  const [enabled, setEnabled] = useState(false);
  const [pointer, setPointer] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const media = window.matchMedia(
      '(min-width: 860px) and (prefers-reduced-motion: no-preference)',
    );
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="hero-canvas"
      aria-hidden="true"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setPointer([
          ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
          ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
        ]);
      }}
      onPointerLeave={() => setPointer([0, 0])}
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 6.8], fov: 42 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.28} />
        <directionalLight
          position={[-3, 5, 5]}
          color="#f1efe4"
          intensity={1.6}
        />
        <OpticalField pointer={pointer} />
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  );
}
