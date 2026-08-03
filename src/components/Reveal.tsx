import React from 'react';
import { useScrollReveal, RevealVariant } from '../hooks/useScrollReveal';

export interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  threshold = 0.1,
  className = '',
  as: Component = 'div',
}) => {
  const { ref, className: revealClassName } = useScrollReveal<HTMLElement>({
    variant: variant as RevealVariant,
    delay,
    threshold,
  });

  return (
    <Component
      ref={ref as any}
      className={`${revealClassName} ${className}`}
    >
      {children}
    </Component>
  );
};

export interface RevealStaggerProps {
  children: React.ReactNode[];
  variant?: RevealVariant;
  staggerStep?: number;
  baseDelay?: number;
  className?: string;
  itemClassName?: string;
}

export const RevealStagger: React.FC<RevealStaggerProps> = ({
  children,
  variant = 'fade-up',
  staggerStep = 100,
  baseDelay = 0,
  className = '',
  itemClassName = '',
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return (
          <Reveal
            key={child.key || index}
            variant={variant}
            delay={baseDelay + index * staggerStep}
            className={itemClassName}
          >
            {child}
          </Reveal>
        );
      })}
    </div>
  );
};
