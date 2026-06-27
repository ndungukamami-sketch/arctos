import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllBriefs, getBrief, getBriefSlugs, confClass } from "@/lib/briefs";

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
  return { title: meta.title, description: meta.standfirst };
}

export default function BriefPage({ params }: { params: { slug: string } }) {
  if (!getBriefSlugs().includes(params.slug)) notFound();
  const { meta, content } = getBrief(params.slug);

  return (
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
    </div>
  );
}
