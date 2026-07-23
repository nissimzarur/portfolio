'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { ExpandableDetail } from '@/components/ui/ExpandableDetail';

interface ArchLayer {
  id: string;
  name: string;
  tech: string;
  description: string;
  color: string;
  bgColor: string;
}

const layers: ArchLayer[] = [
  {
    id: 'infra',
    name: 'Infrastructure',
    tech: 'AWS CDK, Docker, Kubernetes (EKS)',
    description:
      'Cloud-native infrastructure as code. Multi-tenant isolation at the infrastructure level with dedicated VPCs, security groups, and automated provisioning through AWS CDK.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40',
  },
  {
    id: 'data',
    name: 'Data Layer',
    tech: 'MongoDB, Redis, Vector DB',
    description:
      'Isolated database schemas per tenant. Redis for caching and session management. Vector databases for RAG embeddings enabling AI-powered retrieval.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40',
  },
  {
    id: 'services',
    name: 'Services',
    tech: 'Event-Driven Microservices',
    description:
      'Loosely coupled microservices communicating through events. Domain-driven bounded contexts ensure each service owns its data and business logic independently.',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10 border-violet-500/20 hover:border-violet-500/40',
  },
  {
    id: 'ai',
    name: 'AI Layer',
    tech: 'LangGraph Agents, RAG Pipeline',
    description:
      'Multi-agent orchestration powered by LangGraph. Agents coordinate through state graphs to process clinical data, manage workflows, and provide intelligent routing.',
    color: 'text-amber',
    bgColor: 'bg-amber/10 border-amber/20 hover:border-amber/40',
  },
  {
    id: 'frontend',
    name: 'Frontend',
    tech: 'React, Modular Architecture',
    description:
      'Modular frontend architecture enabling independent feature ownership. Each module can be developed, tested, and deployed in parallel by different teams.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40',
  },
];

export function ArchitectureShowcase() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <SectionContainer id="architecture">
      <MotionWrapper>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
          Architecture & System Design
        </h2>
        <p className="mt-3 text-secondary text-lg max-w-2xl">
          How I structure production systems for scale, resilience, and clarity
        </p>
      </MotionWrapper>

      <MotionWrapper delay={0.1}>
        <div className="mt-10 max-w-2xl mx-auto">
          <h3 className="font-display text-lg font-semibold text-primary mb-2">
            Cloud-Native Healthcare Platform
          </h3>
          <p className="text-xs text-muted mb-6">
            Architecture generalized from production system. Confidential details omitted.
          </p>

          {/* Stacked layers */}
          <div className="space-y-2">
            {[...layers].reverse().map((layer, i) => (
              <motion.button
                key={layer.id}
                onClick={() =>
                  setActiveLayer(activeLayer === layer.id ? null : layer.id)
                }
                className={`w-full text-left px-5 py-4 rounded-lg border transition-all cursor-pointer ${
                  layer.bgColor
                } ${
                  activeLayer === layer.id
                    ? 'ring-1 ring-current scale-[1.02]'
                    : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                aria-expanded={activeLayer === layer.id}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`font-display font-semibold ${layer.color}`}>
                      {layer.name}
                    </span>
                    <span className="ml-3 text-xs text-muted">{layer.tech}</span>
                  </div>
                  <motion.span
                    className="text-muted text-xs"
                    animate={{ rotate: activeLayer === layer.id ? 180 : 0 }}
                  >
                    ▾
                  </motion.span>
                </div>

                <AnimatePresence>
                  {activeLayer === layer.id && (
                    <motion.p
                      className="mt-3 text-sm text-secondary leading-relaxed"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {layer.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>
      </MotionWrapper>

      <MotionWrapper delay={0.3}>
        <div className="mt-10 max-w-2xl mx-auto">
          <ExpandableDetail summary="Design principles applied across all systems">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-secondary">
              <div>
                <h4 className="font-semibold text-primary mb-1">Event-Driven Architecture</h4>
                <p>Services communicate through events, enabling loose coupling and independent scalability.</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">Domain-Driven Design</h4>
                <p>Bounded contexts and aggregates align code structure with business domains.</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">SOLID Principles</h4>
                <p>Single responsibility, open/closed, and dependency inversion guide all production code.</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">Clean Architecture</h4>
                <p>Clear boundaries between layers ensure business logic stays independent of frameworks.</p>
              </div>
            </div>
          </ExpandableDetail>
        </div>
      </MotionWrapper>
    </SectionContainer>
  );
}
