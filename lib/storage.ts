import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "@/lib/firebase";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Unable to read that image."));
    reader.readAsDataURL(file);
  });
}

function makeAssetId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function uploadImageDataUrl(value: string | undefined, folder: "campaigns" | "outreach" | "articles") {
  if (!value) return undefined;
  if (!value.startsWith("data:")) return value;
  if (!storage) throw new Error("Firebase Storage is not configured.");

  const match = value.match(/^data:(image\/(?:png|jpeg|webp|gif));base64,(.+)$/);
  if (!match) throw new Error("Please use a PNG, JPEG, WEBP, or GIF image.");

  const [, contentType, encoded] = match;
  const byteLength = Math.ceil((encoded.length * 3) / 4) - (encoded.endsWith("==") ? 2 : encoded.endsWith("=") ? 1 : 0);
  if (byteLength > MAX_IMAGE_SIZE) throw new Error("Images must be 10 MB or smaller.");

  const extension = contentType.split("/")[1].replace("jpeg", "jpg");
  const assetRef = ref(storage, `workspaces/kostyle/${folder}/${makeAssetId()}.${extension}`);
  await uploadString(assetRef, value, "data_url", { contentType });
  return getDownloadURL(assetRef);
}

export async function uploadImageFile(file: File, folder: "campaigns" | "outreach" | "articles") {
  if (!file.type.startsWith("image/")) throw new Error("Please drop an image file.");
  return uploadImageDataUrl(await readFileAsDataUrl(file), folder);
}
