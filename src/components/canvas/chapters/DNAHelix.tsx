'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface DNAHelixProps {
  opacity: number;
}

export function DNAHelix({ opacity }: DNAHelixProps) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  const { curveA, curveB, basePairObjects } = useMemo(() => {
    const strandA: THREE.Vector3[] = [];
    const strandB: THREE.Vector3[] = [];
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    const segments = 40;
    const height = 3;
    const radius = 0.6;

    for (let i = 0; i < segments; i++) {
      const t = i / segments;
      const y = (t - 0.5) * height;
      const angle = t * Math.PI * 4;

      const posA = new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
      const posB = new THREE.Vector3(
        Math.cos(angle + Math.PI) * radius,
        y,
        Math.sin(angle + Math.PI) * radius
      );

      strandA.push(posA);
      strandB.push(posB);

      // Base pairs every 4 segments
      if (i % 4 === 0) {
        pairs.push([posA.clone(), posB.clone()]);
      }
    }

    // Build base pair line objects to avoid JSX <line> type conflict
    const bpMaterial = new THREE.LineBasicMaterial({
      color: '#ffffff',
      transparent: true,
    });

    const basePairLines = pairs.map(([pa, pb]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([pa, pb]);
      return new THREE.Line(geo, bpMaterial.clone());
    });

    return {
      curveA: new THREE.CatmullRomCurve3(strandA),
      curveB: new THREE.CatmullRomCurve3(strandB),
      basePairObjects: basePairLines,
    };
  }, []);

  // Update base pair material opacity when opacity prop changes
  useMemo(() => {
    basePairObjects.forEach((line) => {
      (line.material as THREE.LineBasicMaterial).opacity = opacity * 0.3;
    });
  }, [basePairObjects, opacity]);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.2;
  });

  if (opacity <= 0) return null;

  return (
    <group ref={groupRef}>
      {/* Strand A */}
      <mesh>
        <tubeGeometry args={[curveA, 64, 0.03, 8, false]} />
        <meshBasicMaterial color="#E8A845" transparent opacity={opacity * 0.8} />
      </mesh>
      {/* Strand B */}
      <mesh>
        <tubeGeometry args={[curveB, 64, 0.03, 8, false]} />
        <meshBasicMaterial color="#5B9BD5" transparent opacity={opacity * 0.8} />
      </mesh>
      {/* Base pairs */}
      {basePairObjects.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}
    </group>
  );
}
