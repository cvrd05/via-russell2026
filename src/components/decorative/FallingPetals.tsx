import { useMemo, type CSSProperties } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import Petal from './Petal';

interface FallingPetalsProps {
  /** Roughly how many petals drift within the section. Keep low for a tasteful, premium feel. */
  count?: number;
  className?: string;
}

interface PetalConfig {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  rotate: number;
}

function generatePetals(count: number): PetalConfig[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    size: 10 + Math.random() * 12,
    duration: 16 + Math.random() * 14,
    delay: Math.random() * -22,
    drift: (Math.random() - 0.5) * 160,
    opacity: 0.25 + Math.random() * 0.3,
    rotate: Math.random() * 360,
  }));
}

/**
 * Slow, softly-opaque black rose petals drifting down a section. Purely
 * decorative and inert — disabled entirely under prefers-reduced-motion, and
 * kept sparse so it enhances the romantic atmosphere without competing with
 * content or readability.
 */
export default function FallingPetals({ count = 10, className = '' }: FallingPetalsProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const petals = useMemo(() => generatePetals(count), [count]);

  if (prefersReducedMotion) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <Petal
          key={petal.id}
          className="absolute top-0 text-ivory/80 will-change-transform"
          style={
            {
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size * 1.15}px`,
              animation: `petal-fall ${petal.duration}s linear infinite`,
              animationDelay: `${petal.delay}s`,
              transform: `rotate(${petal.rotate}deg)`,
              '--petal-drift': `${petal.drift}px`,
              '--petal-opacity': petal.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
