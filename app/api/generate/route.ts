import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";

type GenerateSection =
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

const FIELD_DESCRIPTIONS: Record<GenerateSection, Record<string, string>> = {
  roadmap: {
    task: "short roadmap task",
    desc: "clear task description",
    unit: "quantity or delivery unit, if useful",
  },
  campaigns: {
    label: "short campaign asset title",
    copy: "campaign copy for a boxing-glove brand",
  },
  whatsapp: {
    title: "short response template title",
    conversation: "helpful WhatsApp customer response",
  },
  "win-back": {
    name: "short win-back message name",
    copy: "win-back message copy for a boxing-glove customer",
  },
  articles: {
    title: "article title about boxing gloves or fight training",
    excerpt: "one-sentence article excerpt",
    body: "useful article content with practical boxing-glove advice",
    tags: "comma-separated article tags",
  },
  seo: {
    page: "page name or URL path",
    title: "SEO page title",
    desc: "SEO meta description",
  },
  about: {
    founderStory: "founder story for a boxing-glove brand",
  },
  outreach: {
    kind: "outreach message type",
    subject: "outreach subject line",
    body: "outreach message for a boxing-glove brand",
  },
  "as-seen-in": {
    name: "publication or coverage name",
    copy: "short coverage or press-kit description",
  },
  results: {
    measure: "result or metric name",
    start: "starting value",
    end: "ending value",
  },
};

function getAdminAuth() {
  const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin credentials are not configured.");
  }

  const app = getApps()[0] ?? initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

  return getAuth(app);
}

function getOutputText(response: { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> }) {
  return (response.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((item) => item.type === "output_text" && item.text)
    .map((item) => item.text)
    .join("");
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Add OPENAI_API_KEY to the server environment first." }, { status: 503 });
    }

    const authorization = request.headers.get("authorization");
    const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : "";
    if (!token) return NextResponse.json({ error: "You must be signed in to generate content." }, { status: 401 });

    await getAdminAuth().verifyIdToken(token);

    const body = await request.json() as {
      section?: GenerateSection;
      instruction?: string;
      draft?: Record<string, string>;
      context?: Record<string, string>;
    };
    const section = body.section;
    if (!section || !(section in FIELD_DESCRIPTIONS)) {
      return NextResponse.json({ error: "Choose a valid content section." }, { status: 400 });
    }

    const instruction = body.instruction?.trim() || "Create a strong first draft that fits this section.";
    const fields = FIELD_DESCRIPTIONS[section];
    const schemaProperties = Object.fromEntries(
      Object.entries(fields).map(([key, description]) => [key, { type: "string", description }]),
    );

    const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-terra",
        store: false,
        input: [
          {
            role: "system",
            content: [{
              type: "input_text",
              text: "You write practical, specific KOStyle content. KOStyle sells boxing gloves and fight-training equipment, not hoodies. Keep the tone clear, premium, direct, and useful for customers in the UAE. Never invent prices, stock, shipping promises, endorsements, or product specifications that were not provided. Return only the requested JSON object.",
            }],
          },
          {
            role: "user",
            content: [{
              type: "input_text",
              text: JSON.stringify({
                section,
                instruction,
                currentDraft: body.draft ?? {},
                brandContext: body.context ?? {},
                fields,
              }),
            }],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "kostyle_generated_content",
            strict: true,
            schema: {
              type: "object",
              properties: schemaProperties,
              required: Object.keys(fields),
              additionalProperties: false,
            },
          },
        },
        max_output_tokens: 4000,
      }),
    });

    const responseJson = await openAIResponse.json() as { output?: Array<{ content?: Array<{ type?: string; text?: string }> }>; error?: { message?: string } };
    if (!openAIResponse.ok) {
      return NextResponse.json({ error: responseJson.error?.message || "OpenAI could not generate content." }, { status: 502 });
    }

    const outputText = getOutputText(responseJson);
    const generated = JSON.parse(outputText) as Record<string, unknown>;
    const safeFields = Object.fromEntries(
      Object.keys(fields).map((key) => [key, typeof generated[key] === "string" ? generated[key] : ""]),
    );

    return NextResponse.json({ fields: safeFields });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to generate content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
