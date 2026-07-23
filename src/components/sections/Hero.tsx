'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Button } from '@/components/ui/Button';
import { MotionWrapper } from '@/components/ui/MotionWrapper';

export function Hero() {
  const { personal } = portfolioData;

  return (
    <section
      aria-label="Introduction"
      className="relative min-h-dvh flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16 py-20">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <MotionWrapper delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-primary tracking-tight">
              {personal.name}
            </h1>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <p className="mt-4 font-display text-lg sm:text-xl md:text-2xl text-secondary">
              {personal.title}
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.3}>
            <p className="mt-4 text-base sm:text-lg text-muted max-w-2xl mx-auto lg:mx-0">
              {personal.tagline}
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.4}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="primary" size="lg" href="#contact?intent=hiring">
                Discuss a Role
              </Button>
              <Button variant="secondary" size="lg" href="#contact?intent=project">
                Start a Project
              </Button>
            </div>
          </MotionWrapper>
        </div>

        {/* Portrait */}
        <MotionWrapper delay={0.2} className="flex-shrink-0">
          <motion.div
            className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 rounded-full bg-amber/10 blur-3xl" />
            <Image
              src="/assets/nissim-memoji.png"
              alt={`${personal.name} - portrait illustration`}
              width={350}
              height={350}
              priority
              className="relative z-10 drop-shadow-2xl"
            />
          </motion.div>
        </MotionWrapper>
      </div>

      {/* Scroll invitation */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <span className="text-sm font-body">Explore my journey</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
