'use client';

import { useJourneyProgress } from '@/hooks/useJourneyProgress';
import { CHAPTERS } from '@/config/journey';

export function JourneyNavigator() {
  const { chapterIndex, chapterLocalProgress, scrollToChapter } = useJourneyProgress();

  // Calculate fill percentage for the connecting line
  const totalChapters = CHAPTERS.length;
  const fillPercent =
    chapterIndex < 0
      ? 0
      : ((chapterIndex + chapterLocalProgress) / totalChapters) * 100;

  return (
    <nav
      aria-label="Career journey navigation"
      className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40"
    >
      <div className="bg-surface/80 backdrop-blur-lg rounded-xl border border-subtle p-3">
        <ol className="relative flex flex-col items-end gap-4">
          {/* Connecting line background */}
          <div
            className="absolute right-[18px] top-4 bottom-4 w-px bg-subtle -z-10"
            aria-hidden="true"
          />
          {/* Connecting line fill */}
          <div
            className="absolute right-[18px] top-4 bottom-4 w-px -z-10 origin-top transition-transform duration-300"
            style={{
              background: 'linear-gradient(to bottom, #E8A845, #F0B855)',
              transform: `scaleY(${fillPercent / 100})`,
            }}
            aria-hidden="true"
          />

          {CHAPTERS.map((chapter, i) => {
            const state =
              i < chapterIndex
                ? 'completed'
                : i === chapterIndex
                  ? 'active'
                  : 'upcoming';

            return (
              <li key={chapter.id} className="flex items-center gap-3">
                {/* Label */}
                <span
                  className={`text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                    state === 'active'
                      ? 'text-amber opacity-100 translate-x-0'
                      : 'text-muted opacity-0 translate-x-2'
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
                  {/* Glow ring for active */}
                  {state === 'active' && (
                    <span className="absolute w-6 h-6 rounded-full border border-amber/40 animate-ping" />
                  )}

                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      state === 'completed'
                        ? 'w-2.5 h-2.5 bg-amber'
                        : state === 'active'
                          ? 'w-3.5 h-3.5 bg-amber shadow-[0_0_12px_rgba(232,168,69,0.6)]'
                          : 'w-2.5 h-2.5 border border-subtle bg-transparent'
                    }`}
                  />

                  {/* Hover tooltip */}
                  <span className="absolute right-full mr-3 px-2.5 py-1.5 bg-elevated/90 backdrop-blur-sm rounded-lg text-xs text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-x-1 group-hover:translate-x-0">
                    {chapter.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
