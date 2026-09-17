export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { url } = req.query;
  if (!url) {
    res.status(400).json({ error: "url required" });
    return;
  }

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      res.status(resp.status).json({ error: `Fetch failed: ${resp.status}` });
      return;
    }
    const buf = await resp.arrayBuffer();
    const base64 = Buffer.from(buf).toString("base64");
    const mime = resp.headers.get("content-type") || "image/png";
    res.json({ dataUrl: `data:${mime};base64,${base64}` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
