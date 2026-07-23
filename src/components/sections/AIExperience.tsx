'use client';

import { Bot, Database, Cpu, ArrowRight, Workflow } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { ExpandableDetail } from '@/components/ui/ExpandableDetail';

const aiTech = [
  'LangGraph', 'RAG', 'OpenAI SDK', 'Claude Code', 'CrewAI',
  'Vertex AI', 'Vector Databases', 'Prompt Engineering',
];

export function AIExperience() {
  return (
    <SectionContainer id="ai-experience">
      <MotionWrapper>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
          AI & Agentic Systems
        </h2>
        <p className="mt-3 text-secondary text-lg max-w-3xl">
          Building intelligent systems that reason, retrieve, and act autonomously
        </p>
      </MotionWrapper>

      {/* HR-friendly explanation */}
      <MotionWrapper delay={0.1}>
        <div className="mt-10 max-w-3xl space-y-4 text-secondary leading-relaxed">
          <p>
            <strong className="text-primary">Agentic AI</strong> represents the next evolution
            in artificial intelligence — systems that don&apos;t just answer questions but
            actively reason, plan, and take actions to solve complex problems. At Igentify,
            I architect multi-agent systems where specialized AI agents collaborate to
            automate healthcare workflows, each handling a distinct responsibility within
            a coordinated pipeline.
          </p>
          <p>
            Using <strong className="text-primary">RAG (Retrieval-Augmented Generation)</strong>,
            I connect AI models to real organizational knowledge, ensuring responses are
            grounded in verified data rather than general training. At LetsTok.AI, this
            approach improved response accuracy by <span className="text-amber font-semibold">25%</span>.
          </p>
          <p>
            These systems handle real production workloads — from processing clinical data
            at Igentify to powering customer-facing chatbots at LetsTok.AI that helped
            increase user retention by <span className="text-amber font-semibold">15%</span>.
          </p>
        </div>
      </MotionWrapper>

      {/* Architecture diagram */}
      <MotionWrapper delay={0.2}>
        <div className="mt-10 max-w-2xl mx-auto">
          <h3 className="font-display text-sm font-semibold text-muted uppercase tracking-wider mb-6 text-center">
            Agentic AI Architecture Pattern
          </h3>
          <div className="flex flex-col items-center gap-3">
            {/* User */}
            <DiagramNode icon={<Bot size={18} />} label="User Request" color="primary" />
            <DiagramArrow />
            {/* Orchestrator */}
            <DiagramNode icon={<Workflow size={18} />} label="Agent Orchestrator (LangGraph)" color="amber" wide />
            <div className="flex items-center gap-4 sm:gap-8">
              <DiagramArrow />
              <DiagramArrow />
              <DiagramArrow />
            </div>
            {/* Tools row */}
            <div className="flex gap-3 sm:gap-6 flex-wrap justify-center">
              <DiagramNode icon={<Cpu size={16} />} label="Tools" color="blue" small />
              <DiagramNode icon={<Database size={16} />} label="RAG / Vector DB" color="blue" small />
              <DiagramNode icon={<Bot size={16} />} label="LLM" color="blue" small />
            </div>
            <DiagramArrow />
            {/* Response */}
            <DiagramNode icon={<ArrowRight size={18} />} label="Verified Response" color="primary" />
          </div>
        </div>
      </MotionWrapper>

      {/* Technical deep-dive */}
      <MotionWrapper delay={0.3}>
        <div className="mt-10 max-w-3xl">
          <ExpandableDetail summary="Technical deep-dive: Architecture patterns & implementation">
            <div className="space-y-3 text-secondary text-sm leading-relaxed">
              <p>
                <strong className="text-primary">LangGraph State Graphs:</strong> I design agent workflows
                as directed acyclic graphs where each node represents an agent with a specific capability.
                State is passed between nodes with full type safety, enabling complex branching, loops,
                and human-in-the-loop checkpoints.
              </p>
              <p>
                <strong className="text-primary">Tool Calling:</strong> Agents dynamically select and invoke
                tools (APIs, databases, external services) based on the task context. I implement strict
                schemas for tool inputs/outputs to ensure reliability in production.
              </p>
              <p>
                <strong className="text-primary">RAG Pipeline:</strong> Documents are chunked, embedded into
                vector databases, and retrieved at query time using semantic similarity. I tune chunking
                strategies, embedding models, and retrieval parameters to maximize relevance.
              </p>
              <p>
                <strong className="text-primary">Multi-Agent Coordination:</strong> At Igentify, I orchestrate
                agents that handle patient data processing, clinical workflow management, and intelligent
                routing — each operating within isolated contexts for data security.
              </p>
            </div>
          </ExpandableDetail>
        </div>
      </MotionWrapper>

      {/* Tech badges */}
      <MotionWrapper delay={0.4}>
        <div className="mt-8 flex flex-wrap gap-2">
          {aiTech.map((tech) => (
            <Badge key={tech} variant="amber">{tech}</Badge>
          ))}
        </div>
      </MotionWrapper>
    </SectionContainer>
  );
}

function DiagramNode({
  icon,
  label,
  color,
  wide,
  small,
}: {
  icon: React.ReactNode;
  label: string;
  color: 'primary' | 'amber' | 'blue';
  wide?: boolean;
  small?: boolean;
}) {
  const colors = {
    primary: 'border-subtle bg-surface text-primary',
    amber: 'border-amber/30 bg-amber/5 text-amber',
    blue: 'border-blue/30 bg-blue/5 text-blue',
  };

  return (
    <div
      className={`flex items-center gap-2 border rounded-lg ${colors[color]} ${
        wide ? 'px-6 py-3' : small ? 'px-3 py-2' : 'px-4 py-2.5'
      } ${small ? 'text-xs' : 'text-sm'} font-medium`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function DiagramArrow() {
  return (
    <div className="w-px h-6 bg-subtle mx-auto" />
  );
}
