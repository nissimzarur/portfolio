'use client';

import { Grid } from '@react-three/drei';

export function GroundPlane() {
  return (
    <Grid
      args={[50, 50]}
      position={[0, -1, 0]}
      cellColor="#1a1a24"
      sectionColor="#2a2a38"
      cellSize={1}
      sectionSize={5}
      fadeDistance={25}
      fadeStrength={1}
      infiniteGrid
    />
  );
}
