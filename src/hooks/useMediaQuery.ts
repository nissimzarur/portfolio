'use client';

// -----------------------------------------------------------------------------
// useMediaQuery – Generic media-query hook
// -----------------------------------------------------------------------------
// Accepts any valid CSS media query string and returns a boolean indicating
// whether the query currently matches. SSR-safe (defaults to false).

import { useEffect, useState } from 'react';

/**
 * Subscribe to a CSS media query and return whether it currently matches.
 *
 * @param query - A valid CSS media query string, e.g. "(min-width: 768px)"
 * @returns `true` if the media query matches, `false` otherwise (or during SSR).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);

    // Set initial value
    setMatches(mql.matches);

    function onChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    // Modern browsers
    mql.addEventListener('change', onChange);

    return () => {
      mql.removeEventListener('change', onChange);
    };
  }, [query]);

  return matches;
}
