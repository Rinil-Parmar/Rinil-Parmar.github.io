import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rinil Parmar — Software Engineer",
    short_name: "Rinil Parmar",
    description:
      "Software engineer building reliable backend systems, cloud infrastructure, and AI-powered tools.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E0F11",
    theme_color: "#0E0F11",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
