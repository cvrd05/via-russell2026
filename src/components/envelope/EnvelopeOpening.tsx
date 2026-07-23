import { useState } from 'react';
import { motion } from 'framer-motion';
import FallingPetals from '@/components/decorative/FallingPetals';
import { bride, groom, media, weddingDateDisplay } from '@/data/weddingConfig';

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

/**
 * Page 1 — the opening screen. Built around the client-supplied
 * `page1.jpg` illustration (a black-rose frame with a printer slot).
 * `strip.jpg` animates as though it's being printed out of that slot,
 * the "Open the Invitation" call-to-action pulses near the bottom, and
 * tapping it triggers a white cross-fade into Page 2.
 *
 * Only the visual is new — the interaction contract is unchanged: this
 * component still just calls `onOpen()` once, exactly as the previous
 * envelope did, so App.tsx's isOpened/useLockBodyScroll wiring needs no
 * changes at all.
 */
export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [stage, setStage] = useState<'idle' | 'leaving'>('idle');

  const handleOpen = () => {
    if (stage === 'leaving') return;
    setStage('leaving');
    // Gives the white cover time to reach full opacity before the parent
    // unmounts this component and the outer exit fade (App-level
    // AnimatePresence, see the `exit` prop below) cross-fades the now
    // fully-white screen into Page 2 mounted behind it.
    window.setTimeout(() => onOpen(), 650);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-noir"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      role="dialog"
      aria-label="Wedding invitation, opening screen"
    >
      <FallingPetals count={8} />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        animate={{ opacity: stage === 'leaving' ? 0 : 1 }}
        transition={{ duration: 0.35 }}
      >
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-eyebrow mb-3"
        >
          Together with their families
        </motion.p>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-serif text-3xl leading-tight text-ivory sm:text-4xl"
        >
          {bride.nickname} <span className="text-champagne">&amp;</span> {groom.nickname}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-2 text-xs uppercase tracking-[0.35em] text-ash-light"
        >
          {weddingDateDisplay}
        </motion.p>

        {/* Page 1 illustration: black-rose frame with a printer slot. */}
        <div
          className="relative mt-9 w-[76vw] max-w-[380px] sm:max-w-[440px]"
          style={{ aspectRatio: '1408 / 768' }}
        >
          <img
            src={media.openingFrameImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full rounded-sm object-cover shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
          />

          {/*
            strip.jpg "printing" out of the frame's slot. Positioned as a
            percentage of the frame so it stays aligned with the slot at
            any size. Revealed top-down via an animated clip-path — the
            image's top edge stays pinned at the slot the whole time while
            progressively more of it becomes visible below, exactly like a
            photo strip being fed out of a real printer slot, rather than
            sliding or simply fading in.
          */}
          <div
            className="absolute"
            style={{ left: '43.8%', top: '26.5%', width: '12.2%' }}
            aria-hidden="true"
          >
            <div className="relative w-full" style={{ aspectRatio: '273 / 818' }}>
              <motion.img
                src={media.openingStripImage}
                alt=""
                className="absolute inset-0 h-full w-full rounded-[2px] object-cover object-top shadow-[0_14px_24px_-6px_rgba(0,0,0,0.65)]"
                initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                transition={{ duration: 1.9, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={handleOpen}
          disabled={stage === 'leaving'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
          className="group relative mt-10 inline-flex items-center gap-3 disabled:pointer-events-none"
          aria-label="Open the Invitation"
        >
          <span className="animate-heartbeat font-serif text-xl italic tracking-wide text-champagne transition-colors duration-300 group-hover:text-ivory sm:text-2xl">
            Open the Invitation
          </span>
        </motion.button>
      </motion.div>

      {/* White cross-fade cover, see handleOpen() for sequencing. */}
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
