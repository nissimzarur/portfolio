'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const DUST_COUNT = 200;

export function DepthParticles() {
  const { chapterIndex } = useJourneyProgress();
  const reducedMotion = useReducedMotion();
  const pointsRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const { positions, offsets, sizes } = useMemo(() => {
    const pos = new Float32Array(DUST_COUNT * 3);
    const off = new Float32Array(DUST_COUNT);
    const sz = new Float32Array(DUST_COUNT);
    for (let i = 0; i < DUST_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 10 - 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      off[i] = Math.random() * Math.PI * 2;
      sz[i] = 0.02 + Math.random() * 0.04;
    }
    return { positions: pos, offsets: off, sizes: sz };
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion || !pointsRef.current) return;

    timeRef.current += delta * 0.3;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    const mx = mouseRef.current.x * 0.3;
    const my = mouseRef.current.y * 0.3;

    for (let i = 0; i < DUST_COUNT; i++) {
      const offset = offsets[i];
      arr[i * 3] += Math.sin(timeRef.current + offset) * 0.001 + mx * 0.0002;
      arr[i * 3 + 1] += Math.cos(timeRef.current * 0.7 + offset) * 0.0008 + my * 0.0002;
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
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={DUST_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        color={chapterIndex >= 2 ? '#5B9BD5' : '#E8A845'}
        size={0.04}
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
