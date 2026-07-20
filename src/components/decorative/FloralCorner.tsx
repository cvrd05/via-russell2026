import RoseMotif from './RoseMotif';

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface FloralCornerProps {
  corner?: Corner;
  className?: string;
}

const cornerPositionClasses: Record<Corner, string> = {
  'top-left': 'top-0 left-0 -translate-x-1/4 -translate-y-1/4',
  'top-right': 'top-0 right-0 translate-x-1/4 -translate-y-1/4 -scale-x-100',
  'bottom-left': 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4 -scale-y-100',
  'bottom-right': 'bottom-0 right-0 translate-x-1/4 translate-y-1/4 -scale-x-100 -scale-y-100',
};

/**
 * Subtle black rose accent tucked into a section corner. Purely decorative —
 * hidden from assistive tech and pointer events disabled so it never
 * interferes with content or interaction.
 */
export default function FloralCorner({ corner = 'top-left', className = '' }: FloralCornerProps) {
  return (
    <div
      className={`pointer-events-none absolute ${cornerPositionClasses[corner]} h-32 w-28 opacity-[0.14] sm:h-44 sm:w-36 ${className}`}
      aria-hidden="true"
    >
      <RoseMotif className="h-full w-full text-ivory" />
    </div>
  );
}
