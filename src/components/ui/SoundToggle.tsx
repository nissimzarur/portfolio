'use client';

import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSoundManager } from '@/hooks/useSoundManager';

export default function SoundToggle() {
  const { enabled, toggle } = useSoundManager();
  const isMuted = !enabled;
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label={isMuted ? 'Sound off' : 'Sound on'}
        className="inline-flex items-center justify-center h-10 w-10 rounded-full text-secondary hover:text-primary hover:bg-elevated transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </button>

      {showTooltip && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-body text-primary bg-elevated border border-subtle rounded shadow-card whitespace-nowrap pointer-events-none"
        >
          {isMuted ? 'Sound off' : 'Sound on'}
        </span>
      )}
    </div>
  );
}
