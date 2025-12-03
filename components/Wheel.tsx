"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { PRIZES } from "@/prizes";
import { updateLeadPrize } from "@/lib/airtable";
import { PrizeModal } from "./PrizeModal";
import { SocialShare } from "./SocialShare";

const SLICE_COLORS = ["#0A84FF", "#111111", "#28C840", "#FF9500", "#FF453A"];

const SPIN_DURATION = 4500; // ms

type WheelProps = {
  recordId: string | null;
};

export function Wheel({ recordId }: WheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [prize, setPrize] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const slices = useMemo(() => PRIZES, []);
  const sliceAngle = 360 / slices.length;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const fireConfetti = () => {
    const end = Date.now() + 700;

    const frame = () => {
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.35 }
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  const spin = async () => {
    if (isSpinning || !slices.length) return;
    setIsSpinning(true);

    // Choose random index
    const index = Math.floor(Math.random() * slices.length);
    setResultIndex(index);

    // We want the pointer at the top (0deg) to land on the chosen index
    const pointerAngle = -90; // top
    const randomExtra = 360 * 5 + Math.random() * 60; // 5+ spins, slight randomness
    const target =
      360 * 4 + // base full rotations
      (360 - (index * sliceAngle + sliceAngle / 2) + pointerAngle) +
      randomExtra;

    setRotation((prev) => prev + target);

    timeoutRef.current = setTimeout(async () => {
      const wonPrize = slices[index];
      setPrize(wonPrize);
      setModalOpen(true);
      fireConfetti();
      setIsSpinning(false);

      if (recordId) {
        try {
          await updateLeadPrize(recordId, wonPrize);
        } catch (error) {
          console.error("Failed to update Airtable prize", error);
        }
      }
    }, SPIN_DURATION + 150); // a bit more than CSS duration
  };

  const radius = 160;
  const viewBoxSize = radius * 2;

  const pointer = (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-accent drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] translate-y-[-72%]" />
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <div
          className="relative rounded-full bg-secondary shadow-soft border border-accent/20 flex items-center justify-center"
          style={{
            width: "min(90vw, 440px)",
            height: "min(90vw, 440px)"
          }}
        >
          <div className="relative w-[82%] h-[82%] rounded-full bg-secondary/90 border border-accent/30 flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 transition-transform ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transitionDuration: isSpinning ? `${SPIN_DURATION}ms` : "0ms"
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
              >
                <g transform={`translate(${radius}, ${radius})`}>
                  {slices.map((label, index) => {
                    const startAngle = index * sliceAngle;
                    const endAngle = (index + 1) * sliceAngle;
                    const startRadians = (startAngle * Math.PI) / 180;
                    const endRadians = (endAngle * Math.PI) / 180;

                    const x1 = radius * Math.cos(startRadians);
                    const y1 = radius * Math.sin(startRadians);
                    const x2 = radius * Math.cos(endRadians);
                    const y2 = radius * Math.sin(endRadians);

                    const largeArcFlag = sliceAngle > 180 ? 1 : 0;

                    const pathData = [
                      `M 0 0`,
                      `L ${x1} ${y1}`,
                      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      "Z"
                    ].join(" ");

                    const midAngle = startAngle + sliceAngle / 2;
                    const textRadius = radius * 0.6;
                    const textX =
                      textRadius * Math.cos((midAngle * Math.PI) / 180);
                    const textY =
                      textRadius * Math.sin((midAngle * Math.PI) / 180);

                    const fill =
                      SLICE_COLORS[index % SLICE_COLORS.length] || "#0A84FF";

                    return (
                      <g key={label + index}>
                        <path
                          d={pathData}
                          fill={fill}
                          stroke="#111111"
                          strokeWidth={1}
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill={fill === "#111111" ? "#F2F2F2" : "#111111"}
                          fontSize={12}
                          fontWeight={600}
                          textAnchor="middle"
                          alignmentBaseline="middle"
                          transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
            {pointer}
            <button
              type="button"
              onClick={spin}
              disabled={isSpinning}
              className="relative z-10 inline-flex items-center justify-center rounded-full bg-primary px-6 py-6 text-xs sm:text-sm font-medium text-white shadow-soft hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary disabled:opacity-60 transition"
            >
              {isSpinning ? "Spinning..." : "TAP TO SPIN"}
            </button>
          </div>
        </div>
      </div>

      {prize && (
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-accent/5 border border-accent/15 p-4">
            <p className="text-xs text-accent/70 mb-1">Your result</p>
            <p className="text-lg font-semibold text-white">{prize}</p>
            <SocialShare prize={prize} />
          </div>
        </div>
      )}

      <PrizeModal
        open={modalOpen}
        prize={prize}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}


