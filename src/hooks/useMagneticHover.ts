import { useCallback, useEffect, useRef, useState } from 'react';

interface MagneticStyle {
  transform: string;
  transition: string;
}

/**
 * useMagneticHover — element nudges toward cursor while hovered.
 * strength: fraction of element half-size used as max displacement (0–1).
 */
export function useMagneticHover(strength: number = 0.25) {
  const ref = useRef<HTMLElement | null>(null);
  const [style, setStyle] = useState<MagneticStyle>({
    transform: 'translate(0px, 0px)',
    transition: 'transform 120ms linear',
  });
  const isHovered = useRef(false);

  // Respect prefers-reduced-motion
  const prefersReduced = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReduced.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      setStyle({
        transform: `translate(${dx}px, ${dy}px)`,
        transition: 'transform 120ms linear',
      });
    },
    [strength]
  );

  const handleMouseEnter = useCallback(() => {
    isHovered.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHovered.current = false;
    setStyle({
      transform: 'translate(0px, 0px)',
      transition: 'transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced.current) return;

    el.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { ref, style };
}
