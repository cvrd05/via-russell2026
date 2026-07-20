import VineDivider from '@/components/decorative/VineDivider';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ eyebrow, title, subtitle, light }: SectionHeadingProps) {
  return (
    <Reveal className="text-center">
      {eyebrow && <p className="text-eyebrow mb-4">{eyebrow}</p>}
      <h2 className={`text-4xl sm:text-5xl ${light ? 'text-noir' : 'text-ivory'}`}>{title}</h2>
      <VineDivider className={`mx-auto mt-6 h-4 w-40 ${light ? 'text-noir/50' : 'text-champagne/70'}`} />
      {subtitle && (
        <p className={`mx-auto mt-6 max-w-xl text-balance text-sm sm:text-base ${light ? 'text-noir/70' : 'text-ash-light'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
