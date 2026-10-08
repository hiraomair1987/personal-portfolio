/** Text wordmark in the brand's gold-to-silver treatment. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`aeth-wordmark font-display font-medium uppercase tracking-[0.3em] ${className}`}>Aetherion</span>;
}
