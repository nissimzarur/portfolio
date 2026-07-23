'use client';

import type { CareerMilestone } from '@/types/portfolio';
import { Badge } from '@/components/ui/Badge';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

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

export function ChapterCard({ milestone, index, isActive }: ChapterCardProps) {
  return (
    <MotionWrapper delay={index * 0.05}>
      <article
        id={`chapter-${milestone.id}`}
        className={`relative py-16 sm:py-24 min-h-[80vh] flex flex-col justify-center transition-all duration-300 ${
          isActive ? 'opacity-100' : 'opacity-70'
        }`}
      >
        {/* Active indicator (desktop only — mobile uses the road line) */}
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

          {/* Company + Role */}
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
            {milestone.company}
          </h3>
          <p className="text-lg text-amber font-medium">{milestone.role}</p>

          {/* Summary */}
          <p className="text-secondary leading-relaxed max-w-2xl">
            {milestone.summary}
          </p>

          {/* Achievements */}
          <ul className="space-y-3 mt-4">
            {milestone.achievements.map((achievement) => (
              <li key={achievement.label} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0" />
                <div>
                  <span className="text-primary font-medium">
                    {achievement.label}
                    {achievement.metric && (
                      <span className="text-amber ml-2 font-semibold">
                        {achievement.metric}
                      </span>
                    )}
                  </span>
                  <p className="text-sm text-secondary mt-0.5">
                    {achievement.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-subtle">
            {milestone.techStack.map((tech) => (
              <Badge key={tech} variant="blue">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    </MotionWrapper>
  );
}
