'use client';

import { type ReactNode } from 'react';

interface SectionContainerProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function SectionContainer({ id, children, className = '' }: SectionContainerProps) {
  return (
    <section
      id={id}
      className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 ${className}`}
    >
      {children}
    </section>
  );
}
