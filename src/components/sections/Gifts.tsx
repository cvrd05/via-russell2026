import { giftInfo } from '@/data/weddingConfig';
import Reveal from '@/components/ui/Reveal';
import RoseMotif from '@/components/decorative/RoseMotif';
import VineDivider from '@/components/decorative/VineDivider';

export default function Gifts() {
  return (
    <section id="gifts" className="relative overflow-hidden bg-noir-soft py-28 sm:py-36">
      <div className="container-editorial max-w-xl text-center">
        <Reveal>
          <RoseMotif className="mx-auto h-14 w-12 text-champagne/70" />
          <h2 className="mt-6 font-serif text-4xl text-ivory sm:text-5xl">{giftInfo.heading}</h2>
          <VineDivider className="mx-auto mt-6 h-4 w-40 text-champagne/70" />
          <p className="mx-auto mt-8 text-sm leading-relaxed text-ash-light sm:text-base">
            {giftInfo.message}
          </p>

          {/*
            Editable placeholder for future gift/registry details (e.g. a
            bank transfer note or registry link). Populate
            `giftInfo.placeholderNote` in src/data/weddingConfig.ts once the
            couple decides how gifts should be sent.
          */}
          <p className="hairline-border mx-auto mt-10 max-w-sm px-6 py-4 text-xs uppercase tracking-[0.25em] text-ash">
            {giftInfo.placeholderNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
