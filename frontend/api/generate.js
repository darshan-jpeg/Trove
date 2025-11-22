export default async function handler(req, res) {
  // --------------------
  // 1. ENABLE CORS
  // --------------------
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // --------------------
  // 2. VALIDATE STYLE
  // --------------------
  const VALID_STYLES = ["formal", "casual", "rare"];
  const style = String(req.query?.style || "").toLowerCase();

  if (!VALID_STYLES.includes(style)) {
    return res.status(400).json({
      error: 'Invalid style. Use "formal", "casual", or "rare".',
    });
  }

  // --------------------
  // 3. USE GEMINI 1.5 FLASH (not deprecated API)
  // --------------------
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key missing" });
    }

    const prompt = `
Return a JSON object:
{
  "word": "<SINGLE WORD>",
  "meaning": "<short meaning>",
  "example": "<short example sentence>"
}
Ensure the word is ONE English word. Style: "${style}" 
OUTPUT STRICT JSON ONLY.
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const result = await response.json();

    const text =
      result?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Gemini returned invalid format");

    const parsed = JSON.parse(match[0]);

    return res.status(200).json({
      word: parsed.word || "",
      meaning: parsed.meaning || "",
      example: parsed.example || "",
    });
  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({
      error: "Failed to generate word",
    });
  }
}
