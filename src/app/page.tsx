'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { JourneyRoute } from '@/components/journey/JourneyRoute';
import { Skills } from '@/components/sections/Skills';
import { AIExperience } from '@/components/sections/AIExperience';
import { ArchitectureShowcase } from '@/components/sections/ArchitectureShowcase';
import { AboutMe } from '@/components/sections/AboutMe';
import { Contact } from '@/components/sections/Contact';
import { JourneyNavigator } from '@/components/journey/JourneyNavigator';
import { MobileChapterNav } from '@/components/journey/MobileChapterNav';

const Scene = dynamic(() => import('@/components/canvas/Scene'), {
  ssr: false,
});

const ChatPanel = dynamic(
  () =>
    import('@/components/chat/ChatPanel').then((mod) => ({
      default: mod.ChatPanel,
    })),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      {/* 3D canvas background */}
      <Scene />

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />

        {/* Journey section with aria-live for chapter changes */}
        <div aria-live="polite" aria-atomic="false" className="sr-only" id="journey-announcer" />
        <JourneyRoute />

        <Skills />
        <AIExperience />
        <ArchitectureShowcase />
        <AboutMe />

        <Suspense>
          <Contact />
        </Suspense>
      </main>

      {/* Navigation overlays */}
      <JourneyNavigator />
      <MobileChapterNav />

      {/* AI Chat assistant (lazy loaded) */}
      <ChatPanel />

      {/* Footer */}
      <footer className="relative z-10 border-t border-subtle py-8 text-center text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Nissim Zarur. All rights reserved.</p>
      </footer>
    </>
  );
}
