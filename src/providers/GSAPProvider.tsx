'use client';

import { useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register at module level so ScrollTrigger is available before any useEffect fires
gsap.registerPlugin(ScrollTrigger);

export function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
