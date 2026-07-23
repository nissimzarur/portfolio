'use client';

// -----------------------------------------------------------------------------
// useSoundManager – Subtle interaction-sound manager
// -----------------------------------------------------------------------------
// Provides optional, tasteful audio feedback using the Web Audio API. No
// external audio files are needed -- sounds are synthesised as tiny beeps.
// The enabled state persists in localStorage so the preference survives
// page reloads. Sound is OFF by default.

import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'portfolio-sound-enabled';

export interface SoundManagerState {
  /** Whether sounds are currently enabled. */
  enabled: boolean;
  /** Toggle sounds on / off. Persists the preference to localStorage. */
  toggle: () => void;
  /** Play a short ascending milestone tone (440 Hz -> 880 Hz, 0.15 s). */
  playMilestone: () => void;
  /** Play a very short click/tick sound (600 Hz, 0.05 s). */
  playClick: () => void;
}

/**
 * Lazily create and cache an AudioContext. We avoid creating it at module
 * scope because some browsers restrict AudioContext creation until a user
 * gesture has occurred.
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    return new AudioContext();
  } catch {
    return null;
  }
}

/**
 * Play an ascending milestone tone: a quick 440 Hz -> 880 Hz sweep over
 * 0.15 seconds at volume 0.15.
 */
function synthesiseMilestone(ctx: AudioContext): void {
  const now = ctx.currentTime;
  const duration = 0.15;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, now);
  oscillator.frequency.exponentialRampToValueAtTime(880, now + duration);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + duration);
}

/**
 * Play a very short tick / click: 600 Hz for 0.05 seconds at volume 0.10.
 */
function synthesiseClick(ctx: AudioContext): void {
  const now = ctx.currentTime;
  const duration = 0.05;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(600, now);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + duration);
}

/**
 * Read the persisted sound preference from localStorage.
 * Returns `false` (off) by default or if localStorage is unavailable.
 */
function readStoredPreference(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Persist the sound preference to localStorage.
 */
function writeStoredPreference(value: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // localStorage unavailable -- silently ignore
  }
}

export function useSoundManager(): SoundManagerState {
  const [enabled, setEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setEnabled(readStoredPreference());
  }, []);

  /**
   * Lazily initialise or resume the AudioContext. Some browsers suspend
   * contexts created before a user gesture, so we resume on demand.
   */
  const ensureContext = useCallback((): AudioContext | null => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = getAudioContext();
    }
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {
        // Ignore resume failures (e.g. no user gesture yet)
      });
    }
    return ctx;
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      writeStoredPreference(next);

      // If turning on, ensure we have a context ready (user gesture present)
      if (next) {
        ensureContext();
      }

      return next;
    });
  }, [ensureContext]);

  const playMilestone = useCallback(() => {
    if (!enabled) return;
    const ctx = ensureContext();
    if (ctx) synthesiseMilestone(ctx);
  }, [enabled, ensureContext]);

  const playClick = useCallback(() => {
    if (!enabled) return;
    const ctx = ensureContext();
    if (ctx) synthesiseClick(ctx);
  }, [enabled, ensureContext]);

  // Clean up AudioContext on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {
          // Ignore close failures
        });
        audioCtxRef.current = null;
      }
    };
  }, []);

  return { enabled, toggle, playMilestone, playClick };
}
