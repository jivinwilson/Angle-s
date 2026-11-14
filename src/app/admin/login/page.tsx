"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { inp, lbl, primary } from "@/components/admin/ui";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const { error } = await supabaseBrowser().auth.signInWithPassword({ email: String(f.get("email")), password: String(f.get("password")) });
    if (error) {
      setError("Email or password is incorrect.");
      setBusy(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-svh place-items-center bg-burgundy-deep p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl bg-ivory p-8 shadow-2xl">
        <p className="font-display text-4xl text-burgundy">Angel&apos;s</p>
        <p className="mt-1 text-sm text-stone">Sign in to manage the website</p>
        <label className="mt-8 block">
          <span className={lbl}>Email</span>
          <input name="email" type="email" required autoComplete="email" className={`${inp} mt-1.5`} />
        </label>
        <label className="mt-4 block">
          <span className={lbl}>Password</span>
          <input name="password" type="password" required autoComplete="current-password" className={`${inp} mt-1.5`} />
        </label>
        {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
        <button disabled={busy} className={`${primary} mt-6 w-full`}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );
}
