/** @type {import('next').NextConfig} */
const isPages = process.env.PAGES === "1";

// PAGES=1 npm run build -> static export for GitHub Pages, served from the
// custom domain schulteand.co (site root, so no basePath).
// Local dev/start are unaffected.
const nextConfig = isPages
  ? {
      output: "export",
    }
  : {};

export default nextConfig;
