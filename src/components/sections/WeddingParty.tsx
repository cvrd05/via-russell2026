import { weddingParty } from '@/data/weddingConfig';
import type { WeddingPartyMember } from '@/types/wedding';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import RoseMotif from '@/components/decorative/RoseMotif';

function PartyCard({ member, delay }: { member: WeddingPartyMember; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="hairline-border group relative overflow-hidden bg-noir-soft px-6 py-8 text-center transition-colors duration-500 hover:border-champagne/60">
        <RoseMotif className="pointer-events-none absolute -bottom-4 -right-3 h-16 w-14 text-ivory/5 transition-transform duration-700 group-hover:scale-110 group-hover:text-champagne/10" />
        <p className="text-eyebrow relative">{member.role}</p>
        <p className="relative mt-4 font-serif text-xl text-ivory transition-colors duration-500 group-hover:text-champagne sm:text-2xl">
          {member.name}
        </p>
        <span className="relative mx-auto mt-5 block h-px w-8 bg-ivory/15 transition-all duration-500 group-hover:w-14 group-hover:bg-champagne/70" />
      </div>
    </Reveal>
  );
}

export default function WeddingParty() {
  return (
    <section id="wedding-party" className="relative bg-noir-soft py-28 sm:py-36">
      <div className="container-editorial">
        <SectionHeading eyebrow="Standing Beside Us" title="With Our Favorite People" />

        <div className="mt-20 grid gap-16 sm:mt-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal className="mb-8 text-center">
              <h3 className="font-serif text-2xl italic text-ash-light">Bride&rsquo;s Side</h3>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {weddingParty.brideSide.map((member, index) => (
                <PartyCard key={`${member.role}-${index}`} member={member} delay={index * 0.06} />
              ))}
            </div>
          </div>

          <div>
            <Reveal className="mb-8 text-center">
              <h3 className="font-serif text-2xl italic text-ash-light">Groom&rsquo;s Side</h3>
            </Reveal>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {weddingParty.groomSide.map((member, index) => (
                <PartyCard key={`${member.role}-${index}`} member={member} delay={index * 0.06} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
