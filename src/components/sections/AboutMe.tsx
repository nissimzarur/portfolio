'use client';

import Image from 'next/image';
import { portfolioData } from '@/data/portfolio';
import { Badge } from '@/components/ui/Badge';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

export function AboutMe() {
  const { personal } = portfolioData;

  return (
    <SectionContainer id="about">
      <div className="max-w-3xl mx-auto">
        <MotionWrapper>
          <div className="flex items-center gap-6 mb-8">
            <Image
              src="/assets/nissim-memoji.png"
              alt={personal.name}
              width={120}
              height={120}
              className="rounded-full bg-surface border border-subtle"
            />
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
                About Me
              </h2>
              <p className="text-secondary mt-1">{personal.location}</p>
            </div>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.1}>
          <div className="space-y-4 text-secondary leading-relaxed">
            <p>
              I&apos;m a software engineer with over seven years of experience
              building production systems that people depend on every day. I
              started at Kinneret Academic College, where I studied Software
              Engineering and built my first GPS-based applications, and I
              haven&apos;t stopped shipping since.
            </p>
            <p>
              My career has taken me from enterprise insurance platforms serving
              thousands of daily users to AI-powered products that pushed the
              boundaries of what chatbots and retrieval systems could do. Today,
              I architect cloud-native healthcare platforms and design Agentic AI
              systems that coordinate multiple intelligent agents to solve
              complex clinical workflows.
            </p>
            <p>
              I care deeply about clean architecture, mentoring other engineers,
              and building software that&apos;s as maintainable as it is
              powerful. Whether I&apos;m writing a React component, designing a
              multi-tenant microservices architecture, or orchestrating AI agents
              with LangGraph, I bring the same attention to craft and clarity.
            </p>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <div className="mt-8 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">
                Education
              </h3>
              <p className="text-primary">
                {personal.education.degree},{' '}
                <span className="text-secondary">{personal.education.institution}</span>
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">
                Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {personal.certifications.map((cert) => (
                  <Badge key={cert} variant="amber">{cert}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">
                Strengths
              </h3>
              <div className="flex flex-wrap gap-2">
                {personal.strengths.map((s) => (
                  <Badge key={s} variant="default">{s}</Badge>
                ))}
              </div>
            </div>
          </div>
        </MotionWrapper>
      </div>
    </SectionContainer>
  );
}
