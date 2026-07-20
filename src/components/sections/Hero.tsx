import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { bride, groom, media, venue, weddingDateDisplay } from '@/data/weddingConfig';
import FallingPetals from '@/components/decorative/FallingPetals';
import CountdownTimer from './CountdownTimer';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-noir"
    >
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        {/*
          Primary cinematic hero photo of the couple.
          Replace /public/images/couple-main.jpg with the final selected
          photo (keep the same filename, ideally a portrait/landscape shot
          at 1920px+ wide for crisp full-bleed display).
        */}
        <img
          src={media.couplePhotoMain}
          alt={`${bride.fullName} and ${groom.fullName}`}
          className="h-full w-full scale-110 object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/45 to-noir" />
        <div className="absolute inset-0 bg-noir/20" />
      </motion.div>

      <FallingPetals count={7} />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
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
          className="mt-6 font-serif text-5xl leading-[1.05] text-ivory sm:text-7xl lg:text-8xl"
        >
          {bride.fullName}
        </motion.h1>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="my-3 font-serif text-2xl italic text-champagne sm:text-3xl"
        >
          and
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-serif text-5xl leading-[1.05] text-ivory sm:text-7xl lg:text-8xl"
        >
          {groom.fullName}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-ivory/90 sm:text-base">
            {weddingDateDisplay}
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-ash-light">
            {venue.name} &middot; {venue.city}, {venue.region}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 w-full"
        >
          <CountdownTimer />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
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
