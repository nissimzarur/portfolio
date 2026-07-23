'use client';

import { Component, Suspense, type ReactNode } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';
import { Camera } from './Camera';
import { Lighting } from './Lighting';
import { AtmosphericBackground } from './AtmosphericBackground';
import { DepthParticles } from './DepthParticles';
import { GroundPlane } from './GroundPlane';

/** Triggers re-render when journey progress changes */
function SceneInvalidator() {
  const { progress } = useJourneyProgress();
  const { invalidate } = useThree();

  // Invalidate on each progress change to trigger demand render
  if (progress !== undefined) {
    invalidate();
  }

  return null;
}

function SceneContent() {
  return (
    <>
      <SceneInvalidator />
      <Camera />
      <Lighting />
      <AtmosphericBackground />
      <DepthParticles />
      <GroundPlane />
      <Preload all />
    </>
  );
}

class WebGLErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null; // Silently fail - CSS fallback handles the background
    }
    return this.props.children;
  }
}

export default function Scene() {
  return (
    <WebGLErrorBoundary>
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 2, 8] }}
        frameloop="demand"
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}
