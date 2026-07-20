import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { loveStory } from '@/data/weddingConfig';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import RoseMotif from '@/components/decorative/RoseMotif';

export default function LoveStoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 60%'],
  });

  return (
    <section className="relative overflow-hidden bg-noir-soft py-28 sm:py-36">
      <div className="container-editorial">
        <SectionHeading eyebrow="Our Journey" title="Our Love Story" />

        <div ref={containerRef} className="relative mt-20 sm:mt-28">
          {/* Connector line, mobile (left-aligned) and desktop (centered) */}
          <div className="absolute left-[15px] top-0 h-full w-px bg-ivory/10 sm:left-1/2 sm:-translate-x-1/2">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="h-full w-full origin-top bg-gradient-to-b from-champagne via-champagne/70 to-champagne/20"
            />
          </div>

          <ol className="space-y-16 sm:space-y-24">
            {loveStory.map((chapter, index) => {
              const isEven = index % 2 === 0;
              return (
                <li key={chapter.id} className="relative sm:grid sm:grid-cols-2 sm:gap-x-16">
                  {/* Dot */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[9px] top-1.5 z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-champagne bg-noir-soft sm:left-1/2 sm:-translate-x-1/2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                  </span>

                  <div className={isEven ? 'sm:col-start-1' : 'sm:col-start-2'}>
                    <Reveal
                      y={20}
                      className={`pl-10 sm:pl-0 ${isEven ? 'sm:pr-16 sm:text-right' : 'sm:pl-16'}`}
                    >
                      <span className="text-eyebrow">{`Chapter ${index + 1}`}</span>
                      <h3 className="mt-3 font-serif text-2xl text-ivory sm:text-3xl">{chapter.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-ash-light sm:text-base">
                        {chapter.body}
                      </p>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>

          <RoseMotif className="pointer-events-none absolute -bottom-10 right-0 hidden h-24 w-20 text-ivory/10 sm:block" />
        </div>
      </div>
    </section>
  );
}
