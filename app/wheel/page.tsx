"use client";

import { Wheel } from "@/components/Wheel";
import { Snackbar } from "@/components/Snackbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkEmailExists } from "@/lib/airtable";

export default function WheelPage() {
  const router = useRouter();
  const [recordId, setRecordId] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const checkDuplicate = async () => {
      const storedRecordId = sessionStorage.getItem("bb_recordId");
      const storedEmail = sessionStorage.getItem("bb_email");

      if (!storedRecordId || !storedEmail) {
        // No record ID or email, redirect to home
        router.push("/");
        return;
      }

      try {
        const exists = await checkEmailExists(storedEmail);
        if (exists) {
          // Check if this record already has a prize
          // If it does, show snackbar and redirect
          setShowSnackbar(true);
          setTimeout(() => {
            router.push("/");
          }, 3500);
        } else {
          setRecordId(storedRecordId);
        }
      } catch (error) {
        console.error("Error checking email:", error);
        // On error, allow them to proceed
        setRecordId(storedRecordId);
      } finally {
        setHasChecked(true);
      }
    };

    checkDuplicate();
  }, [router]);

  if (!hasChecked) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-accent/60">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full flex flex-col items-center gap-10">
        <header className="w-full flex flex-col items-center text-center gap-2">
          <Image
            src="/images/partner.png"
            alt="BetterBugs"
            width={1000}
            height={100}
            className="md:w-1/3 w-5/6 md:mb-3 md:my-0 my-6 mx-auto md:mx-0"
          />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Take your spin
          </h1>
          <p className="text-sm md:text-base text-accent/80 max-w-md">
            Tap the center of the wheel and let it wind down. We&apos;ll log
            your prize automatically.
          </p>
        </header>
        {recordId && <Wheel recordId={recordId} />}
        <Snackbar
          message="Oops! You've already spun once. Better luck next time!"
          open={showSnackbar}
          onClose={() => setShowSnackbar(false)}
        />
      </div>
    </main>
  );
}


