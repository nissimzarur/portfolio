'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const KEYFRAMES = [
  { position: new THREE.Vector3(0, 1.5, 8), lookAt: new THREE.Vector3(0, 0, 0) },
  { position: new THREE.Vector3(1, 2, 7), lookAt: new THREE.Vector3(0, 0.5, 0) },
  { position: new THREE.Vector3(-0.5, 3, 6), lookAt: new THREE.Vector3(0, 1, 0) },
  { position: new THREE.Vector3(0, 4, 7), lookAt: new THREE.Vector3(0, 2, 0) },
];

export function Camera() {
  const { chapterIndex, chapterLocalProgress } = useJourneyProgress();
  const reducedMotion = useReducedMotion();
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 2, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const idx = Math.max(0, Math.min(chapterIndex, KEYFRAMES.length - 1));
    const nextIdx = Math.min(idx + 1, KEYFRAMES.length - 1);
    const t = chapterLocalProgress;

    // Interpolate between current and next chapter keyframes
    targetPos.current.lerpVectors(
      KEYFRAMES[idx].position,
      KEYFRAMES[nextIdx].position,
      t
    );
    targetLookAt.current.lerpVectors(
      KEYFRAMES[idx].lookAt,
      KEYFRAMES[nextIdx].lookAt,
      t
    );

    const lerpFactor = reducedMotion ? 1 : 0.03;

    camera.position.lerp(targetPos.current, lerpFactor);
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
