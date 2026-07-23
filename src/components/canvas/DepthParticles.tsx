'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const DUST_COUNT = 120;

export function DepthParticles() {
  const { chapterIndex } = useJourneyProgress();
  const reducedMotion = useReducedMotion();
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, offsets } = useMemo(() => {
    const pos = new Float32Array(DUST_COUNT * 3);
    const off = new Float32Array(DUST_COUNT);
    for (let i = 0; i < DUST_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;     // x
      pos[i * 3 + 1] = Math.random() * 8 - 2;       // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;  // z
      off[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, offsets: off };
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion || !pointsRef.current) return;

    timeRef.current += delta * 0.3;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < DUST_COUNT; i++) {
      const offset = offsets[i];
      // Gentle floating motion
      arr[i * 3] += Math.sin(timeRef.current + offset) * 0.001;
      arr[i * 3 + 1] += Math.cos(timeRef.current * 0.7 + offset) * 0.0008;
      arr[i * 3 + 2] += Math.sin(timeRef.current * 0.5 + offset * 2) * 0.0005;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={DUST_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        color={chapterIndex >= 2 ? '#5B9BD5' : '#E8A845'}
        size={0.04}
        transparent
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
