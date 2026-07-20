import { useCountdown } from '@/hooks/useCountdown';
import { weddingDateISO } from '@/data/weddingConfig';
import Reveal from '@/components/ui/Reveal';

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
      <div
        role="timer"
        aria-live="polite"
        aria-label="Countdown to the wedding"
        className="mx-auto grid max-w-xl grid-cols-4 gap-3 sm:gap-6"
      >
        {units.map((unit) => (
          <div
            key={unit.key}
            className="hairline-border flex flex-col items-center gap-2 bg-noir-soft/60 px-2 py-5 sm:py-7"
          >
            <span className="font-serif text-3xl tabular-nums text-ivory sm:text-5xl">
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
