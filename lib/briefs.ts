import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BRIEFS_DIR = path.join(process.cwd(), "content", "briefs");

export type Brief = {
  slug: string;
  title: string;
  kind: string; // "Delta Report" or "Briefing"
  type: "delta" | "briefing";
  confidence: "HIGH" | "MODERATE" | "LIMITED";
  date: string; // sort key, e.g. "2026-06"
  displayDate: string; // e.g. "June 2026"
  standfirst: string;
  confidenceNote: string;
  emblem: string; // "scale" or "stack"
  featured: boolean;
  order: number;
  searchText: string; // lowercased title, standfirst, kind, and body, for client search
};

// Reduce MDX body to plain lowercased text for substring search.
function toPlainText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ") // fenced code
    .replace(/`([^`]*)`/g, "$1") // inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links to their text
    .replace(/[#>*_~|]/g, " ") // markdown symbols and table pipes
    .replace(/\s+/g, " ")
    .trim();
}

export function getBriefSlugs(): string[] {
  if (!fs.existsSync(BRIEFS_DIR)) return [];
  return fs
    .readdirSync(BRIEFS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readBrief(slug: string): { meta: Brief; content: string } {
  const full = path.join(BRIEFS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const meta: Brief = {
    slug,
    title: data.title ?? "",
    kind: data.kind ?? "Delta Report",
    type: data.type === "briefing" ? "briefing" : "delta",
    confidence: (data.confidence as Brief["confidence"]) ?? "HIGH",
    date: String(data.date ?? ""),
    displayDate: data.displayDate ?? "",
    standfirst: data.standfirst ?? "",
    confidenceNote: data.confidenceNote ?? "",
    emblem: data.emblem ?? "scale",
    featured: Boolean(data.featured),
    order: Number(data.order ?? 99),
    searchText: "",
  };
  meta.searchText = [
    meta.title,
    meta.standfirst,
    meta.kind,
    meta.confidence,
    meta.displayDate,
    toPlainText(content),
  ]
    .join(" ")
    .toLowerCase();
  return { meta, content };
}

export function getAllBriefs(): Brief[] {
  return getBriefSlugs()
    .map((s) => readBrief(s).meta)
    .sort((a, b) => a.order - b.order);
}

export function getBrief(slug: string): { meta: Brief; content: string } {
  return readBrief(slug);
}

export function confClass(confidence: string): string {
  if (confidence === "HIGH") return "c-high";
  if (confidence === "MODERATE") return "c-moderate";
  return "c-limited";
}
