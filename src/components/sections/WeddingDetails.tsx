import { media, venue, weddingDateDisplay, weddingTimeDisplay } from '@/data/weddingConfig';
import SectionHeading from '@/components/ui/SectionHeading';
import ImageFrame from '@/components/ui/ImageFrame';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import FloralCorner from '@/components/decorative/FloralCorner';

const details = [
  { label: 'Date', value: weddingDateDisplay },
  { label: 'Time', value: weddingTimeDisplay },
  { label: 'Venue', value: venue.name },
  { label: 'Location', value: `${venue.city}, ${venue.region}, ${venue.country}` },
];

export default function WeddingDetails() {
  return (
    <section id="wedding" className="relative overflow-hidden py-28 sm:py-36">
      <FloralCorner corner="top-right" />
      <FloralCorner corner="bottom-left" />

      <div className="container-editorial relative">
        <SectionHeading eyebrow="Save the Date" title="The Wedding" />

        <div className="mt-20 grid items-center gap-16 sm:mt-24 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            {/*
              Venue photograph. Replace /public/images/venue.jpg with a real
              photo of Sefriya Farm and Orchard once available (same
              filename), landscape orientation recommended.
            */}
            <ImageFrame src={media.venuePhoto} alt={venue.name} aspect="aspect-[4/3]" />
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-hairline">
              {details.map((detail) => (
                <div key={detail.label} className="flex items-baseline justify-between gap-6 py-5">
                  <dt className="text-eyebrow shrink-0">{detail.label}</dt>
                  <dd className="text-right font-serif text-xl text-ivory sm:text-2xl">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <Button as="a" href={venue.googleMapsUrl} target="_blank" rel="noreferrer noopener">
                View Location
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
