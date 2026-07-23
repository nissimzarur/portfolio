'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';
import { CHAPTERS, CHAPTER_COUNT } from '@/config/journey';

export function MobileChapterNav() {
  const { chapterIndex, scrollToChapter } = useJourneyProgress();

  return (
    <nav
      aria-label="Chapter navigation"
      className="flex lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-subtle"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-between w-full px-2 py-2">
        {/* Previous */}
        <button
          onClick={() => scrollToChapter(chapterIndex - 1)}
          disabled={chapterIndex <= 0}
          aria-label="Previous chapter"
          className="flex items-center justify-center w-12 h-12 rounded-lg text-secondary hover:text-primary disabled:text-muted disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-default"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Dots + label */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            {CHAPTERS.map((chapter, i) => {
              const state =
                i < chapterIndex
                  ? 'completed'
                  : i === chapterIndex
                    ? 'active'
                    : 'upcoming';

              return (
                <button
                  key={chapter.id}
                  onClick={() => scrollToChapter(i)}
                  aria-label={`Go to ${chapter.label}`}
                  aria-current={state === 'active' ? 'step' : undefined}
                  className="p-1 cursor-pointer"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      state === 'completed'
                        ? 'w-2 h-2 bg-amber'
                        : state === 'active'
                          ? 'w-3 h-3 bg-amber shadow-[0_0_6px_rgba(232,168,69,0.4)]'
                          : 'w-2 h-2 border border-subtle'
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <span className="text-[10px] text-muted truncate max-w-[160px]">
            {chapterIndex >= 0 && chapterIndex < CHAPTER_COUNT
              ? CHAPTERS[chapterIndex].label
              : ''}
          </span>
        </div>

        {/* Next */}
        <button
          onClick={() => scrollToChapter(chapterIndex + 1)}
          disabled={chapterIndex >= CHAPTER_COUNT - 1}
          aria-label="Next chapter"
          className="flex items-center justify-center w-12 h-12 rounded-lg text-secondary hover:text-primary disabled:text-muted disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-default"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </nav>
  );
}
