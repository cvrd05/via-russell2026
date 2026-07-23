import { useEffect, useRef, useState } from 'react';

export interface MusicPlayerControls {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  toggle: () => void;
}

/**
 * Owns the single shared <audio> element and play state for the whole
 * site. Mounted once at the top level (App.tsx) so the underlying
 * HTMLAudioElement never unmounts/remounts as the guest scrolls between
 * sections — playback simply continues regardless of what's on screen.
 * Both the inline vinyl (Hero / Page 2) and the persistent floating vinyl
 * control (MusicPlayer) read/toggle this same state, so there is only
 * ever one audio element and one source of truth for whether it's playing.
 */
export function useMusicPlayer(): MusicPlayerControls {
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

  return { audioRef, isPlaying, toggle };
}
