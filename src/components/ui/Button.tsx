'use client';

import { type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-amber text-deep font-semibold hover:bg-amber-hover hover:shadow-glow active:scale-[0.98]',
  secondary:
    'border border-amber text-amber hover:bg-amber/10 active:scale-[0.98]',
  ghost:
    'text-secondary hover:text-primary hover:bg-elevated active:scale-[0.98]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-[48px]',
  md: 'px-6 py-3 text-base min-h-[48px]',
  lg: 'px-8 py-4 text-lg min-h-[48px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  href,
  onClick,
  type = 'button',
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center rounded-lg font-body transition-all duration-200 cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-deep',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(' ');

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
