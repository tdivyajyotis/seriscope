'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function Fiber({ offset, tint }: { offset: number; tint: string }) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-3.8, -1.1 + offset, 0),
        new THREE.Vector3(-1.8, .4 + offset, .2),
        new THREE.Vector3(.2, -.2 + offset, .5),
        new THREE.Vector3(2.1, .8 + offset, .15),
        new THREE.Vector3(4, -.15 + offset, 0),
      ]),
    [offset],
  );

  return (
    <mesh>
      <tubeGeometry args={[curve, 80, .022, 8, false]} />
      <meshStandardMaterial color={tint} emissive={tint} emissiveIntensity={.22} roughness={.28} />
    </mesh>
  );
}

function OpticAssembly({ pointer }: { pointer: [number, number] }) {
  const group = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useEffect(() => {
    if (!group.current) return;
    group.current.rotation.x = -.12 + pointer[1] * .08;
    group.current.rotation.y = -.2 + pointer[0] * .14;
    invalidate();
  }, [pointer, invalidate]);

  return (
    <group ref={group} position={[1.4, .05, 0]} rotation={[-.12, -.2, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, .15, 28, 100]} />
        <meshStandardMaterial color="#b7af9b" metalness={.92} roughness={.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.45, 1.45, .06, 80]} />
        <meshPhysicalMaterial color="#dceee1" transmission={.92} thickness={.55} roughness={.08} transparent opacity={.55} />
      </mesh>
      <mesh position={[0, 0, -.7]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[.34, .39, 64]} />
        <meshBasicMaterial color="#8ce0a8" transparent opacity={.8} side={THREE.DoubleSide} />
      </mesh>
      <Fiber offset={-.5} tint="#d9f8e2" />
      <Fiber offset={.12} tint="#8ce0a8" />
      <Fiber offset={.62} tint="#c7bda6" />
      <pointLight position={[0, 1.2, 2]} color="#aef4c2" intensity={30} distance={7} />
    </group>
  );
}

export default function HeroScene() {
  const [enabled, setEnabled] = useState(false);
  const [pointer, setPointer] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 860px) and (prefers-reduced-motion: no-preference)');
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
        setPointer([((event.clientX - bounds.left) / bounds.width - .5) * 2, ((event.clientY - bounds.top) / bounds.height - .5) * 2]);
      }}
    >
      <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 42 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
        <ambientLight intensity={.65} />
        <directionalLight position={[-2, 4, 4]} color="#ffffff" intensity={3} />
        <OpticAssembly pointer={pointer} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
