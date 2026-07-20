import { useEffect, useRef, useState } from 'react';
import { media } from '@/data/weddingConfig';

/**
 * Floating "Play Our Song" button.
 *
 * Audio source: /public/audio/wedding-song.mp3 — this is where the couple's
 * final, licensed recording of "Can't Help Falling in Love" should live.
 * Replace the file at that exact path (same filename) once a licensed track
 * is available; nothing else needs to change.
 *
 * Never autoplays — playback only ever starts from an explicit user click,
 * per browser autoplay policy and the site's own accessibility requirements.
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-5 z-[60] sm:bottom-8 sm:right-8">
      <audio ref={audioRef} src={media.weddingSong} loop preload="none" />

      <div className="group relative flex items-center">
        <span
          role="tooltip"
          className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-sm bg-noir-elevated px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-ivory opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {isPlaying ? 'Pause Our Song' : 'Play Our Song'}
        </span>

        <button
          type="button"
          onClick={toggle}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? `Pause ${media.weddingSongTitle}` : `Play ${media.weddingSongTitle}`}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border border-champagne/60 bg-noir/90 text-ivory shadow-[0_8px_30px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-colors duration-300 hover:border-champagne sm:h-16 sm:w-16"
        >
          {isPlaying && (
            <span className="absolute inset-0 animate-pulse-ring rounded-full border border-champagne/70" />
          )}

          <span
            className={`absolute inset-[3px] rounded-full border border-champagne/25 ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/50" />
          </span>

          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="relative h-5 w-5 fill-ivory" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="0.5" />
              <rect x="14" y="5" width="4" height="14" rx="0.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="relative ml-0.5 h-5 w-5 fill-ivory" aria-hidden="true">
              <path d="M7 4.5v15l13-7.5-13-7.5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
