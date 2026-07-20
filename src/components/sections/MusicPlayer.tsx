import { useEffect, useRef, useState } from 'react';
import { media } from '@/data/weddingConfig';
import RoseMotif from '@/components/decorative/RoseMotif';

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
    <div className="fixed bottom-5 right-4 z-[60] sm:bottom-8 sm:right-8">
      <audio ref={audioRef} src={media.weddingSong} loop preload="none" />

      <button
        type="button"
        onClick={toggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? `Pause ${media.weddingSongTitle}` : `Play ${media.weddingSongTitle}`}
        className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-noir/10 bg-ivory py-3.5 pl-3.5 pr-5 text-noir shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.03] sm:py-4 sm:pl-4 sm:pr-6"
      >
        {/* Minimal floral watermark */}
        <RoseMotif
          className={`pointer-events-none absolute -right-3 -top-4 h-16 w-14 text-noir/[0.06] transition-transform duration-[6s] ease-linear ${
            isPlaying ? 'rotate-[18deg]' : 'rotate-0'
          }`}
        />

        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-noir sm:h-10 sm:w-10">
          {isPlaying && (
            <span className="absolute inset-0 animate-pulse-ring rounded-full border border-noir/70" />
          )}
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-ivory" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="0.5" />
              <rect x="14" y="5" width="4" height="14" rx="0.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-ivory" aria-hidden="true">
              <path d="M7 4.5v15l13-7.5-13-7.5z" />
            </svg>
          )}
        </span>

        <span className="relative whitespace-nowrap font-serif text-sm italic tracking-wide sm:text-base">
          {isPlaying ? 'Playing Our Song' : 'Play Our Song'}
        </span>
      </button>
    </div>
  );
}
