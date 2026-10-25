// Generates public/og.png (1200x630) for social share previews.
// Run with: npm run og
import { ImageResponse } from "next/dist/server/og/image-response.js";
import { writeFile, mkdir } from "node:fs/promises";
import React from "react";

const h = React.createElement;

const element = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "#0E0F11",
      padding: "72px",
      fontFamily: "sans-serif",
      backgroundImage:
        "linear-gradient(#1b1e22 1px, transparent 1px), linear-gradient(90deg, #1b1e22 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    },
  },
  [
    h(
      "div",
      { key: "top", style: { display: "flex", alignItems: "center", gap: "16px" } },
      [
        h(
          "div",
          {
            key: "rp",
            style: {
              fontSize: "34px",
              fontWeight: 700,
              color: "#F4F4F3",
              letterSpacing: "-0.02em",
            },
          },
          "RP",
        ),
        h("div", {
          key: "dot",
          style: {
            width: "12px",
            height: "12px",
            borderRadius: "999px",
            background: "#4ADECD",
          },
        }),
      ],
    ),
    h(
      "div",
      { key: "mid", style: { display: "flex", flexDirection: "column" } },
      [
        h(
          "div",
          {
            key: "eyebrow",
            style: {
              fontSize: "22px",
              letterSpacing: "0.22em",
              color: "#4ADECD",
              textTransform: "uppercase",
              marginBottom: "22px",
            },
          },
          "Software Engineer · Canada",
        ),
        h(
          "div",
          {
            key: "headline",
            style: {
              fontSize: "76px",
              fontWeight: 600,
              color: "#F4F4F3",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "920px",
            },
          },
          "Building software that works beyond the demo.",
        ),
      ],
    ),
    h(
      "div",
      {
        key: "bottom",
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        },
      },
      [
        h(
          "div",
          { key: "name", style: { fontSize: "30px", fontWeight: 600, color: "#F4F4F3" } },
          "Rinil Parmar",
        ),
        h(
          "div",
          { key: "url", style: { fontSize: "24px", color: "#9AA0A6" } },
          "rinil-parmar.github.io",
        ),
      ],
    ),
  ],
);

const response = new ImageResponse(element, { width: 1200, height: 630 });
const buffer = Buffer.from(await response.arrayBuffer());
await mkdir("public", { recursive: true });
await writeFile("public/og.png", buffer);
console.log(`Wrote public/og.png (${buffer.length} bytes)`);
