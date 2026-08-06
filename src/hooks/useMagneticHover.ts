import { useRef } from 'react';

interface MagneticStyle {
  transform: string;
  transition: string;
}

export function useMagneticHover(_strength: number = 0.25) {
  const ref = useRef<HTMLElement | null>(null);
  const style = { transform: 'none' };
  return { ref, style };
}

