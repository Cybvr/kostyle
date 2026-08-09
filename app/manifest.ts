import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KOStyle",
    short_name: "KOStyle",
    description: "KOStyle campaign workspace.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f9fc",
    theme_color: "#625bff",
    icons: [
      {
        src: "/kostyle-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/kostyle-icon.png",
        sizes: "510x511",
        type: "image/png",
      },
    ],
  };
}
