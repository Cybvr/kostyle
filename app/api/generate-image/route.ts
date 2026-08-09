import { NextResponse } from "next/server";

export const runtime = "nodejs";

type FalImageResponse = {
  images?: Array<{ url?: string }>;
  detail?: string;
  message?: string;
};

async function imageUrlToDataUrl(imageUrl: string) {
  if (imageUrl.startsWith("data:")) return imageUrl;

  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) throw new Error("Seedream returned an unreadable image.");

  const contentType = imageResponse.headers.get("content-type") || "image/png";
  const bytes = Buffer.from(await imageResponse.arrayBuffer());
  return `data:${contentType};base64,${bytes.toString("base64")}`;
}

export async function POST(request: Request) {
  try {
    const falKey = process.env.FAL_KEY;
    if (!falKey) {
      return NextResponse.json({ error: "Add FAL_KEY to the server environment first." }, { status: 503 });
    }

    const body = await request.json() as { prompt?: string };
    const prompt = body.prompt?.trim();
    if (!prompt) return NextResponse.json({ error: "Add an image prompt first." }, { status: 400 });

    const response = await fetch("https://fal.run/fal-ai/bytedance/seedream/v5/lite/text-to-image", {
      method: "POST",
      headers: {
        Authorization: `Key ${falKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        image_size: "auto_2K",
        sync_mode: true,
        enable_safety_checker: true,
      }),
    });

    const responseJson = await response.json() as FalImageResponse;
    if (!response.ok) {
      return NextResponse.json(
        { error: responseJson.detail || responseJson.message || "Seedream could not generate the image." },
        { status: 502 },
      );
    }

    const imageUrl = responseJson.images?.[0]?.url;
    if (!imageUrl) return NextResponse.json({ error: "Seedream returned no image." }, { status: 502 });

    return NextResponse.json({ image: await imageUrlToDataUrl(imageUrl) });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to generate image.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
