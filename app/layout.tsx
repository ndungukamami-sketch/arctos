import type { Metadata } from "next";
import "./globals.css";
import Ticker from "@/components/Ticker";
import Masthead from "@/components/Masthead";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://arctos.africa"),
  title: "Arctos: Foreign Policy Intelligence",
  description:
    "Arctos reads the agreements that bind Kenya against the constitution, treaty obligations, and precedent, and reports what the text actually says. Every claim cited.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Arctos: Foreign Policy Intelligence",
    description:
      "Referenced analysis of the agreements that bind Kenya. Every claim cited.",
    url: "https://arctos.africa",
    siteName: "Arctos",
    type: "website",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arctos: Foreign Policy Intelligence",
    description:
      "Referenced analysis of the agreements that bind Kenya. Every claim cited.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Ticker />
        <Masthead />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
