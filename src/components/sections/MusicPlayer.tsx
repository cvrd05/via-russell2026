import { media } from '@/data/weddingConfig';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

/**
 * Persistent floating vinyl control, fixed to the viewport so it stays
 * reachable no matter how far the guest has scrolled. Shares the same
 * `isPlaying`/`onToggle` state (owned by App.tsx's useMusicPlayer hook,
 * backing a single <audio> element) as the larger decorative vinyl
 * embedded in the Page 2 / Hero composition — toggling either one toggles
 * the same playback, and scrolling never stops or restarts the track.
 *
 * Audio source: /public/audio/wedding-song.mp3. Replace the file at that
 * exact path (same filename) once a licensed final track is available.
 */
export default function MusicPlayer({ isPlaying, onToggle }: MusicPlayerProps) {
  return (
    <div className="fixed bottom-5 right-4 z-[60] sm:bottom-8 sm:right-8">
      <div className="group relative flex items-center">
        <span
          role="tooltip"
          className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-sm bg-noir-elevated px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-ivory opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {isPlaying ? 'Pause Our Song' : 'Play Our Song'}
        </span>

        <button
          type="button"
          onClick={onToggle}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? `Pause ${media.weddingSongTitle}` : `Play ${media.weddingSongTitle}`}
          className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]"
        >
          {isPlaying && (
            <span className="absolute inset-0 animate-pulse-ring rounded-full border border-champagne/70" />
          )}
          <span className="absolute inset-0 rounded-full ring-1 ring-champagne/60" />
          <img
            src={media.vinylImage}
            alt=""
            aria-hidden="true"
            className={`h-full w-full rounded-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
          />
        </button>
      </div>
    </div>
  );
}
