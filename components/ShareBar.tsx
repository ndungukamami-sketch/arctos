"use client";

import { useState } from "react";

// Share links for a brief. The canonical URL is passed in, so the links work in
// the static HTML, before hydration, and always point at the real domain rather
// than whatever host the reader happens to be on. Only the copy button needs the
// browser, which is why this is a client component.
export default function ShareBar({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    { label: "X", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="sharebar">
      <span className="share-label">Share</span>
      <div className="share-links">
        {links.map((l) => (
          <a
            key={l.label}
            className="share-link"
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {l.label}
          </a>
        ))}
        <button type="button" className="share-link" onClick={copy}>
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
