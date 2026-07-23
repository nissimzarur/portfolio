// -----------------------------------------------------------------------------
// Journey Configuration
// -----------------------------------------------------------------------------
// Defines the scroll-driven journey structure: chapter thresholds, IDs, and
// metadata used by useJourneyProgress and the SVG road / 3D camera systems.

import type { ChapterEnvironment } from '@/types/portfolio';

/** Scroll-progress boundaries for a single chapter. */
export interface ChapterThreshold {
  /** Normalised scroll position where the chapter begins (0-1). */
  start: number;
  /** Normalised scroll position where the chapter ends (0-1). */
  end: number;
}

/** Static descriptor for each career chapter. */
export interface ChapterDescriptor {
  id: string;
  label: string;
  environment: ChapterEnvironment;
  threshold: ChapterThreshold;
}

/**
 * Page layout breakdown (normalised 0-1 scroll range):
 *   Hero section:       0.00 – 0.15
 *   Chapter 0:          0.15 – 0.30
 *   Chapter 1:          0.30 – 0.45
 *   Chapter 2:          0.45 – 0.60
 *   Chapter 3:          0.60 – 0.75
 *   Remaining sections: 0.75 – 1.00
 */
export const CHAPTER_THRESHOLDS: readonly ChapterThreshold[] = [
  { start: 0.15, end: 0.30 },
  { start: 0.30, end: 0.45 },
  { start: 0.45, end: 0.60 },
  { start: 0.60, end: 0.75 },
] as const;

export const CHAPTER_IDS = [
  'kinneret',
  'bafi',
  'letstok',
  'igentify',
] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];

export const CHAPTERS: readonly ChapterDescriptor[] = [
  {
    id: CHAPTER_IDS[0],
    label: 'Kinneret Academic College',
    environment: 'campus',
    threshold: CHAPTER_THRESHOLDS[0],
  },
  {
    id: CHAPTER_IDS[1],
    label: 'Bafi',
    environment: 'office',
    threshold: CHAPTER_THRESHOLDS[1],
  },
  {
    id: CHAPTER_IDS[2],
    label: 'LetsTok.AI',
    environment: 'lab',
    threshold: CHAPTER_THRESHOLDS[2],
  },
  {
    id: CHAPTER_IDS[3],
    label: 'Igentify',
    environment: 'cloud',
    threshold: CHAPTER_THRESHOLDS[3],
  },
] as const;

/** Total number of career chapters. */
export const CHAPTER_COUNT = CHAPTERS.length;

/** Progress range occupied by the hero section. */
export const HERO_RANGE = { start: 0, end: 0.15 } as const;

/** Progress range occupied by the footer / remaining sections. */
export const FOOTER_RANGE = { start: 0.75, end: 1 } as const;
