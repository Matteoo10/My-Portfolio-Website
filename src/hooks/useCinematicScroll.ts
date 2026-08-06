import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CinematicSectionOptions {
  triggerStart?: string;
  staggerStep?: number;
  toggleActions?: string;
}

export function useCinematicSection<T extends HTMLElement = HTMLDivElement>(
  options: CinematicSectionOptions = {}
) {
  const containerRef = useRef<T | null>(null);
  const {
    triggerStart = 'top 85%',
    staggerStep = 0.12,
  } = options;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const headings = container.querySelectorAll('[data-gsap="heading"]');
      const descriptions = container.querySelectorAll('[data-gsap="description"]');
      const cards = container.querySelectorAll('[data-gsap="card"], [data-gsap="item"]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: triggerStart,
          toggleActions: 'play none none none',
          once: true,
        },
      });

      if (headings.length > 0) {
        tl.fromTo(
          headings,
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.1,
          }
        );
      }

      if (descriptions.length > 0) {
        tl.fromTo(
          descriptions,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
          },
          '-=0.6'
        );
      }

      if (cards.length > 0) {
        tl.fromTo(
          cards,
          {
            opacity: 0,
            y: 22,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power4.out',
            stagger: staggerStep,
            clearProps: 'transform,opacity',
          },
          '-=0.5'
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [triggerStart, staggerStep]);

  return containerRef;
}

export function useCinematicParallax<T extends HTMLElement = HTMLDivElement>(
  yPercent: number = -15
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, ref);

    return () => {
      ctx.revert();
    };
  }, [yPercent]);

  return ref;
}

export function useCinematicPortraitReveal<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const img = container.querySelector('img');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      if (img) {
        tl.fromTo(
          img,
          { opacity: 0, scale: 0.85, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: 'power3.out' }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return containerRef;
}


