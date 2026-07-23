'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface NeuralNetworkProps {
  opacity: number;
}

export function NeuralNetwork({ opacity }: NeuralNetworkProps) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const timeRef = useRef(0);

  const { nodePositions, connectionObjects } = useMemo(() => {
    // 4 layers: 3, 5, 5, 2 nodes
    const layerSizes = [3, 5, 5, 2];
    const spacing = 1.0;
    const allNodes: THREE.Vector3[] = [];
    const layerIndices: number[][] = [];

    layerSizes.forEach((size, li) => {
      const indices: number[] = [];
      const x = (li - (layerSizes.length - 1) / 2) * spacing;
      for (let ni = 0; ni < size; ni++) {
        const y = (ni - (size - 1) / 2) * 0.5;
        indices.push(allNodes.length);
        allNodes.push(new THREE.Vector3(x, y, 0));
      }
      layerIndices.push(indices);
    });

    // Connect adjacent layers — build THREE.Line objects to avoid JSX type conflict
    const material = new THREE.LineBasicMaterial({
      color: '#5B9BD5',
      transparent: true,
    });

    const lineObjects: THREE.Line[] = [];
    for (let li = 0; li < layerIndices.length - 1; li++) {
      for (const a of layerIndices[li]) {
        for (const b of layerIndices[li + 1]) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            allNodes[a],
            allNodes[b],
          ]);
          lineObjects.push(new THREE.Line(geo, material.clone()));
        }
      }
    }

    return { nodePositions: allNodes, connectionObjects: lineObjects };
  }, []);

  // Update connection material opacity when opacity prop changes
  useMemo(() => {
    connectionObjects.forEach((line) => {
      (line.material as THREE.LineBasicMaterial).opacity = opacity * 0.2;
    });
  }, [connectionObjects, opacity]);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    timeRef.current += delta;
    groupRef.current.rotation.y = Math.sin(timeRef.current * 0.3) * 0.15;
  });

  if (opacity <= 0) return null;

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial
            color="#E8A845"
            transparent
            opacity={opacity}
          />
        </mesh>
      ))}
      {connectionObjects.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}
    </group>
  );
}
