import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RoseMotif from '@/components/decorative/RoseMotif';
import FallingPetals from '@/components/decorative/FallingPetals';
import { bride, groom, weddingDateDisplay } from '@/data/weddingConfig';

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

type Stage = 'closed' | 'opening' | 'rising' | 'leaving';

/**
 * Full-screen luxury envelope intro. Clicking "Open Invitation" plays a
 * staged sequence — the flap opens, the invitation card rises out, then the
 * whole overlay dissolves to reveal the hero section underneath.
 */
export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [stage, setStage] = useState<Stage>('closed');

  const handleOpen = () => {
    if (stage !== 'closed') return;
    setStage('opening');
    window.setTimeout(() => setStage('rising'), 700);
    window.setTimeout(() => setStage('leaving'), 1650);
    window.setTimeout(() => onOpen(), 2350);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-noir"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      role="dialog"
      aria-label="Wedding invitation envelope"
    >
      <AnimatePresence>
        {stage !== 'leaving' && (
          <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0">
            <FallingPetals count={9} />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[70vmin] w-[70vmin] rounded-full bg-champagne/[0.05] blur-3xl"
      />

      <motion.div
        className="relative flex flex-col items-center px-6 text-center"
        animate={{ opacity: stage === 'leaving' ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-eyebrow mb-3">Together with their families</p>
        <h1 className="font-serif text-3xl leading-tight text-ivory sm:text-4xl">
          {bride.nickname} <span className="text-champagne">&amp;</span> {groom.nickname}
        </h1>
        <p className="mt-2 text-xs uppercase tracking-[0.35em] text-ash-light">{weddingDateDisplay}</p>

        {/* Envelope */}
        <div
          className="relative mt-12 h-[190px] w-[260px] sm:h-[220px] sm:w-[300px]"
          style={{ perspective: '1200px' }}
        >
          {/* Envelope body */}
          <div className="hairline-border absolute inset-0 top-[38px] rounded-sm bg-noir-soft shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
            <RoseMotif className="absolute bottom-2 right-2 h-10 w-9 text-ivory/10" />
          </div>

          {/* Invitation card that rises out */}
          <motion.div
            className="hairline-border absolute left-1/2 top-[30px] flex h-[150px] w-[220px] -translate-x-1/2 flex-col items-center justify-center bg-noir-elevated px-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] sm:h-[172px] sm:w-[254px]"
            initial={{ y: 0, opacity: 0, scale: 0.96 }}
            animate={
              stage === 'rising' || stage === 'leaving'
                ? { y: '-92%', opacity: 1, scale: 1 }
                : stage === 'opening'
                  ? { y: 0, opacity: 1, scale: 0.98 }
                  : { y: 0, opacity: 0, scale: 0.96 }
            }
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{ zIndex: 2 }}
          >
            <span className="text-eyebrow">Wedding Invitation</span>
            <span className="mt-3 font-serif text-lg text-ivory sm:text-xl">
              {bride.fullName}
            </span>
            <span className="my-1 text-xs uppercase tracking-[0.3em] text-champagne">and</span>
            <span className="font-serif text-lg text-ivory sm:text-xl">{groom.fullName}</span>
          </motion.div>

          {/* Envelope flap */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[78px] origin-top bg-[#17130f] sm:h-[92px]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transformStyle: 'preserve-3d',
              zIndex: stage === 'closed' || stage === 'opening' ? 3 : 1,
            }}
            animate={{ rotateX: stage === 'closed' ? 0 : -170 }}
            transition={{ duration: 0.7, ease: [0.45, 0, 0.55, 1] }}
          />

          {/* Wax seal */}
          <AnimatePresence>
            {stage === 'closed' && (
              <motion.div
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 top-[34px] z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-champagne/70 bg-noir text-champagne shadow-[0_0_18px_rgba(201,180,138,0.25)] sm:top-[42px]"
              >
                <RoseMotif className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={handleOpen}
          disabled={stage !== 'closed'}
          className="group relative mt-14 inline-flex items-center gap-4 overflow-hidden border border-champagne/60 px-10 py-4 text-xs uppercase tracking-[0.35em] text-ivory transition-colors duration-500 hover:border-champagne disabled:pointer-events-none"
        >
          <span className="absolute inset-0 -translate-x-full bg-champagne transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="relative transition-colors duration-500 group-hover:text-noir">
            {stage === 'closed' ? 'Open Invitation' : 'Opening…'}
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}
