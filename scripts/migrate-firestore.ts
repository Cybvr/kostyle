import dotenv from "dotenv";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { INITIAL_CONTENT } from "../lib/data";

dotenv.config({ path: ".env.local" });

const projectId = process.env.FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const databaseId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID ?? "kostyle";

if (!projectId || !clientEmail || !privateKey) {
  throw new Error("Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY in .env.local");
}

async function main() {
  const app = getApps()[0] ?? initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

  const db = getFirestore(app, databaseId);
  const workspace = db.collection("workspaces").doc("kostyle");
  const before = await workspace.get();

  await workspace.set(INITIAL_CONTENT, { merge: true });

  const after = await workspace.get();
  const data = after.data() ?? {};
  const campaignImages = Array.isArray(data.campaigns)
    ? data.campaigns.filter((item) => item && typeof item === "object" && "image" in item).length
    : 0;
  const outreachImages = Array.isArray(data.outreach)
    ? data.outreach.filter((item) => item && typeof item === "object" && "image" in item).length
    : 0;

  console.log(JSON.stringify({
    projectId,
    databaseId,
    path: "workspaces/kostyle",
    existedBefore: before.exists,
    fieldsWritten: Object.keys(INITIAL_CONTENT),
    campaignImageFields: campaignImages,
    outreachImageFields: outreachImages,
  }, null, 2));
}

void main();
