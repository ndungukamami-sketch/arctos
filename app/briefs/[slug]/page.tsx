import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllBriefs, getBrief, getBriefSlugs, confClass } from "@/lib/briefs";
import ShareBar from "@/components/ShareBar";

export function generateStaticParams() {
  return getAllBriefs().map((b) => ({ slug: b.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  if (!getBriefSlugs().includes(params.slug)) return {};
  const { meta } = getBrief(params.slug);
  const path = `/briefs/${params.slug}`;
  return {
    title: meta.title,
    description: meta.standfirst,
    alternates: { canonical: path },
    openGraph: {
      title: meta.title,
      description: meta.standfirst,
      url: path,
      siteName: "Arctos",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.standfirst,
    },
  };
}

export default function BriefPage({ params }: { params: { slug: string } }) {
  if (!getBriefSlugs().includes(params.slug)) notFound();
  const { meta, content } = getBrief(params.slug);

  const url = `https://arctos.africa/briefs/${params.slug}`;
  const iso = /^\d{4}-\d{2}$/.test(meta.date)
    ? `${meta.date}-01`
    : new Date().toISOString().slice(0, 10);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: meta.title,
    description: meta.standfirst,
    datePublished: iso,
    dateModified: iso,
    url,
    mainEntityOfPage: url,
    articleSection: meta.kind,
    author: { "@type": "Organization", name: "Arctos", url: "https://arctos.africa" },
    publisher: {
      "@type": "Organization",
      name: "Arctos",
      url: "https://arctos.africa",
      logo: { "@type": "ImageObject", url: "https://arctos.africa/og.png" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="narrow">
      <p style={{ padding: "18px 0 0" }}>
        <Link className="backlink" href="/#briefs">
          &larr; All briefs
        </Link>
      </p>
      <article className="report">
        <div className="report-head">
          <div className="meta">
            <span className="kind">{meta.kind}</span>
            <span className={`conf ${confClass(meta.confidence)}`}>
              CONFIDENCE {meta.confidence}
            </span>
            <span className="kind">{meta.displayDate}</span>
          </div>
          <h1>{meta.title}</h1>
          <div className="rstand">{meta.standfirst}</div>
        </div>
        {meta.confidenceNote && (
          <div className="confbox">{meta.confidenceNote}</div>
        )}
        <MDXRemote
          source={content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>
      <ShareBar
        title={meta.title}
        url={`https://arctos.africa/briefs/${params.slug}`}
      />
      </div>
    </>
  );
}
