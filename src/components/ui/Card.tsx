'use client';

import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  const classes = [
    'bg-surface border border-subtle rounded-lg shadow-card p-6',
    hover && 'hover:border-amber/30 hover:shadow-elevated transition-all duration-300',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
}
