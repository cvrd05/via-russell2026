interface RoseMotifProps {
  className?: string;
}

/**
 * Minimalist single-line black rose illustration. Uses `currentColor` so it
 * can be tinted via text color utilities (e.g. text-ash, text-champagne).
 */
export default function RoseMotif({ className }: RoseMotifProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 60c-14-16-38-18-50-4-12 14-6 36 12 46 15 8 32 6 38-2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M100 60c14-16 38-18 50-4 12 14 6 36-12 46-15 8-32 6-38-2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M72 52c4-18 16-30 28-30s24 12 28 30c3 15-6 30-28 34-22-4-31-19-28-34z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M84 40c3-9 9-15 16-15s13 6 16 15c2 8-4 15-16 17-12-2-18-9-16-17z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M92 32c2-5 4-8 8-8s6 3 8 8"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M100 96C88 140 92 190 78 228"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M100 96c8 46 2 94 14 132"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M86 140c-10 4-22 2-28-6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M92 168c10 2 20-4 24-14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M84 140c-4 8-14 12-22 10M116 154c6 6 16 8 24 4"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
