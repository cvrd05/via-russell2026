import { useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { GalleryImage } from '@/types/wedding';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

interface LightboxProps {
  images: GalleryImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, activeIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = activeIndex !== null;
  useLockBodyScroll(isOpen);

  const goTo = useCallback(
    (delta: number) => {
      if (activeIndex === null) return;
      const next = (activeIndex + delta + images.length) % images.length;
      onNavigate(next);
    },
    [activeIndex, images.length, onNavigate],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') goTo(1);
      if (event.key === 'ArrowLeft') goTo(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, goTo]);

  return (
    <AnimatePresence>
      {isOpen && activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-noir/95 p-4 backdrop-blur-sm sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-ivory/25 text-ivory transition-colors hover:border-champagne hover:text-champagne sm:right-8 sm:top-8"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => goTo(-1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ivory/80 transition-colors hover:text-champagne sm:left-6"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => goTo(1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ivory/80 transition-colors hover:text-champagne sm:right-6"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M9 5l7 7-7 7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <motion.div
            key={images[activeIndex].id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hairline-border max-h-[80vh] max-w-4xl overflow-hidden bg-noir-soft"
          >
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="max-h-[80vh] w-auto object-contain"
            />
          </motion.div>

          <p className="absolute bottom-6 text-xs uppercase tracking-[0.25em] text-ash-light">
            {activeIndex + 1} / {images.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
