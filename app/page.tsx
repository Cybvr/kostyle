"use client";

import { useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { auth, firebaseConfigured } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/dashboard");
    });
  }, [router]);

  const signInWithGoogle = async () => {
    if (!auth) return;
    setBusy(true);
    setError(null);

    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.replace("/dashboard");
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : "Google sign-in failed.");
      setBusy(false);
    }
  };

  if (!firebaseConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
          <p className="mb-3 font-heading text-[10px] font-semibold uppercase tracking-[.12em] text-accent">KOStyle</p>
          <h1 className="font-heading text-3xl font-medium tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Sign-in is temporarily unavailable. Please try again shortly.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <section className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-8">
          <p className="mb-3 font-heading text-[10px] font-semibold uppercase tracking-[.12em] text-accent">KOStyle</p>
          <h1 className="font-heading text-3xl font-medium tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Sign in to open the KOStyle workspace.</p>
        </div>

        <Button type="button" className="h-11 w-full" onClick={signInWithGoogle} disabled={busy}>
          <FcGoogle className="size-5" aria-hidden="true" />
          {busy ? "Signing in…" : "Continue with Google"}
        </Button>

        {error ? <p className="mt-4 text-xs leading-relaxed text-destructive">{error}</p> : null}
      </section>
    </main>
  );
}
