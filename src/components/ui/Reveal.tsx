import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'span';
}

/** Fades and lifts content into view once as it scrolls into the viewport. */
export default function Reveal({ children, className, delay = 0, y = 28, as = 'div' }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = as === 'span' ? motion.span : motion.div;

  if (prefersReducedMotion) {
    const Static = as === 'span' ? 'span' : 'div';
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={{ hidden: { opacity: 0, y }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
