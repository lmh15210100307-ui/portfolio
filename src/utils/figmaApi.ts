import { parseFigmaUrl } from "./figma";

const API_BASE = "/api";

export interface FigmaFrame {
  id: string;
  name: string;
  type: string;
  children?: FigmaFrame[];
}

export interface FigmaFileInfo {
  name: string;
  frames: FigmaFrame[];
}

export async function fetchFigmaFile(
  url: string,
  token: string
): Promise<FigmaFileInfo | null> {
  const parsed = parseFigmaUrl(url);
  if (!parsed) return null;

  const params = new URLSearchParams({
    action: "file",
    fileKey: parsed.fileKey,
    token,
  });
  if (parsed.nodeId) params.set("nodeId", parsed.nodeId);

  const resp = await fetch(`${API_BASE}/figma?${params}`);
  if (!resp.ok) throw new Error(`Figma API ${resp.status}`);
  const data = await resp.json();

  const doc = data.document || data.nodes?.[parsed.nodeId!]?.document || null;
  if (!doc) return null;

  const frames = extractFrames(doc);
  return { name: doc.name || parsed.fileKey, frames };
}

function extractFrames(node: any, depth = 0): FigmaFrame[] {
  if (depth > 10) return [];
  const results: FigmaFrame[] = [];

  const type = node.type || "";
  const isFrameLike =
    type === "FRAME" ||
    type === "COMPONENT" ||
    type === "INSTANCE" ||
    type === "SECTION";

  if (isFrameLike) {
    results.push({
      id: node.id,
      name: node.name,
      type,
    });
  }

  if (node.children) {
    for (const child of node.children) {
      results.push(...extractFrames(child, depth + 1));
    }
  }

  return results;
}

export async function fetchFigmaImages(
  fileKey: string,
  nodeIds: string[],
  token: string,
  format = "png"
): Promise<Record<string, string>> {
  if (nodeIds.length === 0) return {};
  const ids = nodeIds.join(",");
  const params = new URLSearchParams({
    action: "images",
    fileKey,
    nodeId: ids,
    token,
    format,
  });

  const resp = await fetch(`${API_BASE}/figma?${params}`);
  if (!resp.ok) throw new Error(`Figma API ${resp.status}`);
  const data = await resp.json();
  return data.images || {};
}

export async function proxyImageToDataUrl(figmaImageUrl: string): Promise<string> {
  const params = new URLSearchParams({ url: figmaImageUrl });
  const resp = await fetch(`${API_BASE}/proxy-image?${params}`);
  if (!resp.ok) throw new Error(`Proxy ${resp.status}`);
  const data = await resp.json();
  return data.dataUrl;
}
