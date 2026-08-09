"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { SideNav } from "@/components/SideNav";
import { MediaCard } from "@/components/MediaCard";
import { AddCard } from "@/components/AddCard";
import { ImageDropField } from "@/components/ImageDropField";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CopyBox, CopyButton } from "@/components/ui/copy-box";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Loader2, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";
import { MdArticle, MdFolder } from "react-icons/md";
import {
  NAV,
  STATS,
  type EditableContent,
} from "@/lib/data";
import { auth, enableAuthPersistence, firebaseConfigured } from "@/lib/firebase";
import { uploadImageDataUrl, uploadImageFile } from "@/lib/storage";
import { useWorkspaceContent } from "@/lib/use-workspace-content";
import { ensureUserProfile, useUserProfile } from "@/lib/user-profile";

const STORAGE_KEY = "kostyle-roadmap-done";

type EditorSection =
  | "roadmap"
  | "campaigns"
  | "whatsapp"
  | "win-back"
  | "articles"
  | "seo"
  | "about"
  | "outreach"
  | "as-seen-in"
  | "results";

type EditorState = { section: EditorSection; index: number; mode: "add" | "edit" } | null;
type EditorDraft = Record<string, string>;
type ImageSection = "campaigns" | "outreach" | "articles";

function getDraft(content: EditableContent, section: EditorSection, index: number): EditorDraft {
  switch (section) {
    case "roadmap": {
      const item = content.roadmap[index];
      return { task: item.task, desc: item.desc, unit: item.unit };
    }
    case "campaigns": {
      const item = content.campaigns[index];
      return { label: item.label, copy: item.copy, image: item.image ?? "" };
    }
    case "whatsapp": {
      const item = content.quickReplies[index];
      return { title: item.title, conversation: item.conversation };
    }
    case "win-back": {
      const item = content.winBack[index];
      return { name: item.name, copy: item.copy };
    }
    case "articles": {
      const item = content.articles[index];
      return {
        title: item.title,
        image: item.image ?? "",
        excerpt: item.excerpt,
        body: item.body,
        tags: item.tags.join(", "),
        status: item.status,
        publishDate: item.publishDate,
      };
    }
    case "seo": {
      const item = content.seo[index];
      return { page: item.page, title: item.title, desc: item.desc };
    }
    case "about":
      return { founderStory: content.founderStory, pressKitUrl: content.pressKitUrl };
    case "outreach": {
      const item = content.outreach[index];
      return { kind: item.kind, subject: item.subject, body: item.body, image: item.image ?? "" };
    }
    case "as-seen-in": {
      const item = content.asSeenIn[index];
      return { name: item.name, copy: item.copy };
    }
    case "results": {
      const item = content.results[index];
      return { measure: item.measure, start: item.start, end: item.end };
    }
  }
}

function getBlankDraft(content: EditableContent, section: EditorSection): EditorDraft {
  switch (section) {
    case "roadmap":
      return { task: "", desc: "", unit: "" };
    case "campaigns":
      return { label: "New campaign", copy: "", image: "" };
    case "whatsapp":
      return { title: "New response", conversation: "" };
    case "win-back":
      return { name: "New post", copy: "" };
    case "articles":
      return { title: "", image: "", excerpt: "", body: "", tags: "boxing gloves, training", status: "draft", publishDate: "" };
    case "seo":
      return { page: "", title: "", desc: "" };
    case "about":
      return { founderStory: content.founderStory, pressKitUrl: content.pressKitUrl };
    case "outreach":
      return { kind: "New message", subject: "", body: "", image: "" };
    case "as-seen-in":
      return { name: "New asset", copy: "" };
    case "results":
      return { measure: "", start: "", end: "" };
  }
}

function updateAt<T>(items: T[], index: number, update: (item: T) => T) {
  return items.map((item, itemIndex) => (itemIndex === index ? update(item) : item));
}

function parseTags(value: string | undefined) {
  return (value ?? "").split(",").map((tag) => tag.trim()).filter(Boolean);
}


/** Right-aligned row action column: copy only — click the row itself to edit. */
function RowActions({ copyValue }: { copyValue?: string }) {
  if (copyValue === undefined) return null;
  return (
    <div className="flex items-center justify-end" onClick={(event) => event.stopPropagation()}>
      <CopyButton value={copyValue} />
    </div>
  );
}

/** Row wrapper: click anywhere to open the edit sheet, matching MediaCard's click-to-edit pattern. */
function EditableRow({
  onEdit,
  className,
  children,
}: {
  onEdit: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <TableRow
      role="button"
      tabIndex={0}
      onClick={onEdit}
      onKeyDown={(event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onEdit();
        }
      }}
      className={cn("cursor-pointer hover:bg-muted/40", className)}
    >
      {children}
    </TableRow>
  );
}

function EditableTemplate({
  title,
  conversation,
  onEdit,
}: {
  title: string;
  conversation: string;
  onEdit: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onEdit}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onEdit();
        }
      }}
      className="flex cursor-pointer items-start gap-4 px-4 py-4 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
    >
      <div className="min-w-0 flex-1">
        <p className="font-heading text-sm font-semibold tracking-tight text-foreground">{title}</p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground/80">{conversation}</p>
      </div>
      <div className="shrink-0 pt-0.5" onClick={(event) => event.stopPropagation()}>
        <CopyButton value={conversation} />
      </div>
    </div>
  );
}

