"use client";

import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, firebaseConfigured } from "@/lib/firebase";
import { INITIAL_CONTENT, type EditableContent } from "@/lib/data";

const LOCAL_CONTENT_KEY = "kostyle-editable-content";
const WORKSPACE_REF = db ? doc(db, "workspaces", "kostyle") : null;

function mergeContent(value: Record<string, unknown>): EditableContent {
  return {
    ...INITIAL_CONTENT,
    ...value,
    roadmap: Array.isArray(value.roadmap) ? value.roadmap : INITIAL_CONTENT.roadmap,
    campaigns: Array.isArray(value.campaigns) ? value.campaigns : INITIAL_CONTENT.campaigns,
    quickReplies: Array.isArray(value.quickReplies) ? value.quickReplies : INITIAL_CONTENT.quickReplies,
    winBack: Array.isArray(value.winBack) ? value.winBack : INITIAL_CONTENT.winBack,
    articles: Array.isArray(value.articles) ? value.articles : INITIAL_CONTENT.articles,
    seo: Array.isArray(value.seo) ? value.seo : INITIAL_CONTENT.seo,
    outreach: Array.isArray(value.outreach) ? value.outreach : INITIAL_CONTENT.outreach,
    asSeenIn: Array.isArray(value.asSeenIn) ? value.asSeenIn : INITIAL_CONTENT.asSeenIn,
    results: Array.isArray(value.results) ? value.results : INITIAL_CONTENT.results,
  } as EditableContent;
}

export function useWorkspaceContent() {
  const [content, setContent] = useState<EditableContent>(INITIAL_CONTENT);
  const [loading, setLoading] = useState(firebaseConfigured);
  const hydrated = useRef(false);

  useEffect(() => {
    if (!firebaseConfigured || !WORKSPACE_REF) {
      try {
        const raw = localStorage.getItem(LOCAL_CONTENT_KEY);
        if (raw) setContent(mergeContent(JSON.parse(raw) as Record<string, unknown>));
      } catch {
        /* Keep the local seed when browser storage is unavailable. */
      }
      hydrated.current = true;
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      WORKSPACE_REF,
      async (snapshot) => {
        if (snapshot.exists()) {
          setContent(mergeContent(snapshot.data()));
        } else {
          await setDoc(WORKSPACE_REF, INITIAL_CONTENT);
          setContent(INITIAL_CONTENT);
        }
        hydrated.current = true;
        setLoading(false);
      },
      () => {
        setLoading(false);
        hydrated.current = true;
      },
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;

    try {
      localStorage.setItem(LOCAL_CONTENT_KEY, JSON.stringify(content));
    } catch {
      /* Firestore remains the source of truth when browser storage is unavailable. */
    }

    if (firebaseConfigured && WORKSPACE_REF) {
      void setDoc(WORKSPACE_REF, content, { merge: true });
    }
  }, [content]);

  return { content, setContent, loading };
}
