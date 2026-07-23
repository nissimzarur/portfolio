'use client';

import { useEffect, useRef, createElement, type ElementType } from 'react';
import gsap from 'gsap';
import 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type SplitVariant = 'chars-up' | 'words-up' | 'lines-up' | 'fade-in';

interface SplitTextProps {
  children: string;
  variant?: SplitVariant;
  delay?: number;
  tag?: ElementType;
  className?: string;
  trigger?: 'scroll' | 'immediate';
}

export function SplitText({
  children,
  variant = 'words-up',
  delay = 0,
  tag: Tag = 'div',
  className = '',
  trigger = 'scroll',
}: SplitTextProps) {
  // The ref is always on the outer div wrapper — safe to type as HTMLDivElement
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const elements = container.querySelectorAll<HTMLElement>('.split-item');
    if (elements.length === 0) return;

    const animProps = getAnimationProps(variant);

    gsap.set(elements, animProps.from);

    const tl = gsap.timeline({
      delay,
      ...(trigger === 'scroll'
        ? {
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              once: true,
            },
          }
        : {}),
    });

    tl.to(elements, {
      ...animProps.to,
      duration: animProps.duration,
      stagger: animProps.stagger,
      ease: animProps.ease,
    });

    return () => {
      tl.kill();
    };
  }, [variant, delay, trigger, reducedMotion]);

  // Split into elements based on variant
  const items = splitContent(children, variant);

  const inner =
    variant === 'chars-up' || variant === 'fade-in'
      ? // Character-level: wrap each word, then each char inside
        children.split(' ').map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split('').map((char, ci) => (
              <span key={ci} className="inline-block overflow-hidden">
                <span
                  className="split-item inline-block"
                  style={reducedMotion ? {} : { opacity: 0 }}
                >
                  {char}
                </span>
              </span>
            ))}
            {wi < children.split(' ').length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))
      : // Word-level or line-level
        items.map((item, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span
              className="split-item inline-block"
              style={reducedMotion ? {} : { opacity: 0 }}
            >
              {item}
            </span>
            {variant === 'words-up' && i < items.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ));

  return (
    // Outer div carries the ref for GSAP — Tag is rendered inside via createElement
    // to avoid strict-mode JSX children type errors with dynamic ElementType
    <div ref={containerRef} style={{ display: 'contents' }}>
      {createElement(Tag, { className }, inner)}
    </div>
  );
}

function splitContent(text: string, variant: SplitVariant): string[] {
  switch (variant) {
    case 'chars-up':
    case 'fade-in':
      return text.split('');
    case 'words-up':
      return text.split(' ');
    case 'lines-up':
      // Treat entire text as one "line" — for multi-line use multiple SplitText instances
      return [text];
  }
}

function getAnimationProps(variant: SplitVariant) {
  switch (variant) {
    case 'chars-up':
      return {
        from: { y: '110%', opacity: 0, filter: 'blur(4px)' },
        to: { y: '0%', opacity: 1, filter: 'blur(0px)' },
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
      };
    case 'words-up':
      return {
        from: { y: '110%', opacity: 0 },
        to: { y: '0%', opacity: 1 },
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
      };
    case 'lines-up':
      return {
        from: { y: '100%', opacity: 0 },
        to: { y: '0%', opacity: 1 },
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      };
    case 'fade-in':
      return {
        from: { opacity: 0 },
        to: { opacity: 1 },
        duration: 0.4,
        stagger: 0.02,
        ease: 'power1.out',
      };
  }
}
