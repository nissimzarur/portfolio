'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface WireframeGlobeProps {
  opacity: number;
}

export function WireframeGlobe({ opacity }: WireframeGlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  const pinPositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < 12; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.52;
      positions.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.15;
  });

  if (opacity <= 0) return null;

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial
          color="#E8A845"
          wireframe
          transparent
          opacity={opacity * 0.6}
        />
      </mesh>
      {pinPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial
            color="#5B9BD5"
            transparent
            opacity={opacity}
          />
        </mesh>
      ))}
    </group>
  );
}
