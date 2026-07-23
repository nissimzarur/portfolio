'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';
import { portfolioData } from '@/data/portfolio';
import { ChapterCard } from './ChapterCard';
import { MilestoneMarker } from './MilestoneMarker';

const ROAD_PATH =
  'M 50 0 C 50 60 80 100 70 160 C 60 220 20 260 30 320 C 40 380 80 420 70 480 C 60 540 30 580 40 640 C 50 700 70 740 60 800';

export function JourneyRoute() {
  const { scrollToChapter } = useJourneyProgress();
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [indicatorPos, setIndicatorPos] = useState({ x: 50, y: 0 });
  const [journeyProgress, setJourneyProgress] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // GSAP ScrollTrigger for journey progress
  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        setJourneyProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const milestones = portfolioData.career;
  const chapterIndex = Math.min(
    Math.floor(journeyProgress * milestones.length),
    milestones.length - 1
  );

  useEffect(() => {
    if (pathRef.current && pathLength > 0) {
      const point = pathRef.current.getPointAtLength(journeyProgress * pathLength);
      setIndicatorPos({ x: point.x, y: point.y });

      // Sync glow path
      if (glowPathRef.current) {
        glowPathRef.current.style.strokeDashoffset = String(
          pathLength * (1 - journeyProgress)
        );
      }
    }
  }, [journeyProgress, pathLength]);

  return (
    <section ref={sectionRef} aria-label="Career Journey" className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex">
          {/* SVG Road - left side */}
          <div className="hidden lg:block sticky top-0 h-screen w-[100px] flex-shrink-0 py-20">
            <svg
              viewBox="0 0 100 800"
              className="w-full h-full"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="roadGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                </filter>
              </defs>

              {/* Background path */}
              <path
                d={ROAD_PATH}
                stroke="var(--color-subtle)"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
              />

              {/* Glow trail (behind drawn path) */}
              <path
                ref={glowPathRef}
                d={ROAD_PATH}
                stroke="var(--color-amber)"
                strokeWidth={8}
                strokeLinecap="round"
                fill="none"
                filter="url(#roadGlow)"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - journeyProgress)}
                opacity={0.3}
              />

              {/* Drawn path */}
              <path
                ref={pathRef}
                d={ROAD_PATH}
                stroke="var(--color-amber)"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - journeyProgress)}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />

              {/* Milestone markers */}
              {milestones.map((m, i) => {
                const markerProgress = (i + 0.5) / milestones.length;
                const point = pathRef.current && pathLength > 0
                  ? pathRef.current.getPointAtLength(markerProgress * pathLength)
                  : { x: 50, y: markerProgress * 800 };
                const state =
                  i < chapterIndex
                    ? 'completed'
                    : i === chapterIndex
                      ? 'active'
                      : 'upcoming';

                return (
                  <MilestoneMarker
                    key={m.id}
                    milestone={m}
                    state={state}
                    position={point}
                    onClick={() => scrollToChapter(i)}
                  />
                );
              })}

              {/* Position indicator */}
              <motion.circle
                cx={indicatorPos.x}
                cy={indicatorPos.y}
                r={6}
                fill="var(--color-amber)"
                filter="url(#glow)"
              />
            </svg>
          </div>

          {/* Mobile road indicator */}
          <div className="lg:hidden absolute left-0 top-0 bottom-0 w-[3px]">
            <div className="h-full bg-subtle rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-amber rounded-full origin-top"
                style={{ height: `${journeyProgress * 100}%` }}
              />
            </div>
          </div>

          {/* Chapter cards - right side */}
          <div className="flex-1 lg:pl-8 pl-4 space-y-4">
            {milestones.map((milestone, i) => (
              <ChapterCard
                key={milestone.id}
                milestone={milestone}
                index={i}
                isActive={i === chapterIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
