export interface FigmaParsed {
  fileKey: string;
  nodeId?: string;
  fileName?: string;
}

export function parseFigmaUrl(url: string): FigmaParsed | null {
  if (!url || !url.includes("figma.com")) return null;

  try {
    const u = new URL(url);
    const pathParts = u.pathname.split("/").filter(Boolean);

    let fileKey = "";
    let fileName: string | undefined;

    const fileIdx = pathParts.findIndex(
      (p) => p === "file" || p === "design" || p === "proto"
    );

    if (fileIdx >= 0 && pathParts[fileIdx + 1]) {
      fileKey = pathParts[fileIdx + 1];
    } else {
      return null;
    }

    const query = u.searchParams;
    let nodeId = query.get("node-id") || undefined;
    if (nodeId) {
      nodeId = nodeId.replace(/-/g, ":");
    }

    if (pathParts[fileIdx + 2]) {
      fileName = decodeURIComponent(pathParts[fileIdx + 2]);
    }

    return { fileKey, nodeId, fileName };
  } catch {
    return null;
  }
}

export function buildFigmaEmbedUrl(url: string): string | null {
  const parsed = parseFigmaUrl(url);
  if (!parsed) return null;
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(
    url
  )}`;
}

export function isValidFigmaUrl(url: string): boolean {
  return parseFigmaUrl(url) !== null;
}
