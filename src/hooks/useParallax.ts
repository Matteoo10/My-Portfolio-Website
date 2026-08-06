import React, { useEffect, useRef, useState } from 'react';

export function useParallax(speed: number = 0.4) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (query.matches) return;

    const update = () => {
      const scrollY = window.scrollY;
      if (scrollY !== lastScrollY.current) {
        lastScrollY.current = scrollY;
        setOffset(scrollY * speed);
      }
      rafId.current = requestAnimationFrame(update);
    };

    rafId.current = requestAnimationFrame(update);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [speed]);

  const style: React.CSSProperties = {
    transform: `translateY(${offset}px)`,
    willChange: 'transform',
  };

  return { ref, style };
}

