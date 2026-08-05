import { useEffect, useRef, useState } from 'react';

export type RevealVariant = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'scale'
  | 'heading'
  | 'text'
  | 'profile-pic'
  | 'card-rotate';

export interface ScrollRevealOptions {
  threshold?: number;
  delay?: number; // ms — used for staggered reveals
  rootMargin?: string;
  variant?: RevealVariant;
}

/**
 * useScrollReveal — returns isVisible once element crosses the viewport threshold (0.15).
 * Once visible, stays visible permanently (fire once per element).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: ScrollRevealOptions = {}) {
  const { threshold = 0.05, delay = 0, rootMargin = '0px 0px -20px 0px', variant = 'fade-up' } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion: immediately visible
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (query.matches) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Initial check: if element is already within the top viewport on load, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutId = setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(el); // fire once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, [threshold, delay, rootMargin]);

  const className = `reveal-init reveal-variant-${variant} ${isVisible ? 'reveal-visible' : ''}`;

  return { ref, isVisible, className };
}

