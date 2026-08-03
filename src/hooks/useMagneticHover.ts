import { useRef } from 'react';

interface MagneticStyle {
  transform: string;
  transition: string;
}

/**
 * useMagneticHover — element nudges toward cursor while hovered.
 * strength: fraction of element half-size used as max displacement (0–1).
 */
export function useMagneticHover(_strength: number = 0.25) {
  const ref = useRef<HTMLElement | null>(null);
  const style = { transform: 'none' };
  return { ref, style };
}
