import type { CSSProperties } from 'react';

interface PetalProps {
  className?: string;
  style?: CSSProperties;
}

/** Single rose-petal silhouette used by <FallingPetals />. */
export default function Petal({ className, style }: PetalProps) {
  return (
    <svg
      viewBox="0 0 24 28"
      className={className}
      style={style}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C4 6 0 14 2 20c1.5 4.5 6 8 10 8s8.5-3.5 10-8c2-6-2-14-10-20z"
        fill="currentColor"
      />
    </svg>
  );
}
