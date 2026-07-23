'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface DataGridProps {
  opacity: number;
}

export function DataGrid({ opacity }: DataGridProps) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const timeRef = useRef(0);

  const { nodes, edgeObjects } = useMemo(() => {
    const n: THREE.Vector3[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          n.push(new THREE.Vector3(x * 0.8, y * 0.8, z * 0.8));
        }
      }
    }

    // Connect adjacent nodes
    const edges: [number, number][] = [];
    for (let i = 0; i < n.length; i++) {
      for (let j = i + 1; j < n.length; j++) {
        if (n[i].distanceTo(n[j]) < 1.0) {
          edges.push([i, j]);
        }
      }
    }

    // Pre-build THREE.Line objects to avoid JSX <line> type conflict
    const material = new THREE.LineBasicMaterial({
      color: '#5B9BD5',
      transparent: true,
    });

    const lineObjects = edges.map(([a, b]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([n[a], n[b]]);
      return new THREE.Line(geo, material.clone());
    });

    return { nodes: n, edgeObjects: lineObjects };
  }, []);

  // Update edge material opacity when opacity prop changes
  useMemo(() => {
    edgeObjects.forEach((line) => {
      (line.material as THREE.LineBasicMaterial).opacity = opacity * 0.3;
    });
  }, [edgeObjects, opacity]);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    timeRef.current += delta;
    groupRef.current.rotation.y = Math.sin(timeRef.current * 0.2) * 0.1;
    groupRef.current.rotation.x = Math.cos(timeRef.current * 0.15) * 0.05;
  });

  if (opacity <= 0) return null;

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshBasicMaterial
            color="#5B9BD5"
            transparent
            opacity={opacity * 0.8}
          />
        </mesh>
      ))}
      {edgeObjects.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}
    </group>
  );
}
