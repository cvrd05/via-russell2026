import { schedule } from '@/data/weddingConfig';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

export default function ScheduleTimeline() {
  return (
    <section id="schedule" className="relative bg-noir-soft py-28 sm:py-36">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="The Day Unfolds"
          title="Wedding Day Schedule"
          subtitle="A detailed itinerary will be shared as the celebration draws near."
        />

        <ol className="mx-auto mt-16 max-w-2xl divide-y divide-hairline sm:mt-20">
          {schedule.map((item, index) => (
            <li key={item.id} className="group">
              <Reveal delay={index * 0.05} className="flex items-center justify-between gap-6 py-6">
                <div className="flex items-center gap-5">
                  <span className="font-serif text-sm text-champagne/80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-lg text-ivory transition-colors duration-300 group-hover:text-champagne sm:text-xl">
                    {item.title}
                  </span>
                </div>
                <span className="shrink-0 text-right text-[0.65rem] uppercase tracking-[0.2em] text-ash-light sm:text-xs">
                  {item.time}
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
