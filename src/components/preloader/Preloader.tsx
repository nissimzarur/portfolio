'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Skip preloader on same-session revisit
    if (sessionStorage.getItem('preloader-shown')) {
      setVisible(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll<HTMLElement>('.preloader-char');
    const title = container.querySelector<HTMLElement>('.preloader-title');
    const bar = container.querySelector<HTMLElement>('.preloader-bar');

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('preloader-shown', '1');
        // Exit animation
        gsap.to(container, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => setVisible(false),
        });
      },
    });

    // Initial state
    gsap.set(container, { clipPath: 'inset(0 0 0% 0)' });
    gsap.set(chars, { y: '110%', opacity: 0, filter: 'blur(4px)' });
    gsap.set(title, { opacity: 0, y: 10 });

    // Sequence
    tl.to({}, { duration: 0.5 }); // pause
    tl.to(chars, {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      stagger: 0.04,
      ease: 'power3.out',
    });
    tl.to(title, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
    tl.to(bar, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '-=0.3');
    tl.to({}, { duration: 0.3 }); // brief hold

    return () => {
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  const name = 'Nissim Zarur';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[60] bg-deep flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      <div className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-primary tracking-tight">
        {name.split('').map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span className="preloader-char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </div>
      <p className="preloader-title mt-4 text-secondary text-lg sm:text-xl font-display">
        Senior Full Stack Engineer
      </p>
      <div className="mt-8 w-48 h-[2px] bg-subtle rounded-full overflow-hidden">
        <div
          className="preloader-bar w-full h-full bg-amber origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}
