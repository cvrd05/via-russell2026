import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { bride, groom, media } from '@/data/weddingConfig';
import FallingPetals from '@/components/decorative/FallingPetals';
import CountdownTimer from './CountdownTimer';

interface HeroProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
}

export default function Hero({ isPlaying, onToggleMusic }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-noir py-24"
    >
      <FallingPetals count={6} />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex w-full flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-eyebrow"
        >
          We Are Getting Married
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-6 font-serif text-4xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl"
        >
          {bride.nickname}
        </motion.h1>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="my-2 font-serif text-xl italic text-champagne sm:text-2xl"
        >
          and
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-serif text-4xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl"
        >
          {groom.nickname}
        </motion.h1>

        {/*
          Page 2 illustration. Rendered inside an aspect-ratio-locked
          container matching the artwork's native 1408x768 canvas exactly,
          so the vinyl overlay below stays correctly aligned with the
          rose/heart artwork at every viewport size instead of drifting
          out of place under object-cover cropping.
        */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="relative mt-8 w-[96vw] max-w-[960px]"
          style={{ aspectRatio: '1408 / 768' }}
        >
          <img
            src={media.invitationImage}
            alt={`${bride.fullName} and ${groom.fullName} save the date invitation`}
            className="absolute inset-0 h-full w-full rounded-sm object-cover shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
          />

          {/*
            Vinyl music player, positioned in the gap between the black
            rose ("Save Our Date") and the heart date tag below it. Shares
            isPlaying/onToggleMusic with the persistent floating control
            (MusicPlayer, see App.tsx) — one audio element, two controls.
          */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: '62.5%', top: '40%', width: '16.5%', aspectRatio: '1 / 1' }}
          >
            <div className="group relative h-full w-full">
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-noir-elevated px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-ivory opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {isPlaying ? 'Pause Our Song' : 'Play Our Song'}
              </span>

              <button
                type="button"
                onClick={onToggleMusic}
                aria-pressed={isPlaying}
                aria-label={
                  isPlaying ? `Pause ${media.weddingSongTitle}` : `Play ${media.weddingSongTitle}`
                }
                className="relative flex h-full w-full items-center justify-center rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-105"
              >
                {isPlaying && (
                  <span className="absolute inset-0 animate-pulse-ring rounded-full border border-champagne/70" />
                )}
                <span className="absolute inset-0 rounded-full ring-1 ring-champagne/50" />
                <img
                  src={media.vinylImage}
                  alt=""
                  aria-hidden="true"
                  className={`h-full w-full rounded-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-12 w-full"
        >
          <CountdownTimer />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-9 w-px bg-gradient-to-b from-champagne/70 to-transparent"
        />
      </motion.div>
    </section>
  );
}
