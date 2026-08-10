"use client";

import { Suspense } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Invalid PIN.");
      return;
    }

    router.replace(searchParams.get("next") || "/library");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#0b0b0b] px-4 text-[#e9e3d4]">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-[24px] bg-black p-8 shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
      >
        <p className="font-sans text-sm text-[#6f6c7a]">
          Private archive
        </p>
        <h1 className="archive-anton mt-2 text-5xl leading-none text-[#e9e3d4]">
          Retromax
        </h1>
        <label className="mt-8 block font-sans text-sm text-[#8b8795]">
          PIN
          <input
            value={pin}
            onChange={(event) => setPin(event.target.value)}
            type="password"
            inputMode="numeric"
            autoFocus
            className="mt-2 h-12 w-full rounded-full border border-[#e9e3d4]/10 bg-[#080808] px-5 font-sans text-[#e9e3d4] outline-none transition-colors focus:border-[#d4b850]"
          />
        </label>
        {error && <p className="mt-3 font-sans text-sm text-[#d4b850]">{error}</p>}
        <Button type="submit" className="mt-6 w-full" disabled={loading}>
          {loading ? "Checking" : "Enter Archive"}
        </Button>
      </form>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
