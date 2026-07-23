'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';

const CHAPTER_LIGHT_COLORS = [
  new THREE.Color('#fff5e0'), // Foundation - warm sunrise
  new THREE.Color('#e8eef5'), // Enterprise - cool daylight
  new THREE.Color('#d0d8ff'), // AI Lab - electric cool
  new THREE.Color('#fff0d0'), // Cloud - warm golden
];

export function Lighting() {
  const { chapterIndex, chapterLocalProgress } = useJourneyProgress();
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    if (!dirLightRef.current) return;
    const idx = Math.max(0, Math.min(chapterIndex, 3));
    const nextIdx = Math.min(idx + 1, 3);
    const target = new THREE.Color().lerpColors(
      CHAPTER_LIGHT_COLORS[idx],
      CHAPTER_LIGHT_COLORS[nextIdx],
      chapterLocalProgress
    );
    dirLightRef.current.color.lerp(target, 0.05);
  });

  return (
    <>
      <directionalLight
        ref={dirLightRef}
        color="#fff5e0"
        intensity={1.2}
        position={[5, 8, 3]}
      />
      <ambientLight color="#8090b0" intensity={0.3} />
      <hemisphereLight
        color="#1a1a2e"
        groundColor="#0a0a0f"
        intensity={0.5}
      />
    </>
  );
}
