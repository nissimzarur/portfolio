'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';

const BG_COLORS = [
  new THREE.Color('#0d0815'), // Foundation
  new THREE.Color('#0a1018'), // Enterprise
  new THREE.Color('#080c1a'), // AI Lab
  new THREE.Color('#0f0c18'), // Cloud
];

const FOG_COLORS = [
  new THREE.Color('#1a1025'),
  new THREE.Color('#0f1520'),
  new THREE.Color('#0a1020'),
  new THREE.Color('#151020'),
];

export function AtmosphericBackground() {
  const { chapterIndex, chapterLocalProgress } = useJourneyProgress();
  const { scene } = useThree();
  const targetBg = useRef(new THREE.Color('#0d0815'));
  const targetFog = useRef(new THREE.Color('#1a1025'));

  useFrame(() => {
    const idx = Math.max(0, Math.min(chapterIndex, 3));
    const nextIdx = Math.min(idx + 1, 3);
    const t = chapterLocalProgress;

    targetBg.current.lerpColors(BG_COLORS[idx], BG_COLORS[nextIdx], t);
    targetFog.current.lerpColors(FOG_COLORS[idx], FOG_COLORS[nextIdx], t);

    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(targetBg.current, 0.03);
    } else {
      scene.background = targetBg.current.clone();
    }

    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.color.lerp(targetFog.current, 0.03);
    } else {
      scene.fog = new THREE.FogExp2(targetFog.current.getHex(), 0.02);
    }
  });

  return null;
}
