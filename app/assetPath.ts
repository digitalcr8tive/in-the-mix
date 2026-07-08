const basePath = process.env.GITHUB_PAGES === "true" ? "/in-the-mix" : "";

export function assetPath(path: string) {
  return `${basePath}${path}`;
}
