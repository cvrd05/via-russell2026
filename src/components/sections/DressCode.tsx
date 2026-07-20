import { dressCode } from '@/data/weddingConfig';
import Reveal from '@/components/ui/Reveal';
import VineDivider from '@/components/decorative/VineDivider';

function SuitIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 text-champagne" fill="none" aria-hidden="true">
      <path
        d="M20 14 12 20l4 8 4-4v28h24V24l4 4 4-8-8-6-8 6-4-4-8 4z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M28 14l4 6 4-6" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M32 20v32" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
    </svg>
  );
}

function DressIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 text-champagne" fill="none" aria-hidden="true">
      <path
        d="M26 12h12l2 8-4 3v3l10 26H18l10-26v-3l-4-3z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M26 12c0 4 2.5 6 6 6s6-2 6-6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function DressCode() {
  return (
    <section id="dress-code" className="relative py-28 sm:py-36">
      <div className="container-editorial max-w-2xl text-center">
        <Reveal>
          <p className="text-eyebrow">{dressCode.title}</p>
          <h2 className="mt-4 font-serif text-4xl text-ivory sm:text-5xl">{dressCode.heading}</h2>
          <VineDivider className="mx-auto mt-6 h-4 w-40 text-champagne/70" />

          <div className="mt-10 flex items-center justify-center gap-10">
            <SuitIcon />
            <span className="font-serif text-lg italic text-ash-light">&amp;</span>
            <DressIcon />
          </div>

          <p className="mt-8 font-serif text-2xl tracking-wide text-champagne sm:text-3xl">
            {dressCode.subheading}
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ash-light sm:text-base">
            {dressCode.message}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
