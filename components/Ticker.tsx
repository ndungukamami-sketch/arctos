// The wire ticker. Edit ITEMS to change the scrolling developments.
const ITEMS = [
  "EACJ stays the EU and Kenya EPA implementation, November 2025",
  "Kenya appeals the regional court injunction",
  "Microsoft and G42 Olkaria data center stalls over power, May 2026",
  "A reduced 60 megawatt option is under discussion with EcoCloud",
  "The G42 definitive agreements remain unpublished",
];

export default function Ticker() {
  // Duplicate the list so the marquee can loop seamlessly.
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {loop.map((t, i) => (
          <span className="ti" key={i}>
            <span className="txt">{t}</span>
            <span className="sl">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
