'use client';

// -----------------------------------------------------------------------------
// useReducedMotion – Accessibility preference detection
// -----------------------------------------------------------------------------
// Detects the `prefers-reduced-motion: reduce` media query and reactively
// updates when the user toggles their system setting. SSR-safe.

import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Returns `true` when the user has enabled reduced-motion at the OS level.
 * Defaults to `false` during SSR and before the media query is evaluated.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
