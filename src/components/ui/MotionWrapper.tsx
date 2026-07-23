'use client';

import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right';

export interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  once?: boolean;
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: -20 },
  right: { x: 20 },
};

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MotionWrapper({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}: MotionWrapperProps) {
  const shouldReduceMotion = useReducedMotion();

  const offset = offsets[direction];

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...offset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: customEase,
        delay,
      }}
      viewport={{ once, margin: '-50px' }}
    >
      {children}
    </motion.div>
  );
}

