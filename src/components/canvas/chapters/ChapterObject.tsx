'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { WireframeGlobe } from './WireframeGlobe';
import { DataGrid } from './DataGrid';
import { NeuralNetwork } from './NeuralNetwork';
import { DNAHelix } from './DNAHelix';

export function ChapterObject() {
  const { chapterIndex, chapterLocalProgress } = useJourneyProgress();
  const reducedMotion = useReducedMotion();
  const groupRef = useRef<THREE.Group>(null);

  // Gentle floating animation
  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  // Calculate opacity for each chapter object (crossfade)
  const getOpacity = (targetChapter: number): number => {
    if (chapterIndex < 0) return targetChapter === 0 ? 0.3 : 0;
    if (chapterIndex === targetChapter) {
      return 1;
    }
    // Crossfade: incoming chapter fades in near end of previous chapter
    if (chapterIndex === targetChapter - 1 && chapterLocalProgress > 0.7) {
      return (chapterLocalProgress - 0.7) / 0.3;
    }
    // Crossfade: outgoing chapter fades out at start of next chapter
    if (chapterIndex === targetChapter + 1 && chapterLocalProgress < 0.3) {
      return 1 - chapterLocalProgress / 0.3;
    }
    return 0;
  };

  return (
    <group ref={groupRef} position={[0, 1.5, 0]}>
      <WireframeGlobe opacity={getOpacity(0)} />
      <DataGrid opacity={getOpacity(1)} />
      <NeuralNetwork opacity={getOpacity(2)} />
      <DNAHelix opacity={getOpacity(3)} />
    </group>
  );
}
