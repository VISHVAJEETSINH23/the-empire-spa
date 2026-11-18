/** The Empire lotus, drawn from the logo so it stays sharp at any size. */
export default function LotusMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M60 68C46 54 46 22 60 4c14 18 14 50 0 64Z" />
      <path d="M60 68C42 62 30 40 35 16c14 6 24 22 25 52Z" />
      <path d="M60 68c18-6 30-28 25-52-14 6-24 22-25 52Z" />
      <path d="M60 68C38 72 14 58 4 36c20-4 44 8 56 32Z" />
      <path d="M60 68c22 4 46-10 56-32-20-4-44 8-56 32Z" />
    </svg>
  );
}
