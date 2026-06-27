# Arctos

Foreign policy intelligence for Kenya. A Next.js 14 publication where each brief is a single MDX file. Adding a brief is writing a file and pushing it.

## Run it locally

```
npm install
npm run dev
```

Then open http://localhost:3000. To check a production build:

```
npm run build
npm run start
```

## How the site is put together

```
app/
  layout.tsx              global chrome: ticker, masthead, footer, metadata
  page.tsx                the home page: hero, feed, subscribe, about
  briefs/[slug]/page.tsx  one page per brief, rendered from its MDX file
  globals.css             all styling, ported from the original site
components/
  Ticker, Masthead, Footer, Emblem   presentational pieces
  BriefsFeed              the filter pills and card list (client side)
  SubscribeForm           the email signup (client side)
lib/
  briefs.ts               reads the MDX files and their frontmatter
content/
  briefs/*.mdx            the briefs themselves, one file each
public/
  favicon.svg             the reference star
```

## Publishing a new brief

Create a new file in `content/briefs`, for example `content/briefs/kenya-china-rail.mdx`. The file name becomes the URL, so this one lives at `/briefs/kenya-china-rail`. Give it frontmatter and a body:

```mdx
---
title: "The brief title"
kind: "Delta Report"          # or "Briefing"
type: "delta"                  # "delta" or "briefing", drives the filter
confidence: "HIGH"             # HIGH, MODERATE, or LIMITED
date: "2026-07"                # sort key
displayDate: "July 2026"       # what readers see
standfirst: "One line that sits under the title."
confidenceNote: "CONFIDENCE: HIGH on ... MODERATE on ..."
emblem: "scale"                # "scale" or "stack"
featured: false                # true puts it in the large hero slot
order: 3                       # lower numbers sort first
---

## Bottom line

Your analysis in Markdown. Headings, lists, and tables all carry the
report styling automatically.

## The Delta

| What the public account emphasised | What the text or record shows | Assessment |
| --- | --- | --- |
| ... | ... | material omission |

## Sources

1. First source.
2. Second source.
```

Two conventions the styling relies on. The Assessment column is the last column of the Delta table, and it is set in the mono face for you. Sources are the only numbered list in a brief, and that is what gives them their annotated look. Everything else is ordinary Markdown.

Then commit and push:

```
git add .
git commit -m "Publish: the brief title"
git push
```

Vercel rebuilds and the new brief is live, with its own shareable URL, in about a minute.

## Email signup

The subscribe form is wired to Buttondown. To switch it on, set an environment variable in Vercel under Settings, Environment Variables:

```
NEXT_PUBLIC_BUTTONDOWN_USER = your-buttondown-username
```

Redeploy after setting it. Until it is set, the form shows a quiet note and collects nothing, so nothing breaks before you are ready.

## Security headers

The same headers the static site carried, including the content security policy, now live in `next.config.mjs`. Adjust them there if you add a new external source such as another font host or image domain.
