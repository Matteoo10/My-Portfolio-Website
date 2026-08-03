import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CinematicSectionOptions {
  triggerStart?: string;
  staggerStep?: number;
  toggleActions?: string;
}

/**
 * useCinematicSection — creates a GSAP ScrollTrigger timeline that sequentially animates:
 * 1. Section Header & Badge ([data-gsap="heading"])
 * 2. Description text ([data-gsap="description"])
 * 3. Cards & Buttons ([data-gsap="card"], [data-gsap="item"])
 */
export function useCinematicSection<T extends HTMLElement = HTMLDivElement>(
  options: CinematicSectionOptions = {}
) {
  const containerRef = useRef<T | null>(null);
  const {
    triggerStart = 'top 85%',
    staggerStep = 0.12,
  } = options;

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Find targets inside container
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

      // Step 1: Headings (Scale 0.95 -> 1.0, Fade-in, Slide Up 50px)
      if (headings.length > 0) {
        tl.fromTo(
          headings,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            stagger: 0.12,
          }
        );
      }

      // Step 2: Description text (Fade-in, Slide Up 25px)
      if (descriptions.length > 0) {
        tl.fromTo(
          descriptions,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.1,
          },
          '-=0.5' // Overlap slightly with heading reveal
        );
      }

      // Step 3: Cards & Items (Scale 0.95 -> 1.0, Slide Up 30px, Subtle rotation -1.5deg -> 0, Stagger 120ms)
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
            rotate: -1.2,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: staggerStep,
            clearProps: 'transform,opacity',
          },
          '-=0.4'
        );
      }
    }, containerRef);

    return () => {
      ctx.revert(); // Clean up GSAP context on unmount
    };
  }, [triggerStart, staggerStep]);

  return containerRef;
}

/**
 * useCinematicParallax — applies smooth scrubbed GSAP parallax to an element.
 */
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

/**
 * useCinematicPortraitReveal — animates profile photo reveal:
 * - Fade in opacity (0 to 1)
 * - Scale up from 0.85 -> 1.0
 * - Duration ~0.75s with power3.out ease-out curve
 * - Simultaneous soft glow reveal
 */
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

      // Profile Image reveal (opacity 0 -> 1, scale 0.85 -> 1.0, 0.75s ease-out)
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

