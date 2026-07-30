import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  delay?: number; // ms — used for staggered reveals in lists
}

/**
 * useScrollReveal — returns isVisible once element crosses the viewport threshold.
 * Once visible, stays visible (no hiding on scroll-up).
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.12, delay = 0 } = options;
  const ref = useRef<HTMLElement | null>(null);
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

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          if (delay > 0) {
            timeoutId = setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(el); // fire once
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, delay]);

  return { ref, isVisible };
}
