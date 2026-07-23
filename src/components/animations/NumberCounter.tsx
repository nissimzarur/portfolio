'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface NumberCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function NumberCounter({
  value,
  prefix = '',
  suffix = '',
  className = '',
  duration = 1.5,
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;

    if (reducedMotion) {
      ref.current.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    ref.current.textContent = `${prefix}0${suffix}`;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      snap: { val: 1 },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        once: true,
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [value, prefix, suffix, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}{reducedMotion ? value : 0}{suffix}
    </span>
  );
}
