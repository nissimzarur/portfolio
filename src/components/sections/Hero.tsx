'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '@/data/portfolio';
import { Button } from '@/components/ui/Button';
import { SplitText } from '@/components/animations/SplitText';
import { MagneticElement } from '@/components/animations/MagneticElement';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Hero() {
  const { personal } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Typewriter effect for tagline
  useEffect(() => {
    if (reducedMotion || !taglineRef.current) return;

    const el = taglineRef.current;
    const text = personal.tagline;
    el.textContent = '';
    el.style.opacity = '1';

    const tl = gsap.timeline({ delay: 1.2 });
    const chars = text.split('');
    chars.forEach((char, i) => {
      tl.call(
        () => {
          el.textContent = text.slice(0, i + 1);
        },
        [],
        i * 0.04
      );
    });

    return () => {
      tl.kill();
    };
  }, [personal.tagline, reducedMotion]);

  // CTA buttons fade in
  useEffect(() => {
    if (reducedMotion || !ctaRef.current) return;

    gsap.from(ctaRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.15,
      delay: 2.0,
      ease: 'power2.out',
    });
  }, [reducedMotion]);

  // Portrait entrance
  useEffect(() => {
    if (reducedMotion || !portraitRef.current) return;

    gsap.from(portraitRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      delay: 0.5,
      ease: 'power2.out',
    });
  }, [reducedMotion]);

  // Scroll indicator fades out after scrolling past 5vh
  useEffect(() => {
    if (!scrollIndicatorRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '5% top',
      onUpdate: (self) => {
        if (scrollIndicatorRef.current) {
          scrollIndicatorRef.current.style.opacity = String(1 - self.progress);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className="relative h-svh flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          <SplitText
            variant="chars-up"
            tag="h1"
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-primary tracking-tight"
            trigger="immediate"
            delay={0.3}
          >
            {personal.name}
          </SplitText>

          <SplitText
            variant="lines-up"
            tag="p"
            className="mt-4 font-display text-lg sm:text-xl md:text-2xl text-secondary"
            trigger="immediate"
            delay={0.8}
          >
            {personal.title}
          </SplitText>

          <p
            ref={taglineRef}
            className="mt-4 text-base sm:text-lg text-muted max-w-2xl mx-auto lg:mx-0"
            style={reducedMotion ? {} : { opacity: 0 }}
          >
            {reducedMotion ? personal.tagline : ''}
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <MagneticElement>
              <Button variant="primary" size="lg" href="#contact?intent=hiring">
                Discuss a Role
              </Button>
            </MagneticElement>
            <MagneticElement>
              <Button variant="secondary" size="lg" href="#contact?intent=project">
                Start a Project
              </Button>
            </MagneticElement>
          </div>
        </div>

        {/* Portrait */}
        <div ref={portraitRef} className="flex-shrink-0">
          <motion.div
            className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px]"
            animate={reducedMotion ? {} : { y: [0, -8, 0] }}
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
        </div>
      </div>

      {/* Scroll invitation */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-sm font-body">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
    </section>
  );
}
