'use client';

import { type ReactNode } from 'react';

type BadgeVariant = 'default' | 'amber' | 'blue';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  title?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-elevated text-secondary border border-subtle',
  amber: 'bg-amber/10 text-amber border border-amber/20',
  blue: 'bg-blue/10 text-blue border border-blue/20',
};

export function Badge({
  children,
  variant = 'default',
  className = '',
  title,
}: BadgeProps) {
  return (
    <span
      title={title}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium font-body ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

