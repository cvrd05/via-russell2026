import { useCountdown } from '@/hooks/useCountdown';
import { weddingDateISO } from '@/data/weddingConfig';
import Reveal from '@/components/ui/Reveal';
import VineDivider from '@/components/decorative/VineDivider';

const units: { key: 'days' | 'hours' | 'minutes' | 'seconds'; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export default function CountdownTimer() {
  const countdown = useCountdown(weddingDateISO);

  if (countdown.isComplete) {
    return (
      <Reveal className="text-center">
        <p className="font-serif text-3xl italic text-champagne sm:text-4xl">Today, and always.</p>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <VineDivider className="mx-auto mb-6 h-4 w-40 text-champagne/70" />
      <div
        role="timer"
        aria-live="polite"
        aria-label="Countdown to the wedding"
        className="mx-auto grid max-w-xl grid-cols-4 gap-3 sm:gap-6"
      >
        {units.map((unit) => (
          <div
            key={unit.key}
            className="flex flex-col items-center gap-2 border border-champagne/25 bg-noir-soft/60 px-2 py-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)] sm:py-7"
          >
            <span className="font-serif text-3xl tabular-nums text-champagne-soft sm:text-5xl">
              {String(countdown[unit.key]).padStart(2, '0')}
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.25em] text-ash-light sm:text-xs">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
