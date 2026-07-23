'use client';

// -----------------------------------------------------------------------------
// useJourneyProgress – Master scroll-progress hook
// -----------------------------------------------------------------------------
// Converts the user's scroll position into a normalised 0-1 progress value and
// derives which career chapter is active. Drives the SVG road drawing, 3D
// camera movement, and URL-hash deep-linking.

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CHAPTER_THRESHOLDS,
  CHAPTER_IDS,
  CHAPTER_COUNT,
} from '@/config/journey';

export interface JourneyProgressState {
  /** Overall scroll progress normalised to 0-1. */
  progress: number;
  /** Zero-based index of the currently active chapter (0-3), or -1 if outside chapter range. */
  chapterIndex: number;
  /** Progress within the current chapter, normalised to 0-1. */
  chapterLocalProgress: number;
  /** String identifier of the active chapter (e.g. "kinneret"), or empty string if none. */
  activeChapterId: string;
  /** Smoothly scrolls to the given chapter index (0-3). */
  scrollToChapter: (index: number) => void;
}

/**
 * Clamp a number between min and max.
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Determine which chapter index corresponds to a given progress value.
 * Returns -1 when progress falls outside any chapter range.
 */
function progressToChapterIndex(progress: number): number {
  for (let i = 0; i < CHAPTER_COUNT; i++) {
    const { start, end } = CHAPTER_THRESHOLDS[i];
    if (progress >= start && progress < end) return i;
  }
  // Edge case: progress exactly at the last chapter's end boundary
  const last = CHAPTER_THRESHOLDS[CHAPTER_COUNT - 1];
  if (progress >= last.end) return -1;
  return -1;
}

/**
 * Compute local (0-1) progress within a chapter.
 */
function chapterLocalProgress(progress: number, chapterIdx: number): number {
  if (chapterIdx < 0 || chapterIdx >= CHAPTER_COUNT) return 0;
  const { start, end } = CHAPTER_THRESHOLDS[chapterIdx];
  const range = end - start;
  if (range === 0) return 0;
  return clamp((progress - start) / range, 0, 1);
}

/**
 * Convert a chapter index (0-3) to a target scroll position (as fraction 0-1).
 * Scrolls to the *start* of the chapter.
 */
function chapterIndexToScrollFraction(index: number): number {
  const clamped = clamp(index, 0, CHAPTER_COUNT - 1);
  return CHAPTER_THRESHOLDS[clamped].start;
}

export function useJourneyProgress(): JourneyProgressState {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number>(0);
  const isScrollingToChapter = useRef(false);

  // ---- Scroll -> Progress ----
  useEffect(() => {
    function updateProgress() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const raw = docHeight > 0 ? scrollY / docHeight : 0;
      setProgress(clamp(raw, 0, 1));
      rafId.current = 0;
    }

    function onScroll() {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(updateProgress);
    }

    // Initial calculation
    updateProgress();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // ---- Derived state ----
  const chapterIdx = progressToChapterIndex(progress);
  const localProgress = chapterLocalProgress(progress, chapterIdx);
  const activeId = chapterIdx >= 0 ? CHAPTER_IDS[chapterIdx] : '';

  // ---- Hash sync ----
  const prevChapterId = useRef(activeId);

  useEffect(() => {
    if (isScrollingToChapter.current) return;
    if (activeId === prevChapterId.current) return;
    prevChapterId.current = activeId;

    if (activeId) {
      // Replace hash without triggering a scroll
      window.history.replaceState(null, '', `#${activeId}`);
    } else {
      // Outside chapter zone – clear hash
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [activeId]);

  // ---- Deep-link on mount ----
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const targetIndex = (CHAPTER_IDS as readonly string[]).indexOf(hash);
    if (targetIndex === -1) return;

    // Slight delay so the DOM has rendered fully
    const timeoutId = setTimeout(() => {
      const fraction = chapterIndexToScrollFraction(targetIndex);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: fraction * docHeight, behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // ---- Listen for external hash changes (e.g. browser back/forward) ----
  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash.replace('#', '');
      const targetIndex = (CHAPTER_IDS as readonly string[]).indexOf(hash);
      if (targetIndex === -1) return;

      const fraction = chapterIndexToScrollFraction(targetIndex);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: fraction * docHeight, behavior: 'smooth' });
    }

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // ---- scrollToChapter ----
  const scrollToChapter = useCallback((index: number) => {
    const clamped = clamp(index, 0, CHAPTER_COUNT - 1);
    const fraction = chapterIndexToScrollFraction(clamped);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = fraction * docHeight;

    // Set the hash immediately (without triggering scroll via replaceState)
    isScrollingToChapter.current = true;
    window.history.replaceState(null, '', `#${CHAPTER_IDS[clamped]}`);
    prevChapterId.current = CHAPTER_IDS[clamped];

    window.scrollTo({ top: targetY, behavior: 'smooth' });

    // Release the flag after the smooth scroll likely completes
    const releaseTimeout = setTimeout(() => {
      isScrollingToChapter.current = false;
    }, 1000);

    // Cleanup in case the component unmounts during scroll
    return () => clearTimeout(releaseTimeout);
  }, []);

  return {
    progress,
    chapterIndex: chapterIdx,
    chapterLocalProgress: localProgress,
    activeChapterId: activeId,
    scrollToChapter,
  };
}
