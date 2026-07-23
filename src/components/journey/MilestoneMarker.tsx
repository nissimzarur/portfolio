'use client';

import type { CareerMilestone } from '@/types/portfolio';

interface MilestoneMarkerProps {
  milestone: CareerMilestone;
  state: 'completed' | 'active' | 'upcoming';
  position: { x: number; y: number };
  onClick: () => void;
}

export function MilestoneMarker({
  milestone,
  state,
  position,
  onClick,
}: MilestoneMarkerProps) {
  const radius = state === 'active' ? 7 : 5;
  const fill =
    state === 'completed'
      ? 'var(--color-amber)'
      : state === 'active'
        ? 'var(--color-amber)'
        : 'transparent';
  const stroke =
    state === 'upcoming' ? 'var(--color-subtle)' : 'var(--color-amber)';

  return (
    <g
      role="listitem"
      aria-label={`${milestone.company}, ${milestone.period.start} to ${milestone.period.end}`}
      onClick={onClick}
      className="cursor-pointer"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <circle
        cx={position.x}
        cy={position.y}
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={2}
      />

      {/* Pulse ring for active */}
      {state === 'active' && (
        <circle
          cx={position.x}
          cy={position.y}
          r={12}
          fill="none"
          stroke="var(--color-amber)"
          strokeWidth={1}
          opacity={0.4}
        >
          <animate
            attributeName="r"
            from="8"
            to="16"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.4"
            to="0"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Tooltip label on hover */}
      <title>{`${milestone.company} (${milestone.period.start})`}</title>
    </g>
  );
}
