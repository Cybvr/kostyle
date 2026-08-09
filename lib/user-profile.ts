"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type UserProfile = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

export async function ensureUserProfile(user: User) {
  if (!db) return;

  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      displayName: user.displayName ?? "",
      email: user.email ?? "",
      photoURL: user.photoURL ?? "",
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export function useUserProfile(user: User | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user || !db) {
      setProfile(null);
      return;
    }

    return onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      const data = snapshot.data();
      setProfile({
        uid: user.uid,
        displayName: typeof data?.displayName === "string" ? data.displayName : user.displayName ?? "",
        email: typeof data?.email === "string" ? data.email : user.email ?? "",
        photoURL: typeof data?.photoURL === "string" ? data.photoURL : user.photoURL ?? "",
      });
    });
  }, [user]);

  return profile;
}