function Panel({
  id,
  title,
  action,
  onAdd,
  className,
  bodyClassName,
  children,
}: {
  id?: string;
  title: ReactNode;
  action?: ReactNode;
  onAdd?: () => void;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <Card id={id} className={cn("scroll-mt-20 gap-0 overflow-hidden py-0", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-heading text-sm font-medium leading-none tracking-tight text-foreground">
            {title}
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {action}
          {onAdd && (
            <Button
              type="button"
              size="icon-xs"
              variant="outline"
              onClick={onAdd}
              aria-label={`Add to ${typeof title === "string" ? title : "card"}`}
            >
              <Plus className="size-4" />
            </Button>
          )}
        </div>
      </div>
      <div className={cn("px-5 py-5", bodyClassName)}>{children}</div>
    </Card>
  );
}

function EditorField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="font-heading text-[10px] font-semibold uppercase tracking-[.08em] text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

const thCls = "font-heading text-xs font-semibold uppercase tracking-[.06em] text-muted-foreground";

function FirebaseSetupNotice() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
        <p className="mb-2 font-heading text-[10px] font-semibold uppercase tracking-[.12em] text-accent">KOStyle</p>
        <h1 className="font-heading text-2xl font-medium tracking-tight">Dashboard unavailable</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Please return to the sign-in page and try again shortly.</p>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(!firebaseConfigured);

  useEffect(() => {
    const currentAuth = auth;
    if (!currentAuth) {
      setAuthReady(true);
      return;
    }

    let unsubscribe = () => {};
    let cancelled = false;

    void enableAuthPersistence().catch(() => undefined).then(() => {
      if (cancelled) return;
      unsubscribe = onAuthStateChanged(currentAuth, (nextUser) => {
        setUser(nextUser);
        setAuthReady(true);
        if (nextUser) void ensureUserProfile(nextUser);
        if (!nextUser) router.replace("/");
      });
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [router]);

  if (!firebaseConfigured) return <FirebaseSetupNotice />;
  if (!authReady || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background" aria-busy="true" aria-label="Loading dashboard">
        <Skeleton className="h-5 w-40" />
      </main>
    );
  }

  return <DashboardWorkspace user={user} />;
}

function DashboardWorkspace({ user }: { user: User }) {
  const [done, setDone] = useState<Set<number>>(new Set());
  const [navOpen, setNavOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [editor, setEditor] = useState<EditorState>(null);
  const [draft, setDraft] = useState<EditorDraft>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [generatePrompt, setGeneratePrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const { content, setContent, error: contentError } = useWorkspaceContent();
  const profile = useUserProfile(user);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(new Set(JSON.parse(raw) as number[]));
    } catch {
      /* ignore */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...done]));
    } catch {
      /* ignore */
    }
  }, [done]);

  const toggle = (n: number) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });

  const total = content.roadmap.length;
  const doneCount = done.size;
  const publishedArticles = content.articles.filter((article) => article.status === "published").length;
  const contentStats = [
    { label: "Roadmap tasks", value: total, detail: `${doneCount} complete` },
    { label: "Campaign assets", value: content.campaigns.length, detail: "Drop kit" },
    { label: "WhatsApp responses", value: content.quickReplies.length, detail: "Saved templates" },
    { label: "Win-back posts", value: content.winBack.length, detail: "Referral ready" },
    { label: "Articles", value: content.articles.length, detail: `${publishedArticles} published` },
    { label: "SEO entries", value: content.seo.length, detail: "Pages covered" },
    { label: "Outreach messages", value: content.outreach.length, detail: "Press + podcast" },
    { label: "Coverage assets", value: content.asSeenIn.length, detail: "As seen in" },
    { label: "Results rows", value: content.results.length, detail: "Tracked outputs" },
    { label: "About assets", value: 2, detail: "Story + press kit" },
  ];

  const openEditor = (section: EditorSection, index = 0, mode: "add" | "edit" = "add") => {
    setEditor({ section, index, mode });
    setDraft(mode === "add" ? getBlankDraft(content, section) : getDraft(content, section, index));
    setEditorError(null);
    setGeneratePrompt("");
  };

  const updateDraft = (field: string, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const generateContent = async () => {
    if (!editor || generating) return;
    setGenerating(true);
    setEditorError(null);

    try {
      const idToken = await user.getIdToken();
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          section: editor.section,
          instruction: generatePrompt.trim(),
          draft,
        }),
      });
      const payload = await response.json() as { fields?: Record<string, string>; error?: string };
      if (!response.ok) throw new Error(payload.error || "Unable to generate content.");
      if (!payload.fields) throw new Error("The generator returned no content.");

      setDraft((previous) => ({ ...previous, ...payload.fields }));
      setGeneratePrompt("");
    } catch (generateError: unknown) {
      setEditorError(generateError instanceof Error ? generateError.message : "Unable to generate content.");
    } finally {
      setGenerating(false);
    }
  };

  const handleCardImageDrop = async (section: ImageSection, index: number, file: File) => {
    const uploadKey = `${section}-${index}`;
    setUploadingImage(uploadKey);
    setImageUploadError(null);

    try {
      const image = await uploadImageFile(file, section);
      if (!image) return;

      setContent((prev) => {
        switch (section) {
          case "campaigns":
            return { ...prev, campaigns: updateAt(prev.campaigns, index, (item) => ({ ...item, image })) };
          case "outreach":
            return { ...prev, outreach: updateAt(prev.outreach, index, (item) => ({ ...item, image })) };
          case "articles":
            return { ...prev, articles: updateAt(prev.articles, index, (item) => ({ ...item, image })) };
        }
      });
    } catch (uploadError: unknown) {
      setImageUploadError(uploadError instanceof Error ? uploadError.message : "Unable to upload that image.");
    } finally {
      setUploadingImage(null);
    }
  };

  const selectEditorItem = (value: string) => {
    if (!editor) return;
    const index = Number(value);
    setEditor({ ...editor, index, mode: "edit" });
    setDraft(getDraft(content, editor.section, index));
  };

  const saveEditor = async () => {
    if (!editor || saving) return;
    setSaving(true);
    setEditorError(null);

    try {
      const uploadedImage = editor.section === "campaigns" || editor.section === "outreach" || editor.section === "articles"
        ? await uploadImageDataUrl(draft.image || undefined, editor.section)
        : undefined;

      if (editor.mode === "add") {
        setContent((prev) => {
          switch (editor.section) {
            case "roadmap":
              return { ...prev, roadmap: [...prev.roadmap, { n: Math.max(0, ...prev.roadmap.map((item) => item.n)) + 1, task: draft.task ?? "", desc: draft.desc ?? "", unit: draft.unit ?? "" }] };
            case "campaigns":
              return { ...prev, campaigns: [...prev.campaigns, { label: draft.label ?? "New campaign", copy: draft.copy ?? "", image: uploadedImage }] };
            case "whatsapp":
              return { ...prev, quickReplies: [...prev.quickReplies, { title: draft.title ?? "New response", conversation: draft.conversation ?? "" }] };
            case "win-back":
              return { ...prev, winBack: [...prev.winBack, { name: draft.name ?? "New post", copy: draft.copy ?? "" }] };
            case "articles":
              return {
                ...prev,
                articles: [
                  ...prev.articles,
                  {
                    title: draft.title ?? "New article",
                    image: uploadedImage,
                    excerpt: draft.excerpt ?? "",
                    body: draft.body ?? "",
                    tags: parseTags(draft.tags),
                    status: draft.status === "published" ? "published" : "draft",
                    publishDate: draft.publishDate ?? "",
                  },
                ],
              };
            case "seo":
              return { ...prev, seo: [...prev.seo, { page: draft.page ?? "", title: draft.title ?? "", desc: draft.desc ?? "", copy: true }] };
            case "outreach":
              return { ...prev, outreach: [...prev.outreach, { kind: draft.kind ?? "New message", subject: draft.subject ?? "", body: draft.body ?? "", image: uploadedImage }] };
            case "as-seen-in":
              return { ...prev, asSeenIn: [...prev.asSeenIn, { name: draft.name ?? "New asset", copy: draft.copy ?? "" }] };
            case "results":
              return { ...prev, results: [...prev.results, { measure: draft.measure ?? "", start: draft.start ?? "", end: draft.end ?? "" }] };
            case "about":
              return prev;
          }
        });
      } else {
        setContent((prev) => {
          switch (editor.section) {
            case "roadmap":
              return { ...prev, roadmap: updateAt(prev.roadmap, editor.index, (item) => ({ ...item, task: draft.task ?? "", desc: draft.desc ?? "", unit: draft.unit ?? "" })) };
            case "campaigns":
              return { ...prev, campaigns: updateAt(prev.campaigns, editor.index, (item) => ({ ...item, label: draft.label ?? "", copy: draft.copy ?? "", image: uploadedImage })) };
            case "whatsapp":
              return { ...prev, quickReplies: updateAt(prev.quickReplies, editor.index, (item) => ({ ...item, title: draft.title ?? "", conversation: draft.conversation ?? "" })) };
            case "win-back":
              return { ...prev, winBack: updateAt(prev.winBack, editor.index, (item) => ({ ...item, name: draft.name ?? "", copy: draft.copy ?? "" })) };
            case "articles":
              return {
                ...prev,
                articles: updateAt(prev.articles, editor.index, (item) => ({
                  ...item,
                  title: draft.title ?? "",
                  image: uploadedImage,
                  excerpt: draft.excerpt ?? "",
                  body: draft.body ?? "",
                  tags: parseTags(draft.tags),
                  status: draft.status === "published" ? "published" : "draft",
                  publishDate: draft.publishDate ?? "",
                })),
              };
            case "seo":
              return { ...prev, seo: updateAt(prev.seo, editor.index, (item) => ({ ...item, page: draft.page ?? "", title: draft.title ?? "", desc: draft.desc ?? "" })) };
            case "about":
              return { ...prev, founderStory: draft.founderStory ?? "", pressKitUrl: draft.pressKitUrl ?? "" };
            case "outreach":
              return { ...prev, outreach: updateAt(prev.outreach, editor.index, (item) => ({ ...item, kind: draft.kind ?? "", subject: draft.subject ?? "", body: draft.body ?? "", image: uploadedImage })) };
            case "as-seen-in":
              return { ...prev, asSeenIn: updateAt(prev.asSeenIn, editor.index, (item) => ({ ...item, name: draft.name ?? "", copy: draft.copy ?? "" })) };
            case "results":
              return { ...prev, results: updateAt(prev.results, editor.index, (item) => ({ ...item, measure: draft.measure ?? "", start: draft.start ?? "", end: draft.end ?? "" })) };
          }
        });
      }
      setEditor(null);
    } catch (saveError: unknown) {
      setEditorError(saveError instanceof Error ? saveError.message : "Unable to upload the image.");
    } finally {
      setSaving(false);
    }
  };

  const deleteEditorItem = () => {
    if (!editor || editor.mode !== "edit" || editor.section === "about") return;

    setContent((prev) => {
      switch (editor.section) {
        case "roadmap":
          return { ...prev, roadmap: prev.roadmap.filter((_, index) => index !== editor.index) };
        case "campaigns":
          return { ...prev, campaigns: prev.campaigns.filter((_, index) => index !== editor.index) };
        case "whatsapp":
          return { ...prev, quickReplies: prev.quickReplies.filter((_, index) => index !== editor.index) };
        case "win-back":
          return { ...prev, winBack: prev.winBack.filter((_, index) => index !== editor.index) };
        case "articles":
          return { ...prev, articles: prev.articles.filter((_, index) => index !== editor.index) };
        case "seo":
          return { ...prev, seo: prev.seo.filter((_, index) => index !== editor.index) };
        case "outreach":
          return { ...prev, outreach: prev.outreach.filter((_, index) => index !== editor.index) };
        case "as-seen-in":
          return { ...prev, asSeenIn: prev.asSeenIn.filter((_, index) => index !== editor.index) };
        case "results":
          return { ...prev, results: prev.results.filter((_, index) => index !== editor.index) };
        case "about":
          return prev;
      }
    });
    setDeleteDialogOpen(false);
    setEditor(null);
  };

  const editorOptions = editor
    ? {
        roadmap: content.roadmap.map((item) => item.task),
        campaigns: content.campaigns.map((item) => item.label),
        whatsapp: content.quickReplies.map((item) => item.title),
        "win-back": content.winBack.map((item) => item.name),
        articles: content.articles.map((item) => item.title),
        seo: content.seo.map((item) => item.page),
        about: ["Founder story + press kit"],
        outreach: content.outreach.map((item) => item.kind),
        "as-seen-in": content.asSeenIn.map((item) => item.name),
        results: content.results.map((item) => item.measure),
      }[editor.section]
    : [];

  const editorTitles: Record<EditorSection, string> = {
    roadmap: "roadmap task",
    campaigns: "campaign copy",
    whatsapp: "WhatsApp response template",
    "win-back": "win-back copy",
    articles: "buying-guide article",
    seo: "SEO content",
    about: "about content",
    outreach: "outreach message",
    "as-seen-in": "coverage asset",
    results: "result",
  };

  const itemPicker = editor && editor.mode === "edit" && editorOptions.length > 1 ? (
    <EditorField label="Item">
      <Select value={String(editor.index)} onValueChange={selectEditorItem}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {editorOptions.map((option, index) => (
            <SelectItem key={`${option}-${index}`} value={String(index)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </EditorField>
  ) : null;

  const renderEditorForm = () => {
    if (!editor) return null;

    switch (editor.section) {
      case "roadmap":
        return (
          <div className="space-y-5">
            {itemPicker}
            <EditorField label="Task" htmlFor="editor-task">
              <Input id="editor-task" value={draft.task ?? ""} onChange={(event) => updateDraft("task", event.target.value)} />
            </EditorField>
            <EditorField label="Unit / quantity" htmlFor="editor-unit">
              <Input id="editor-unit" value={draft.unit ?? ""} onChange={(event) => updateDraft("unit", event.target.value)} />
            </EditorField>
            <EditorField label="Description" htmlFor="editor-desc">
              <Textarea id="editor-desc" value={draft.desc ?? ""} onChange={(event) => updateDraft("desc", event.target.value)} />
            </EditorField>
          </div>
        );
      case "campaigns":
        return (
          <div className="space-y-5">
            <EditorField label="Image">
              <ImageDropField
                value={draft.image || undefined}
                onChange={(dataUrl) => updateDraft("image", dataUrl ?? "")}
              />
            </EditorField>
            {itemPicker}
            <EditorField label="Card title" htmlFor="editor-label">
              <Input id="editor-label" value={draft.label ?? ""} onChange={(event) => updateDraft("label", event.target.value)} />
            </EditorField>
            <EditorField label="Copy" htmlFor="editor-copy">
              <Textarea id="editor-copy" className="min-h-40" value={draft.copy ?? ""} onChange={(event) => updateDraft("copy", event.target.value)} />
            </EditorField>
          </div>
        );
      case "whatsapp":
        return (
          <div className="space-y-5">
            {itemPicker}
            <EditorField label="Response title" htmlFor="editor-title">
              <Input id="editor-title" value={draft.title ?? ""} onChange={(event) => updateDraft("title", event.target.value)} />
            </EditorField>
            <EditorField label="Conversation" htmlFor="editor-conversation">
              <Textarea id="editor-conversation" className="min-h-56" value={draft.conversation ?? ""} onChange={(event) => updateDraft("conversation", event.target.value)} />
            </EditorField>
          </div>
        );
      case "win-back":
        return (
          <div className="space-y-5">
            {itemPicker}
            <EditorField label="Name" htmlFor="editor-name">
              <Input id="editor-name" value={draft.name ?? ""} onChange={(event) => updateDraft("name", event.target.value)} />
            </EditorField>
            <EditorField label="Copy" htmlFor="editor-copy">
              <Textarea id="editor-copy" className="min-h-32" value={draft.copy ?? ""} onChange={(event) => updateDraft("copy", event.target.value)} />
            </EditorField>
          </div>
        );
      case "articles":
        return (
          <div className="space-y-5">
            <EditorField label="Article image">
              <ImageDropField
                value={draft.image || undefined}
                onChange={(dataUrl) => updateDraft("image", dataUrl ?? "")}
              />
            </EditorField>
            {itemPicker}
            <EditorField label="Article title" htmlFor="editor-title">
              <Input id="editor-title" value={draft.title ?? ""} onChange={(event) => updateDraft("title", event.target.value)} />
            </EditorField>
            <EditorField label="Excerpt" htmlFor="editor-excerpt">
              <Textarea id="editor-excerpt" className="min-h-24" value={draft.excerpt ?? ""} onChange={(event) => updateDraft("excerpt", event.target.value)} />
            </EditorField>
            <EditorField label="Article content" htmlFor="editor-article-body">
              <Textarea id="editor-article-body" className="min-h-72" value={draft.body ?? ""} onChange={(event) => updateDraft("body", event.target.value)} />
            </EditorField>
            <EditorField label="Tags" htmlFor="editor-tags">
              <Input id="editor-tags" placeholder="boxing gloves, training, care" value={draft.tags ?? ""} onChange={(event) => updateDraft("tags", event.target.value)} />
              <p className="text-xs text-muted-foreground">Separate tags with commas.</p>
            </EditorField>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <EditorField label="Publish status">
                <Select value={draft.status ?? "draft"} onValueChange={(value) => updateDraft("status", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </EditorField>
              <EditorField label="Publish date" htmlFor="editor-publish-date">
                <Input id="editor-publish-date" type="date" value={draft.publishDate ?? ""} onChange={(event) => updateDraft("publishDate", event.target.value)} />
              </EditorField>
            </div>
          </div>
        );
      case "seo":
        return (
          <div className="space-y-5">
            {itemPicker}
            <EditorField label="Page" htmlFor="editor-page">
              <Input id="editor-page" value={draft.page ?? ""} onChange={(event) => updateDraft("page", event.target.value)} />
            </EditorField>
            <EditorField label="Title" htmlFor="editor-title">
              <Input id="editor-title" value={draft.title ?? ""} onChange={(event) => updateDraft("title", event.target.value)} />
            </EditorField>
            <EditorField label="Description" htmlFor="editor-desc">
              <Textarea id="editor-desc" className="min-h-32" value={draft.desc ?? ""} onChange={(event) => updateDraft("desc", event.target.value)} />
            </EditorField>
          </div>
        );
      case "about":
        return (
          <div className="space-y-5">
            <EditorField label="Founder story" htmlFor="editor-founder-story">
              <Textarea id="editor-founder-story" className="min-h-56" value={draft.founderStory ?? ""} onChange={(event) => updateDraft("founderStory", event.target.value)} />
            </EditorField>
            <EditorField label="Press kit URL" htmlFor="editor-press-kit-url">
              <Input id="editor-press-kit-url" type="url" value={draft.pressKitUrl ?? ""} onChange={(event) => updateDraft("pressKitUrl", event.target.value)} />
            </EditorField>
          </div>
        );
      case "outreach":
        return (
          <div className="space-y-5">
            <EditorField label="Image">
              <ImageDropField
                value={draft.image || undefined}
                onChange={(dataUrl) => updateDraft("image", dataUrl ?? "")}
              />
            </EditorField>
            {itemPicker}
            <EditorField label="Type" htmlFor="editor-kind">
              <Input id="editor-kind" value={draft.kind ?? ""} onChange={(event) => updateDraft("kind", event.target.value)} />
            </EditorField>
            <EditorField label="Subject" htmlFor="editor-subject">
              <Input id="editor-subject" value={draft.subject ?? ""} onChange={(event) => updateDraft("subject", event.target.value)} />
            </EditorField>
            <EditorField label="Message" htmlFor="editor-body">
              <Textarea id="editor-body" className="min-h-48" value={draft.body ?? ""} onChange={(event) => updateDraft("body", event.target.value)} />
            </EditorField>
          </div>
        );
      case "as-seen-in":
        return (
          <div className="space-y-5">
            {itemPicker}
            <EditorField label="Name" htmlFor="editor-name">
              <Input id="editor-name" value={draft.name ?? ""} onChange={(event) => updateDraft("name", event.target.value)} />
            </EditorField>
            <EditorField label="Copy" htmlFor="editor-copy">
              <Textarea id="editor-copy" className="min-h-32" value={draft.copy ?? ""} onChange={(event) => updateDraft("copy", event.target.value)} />
            </EditorField>
          </div>
        );
      case "results":
        return (
          <div className="space-y-5">
            {itemPicker}
            <EditorField label="Measure" htmlFor="editor-measure">
              <Input id="editor-measure" value={draft.measure ?? ""} onChange={(event) => updateDraft("measure", event.target.value)} />
            </EditorField>
            <div className="grid grid-cols-2 gap-4">
              <EditorField label="Start" htmlFor="editor-start">
                <Input id="editor-start" value={draft.start ?? ""} onChange={(event) => updateDraft("start", event.target.value)} />
              </EditorField>
              <EditorField label="End" htmlFor="editor-end">
                <Input id="editor-end" value={draft.end ?? ""} onChange={(event) => updateDraft("end", event.target.value)} />
              </EditorField>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SideNav
        items={NAV}
        open={navOpen}
        onClose={() => setNavOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((value) => !value)}
        user={user}
        profile={profile}
      />

      <div className={cn("transition-[padding] duration-200", collapsed ? "lg:pl-16" : "lg:pl-56")}>
        <Header onMenu={() => setNavOpen(true)} done={doneCount} total={total} />

        {contentError ? (
          <div className="border-b border-destructive/30 bg-destructive/10 px-4 py-2 text-center text-xs text-destructive sm:px-6 lg:px-8">
            Changes could not be saved. Please try again.
          </div>
        ) : null}
        {imageUploadError ? (
          <div className="border-b border-destructive/30 bg-destructive/10 px-4 py-2 text-center text-xs text-destructive sm:px-6 lg:px-8" role="alert">
            {imageUploadError}
          </div>
        ) : null}

        <main id="main-content" className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {/* ── Overview ── */}
          <section id="overview" className="scroll-mt-20">
            <div className="mb-5">
              <h2 className="font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                Overview
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">KOStyle · Aug – Dec 2026</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {contentStats.map(({ label, value, detail }) => (
                <Card key={label} className="gap-0 px-5 py-4">
                  <div className="font-heading text-[11px] uppercase tracking-[.12em] text-muted-foreground">
                    {label}
                  </div>
                  <div className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground">
                    {value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{detail}</div>
                </Card>
              ))}
            </div>
          </section>

          {/* ── Card grid ── */}
          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Roadmap */}
            <Panel
              id="roadmap"
              title="Roadmap"
              onAdd={() => openEditor("roadmap")}
              className="lg:col-span-2"
              bodyClassName="p-0"
              action={
                <span className="font-heading text-sm font-semibold text-foreground">
                  {doneCount}
                  <span className="text-muted-foreground">/{total}</span>
                </span>
              }
            >
              <div className="px-5 pt-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-300"
                    style={{ width: `${total ? (doneCount / total) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="px-5 pb-2 pt-3">
                <Table className="min-w-[560px] text-sm">
                  <TableHeader>
                    <TableRow className="border-b-2 border-border hover:bg-transparent">
                      <TableHead className={cn(thCls, "w-10 text-center")}>#</TableHead>
                      <TableHead className={thCls}>Task</TableHead>
                      <TableHead className={cn(thCls, "text-center")}>Unit / Qty</TableHead>
                      <TableHead className={cn(thCls, "w-16 text-center")}>Done</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {content.roadmap.map(({ n, task, unit }) => {
                      const isDone = done.has(n);
                      return (
                        <TableRow key={n} className="border-border">
                          <TableCell className="text-center font-semibold text-muted-foreground">{n}</TableCell>
                          <TableCell
                            className={cn(
                              "font-medium transition-colors",
                              isDone ? "text-muted-foreground line-through" : "text-foreground",
                            )}
                          >
                            {task}
                          </TableCell>
                          <TableCell className="text-center text-muted-foreground">{unit}</TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={isDone}
                              onCheckedChange={() => toggle(n)}
                              aria-label={`Mark ${task} complete`}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Panel>

            {/* Campaigns: Drop kit */}
            <Panel id="campaigns" title="Drop campaign kit" onAdd={() => openEditor("campaigns")} className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {content.campaigns.map(({ label, copy, image }, index) => (
                  <MediaCard
                    key={label}
                    image={
                      image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={image} alt="" className="size-full object-cover" />
                      ) : (
                        <MdFolder aria-hidden="true" className="size-8 text-muted-foreground" />
                      )
                    }
                    title={label}
                    onClick={() => openEditor("campaigns", index, "edit")}
                    onImageDrop={(file) => handleCardImageDrop("campaigns", index, file)}
                    imageDropBusy={uploadingImage === `campaigns-${index}`}
                  >
                    <CopyBox value={copy} textClassName="line-clamp-7" />
                  </MediaCard>
                ))}
                <AddCard label="New campaign" onClick={() => openEditor("campaigns")} />
              </div>
            </Panel>

            {/* WhatsApp ordering */}
            <Panel id="whatsapp" title="WhatsApp ordering" onAdd={() => openEditor("whatsapp")}>
              <h3 className="mb-3 font-heading text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">
                Saved response templates
              </h3>
              <div className="overflow-hidden rounded-lg border border-border">
                {content.quickReplies.length > 0 ? (
                  <div className="divide-y divide-border">
                    {content.quickReplies.map(({ title, conversation }, index) => (
                      <EditableTemplate
                        key={`${title}-${index}`}
                        title={title}
                        conversation={conversation}
                        onEdit={() => openEditor("whatsapp", index, "edit")}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="px-4 py-6 text-sm text-muted-foreground">No response templates yet. Add one to build the ordering flow.</p>
                )}
              </div>
            </Panel>

            {/* Win-back + referral */}
            <Panel id="win-back" title="Win-back + referral" onAdd={() => openEditor("win-back")}>
              <Table className="text-sm">
                <TableHeader>
                  <TableRow className="border-b-2 border-border hover:bg-transparent">
                    <TableHead className={thCls}>Name</TableHead>
                    <TableHead className={thCls}>Description</TableHead>
                    <TableHead className="w-16">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.winBack.map(({ name, copy }, index) => (
                    <EditableRow key={name} className="border-border align-top" onEdit={() => openEditor("win-back", index, "edit")}>
                      <TableCell className="font-semibold text-foreground">{name}</TableCell>
                      <TableCell className="whitespace-normal text-foreground/80">{copy}</TableCell>
                      <TableCell>
                        <RowActions copyValue={copy} />
                      </TableCell>
                    </EditableRow>
                  ))}
                </TableBody>
              </Table>
            </Panel>

            {/* Articles */}
            <Panel id="articles" title="Buying-guide articles" onAdd={() => openEditor("articles")} className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {content.articles.map((article, index) => (
                  <MediaCard
                    key={article.title}
                    image={
                      article.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={article.image} alt="" className="size-full object-cover" />
                      ) : (
                        <MdArticle aria-hidden="true" className="size-8 text-muted-foreground" />
                      )
                    }
                    eyebrow={article.status === "published" ? "Published" : "Draft"}
                    title={article.title}
                    titleClassName="line-clamp-2 whitespace-normal"
                    onClick={() => openEditor("articles", index, "edit")}
                    onImageDrop={(file) => handleCardImageDrop("articles", index, file)}
                    imageDropBusy={uploadingImage === `articles-${index}`}
                  >
                    <CopyBox value={`${article.title}\n\n${article.body}`}>
                      <p className="m-0 line-clamp-7">{article.excerpt || article.body || "No article content yet."}</p>
                    </CopyBox>
                    {article.tags.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-full bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </MediaCard>
                ))}
                <AddCard label="New article" onClick={() => openEditor("articles")} />
              </div>
            </Panel>

            {/* SEO */}
            <Panel id="seo" title="On-page SEO" onAdd={() => openEditor("seo")} className="lg:col-span-2">
              <Table className="min-w-[640px] text-sm">
                  <TableHeader>
                    <TableRow className="border-b-2 border-border hover:bg-transparent">
                      <TableHead className={thCls}>Page</TableHead>
                      <TableHead className={thCls}>Title</TableHead>
                      <TableHead className={thCls}>Description</TableHead>
                      <TableHead className="w-16">
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {content.seo.map(({ page, title, desc }, index) => (
                      <EditableRow key={page} className="border-border align-top" onEdit={() => openEditor("seo", index, "edit")}>
                        <TableCell className="font-semibold text-foreground">{page}</TableCell>
                        <TableCell className="whitespace-normal font-medium text-foreground">{title}</TableCell>
                        <TableCell className="whitespace-normal text-muted-foreground">{desc}</TableCell>
                        <TableCell>
                          <RowActions copyValue={desc} />
                        </TableCell>
                      </EditableRow>
                    ))}
                  </TableBody>
              </Table>
            </Panel>

            {/* About: founder story + press kit */}
            <Panel
              id="about"
              title="About"
              action={
                <Button type="button" size="sm" variant="outline" onClick={() => openEditor("about", 0, "edit")}>
                  <Pencil className="size-3.5" aria-hidden />
                  Edit
                </Button>
              }
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
                <div>
                  <h3 className="mb-2 font-heading text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">
                    Founder story
                  </h3>
                  <CopyBox value={content.founderStory} />
                </div>
                <div>
                  <h3 className="mb-2 font-heading text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">
                    Press kit
                  </h3>
                  <Button asChild variant="outline" className="mb-3 w-full">
                    <a href={content.pressKitUrl} target="_blank" rel="noreferrer">
                      Open press kit
                    </a>
                  </Button>
                  <CopyBox value={content.pressKitUrl}>
                    <a
                      href={content.pressKitUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all underline underline-offset-4 hover:text-accent"
                    >
                      {content.pressKitUrl}
                    </a>
                  </CopyBox>
                </div>
              </div>
            </Panel>

            {/* Outreach */}
            <Panel id="outreach" title="Outreach" onAdd={() => openEditor("outreach")} className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {content.outreach.map(({ kind, subject, body, image }, index) => (
                  <MediaCard
                    key={kind}
                    image={
                      image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={image} alt="" className="size-full object-cover" />
                      ) : (
                        <MdFolder aria-hidden="true" className="size-8 text-muted-foreground" />
                      )
                    }
                    eyebrow={kind}
                    title={subject}
                    onClick={() => openEditor("outreach", index, "edit")}
                    onImageDrop={(file) => handleCardImageDrop("outreach", index, file)}
                    imageDropBusy={uploadingImage === `outreach-${index}`}
                  >
                    <CopyBox value={`Subject: ${subject}\n\n${body}`}>
                      <p className="m-0 line-clamp-7">{body}</p>
                    </CopyBox>
                  </MediaCard>
                ))}
                <AddCard label="New outreach message" onClick={() => openEditor("outreach")} />
              </div>
            </Panel>

            {/* As seen in */}
            <Panel id="as-seen-in" title={"“As seen in” assets"} onAdd={() => openEditor("as-seen-in")} className="lg:col-span-2">
              <Table className="text-sm">
                <TableHeader>
                  <TableRow className="border-b-2 border-border hover:bg-transparent">
                    <TableHead className={thCls}>Name</TableHead>
                    <TableHead className={thCls}>Description</TableHead>
                    <TableHead className="w-16">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.asSeenIn.map(({ name, copy }, index) => (
                    <EditableRow key={name} className="border-border align-top" onEdit={() => openEditor("as-seen-in", index, "edit")}>
                      <TableCell className="font-semibold text-foreground">{name}</TableCell>
                      <TableCell className="whitespace-normal text-foreground/80">{copy}</TableCell>
                      <TableCell>
                        <RowActions copyValue={copy} />
                      </TableCell>
                    </EditableRow>
                  ))}
                </TableBody>
              </Table>
            </Panel>

            {/* Results */}
            <Panel
              id="results"
              title="Results report"
              onAdd={() => openEditor("results")}
              className="lg:col-span-2"
              action={<span className="text-xs text-muted-foreground">Marketing outputs, under our control</span>}
            >
              <Table className="min-w-[420px] text-sm">
                  <TableHeader>
                    <TableRow className="border-b-2 border-border hover:bg-transparent">
                      <TableHead className={thCls}>Measure</TableHead>
                      <TableHead className={cn(thCls, "text-right")}>Start</TableHead>
                      <TableHead className={cn(thCls, "text-right")}>End</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {content.results.map(({ measure, start, end }) => (
                      <TableRow key={measure} className="border-border">
                        <TableCell className="text-foreground">{measure}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{start}</TableCell>
                        <TableCell className="text-right font-semibold text-accent">{end}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              </Table>
            </Panel>
          </div>

          <section className="mt-8" aria-labelledby="analytics-heading">
            <div className="mb-5">
              <h2 id="analytics-heading" className="font-heading text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                Analytics snapshot
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">Targets and outcomes from the current plan.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {STATS.map(({ label, start, end }) => (
                <Card key={label} className="gap-0 px-5 py-4">
                  <div className="font-heading text-[11px] uppercase tracking-[.12em] text-muted-foreground">
                    {label}
                  </div>
                  <div className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground">
                    {end}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    from <span className="text-accent">{start}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Sheet
        open={editor !== null}
        onOpenChange={(open) => {
          if (!open) setEditor(null);
        }}
      >
        <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-lg">
          <SheetHeader className="border-b border-border px-6 py-5">
            <SheetTitle className="font-heading text-xl font-medium tracking-tight">
              {editor ? `${editor.mode === "add" ? "Add" : "Edit"} ${editorTitles[editor.section]}` : "Edit content"}
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {editorError ? (
              <div className="mb-5 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
                {editorError}
              </div>
            ) : null}
            {editor ? (
              <div className="mb-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
                <div className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
                  <Sparkles className="size-4 text-accent" aria-hidden="true" />
                  Generate with AI
                </div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Give it a direction, or leave this blank for a strong first draft. You can edit everything before saving.
                </p>
                <Textarea
                  className="mt-3 min-h-20 bg-background"
                  value={generatePrompt}
                  onChange={(event) => setGeneratePrompt(event.target.value)}
                  placeholder="e.g. Write a buying guide for choosing gloves for heavy-bag training"
                  aria-label="Instructions for AI content generation"
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="mt-3 w-full"
                  onClick={generateContent}
                  disabled={generating}
                >
                  {generating ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Sparkles className="size-4" aria-hidden="true" />}
                  {generating ? "Generating…" : "Generate content"}
                </Button>
              </div>
            ) : null}
            {renderEditorForm()}
          </div>
          <SheetFooter className="flex-row items-center justify-between border-t border-border px-6 py-4">
            {editor?.mode === "edit" && editor.section !== "about" ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setDeleteDialogOpen(true)}
                aria-label={`Delete ${editor ? editorTitles[editor.section] : "item"}`}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="size-4" aria-hidden />
              </Button>
            ) : <span />}
            <div className="flex gap-2">
              <Button type="button" variant="ghost" onClick={() => setEditor(null)}>
                Cancel
              </Button>
              <Button type="button" onClick={saveEditor} disabled={!editor}>
                {saving ? "Uploading…" : "Save changes"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this {editor ? editorTitles[editor.section] : "item"}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the item from your dashboard. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteEditorItem}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
