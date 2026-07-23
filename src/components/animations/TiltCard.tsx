'use client';

import { useRef, useCallback, type ReactNode } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(ref.current, {
        rotateY: x * maxTilt,
        rotateX: -y * maxTilt,
        transformPerspective: 800,
        duration: 0.3,
        ease: 'power2.out',
      });
    },
    [reducedMotion, maxTilt]
  );

  const onMouseLeave = useCallback(() => {
    if (reducedMotion || !ref.current) return;
    gsap.to(ref.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
