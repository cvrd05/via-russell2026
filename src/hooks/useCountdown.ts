import { useEffect, useState } from 'react';

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function computeCountdown(targetISO: string): CountdownValue {
  const diff = new Date(targetISO).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isComplete: false };
}

/** Live countdown to `targetISO`, updating every second. */
export function useCountdown(targetISO: string): CountdownValue {
  const [value, setValue] = useState(() => computeCountdown(targetISO));

  useEffect(() => {
    const interval = setInterval(() => setValue(computeCountdown(targetISO)), 1000);
    return () => clearInterval(interval);
  }, [targetISO]);

  return value;
}
