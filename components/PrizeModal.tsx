"use client";

import { SocialShare } from "./SocialShare";
import { useRouter } from "next/navigation";

type PrizeModalProps = {
  open: boolean;
  prize: string | null;
  onClose: () => void;
};

export function PrizeModal({ open, prize, onClose }: PrizeModalProps) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    // Redirect to home page after modal closes
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-4 overflow-y-auto">
      <div className="w-full max-w-md rounded-2xl bg-secondary border border-accent/20 shadow-soft p-6 my-auto">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-success mb-2">
              You hit a prize
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
              Congratulations!
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-accent/60 hover:text-accent text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-accent/80 mb-4">
          You&apos;ve won{" "}
          <span className="font-semibold text-white">
            {prize ?? "a surprise reward"}
          </span>
          .
        </p>
        <p className="text-xs text-accent/70 mb-6">
          Thank you for participating in the BetterBugs Spin the Wheel
          activation. A member of the team will follow up shortly so you can
          claim it.
        </p>
        {prize && <SocialShare prize={prize} />}
      </div>
    </div>
  );
}


