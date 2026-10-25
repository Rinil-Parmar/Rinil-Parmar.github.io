/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Served at the repo root (Rinil-Parmar.github.io) — no basePath needed.
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
