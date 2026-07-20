import { useState } from 'react';
import { galleryImages } from '@/data/weddingConfig';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Lightbox from '@/components/ui/Lightbox';

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-28 sm:py-36">
      <div className="container-editorial">
        <SectionHeading eyebrow="A Glimpse" title="Our Moments" />

        {/*
          Gallery photos live at /public/images/gallery/photo-1.jpg through
          photo-6.jpg. Add or replace images at those exact filenames to
          update the gallery — extend the `galleryImages` array in
          src/data/weddingConfig.ts if more photos are added.
        */}
        <div className="mt-16 columns-1 gap-4 sm:mt-20 sm:columns-2 sm:gap-6 lg:columns-3 [&>*]:mb-4 sm:[&>*]:mb-6">
          {galleryImages.map((image, index) => (
            <Reveal key={image.id} delay={(index % 3) * 0.08} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group hairline-border relative block w-full overflow-hidden bg-noir-soft"
                aria-label={`View photo ${index + 1} of ${galleryImages.length}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full scale-100 object-cover opacity-90 grayscale-[10%] transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:opacity-100"
                />
                <span className="absolute inset-0 bg-noir/0 transition-colors duration-500 group-hover:bg-noir/10" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-champagne/70 bg-noir/60 text-champagne backdrop-blur-sm">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" aria-hidden="true">
                      <path
                        d="M10 4a6 6 0 104.24 10.24l4.26 4.26M10 7v6M7 10h6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        images={galleryImages}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
