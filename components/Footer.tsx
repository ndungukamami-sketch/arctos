export default function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        <div className="foot-top">
          <svg width="18" height="18" viewBox="0 0 64 64" aria-hidden="true">
            <path
              d="M32 2 L37.6 26.4 L62 32 L37.6 37.6 L32 62 L26.4 37.6 L2 32 L26.4 26.4 Z"
              fill="#C63D22"
            />
          </svg>
          <span className="wm">ARCTOS</span>
        </div>
        <div className="footline">
          Built first for Kenya. Designed for the continent. Referenced at every
          step.
        </div>
        <div className="foot-meta">
          Independent foreign policy intelligence, Nairobi.
          <br />
          Feature photograph via Unsplash, used under the Unsplash License.
        </div>
      </div>
    </footer>
  );
}
