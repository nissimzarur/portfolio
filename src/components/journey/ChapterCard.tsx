'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { CareerMilestone } from '@/types/portfolio';
import { Badge } from '@/components/ui/Badge';
import { SplitText } from '@/components/animations/SplitText';
import { NumberCounter } from '@/components/animations/NumberCounter';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ChapterCardProps {
  milestone: CareerMilestone;
  index: number;
  isActive: boolean;
}

const sectorLabels: Record<string, string> = {
  campus: 'Education / R&D',
  office: 'Insurance / Enterprise',
  lab: 'AI / Startup',
  cloud: 'Healthcare / AI',
};

function parseMetric(metric: string): { prefix: string; value: number; suffix: string } | null {
  const match = metric.match(/^([+\-~]?)(\d+)(.*)$/);
  if (!match) return null;
  return { prefix: match[1], value: parseInt(match[2], 10), suffix: match[3] };
}

export function ChapterCard({ milestone, index, isActive }: ChapterCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLUListElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const elements: gsap.core.Tween[] = [];

    // Stagger achievements
    if (achievementsRef.current) {
      const items = achievementsRef.current.children;
      const tween = gsap.from(items, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: achievementsRef.current,
          start: 'top 85%',
          once: true,
        },
      });
      elements.push(tween);
    }

    // Stagger tech badges
    if (techRef.current) {
      const badges = techRef.current.children;
      const tween = gsap.from(badges, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: techRef.current,
          start: 'top 85%',
          once: true,
        },
      });
      elements.push(tween);
    }

    return () => {
      elements.forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <article
      ref={cardRef}
      id={`chapter-${milestone.id}`}
      className={`relative py-16 sm:py-24 min-h-[80vh] flex flex-col justify-center transition-all duration-300 ${
        isActive ? 'opacity-100' : 'opacity-70'
      }`}
    >
      {isActive && (
        <div className="hidden lg:block absolute -left-8 top-16 bottom-16 w-[2px] bg-amber rounded-full" />
      )}

      <div className="space-y-4">
        {/* Chapter label + period */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-medium text-muted uppercase tracking-wider">
            Chapter {index + 1}
          </span>
          <span className="text-xs text-muted">
            {milestone.period.start} – {milestone.period.end}
          </span>
          <Badge variant="default">{sectorLabels[milestone.environment] || milestone.environment}</Badge>
        </div>

        {/* Company */}
        <SplitText
          variant="chars-up"
          tag="h3"
          className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary"
        >
          {milestone.company}
        </SplitText>

        {/* Role */}
        <SplitText
          variant="words-up"
          tag="p"
          className="text-lg text-amber font-medium"
        >
          {milestone.role}
        </SplitText>

        {/* Summary */}
        <SplitText
          variant="lines-up"
          tag="p"
          className="text-secondary leading-relaxed max-w-2xl"
        >
          {milestone.summary}
        </SplitText>

        {/* Achievements */}
        <ul ref={achievementsRef} className="space-y-3 mt-4">
          {milestone.achievements.map((achievement) => {
            const parsed = achievement.metric ? parseMetric(achievement.metric) : null;
            return (
              <li key={achievement.label} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                <div>
                  <span className="text-primary font-medium">
                    {achievement.label}
                    {parsed ? (
                      <NumberCounter
                        value={parsed.value}
                        prefix={` ${parsed.prefix}`}
                        suffix={parsed.suffix}
                        className="text-amber ml-2 font-semibold"
                      />
                    ) : achievement.metric ? (
                      <span className="text-amber ml-2 font-semibold">
                        {achievement.metric}
                      </span>
                    ) : null}
                  </span>
                  <p className="text-sm text-secondary mt-0.5">
                    {achievement.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Tech stack */}
        <div ref={techRef} className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-subtle">
          {milestone.techStack.map((tech) => (
            <Badge key={tech} variant="blue">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
