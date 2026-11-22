import type { NextConfig } from "next";

// Pages named "page.dev.tsx" exist only while developing (npm run dev).
// In a production build they are not part of the app at all, so tools like
// the style guide can never be reached on the live site.
const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  pageExtensions: ["tsx", "ts", ...(isDevelopment ? ["dev.tsx"] : [])],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
