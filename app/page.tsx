import Link from "next/link";
import { getAllBriefs } from "@/lib/briefs";
import BriefsFeed from "@/components/BriefsFeed";
import SubscribeForm from "@/components/SubscribeForm";

export default function Home() {
  const briefs = getAllBriefs();
  const featured = briefs.find((b) => b.featured) ?? briefs[0];

  return (
    <>
      {/* Cover, split hero */}
      <section className="cover">
        <div className="wrap">
          <div className="volrow">
            <span>No. 01</span>
            <span>A Review of Kenya&apos;s Foreign Agreements</span>
            <span>Nairobi &middot; 2026</span>
          </div>
          <div className="hero-split">
            <div className="hero-text">
              <h1 className="cover-h">
                <span>Foreign policy,</span>
                <span className="ital">on the record.</span>
              </h1>
              <p className="hero-intro">
                As the diplomatic calendar fills, the agreements that bind Kenya
                are signed in the open and read closely by almost no one. Arctos
                reads them, against the constitution, the treaties, and the
                record, and reports what the text actually says.
              </p>
              <div className="hero-cta">
                {featured && (
                  <Link className="btn-dark" href={`/briefs/${featured.slug}`}>
                    Read the latest Delta &rarr;
                  </Link>
                )}
                <Link className="btn-line" href="#subscribe">
                  Subscribe
                </Link>
              </div>
            </div>
            <div
              className="hero-image"
              role="img"
              aria-label="Arctos feature photograph"
            ></div>
          </div>
        </div>
      </section>

      {/* Deltas feed */}
      <section className="section" id="briefs">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="sec-eyebrow">The Deltas</div>
              <h2 className="sec-title">Published briefs</h2>
            </div>
          </div>
          <BriefsFeed briefs={briefs} />
        </div>
      </section>

      {/* Subscribe */}
      <section className="subscribe" id="subscribe">
        <div className="inner">
          <div>
            <h2>The brief, in your inbox</h2>
            <p>
              New analysis as it publishes, with the reference stack attached.
              Before the press conference ends.
            </p>
          </div>
          <SubscribeForm />
        </div>
      </section>

      {/* About */}
      <section className="section about" id="about">
        <div className="wrap">
          <div className="about-grid">
            <div>
              <div className="sec-eyebrow">About</div>
              <h2 className="sec-title" style={{ marginBottom: 18 }}>
                The intelligence layer between a government and the table
              </h2>
              <p>
                The most consequential agreements in Kenya&apos;s foreign
                relations are signed in the open and analysed weeks later, if at
                all, long after the moment for accountability has passed. Arctos
                closes that gap. It produces referenced analysis of treaties,
                state visits, and the deals struck between the state and foreign
                companies, grounded in the constitution, treaty obligations, and
                comparable precedent.
              </p>
              <p>
                Arctos states what a document says and what it omits. It does not
                impute motive, it labels its own confidence, and it corrects in
                the open. Built first for Kenya. Designed for the continent.
                Referenced at every step.
              </p>
            </div>
            <div className="confkey">
              <div className="sec-eyebrow" style={{ marginBottom: 14 }}>
                Every brief carries a label
              </div>
              <div className="row">
                <span className="tag c-high">HIGH</span>
                <span className="desc">
                  Full coverage of authoritative sources.
                </span>
              </div>
              <div className="row">
                <span className="tag c-moderate">MODERATE</span>
                <span className="desc">
                  Partial coverage, with the gaps named in the brief.
                </span>
              </div>
              <div className="row">
                <span className="tag c-limited">LIMITED</span>
                <span className="desc">
                  Inference where the binding text was not available.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
