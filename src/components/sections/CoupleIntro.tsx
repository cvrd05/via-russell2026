import { coupleIntro, media } from '@/data/weddingConfig';
import SectionHeading from '@/components/ui/SectionHeading';
import ImageFrame from '@/components/ui/ImageFrame';
import FloralCorner from '@/components/decorative/FloralCorner';
import Reveal from '@/components/ui/Reveal';

export default function CoupleIntro() {
  return (
    <section id="our-story" className="relative overflow-hidden py-28 sm:py-36">
      <FloralCorner corner="top-left" />
      <FloralCorner corner="bottom-right" />

      <div className="container-editorial relative">
        <SectionHeading eyebrow="The Bride &amp; The Groom" title={coupleIntro.sectionTitle} />

        <div className="mt-20 grid gap-16 sm:mt-24 lg:grid-cols-2 lg:gap-24">
          <Reveal delay={0.05} className="flex flex-col items-center text-center">
            {/*
              Bride portrait. Replace /public/images/bride.jpg with Via's
              final chosen photo (same filename), portrait orientation
              recommended.
            */}
            <ImageFrame src={media.bridePhoto} alt={coupleIntro.bride.fullName} className="w-full max-w-sm" />
            <h3 className="mt-8 font-serif text-3xl text-ivory">{coupleIntro.bride.fullName}</h3>
            <p className="text-eyebrow mt-2">{coupleIntro.bride.nickname}</p>
            <p className="mt-6 max-w-sm text-sm italic leading-relaxed text-ash-light sm:text-base">
              {coupleIntro.bride.story}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col items-center text-center">
            {/*
              Groom portrait. Replace /public/images/groom.jpg with
              Russell's final chosen photo (same filename), portrait
              orientation recommended.
            */}
            <ImageFrame src={media.groomPhoto} alt={coupleIntro.groom.fullName} className="w-full max-w-sm" />
            <h3 className="mt-8 font-serif text-3xl text-ivory">{coupleIntro.groom.fullName}</h3>
            <p className="text-eyebrow mt-2">{coupleIntro.groom.nickname}</p>
            <p className="mt-6 max-w-sm text-sm italic leading-relaxed text-ash-light sm:text-base">
              {coupleIntro.groom.story}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
