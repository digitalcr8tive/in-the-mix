import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/in-the-mix" : undefined,
  assetPrefix: isGitHubPages ? "/in-the-mix/" : undefined,
  images: {
    unoptimized: isGitHubPages,
    localPatterns: [
      {
        pathname: "/images/**"
      }
    ]
  }
};

export default nextConfig;
