import Link from "next/link";

export default function Masthead() {
  return (
    <header className="mast">
      <div className="mast-inner">
        <Link className="brand" href="/">
          <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden="true">
            <path
              d="M32 2 L37.6 26.4 L62 32 L37.6 37.6 L32 62 L26.4 37.6 L2 32 L26.4 26.4 Z"
              fill="#C63D22"
            />
          </svg>
          <span className="wm">ARCTOS</span>
        </Link>
        <nav className="nav">
          <Link href="/#briefs">Briefs</Link>
          <Link href="/#about">About</Link>
          <Link className="sub" href="/#subscribe">
            Subscribe
          </Link>
        </nav>
      </div>
    </header>
  );
}
