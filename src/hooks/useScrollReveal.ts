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
  delay?: number;
  rootMargin?: string;
  variant?: RevealVariant;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: ScrollRevealOptions = {}) {
  const { threshold = 0.05, delay = 0, rootMargin = '0px 0px -20px 0px', variant = 'fade-up' } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (query.matches) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

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
          observer.unobserve(el);
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


