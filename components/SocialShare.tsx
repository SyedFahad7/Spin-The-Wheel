"use client";

import { useMemo, useState } from "react";
import { Linkedin, Twitter, Instagram, MessageCircle } from "lucide-react";

type SocialShareProps = {
  prize: string;
};

const CAPTION_TEMPLATES = [
  "Collected a {PRIZE} from the BetterBugs team at their booth during #QonFX. Appreciate the conversations around QA and product quality. #betterbugs #QA",
  "Stopped by the BetterBugs booth at #QonFX and received a {PRIZE}. Great discussions on testing workflows and improving QA practices. #betterbugs #QA",
  "Visited the BetterBugs booth at #QonFX and walked away with a {PRIZE}. Valuable insights shared on streamlining QA processes. #betterbugs #bettertesting",
  "Engaged with the BetterBugs team at #QonFX and picked up a {PRIZE}. Meaningful dialogue on modern QA and reporting tools. #betterbugs",
  "Received a {PRIZE} from BetterBugs at #QonFX. Glad to learn more about their approach to simplifying QA for engineering teams. #betterbugs #QonFX",
  "Stopped by the BetterBugs booth at #QonFX. Thank you for the {PRIZE} and the insightful discussion on improving developer–tester collaboration. #betterbugs",
  "Picked up a {PRIZE} at the BetterBugs booth during #QonFX. Impressed by their perspective on raising QA standards across teams. #QA #betterbugs",
  "Connected with the BetterBugs team at #QonFX and received a {PRIZE}. Valuable perspectives shared on elevating QA workflows. #betterbugs #QualityAssurance",
  "Visited BetterBugs at #QonFX. Thanks for the {PRIZE} and the thoughtful insights on advancing QA practices. #betterbugs",
  "Great conversation with the BetterBugs team at #QonFX today. Appreciated the {PRIZE} and the exchange of ideas on quality engineering. #betterbugs #QA"
];

export function SocialShare({ prize }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const caption = useMemo(() => {
    const randomTemplate =
      CAPTION_TEMPLATES[
        Math.floor(Math.random() * CAPTION_TEMPLATES.length)
      ];
    return randomTemplate.replace("{PRIZE}", prize);
  }, [prize]);

  const url =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://betterbugs.example";

  const encodedText = encodeURIComponent(caption);
  const encodedUrl = encodeURIComponent(url);

  // LinkedIn with pre-filled text
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  
  // Twitter/X with pre-filled text
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  
  // Instagram Stories - opens Instagram app with sticker (caption needs to be copied)
  // Note: Instagram Stories doesn't support direct URL sharing, so we'll use a deep link
  // that opens Instagram and user can paste the caption
  const instagramStoryHref = `https://www.instagram.com/create/story/`;
  
  // WhatsApp Status - uses WhatsApp API with text
  const whatsappHref = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleInstagramClick = () => {
    // Copy caption first, then open Instagram
    navigator.clipboard.writeText(caption).then(() => {
      window.open(instagramStoryHref, "_blank");
    });
  };

  return (
    <div className="mt-6 space-y-4">
      <p className="text-xs font-medium text-accent/80 uppercase tracking-[0.18em]">
        Share it
      </p>
      <div className="grid grid-cols-2 gap-3">
        <a
          href={linkedInHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-lg border border-accent/20 bg-accent/5 px-4 py-4 hover:bg-accent/10 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-6 h-6 text-accent" />
        </a>
        <a
          href={twitterHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-lg border border-accent/20 bg-accent/5 px-4 py-4 hover:bg-accent/10 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-6 h-6 text-accent" />
        </a>
        <button
          type="button"
          onClick={handleInstagramClick}
          className="inline-flex items-center justify-center rounded-lg border border-accent/20 bg-accent/5 px-4 py-4 hover:bg-accent/10 transition-colors"
          aria-label="Share on Instagram Story"
        >
          <Instagram className="w-6 h-6 text-accent" />
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-lg border border-accent/20 bg-accent/5 px-4 py-4 hover:bg-accent/10 transition-colors"
          aria-label="Share on WhatsApp Status"
        >
          <MessageCircle className="w-6 h-6 text-accent" />
        </a>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="w-full inline-flex items-center justify-center rounded-lg bg-primary/10 px-4 py-2.5 text-xs font-medium text-primary hover:bg-primary/15 transition-colors"
      >
        {copied ? "✓ Caption copied" : "Copy caption"}
      </button>
      <div className="rounded-lg bg-secondary border border-accent/10 px-3 py-2.5 text-[11px] text-accent/80 break-words">
        {caption}
      </div>
    </div>
  );
}


