"use client";

import { useState } from "react";

// To switch on email signup, set NEXT_PUBLIC_BUTTONDOWN_USER in your Vercel
// project (Settings, Environment Variables) to your Buttondown username, then
// redeploy. Until it is set, the form shows a quiet note and collects nothing.
const BUTTONDOWN_USER = process.env.NEXT_PUBLIC_BUTTONDOWN_USER || "ARCTOS";

export default function SubscribeForm() {
  const [note, setNote] = useState("Independent. Nairobi based. No noise.");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (BUTTONDOWN_USER === "ARCTOS") {
      e.preventDefault();
      setNote(
        "Email signup is not connected yet. Set NEXT_PUBLIC_BUTTONDOWN_USER to your Buttondown username to switch it on."
      );
      return;
    }
    // Let the form post to Buttondown in the popup window.
    const w = window.open(
      "https://buttondown.email/" + BUTTONDOWN_USER,
      "popupwindow"
    );
    if (w) w.opener = null;
  }

  return (
    <div>
      <form
        className="signform"
        method="post"
        target="popupwindow"
        action={`https://buttondown.email/api/emails/embed-subscribe/${BUTTONDOWN_USER}`}
        onSubmit={onSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          aria-label="Email address"
          required
        />
        <input type="hidden" value="1" name="embed" />
        <button type="submit">Subscribe</button>
      </form>
      <div className="signnote">{note}</div>
    </div>
  );
}
