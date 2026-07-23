'use client';

// -----------------------------------------------------------------------------
// useWebGLSupport – WebGL2 capability detection
// -----------------------------------------------------------------------------
// Runs a one-time check on mount to determine whether the current browser /
// device supports WebGL2. Used to conditionally render the 3D journey scene
// or fall back to a static alternative. SSR-safe.

import { useEffect, useState } from 'react';

export interface WebGLSupportState {
  /** Whether WebGL2 is supported in this browser. */
  supported: boolean;
  /** Whether the detection has finished (false during SSR / before mount). */
  checked: boolean;
}

/**
 * Detect WebGL2 support by attempting to acquire a context from an offscreen
 * canvas element. The check runs once on mount; the canvas is immediately
 * discarded afterwards.
 */
export function useWebGLSupport(): WebGLSupportState {
  const [state, setState] = useState<WebGLSupportState>({
    supported: false,
    checked: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let supported = false;

    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      supported = gl !== null;

      // Release the context immediately
      if (gl && 'getExtension' in gl) {
        const loseCtx = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context');
        loseCtx?.loseContext();
      }
    } catch {
      supported = false;
    }

    setState({ supported, checked: true });
  }, []);

  return state;
}
