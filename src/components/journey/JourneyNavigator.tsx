'use client';

import { useJourneyProgress } from '@/hooks/useJourneyProgress';
import { CHAPTERS } from '@/config/journey';

export function JourneyNavigator() {
  const { chapterIndex, scrollToChapter } = useJourneyProgress();

  return (
    <nav
      aria-label="Career journey navigation"
      className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40"
    >
      <div className="bg-surface/80 backdrop-blur-lg rounded-xl border border-subtle p-3">
        <ol className="flex flex-col items-end gap-4">
          {CHAPTERS.map((chapter, i) => {
            const state =
              i < chapterIndex
                ? 'completed'
                : i === chapterIndex
                  ? 'active'
                  : 'upcoming';

            return (
              <li key={chapter.id} className="flex items-center gap-3">
                {/* Label (visible for active) */}
                <span
                  className={`text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                    state === 'active'
                      ? 'text-amber opacity-100'
                      : 'text-muted opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {state === 'active' ? chapter.label : ''}
                </span>

                {/* Dot */}
                <button
                  onClick={() => scrollToChapter(i)}
                  aria-label={`Go to ${chapter.label}`}
                  aria-current={state === 'active' ? 'step' : undefined}
                  className="group relative flex items-center justify-center w-8 h-8 cursor-pointer"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      state === 'completed'
                        ? 'w-2.5 h-2.5 bg-amber'
                        : state === 'active'
                          ? 'w-3.5 h-3.5 bg-amber shadow-[0_0_8px_rgba(232,168,69,0.5)]'
                          : 'w-2.5 h-2.5 border border-subtle bg-transparent'
                    }`}
                  />

                  {/* Hover tooltip */}
                  <span className="absolute right-full mr-3 px-2 py-1 bg-elevated rounded text-xs text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    {chapter.label}
                  </span>
                </button>
              </li>
            );
          })}

          {/* Connecting line */}
          <div
            className="absolute right-[18px] top-4 bottom-4 w-px bg-subtle -z-10"
            aria-hidden="true"
          />
        </ol>
      </div>
    </nav>
  );
}
