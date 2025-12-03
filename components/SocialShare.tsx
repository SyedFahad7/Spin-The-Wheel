"use client";

import { useMemo, useState } from "react";

type SocialShareProps = {
  prize: string;
};

const MESSAGE_TEMPLATE =
  "I just won a {PRIZE} from @betterbugs at #QonFX! #betterbugs #QA #qonfx";

export function SocialShare({ prize }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const caption = useMemo(
    () => MESSAGE_TEMPLATE.replace("{PRIZE}", prize),
    [prize]
  );

  const url =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://betterbugs.example";

  const encodedText = encodeURIComponent(caption);
  const encodedUrl = encodeURIComponent(url);

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const redditHref = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-6 space-y-3">
      <p className="text-xs font-medium text-accent/80 uppercase tracking-[0.18em]">
        Share it
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href={linkedInHref}
          target="_blank"
          rel="noreferrer"
          className="flex-1 min-w-[120px] inline-flex items-center justify-center rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-xs font-medium text-accent hover:bg-accent/10 transition"
        >
          LinkedIn
        </a>
        <a
          href={twitterHref}
          target="_blank"
          rel="noreferrer"
          className="flex-1 min-w-[120px] inline-flex items-center justify-center rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-xs font-medium text-accent hover:bg-accent/10 transition"
        >
          Twitter
        </a>
        <a
          href={redditHref}
          target="_blank"
          rel="noreferrer"
          className="flex-1 min-w-[120px] inline-flex items-center justify-center rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-xs font-medium text-accent hover:bg-accent/10 transition"
        >
          Reddit
        </a>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="w-full inline-flex items-center justify-center rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/15 transition"
      >
        {copied ? "Caption copied" : "Copy caption"}
      </button>
      <div className="rounded-lg bg-secondary border border-accent/10 px-3 py-2 text-[11px] text-accent/80">
        {caption}
      </div>
    </div>
  );
}


