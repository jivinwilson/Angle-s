export function Wordmark({ className = "", tagline }: { className?: string; tagline?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="relative font-[family-name:var(--font-cormorant)] text-[1.6em] font-normal tracking-[0.22em] pl-[0.22em]">
        ANGEL<span className="text-gold">&rsquo;</span>S
        <svg aria-hidden viewBox="0 0 200 24" className="absolute -bottom-[0.55em] right-[0.6em] w-[2.6em] text-gold" fill="none">
          <path d="M2 2c30 22 90 24 196 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </span>
      {tagline && <span className="mt-[1.1em] text-[0.42em] tracking-[0.42em] uppercase font-[family-name:var(--font-jost)] font-normal opacity-80">{tagline}</span>}
    </span>
  );
}

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M12 54 32 8l20 46" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 38c10 6 26 4 36-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
