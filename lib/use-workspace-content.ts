"use client";

import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, firebaseConfigured } from "@/lib/firebase";
import { INITIAL_CONTENT, type Article, type EditableContent, type QuickReply } from "@/lib/data";

const LOCAL_CONTENT_KEY = "kostyle-editable-content";
const WORKSPACE_REF = db ? doc(db, "workspaces", "kostyle") : null;

function removeUndefined(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(removeUndefined);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, entry]) => entry !== undefined)
        .map(([key, entry]) => [key, removeUndefined(entry)]),
    );
  }
  return value;
}

function normalizeQuickReplies(value: unknown): QuickReply[] | null {
  if (!Array.isArray(value)) return null;

  return value.map((item, index) => {
    const record = item && typeof item === "object" ? item as Record<string, unknown> : {};
    const legacyCommand = typeof record.cmd === "string" ? record.cmd.replace(/^\/+/, "") : "";
    const fallbackTitle = legacyCommand
      ? legacyCommand.charAt(0).toUpperCase() + legacyCommand.slice(1)
      : `Response ${index + 1}`;

    return {
      title: typeof record.title === "string" && record.title.trim() ? record.title : fallbackTitle,
      conversation:
        typeof record.conversation === "string"
          ? record.conversation
          : typeof record.reply === "string"
            ? record.reply
            : "",
    };
  });
}

function normalizeArticles(value: unknown): Article[] | null {
  if (!Array.isArray(value)) return null;

  return value.map((item, index) => {
    if (typeof item === "string") {
      const legacySeedTitles = [
        "How to choose a training hoodie that lasts",
        "What to look for in boxing shorts",
        "Training wear that works in Dubai heat",
      ];
      const seededArticle = INITIAL_CONTENT.articles[index];
      if (seededArticle && legacySeedTitles.includes(item)) {
        return { ...seededArticle, tags: [...seededArticle.tags] };
      }

      return {
        title: item,
        image: undefined,
        excerpt: "",
        body: "",
        tags: ["boxing gloves"],
        status: "draft",
        publishDate: "",
      } satisfies Article;
    }

    const record = item && typeof item === "object" ? item as Record<string, unknown> : {};
    const rawTags = Array.isArray(record.tags)
      ? record.tags.filter((tag): tag is string => typeof tag === "string")
      : typeof record.tags === "string"
        ? record.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
        : [];

    return {
      title: typeof record.title === "string" && record.title.trim() ? record.title : `Article ${index + 1}`,
      image: typeof record.image === "string" ? record.image : undefined,
      excerpt: typeof record.excerpt === "string" ? record.excerpt : "",
      body: typeof record.body === "string" ? record.body : typeof record.copy === "string" ? record.copy : "",
      tags: rawTags,
      status: record.status === "published" ? "published" : "draft",
      publishDate: typeof record.publishDate === "string" ? record.publishDate : "",
    } satisfies Article;
  });
}

function mergeContent(value: Record<string, unknown>): EditableContent {
  const quickReplies = normalizeQuickReplies(value.quickReplies);

  return {
    ...INITIAL_CONTENT,
    ...value,
    roadmap: Array.isArray(value.roadmap) ? value.roadmap : INITIAL_CONTENT.roadmap,
    campaigns: Array.isArray(value.campaigns) ? value.campaigns : INITIAL_CONTENT.campaigns,
    quickReplies: quickReplies ?? INITIAL_CONTENT.quickReplies,
    winBack: Array.isArray(value.winBack) ? value.winBack : INITIAL_CONTENT.winBack,
    articles: normalizeArticles(value.articles) ?? INITIAL_CONTENT.articles,
    seo: Array.isArray(value.seo) ? value.seo : INITIAL_CONTENT.seo,
    outreach: Array.isArray(value.outreach) ? value.outreach : INITIAL_CONTENT.outreach,
    asSeenIn: Array.isArray(value.asSeenIn) ? value.asSeenIn : INITIAL_CONTENT.asSeenIn,
    results: Array.isArray(value.results) ? value.results : INITIAL_CONTENT.results,
  } as EditableContent;
}

export function useWorkspaceContent() {
  const [content, setContent] = useState<EditableContent>(INITIAL_CONTENT);
  const [loading, setLoading] = useState(firebaseConfigured);
  const [error, setError] = useState<string | null>(null);
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
        try {
          if (snapshot.exists()) {
            setContent(mergeContent(snapshot.data()));
          } else {
            await setDoc(WORKSPACE_REF, removeUndefined(INITIAL_CONTENT) as EditableContent);
            setContent(INITIAL_CONTENT);
          }
          setError(null);
          hydrated.current = true;
          setLoading(false);
        } catch (initialWriteError: unknown) {
          setError(initialWriteError instanceof Error ? initialWriteError.message : "Unable to create the workspace.");
          hydrated.current = true;
          setLoading(false);
        }
      },
      (snapshotError) => {
        setError(snapshotError.message);
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
      void setDoc(WORKSPACE_REF, removeUndefined(content) as EditableContent, { merge: true }).catch((saveError: unknown) => {
        setError(saveError instanceof Error ? saveError.message : "Unable to save changes.");
      });
    }
  }, [content]);

  return { content, setContent, loading, error };
}
