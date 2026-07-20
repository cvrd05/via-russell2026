interface VineDividerProps {
  className?: string;
}

/** Thin decorative vine-and-leaf line used as a minimal section divider accent. */
export default function VineDivider({ className }: VineDividerProps) {
  return (
    <svg
      viewBox="0 0 320 24"
      fill="none"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12h120"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M200 12h120"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="160" cy="12" r="3" stroke="currentColor" strokeWidth="0.75" />
      <path
        d="M148 12c-4-6-12-8-18-4M172 12c4-6 12-8 18-4"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
