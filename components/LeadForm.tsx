"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLead } from "@/lib/airtable";

type Props = {
  onRecordId?: (id: string) => void;
};

export function LeadForm({ onRecordId }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !company) {
      setError("Please complete all fields.");
      return;
    }

    setLoading(true);
    try {
      const id = await createLead({ name, email, company });
      if (typeof window !== "undefined") {
        sessionStorage.setItem("bb_recordId", id);
      }
      onRecordId?.(id);
      router.push("/wheel");
    } catch (err) {
      console.error(err);
      setError("Something went wrong saving your details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-accent/5 p-6 shadow-soft border border-accent/10 backdrop-blur">
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        Win Something Cool
      </h1>
      <p className="text-sm text-accent/80 mb-6">
        Share your details to get a spin.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-accent mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-secondary border border-accent/20 px-3 py-2 text-sm text-white placeholder:text-accent/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            placeholder="Alex Tester"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-accent mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-secondary border border-accent/20 px-3 py-2 text-sm text-white placeholder:text-accent/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-accent mb-1">
            Company/Organization
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-lg bg-secondary border border-accent/20 px-3 py-2 text-sm text-white placeholder:text-accent/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            placeholder="BetterBugs"
          />
        </div>
        {error && (
          <p className="text-xs text-error bg-error/10 border border-error/30 rounded-md px-3 py-2">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-soft hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-secondary disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {loading ? "Saving..." : "Next →"}
        </button>
      </form>
      <p className="mt-4 text-[11px] md:text-[14px] text-accent/50 leading-relaxed">
        Your details are used only for this activation & follow-up from
        us. No spam, ever.
      </p>
    </div>
  );
}


