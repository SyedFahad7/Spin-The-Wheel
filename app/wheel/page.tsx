import { Wheel } from "@/components/Wheel";

export default function WheelPage() {
  let recordId: string | null = null;

  if (typeof window !== "undefined") {
    recordId = window.sessionStorage.getItem("bb_recordId");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full flex flex-col items-center gap-10">
        <header className="w-full flex flex-col items-center text-center gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">
            BetterBugs × QonFX
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Take your spin
          </h1>
          <p className="text-sm md:text-base text-accent/80 max-w-md">
            One spin per person. Tap the center of the wheel and let it wind
            down. We&apos;ll log your prize automatically.
          </p>
        </header>
        <Wheel recordId={recordId} />
      </div>
    </main>
  );
}


