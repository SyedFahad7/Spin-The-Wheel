import { LeadForm } from "@/components/LeadForm";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 pb-4">
      <div className="max-w-5xl w-full grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
        <div className="text-accent">
          {/* <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">
            BetterBugs × QonFX
          </p> */}
          <Image src="/images/partner.png" alt="BetterBugs" width={1000} height={100} className="md:w-3/4 w-5/6 md:mb-3 md:my-0 my-6 mx-auto md:mx-0" />
          <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-1 text-white mb-4">
            <span>Spin the wheel</span>
            <Image src="/images/wheel.png" alt="Wheel" width={500} height={100} className="md:w-9 w-8" />
          </h2>
          <p className="text-sm md:text-base text-accent/80 max-w-md">
            A quick activation for curious testers & engineering leaders. Drop
            in your details, take a spin, and walk away with something you’ll
            actually use back.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <LeadForm />
        </div>
      </div>
    </main>
  );
}


