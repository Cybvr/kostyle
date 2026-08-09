"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Link from "next/link";
import { ArrowLeft, LogOut, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth, db, firebaseConfigured } from "@/lib/firebase";
import { ensureUserProfile, useUserProfile } from "@/lib/user-profile";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(!firebaseConfigured);

  useEffect(() => {
    if (!auth) {
      setAuthReady(true);
      return;
    }

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
      if (nextUser) void ensureUserProfile(nextUser);
      else window.location.href = "/";
    });
  }, []);

  if (!firebaseConfigured) return <Unavailable />;
  if (!authReady || !user) {
    return <main className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">Loading…</main>;
  }

  return <SettingsForm user={user} />;
}

function SettingsForm({ user }: { user: User }) {
  const profile = useUserProfile(user);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) setDisplayName(profile.displayName);
  }, [profile]);

  const saveProfile = async () => {
    if (!db) return;
    setSaving(true);
    setSaved(false);
    await setDoc(
      doc(db, "users", user.uid),
      { displayName: displayName.trim(), updatedAt: serverTimestamp() },
      { merge: true },
    );
    setSaving(false);
    setSaved(true);
  };

  const logOut = async () => {
    if (auth) await signOut(auth);
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 sm:py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <Link href="/dashboard" className="mb-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-3.5" aria-hidden />
              Dashboard
            </Link>
            <h1 className="font-heading text-2xl font-medium tracking-tight">Settings</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage your KOStyle account.</p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={logOut}>
            <LogOut className="size-4" aria-hidden />
            Sign out
          </Button>
        </div>

        <Card className="gap-0 py-0">
          <div className="border-b border-border px-5 py-4">
            <CardTitle className="font-heading text-sm font-medium">Profile</CardTitle>
          </div>
          <CardContent className="space-y-5 px-5 py-5">
            <div className="space-y-1.5">
              <label htmlFor="settings-name" className="font-heading text-[10px] font-semibold uppercase tracking-[.08em] text-muted-foreground">Name</label>
              <Input id="settings-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="settings-email" className="font-heading text-[10px] font-semibold uppercase tracking-[.08em] text-muted-foreground">Email</label>
              <Input id="settings-email" value={profile?.email ?? user.email ?? ""} readOnly className="bg-muted/40" />
            </div>
            <div className="flex items-center justify-end gap-3">
              {saved ? <span className="text-xs text-muted-foreground">Saved</span> : null}
              <Button type="button" onClick={saveProfile} disabled={saving}>
                <Save className="size-4" aria-hidden />
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function Unavailable() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
        <p className="mb-2 font-heading text-[10px] font-semibold uppercase tracking-[.12em] text-accent">KOStyle</p>
        <h1 className="font-heading text-2xl font-medium tracking-tight">Settings unavailable</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Please try again shortly.</p>
      </div>
    </main>
  );
}
