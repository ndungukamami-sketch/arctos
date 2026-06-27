"use client";

import { useState } from "react";
import Link from "next/link";
import type { Brief } from "@/lib/briefs";
import Emblem from "./Emblem";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "delta", label: "Delta Reports" },
  { key: "briefing", label: "Briefings" },
];

function confClass(c: string): string {
  if (c === "HIGH") return "c-high";
  if (c === "MODERATE") return "c-moderate";
  return "c-limited";
}

export default function BriefsFeed({ briefs }: { briefs: Brief[] }) {
  const [filter, setFilter] = useState("all");
  const shown = briefs.filter((b) => filter === "all" || b.type === filter);

  return (
    <>
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`pill${filter === f.key ? " active" : ""}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="feed">
        {shown.map((b) => (
          <Link
            key={b.slug}
            href={`/briefs/${b.slug}`}
            className={`card${b.featured ? " feature-card" : ""}`}
            data-type={b.type}
          >
            <div className="emblem">
              <Emblem kind={b.emblem} featured={b.featured} />
            </div>
            <div className="card-body">
              <div className="card-meta">
                <span className="kind">{b.kind}</span>
                <span className={`conf ${confClass(b.confidence)}`}>
                  CONFIDENCE {b.confidence}
                </span>
                <span className="kind">{b.displayDate}</span>
              </div>
              <div className="card-title">{b.title}</div>
              <div className="card-stand">{b.standfirst}</div>
              <div className="card-foot">Read the brief &rarr;</div>
            </div>
          </Link>
        ))}

        {filter === "briefing" && shown.length === 0 && (
          <div className="empty">
            No briefings published yet. Briefings are produced before a scheduled
            meeting; the first will appear here.
          </div>
        )}
      </div>
    </>
  );
}
