'use client';

import { useRef, useCallback, type ReactNode } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticElement({
  children,
  className = '',
  strength = 4,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const maxOffset = strength;
      const dx = (x / rect.width) * maxOffset * 2;
      const dy = (y / rect.height) * maxOffset * 2;
      gsap.to(ref.current, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    },
    [reducedMotion, strength]
  );

  const onMouseLeave = useCallback(() => {
    if (reducedMotion || !ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
