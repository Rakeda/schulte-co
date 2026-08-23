/** @type {import('next').NextConfig} */
const isPages = process.env.PAGES === "1";

// PAGES=1 npm run build -> static export under /schulte-co for GitHub Pages.
// Local dev/start keep serving from the root.
const nextConfig = isPages
  ? {
      output: "export",
      basePath: "/schulte-co",
    }
  : {};

export default nextConfig;
