'use client';

import { Monitor, Server, Cloud, Brain, Layers, TestTube2, type LucideIcon } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Cloud,
  Brain,
  Layers,
  TestTube2,
};

const proficiencyVariant = {
  expert: 'amber' as const,
  advanced: 'blue' as const,
  proficient: 'default' as const,
};

export function Skills() {
  const { skills } = portfolioData;

  return (
    <SectionContainer id="skills">
      <MotionWrapper>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
          Technical Expertise
        </h2>
        <p className="mt-3 text-secondary text-lg max-w-2xl">
          Skills forged through 7+ years of building production systems
        </p>
      </MotionWrapper>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((category, i) => {
          const Icon = iconMap[category.icon] || Monitor;

          return (
            <MotionWrapper key={category.name} delay={i * 0.08}>
              <Card hover className="h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-amber/10">
                    <Icon size={20} className="text-amber" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-primary">
                    {category.name}
                  </h3>
                </div>
                <p className="text-sm text-muted mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant={proficiencyVariant[skill.proficiency]}
                      title={`${skill.proficiency} — ${skill.context}`}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            </MotionWrapper>
          );
        })}
      </div>
    </SectionContainer>
  );
}
