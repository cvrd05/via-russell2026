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
 *
 * Two-step interaction:
 *  1. 'idle' — only the frame is visible, with a small nudging arrow
 *     pointing at the slot/tab (the actual click target — covers the
 *     slot plus the arrow itself). No names, no date, no "Open the
 *     Invitation" text yet.
 *  2. Click the slot/arrow → 'revealed' — strip.jpg prints out of the
 *     slot, and the couple names/date/"Open the Invitation" all fade in
 *     staggered slightly after the strip starts. Nothing here animates
 *     on mount or on a generic tap-anywhere; everything is gated behind
 *     that one click.
 *  3. Click "Open the Invitation" (now visible) → 'leaving' — a white
 *     layer fades in, then `onOpen()` fires once the screen is fully
 *     covered.
 *
 * Only the visual is new — the interaction contract with the parent is
 * unchanged: this component still just calls `onOpen()` once, so
 * App.tsx's isOpened/useLockBodyScroll wiring needs no changes at all.
 */
export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [stage, setStage] = useState<'idle' | 'revealed' | 'leaving'>('idle');
  const showContent = stage !== 'idle';

  const handleReveal = () => {
    if (stage !== 'idle') return;
    setStage('revealed');
  };

  const handleProceed = () => {
    if (stage !== 'revealed') return;
    setStage('leaving');
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
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : -8 }}
          transition={{ duration: 0.8, delay: showContent ? 0.4 : 0 }}
          className="text-eyebrow mb-3"
        >
          Together with their families
        </motion.p>
        <motion.h1
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.8, delay: showContent ? 0.55 : 0 }}
          className="font-serif text-3xl leading-tight text-ivory sm:text-4xl"
        >
          {bride.nickname} <span className="text-champagne">&amp;</span> {groom.nickname}
        </motion.h1>
        <motion.p
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.8, delay: showContent ? 0.7 : 0 }}
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
            strip.jpg "printing" out of the frame's slot, triggered by
            clicking the slot/arrow (see handleReveal). Positioned as a
            percentage of the frame, measured directly off the slot's
            actual pixel bounds in page1.jpg (roughly x 42–52%, y 37–40%),
            so it stays aligned with the slot at any size. Revealed
            top-down via an animated clip-path — the top edge stays
            pinned at the slot the whole time while progressively more
            becomes visible below, matching the continuous "paper
            feeding out" motion of the reference animation rather than
            sliding or fading in place.
          */}
          <div
            className="absolute overflow-hidden"
            style={{ left: '41.9%', top: '36.5%', width: '10.6%' }}
            aria-hidden="true"
          >
            <div className="relative w-full" style={{ aspectRatio: '273 / 818' }}>
              <motion.div
                className="absolute inset-0 rounded-[1px] shadow-[0_14px_24px_-6px_rgba(0,0,0,0.65)]"
                initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                animate={{ clipPath: showContent ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }}
                transition={{ duration: 2.1, ease: 'easeOut' }}
              >
                <img
                  src={media.openingStripImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                {/* Soft shadow so the strip's leading edge blends into the slot's dark opening instead of showing a hard cut line. Clipped together with the image above since it's inside the same animated container. */}
                <div className="absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-black/80 to-transparent" />
              </motion.div>
            </div>
          </div>

          {/*
            Click target: the slot/tab plus the nudging arrow beside it —
            this (not a generic tap-anywhere) is what triggers the strip
            printing and the text reveal.
          */}
          <motion.button
            type="button"
            onClick={handleReveal}
            disabled={stage !== 'idle'}
            animate={{ opacity: stage === 'idle' ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="absolute rounded-full disabled:pointer-events-none"
            style={{ left: '39%', top: '32%', width: '30%', height: '14%' }}
            aria-label="Open the invitation"
          >
            <motion.svg
              viewBox="0 0 60 24"
              fill="none"
              aria-hidden="true"
              className="absolute h-auto text-champagne drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
              style={{ right: '-4%', top: '30%', width: '48%' }}
              animate={{ x: [0, -6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path
                d="M56 12H8M8 12l10-10M8 12l10 10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>
        </div>

        <motion.button
          type="button"
          onClick={handleProceed}
          disabled={stage !== 'revealed'}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.6, delay: showContent ? 1.9 : 0 }}
          className="group relative mt-10 inline-flex items-center gap-3 disabled:pointer-events-none"
        >
          <span className="animate-heartbeat font-serif text-xl italic tracking-wide text-champagne transition-colors duration-300 group-hover:text-ivory sm:text-2xl">
            Open the Invitation
          </span>
        </motion.button>
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
