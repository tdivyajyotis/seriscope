'use client';

import { Environment } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const specimenPoints: Array<[number, number, number, number]> = [
  [-0.72, 0.42, 0.2, 0.08],
  [-0.38, -0.28, 0.18, 0.055],
  [0.12, 0.62, 0.16, 0.07],
  [0.48, 0.2, 0.2, 0.045],
  [0.64, -0.46, 0.19, 0.075],
  [-0.08, -0.66, 0.17, 0.052],
  [0.02, 0.06, 0.24, 0.095],
];

function MetallicRing({
  radius,
  tube,
  z,
  tone = '#8f9690',
}: {
  radius: number;
  tube: number;
  z: number;
  tone?: string;
}) {
  return (
    <mesh position={[0, 0, z]}>
      <torusGeometry args={[radius, tube, 32, 120]} />
      <meshStandardMaterial color={tone} metalness={0.96} roughness={0.16} />
    </mesh>
  );
}

function OpticalAssembly({ pointer }: { pointer: [number, number] }) {
  const group = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useEffect(() => {
    if (!group.current) return;
    group.current.rotation.x = -0.08 + pointer[1] * 0.07;
    group.current.rotation.y = -0.22 + pointer[0] * 0.13;
    group.current.position.y = pointer[1] * 0.08;
    invalidate();
  }, [pointer, invalidate]);

  return (
    <group ref={group} position={[0.75, 0.02, 0]} rotation={[-0.08, -0.22, 0]}>
      <mesh position={[0, 0, -0.72]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.78, 1.92, 0.82, 96, 1, true]} />
        <meshStandardMaterial
          color="#555b57"
          metalness={0.98}
          roughness={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>
      <MetallicRing radius={1.78} tube={0.19} z={-0.3} tone="#9ba09b" />
      <MetallicRing radius={1.53} tube={0.065} z={-0.08} tone="#d4d7d2" />
      <MetallicRing radius={1.3} tube={0.05} z={0.03} tone="#6a716c" />

      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.47, 1.47, 0.08, 96]} />
        <meshPhysicalMaterial
          color="#aab3ad"
          transmission={0.86}
          thickness={0.72}
          roughness={0.07}
          metalness={0.08}
          transparent
          opacity={0.72}
        />
      </mesh>

      <mesh position={[0, 0, 0.12]}>
        <circleGeometry args={[1.12, 96]} />
        <meshPhysicalMaterial
          color="#16261a"
          transmission={0.68}
          thickness={0.36}
          roughness={0.18}
          transparent
          opacity={0.58}
        />
      </mesh>

      <mesh position={[0, 0, 0.18]}>
        <ringGeometry args={[0.28, 0.34, 96]} />
        <meshBasicMaterial
          color="#b8ff63"
          transparent
          opacity={0.96}
          side={THREE.DoubleSide}
        />
      </mesh>

      {specimenPoints.map(([x, y, z, radius], index) => (
        <mesh key={index} position={[x, y, z]}>
          <sphereGeometry args={[radius, 24, 24]} />
          <meshStandardMaterial
            color="#c6ff7a"
            emissive="#a6ff4d"
            emissiveIntensity={1.4}
            roughness={0.24}
          />
        </mesh>
      ))}

      <mesh position={[0, 0, -0.02]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[3.55, 3.55, 0.025]} />
        <meshPhysicalMaterial
          color="#252a27"
          transmission={0.16}
          metalness={0.38}
          roughness={0.32}
          transparent
          opacity={0.2}
        />
      </mesh>

      <pointLight
        position={[0, 0, 1.7]}
        color="#b8ff63"
        intensity={22}
        distance={6}
      />
      <spotLight
        position={[-3, 4, 5]}
        color="#f2f4ef"
        intensity={14}
        angle={0.48}
        penumbra={0.7}
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
        dpr={[1, 1.35]}
        camera={{ position: [0, 0, 6.2], fov: 40 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.48} />
        <directionalLight
          position={[-3, 5, 5]}
          color="#ffffff"
          intensity={3.2}
        />
        <OpticalAssembly pointer={pointer} />
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  );
}
