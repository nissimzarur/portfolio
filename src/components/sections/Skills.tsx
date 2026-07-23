'use client';

import { useEffect, useRef } from 'react';
import { Monitor, Server, Cloud, Brain, Layers, TestTube2, type LucideIcon } from 'lucide-react';
import gsap from 'gsap';
import 'gsap/ScrollTrigger';
import { portfolioData } from '@/data/portfolio';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { SplitText } from '@/components/animations/SplitText';
import { TiltCard } from '@/components/animations/TiltCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';

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
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !gridRef.current) return;

    const cards = gridRef.current.children;
    const tween = gsap.from(cards, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 85%',
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [reducedMotion]);

  return (
    <SectionContainer id="skills">
      <SplitText
        variant="words-up"
        tag="h2"
        className="font-display text-3xl md:text-4xl font-bold text-primary"
      >
        Technical Expertise
      </SplitText>
      <SplitText
        variant="lines-up"
        tag="p"
        className="mt-3 text-secondary text-lg max-w-2xl"
        delay={0.1}
      >
        Skills forged through 7+ years of building production systems
      </SplitText>

      <div ref={gridRef} className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((category) => {
          const Icon = iconMap[category.icon] || Monitor;

          return (
            <TiltCard key={category.name}>
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
            </TiltCard>
          );
        })}
      </div>
    </SectionContainer>
  );
}
