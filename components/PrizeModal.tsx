"use client";

type PrizeModalProps = {
  open: boolean;
  prize: string | null;
  onClose: () => void;
};

export function PrizeModal({ open, prize, onClose }: PrizeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl bg-secondary border border-accent/20 shadow-soft p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-success mb-2">
              You hit a prize
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
              Congratulations!
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-accent/60 hover:text-accent text-sm"
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
      </div>
    </div>
  );
}


