interface ImageFrameProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
}

/** Hairline-bordered photo frame with a slow hover zoom reveal. */
export default function ImageFrame({ src, alt, className = '', aspect = 'aspect-[4/5]' }: ImageFrameProps) {
  return (
    <div className={`hairline-border group relative overflow-hidden bg-noir-soft ${aspect} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full scale-100 object-cover grayscale-[15%] transition-transform duration-[1400ms] ease-out group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ivory/10" />
    </div>
  );
}
