'use client';

import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const bar = barRef.current;

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        bar.style.transform = `scaleX(${progress})`;
        // Fade out at extremes
        bar.style.opacity = progress < 0.01 || progress > 0.99 ? '0' : '1';
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left pointer-events-none"
      style={{
        background: 'linear-gradient(to right, #E8A845, #F0B855)',
        transform: 'scaleX(0)',
        boxShadow: '0 0 8px rgba(232, 168, 69, 0.4)',
        transition: 'opacity 0.3s',
      }}
      aria-hidden="true"
    />
  );
}
