import { bride, footerClosingMessage, groom, venue, weddingDateDisplay } from '@/data/weddingConfig';
import RoseMotif from '@/components/decorative/RoseMotif';

export default function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-noir py-16 text-center">
      <RoseMotif className="mx-auto h-12 w-10 text-champagne/60" />

      <p className="mt-6 font-serif text-2xl text-ivory sm:text-3xl">
        {bride.fullName} &amp; {groom.fullName}
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.3em] text-ash-light">{weddingDateDisplay}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ash">
        {venue.name} &middot; {venue.city}, {venue.region}
      </p>

      <p className="mx-auto mt-10 max-w-md text-balance px-6 font-serif text-lg italic text-ash-light">
        {footerClosingMessage}
      </p>
    </footer>
  );
}
