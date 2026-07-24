import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FallingPetals from '@/components/decorative/FallingPetals';
import { bride, groom, media, weddingDateDisplay } from '@/data/weddingConfig';

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

/**
 * Page 1 — the opening screen. Built around the client-supplied
 * `printing.gif` (background-removed; see git history for the chroma-key
 * script that produced printing-frame0.png / printing-transparent.gif).
 *
 * Two-step interaction:
 *  1. 'idle' — the static first frame is shown, with a small nudging
 *     arrow pointing down at the "V&R" seal button (the click target).
 *     No names, no date, no "Open the Invitation" text yet.
 *  2. Click the button → 'printing' — the src swaps to the animated GIF
 *     (a fresh query string forces the browser to restart it from frame
 *     one rather than resuming an already-finished background load), and
 *     printsound.mp3 plays at the same moment. The GIF has no loop
 *     extension, so the browser plays it through once and freezes on the
 *     final frame natively. The couple names/date/"Open the Invitation"
 *     only fade in once BOTH the sound and the animation have finished
 *     (gated on the audio's `ended` event, since the sound effect runs
 *     longer than the 5-frame GIF) → 'revealed'.
 *  3. Click "Open the Invitation" → 'leaving' — a white layer fades in,
 *     then `onOpen()` fires once the screen is fully covered.
 *
 * Only the visual is new — the interaction contract with the parent is
 * unchanged: this component still just calls `onOpen()` once, so
 * App.tsx's isOpened/useLockBodyScroll wiring needs no changes at all.
 */
export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [stage, setStage] = useState<'idle' | 'printing' | 'revealed' | 'leaving'>('idle');
  const [playKey, setPlayKey] = useState(0);
  const soundRef = useRef<HTMLAudioElement>(null);
  const showContent = stage === 'revealed' || stage === 'leaving';

  const handlePrint = () => {
    if (stage !== 'idle') return;
    setStage('printing');
    setPlayKey((key) => key + 1);

    let settled = false;
    const reveal = () => {
      if (settled) return;
      settled = true;
      setStage('revealed');
    };

    const sound = soundRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound.addEventListener('ended', reveal, { once: true });
      void sound.play().catch(() => {
        // Playback blocked/failed — the fallback timer below still
        // reveals the text so the guest is never stuck.
      });
    }
    // Fallback in case the audio errors, is blocked, or never fires
    // 'ended' for any reason — comfortably longer than the sound effect.
    window.setTimeout(reveal, 5500);
  };

  const handleProceed = () => {
    if (stage !== 'revealed') return;
    setStage('leaving');
    window.setTimeout(() => onOpen(), 650);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-noir px-6 py-14"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      role="dialog"
      aria-label="Wedding invitation, opening screen"
    >
      {/* One-shot "printing" sound effect, played the moment the GIF starts. */}
      <audio ref={soundRef} src={media.printingSound} preload="auto" />

      <FallingPetals count={8} />

      {/*
        This wrapper (not the text around it) is what the outer
        items-center/justify-center flex actually centers, so the frame
        itself sits at the true horizontal + vertical center of the
        viewport at any screen size. The "above"/"below" text blocks are
        positioned relative to it (bottom-full / top-full) rather than
        stacked in normal flow, so their height never shifts the frame off
        center.
      */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        animate={{ opacity: stage === 'leaving' ? 0 : 1 }}
        transition={{ duration: 0.35 }}
      >
        {/*
          Fills most of the page's width (not just a small centered card).
          Aspect ratio matches the cropped printing.gif canvas exactly, so
          the button hit-area below stays aligned with the real "V&R" seal
          at any size.
        */}
        <div className="relative w-[90vw] max-w-5xl" style={{ aspectRatio: '676 / 559' }}>
          <div className="absolute inset-x-0 bottom-full mb-8 flex flex-col items-center text-center">
            <motion.p
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -8 }}
              transition={{ duration: 0.9, delay: showContent ? 0.2 : 0 }}
              className="text-eyebrow mb-3"
            >
              Together with their families
            </motion.p>
            <motion.h1
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.9, delay: showContent ? 0.35 : 0 }}
              className="font-serif text-3xl leading-tight text-ivory sm:text-4xl"
            >
              {bride.nickname} <span className="text-champagne">&amp;</span> {groom.nickname}
            </motion.h1>
            <motion.p
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.9, delay: showContent ? 0.5 : 0 }}
              className="mt-2 text-xs uppercase tracking-[0.35em] text-ash-light"
            >
              {weddingDateDisplay}
            </motion.p>
          </div>

          <img
            src={stage === 'idle' ? media.printingIdleImage : `${media.printingAnimatedImage}?play=${playKey}`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain"
          />

          {stage === 'idle' && (
            <motion.button
              type="button"
              onClick={handlePrint}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: '31.1%', top: '71.3%', width: '30%', height: '18%' }}
              aria-label="Open the invitation"
            >
              <motion.svg
                viewBox="0 0 24 56"
                fill="none"
                aria-hidden="true"
                className="absolute left-1/2 h-auto w-[26%] -translate-x-1/2 text-champagne drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                style={{ bottom: '108%' }}
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M12 2v46M12 48L2 38M12 48l10-10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.button>
          )}

          <div className="absolute inset-x-0 top-full mt-8 flex justify-center">
            <motion.button
              type="button"
              onClick={handleProceed}
              disabled={stage !== 'revealed'}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.6, delay: showContent ? 0.9 : 0 }}
              className="group relative inline-flex items-center gap-3 disabled:pointer-events-none"
            >
              <span className="animate-heartbeat font-serif text-xl italic tracking-wide text-champagne transition-colors duration-300 group-hover:text-ivory sm:text-2xl">
                Open the Invitation
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* White cross-fade cover, see handleProceed() for sequencing. */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 bg-ivory"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 'leaving' ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
