import type { NextConfig } from "next";

const isGH = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGH ? "/vroff-cms" : "",
  assetPrefix: isGH ? "/vroff-cms/" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
