// Ink emblems for the brief cards. Keyed by the frontmatter "emblem" value.
// "scale" reads as asymmetric weighing (trade), "stack" reads as server racks (data).
export default function Emblem({
  kind,
  featured,
}: {
  kind: string;
  featured?: boolean;
}) {
  const w = featured ? 136 : 96;

  if (kind === "stack") {
    return (
      <svg
        width={w}
        height={w}
        viewBox="0 0 120 120"
        fill="none"
        stroke="#EFE9DC"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <rect x="30" y="34" width="60" height="15" />
        <rect x="30" y="56" width="60" height="15" />
        <rect x="30" y="78" width="60" height="15" />
        <circle cx="40" cy="41.5" r="2.4" fill="#EFE9DC" stroke="none" />
        <circle cx="40" cy="63.5" r="2.4" fill="#EFE9DC" stroke="none" />
        <circle cx="40" cy="85.5" r="2.4" fill="#EFE9DC" stroke="none" />
        <line x1="74" y1="41.5" x2="82" y2="41.5" />
        <line x1="74" y1="63.5" x2="82" y2="63.5" />
        <line x1="74" y1="85.5" x2="82" y2="85.5" />
        <path
          d="M60 8 L62.6 17.4 L72 20 L62.6 22.6 L60 32 L57.4 22.6 L48 20 L57.4 17.4 Z"
          fill="#C63D22"
          stroke="none"
        />
      </svg>
    );
  }

  // default: scale
  return (
    <svg
      width={w}
      height={w}
      viewBox="0 0 120 120"
      fill="none"
      stroke="#EFE9DC"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 30 L60 30 L98 30" />
      <path d="M60 30 L54 50 L66 50 Z" fill="none" />
      <path d="M60 50 L60 96" />
      <path d="M40 96 L80 96" />
      <line x1="36" y1="30" x2="36" y2="46" />
      <path d="M27 46 a9 5.5 0 0 0 18 0" />
      <line x1="84" y1="30" x2="84" y2="62" />
      <path d="M75 62 a9 5.5 0 0 0 18 0" />
      <path
        d="M60 8 L62.6 17.4 L72 20 L62.6 22.6 L60 32 L57.4 22.6 L48 20 L57.4 17.4 Z"
        fill="#C63D22"
        stroke="none"
      />
    </svg>
  );
}
