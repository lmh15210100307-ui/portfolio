export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { action, fileKey, nodeId, token, format } = req.query;

  if (!token) {
    res.status(400).json({ error: "Figma token required" });
    return;
  }

  const figmaApi = "https://api.figma.com/v1";

  try {
    if (action === "file") {
      if (!fileKey) {
        res.status(400).json({ error: "fileKey required" });
        return;
      }
      const url = `${figmaApi}/files/${fileKey}${nodeId ? `/nodes?ids=${nodeId}` : ""}`;
      const resp = await fetch(url, {
        headers: { "X-Figma-Token": token },
      });
      if (!resp.ok) {
        res.status(resp.status).json({ error: `Figma API error: ${resp.status}` });
        return;
      }
      const data = await resp.json();
      res.json(data);
      return;
    }

    if (action === "images") {
      if (!fileKey || !nodeId) {
        res.status(400).json({ error: "fileKey and nodeId required" });
        return;
      }
      const fmt = format || "png";
      const url = `${figmaApi}/images/${fileKey}?ids=${nodeId}&format=${fmt}&scale=2`;
      const resp = await fetch(url, {
        headers: { "X-Figma-Token": token },
      });
      if (!resp.ok) {
        res.status(resp.status).json({ error: `Figma API error: ${resp.status}` });
        return;
      }
      const data = await resp.json();
      if (data.err) {
        res.status(400).json({ error: data.err });
        return;
      }
      res.json(data);
      return;
    }

    res.status(400).json({ error: "Unknown action. Use 'file' or 'images'" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
