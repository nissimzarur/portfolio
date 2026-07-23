'use client';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

const groups = [
  {
    label: 'For Recruiters',
    questions: [
      "What's Nissim's experience with cloud architecture?",
      'Has he led engineering teams?',
      'What AI technologies has he worked with?',
    ],
  },
  {
    label: 'For Engineers',
    questions: [
      'How does he approach system design?',
      'Tell me about his Agentic AI work',
      "What's his testing and CI/CD experience?",
    ],
  },
  {
    label: 'For Clients',
    questions: [
      'What kind of projects has he built?',
      'Can he build AI-powered applications?',
      "What's his availability?",
    ],
  },
];

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.label}>
          <h3 className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">
            {group.label}
          </h3>
          <div className="space-y-1.5">
            {group.questions.map((q) => (
              <button
                key={q}
                onClick={() => onSelect(q)}
                className="w-full text-left text-sm text-secondary hover:text-primary px-3 py-2 rounded-lg border border-subtle hover:border-amber/30 hover:bg-elevated/50 transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
