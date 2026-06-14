import express from "express";
import "dotenv/config";
import { improvePrompt, generateWebsite } from "./providers/gemini.js";

const app = express();
app.use(express.json({ limit: "2mb" }));

const PORT = process.env.PORT || 8787;

// Fail fast with a clear message if the key is missing.
function assertConfigured(res) {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_api_key_here") {
    res.status(500).json({
      error: "Server is missing GEMINI_API_KEY. Set it in your .env file.",
    });
    return false;
  }
  return true;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, model: process.env.GEMINI_MODEL || "unset" });
});

// Turn a short/generic prompt into a detailed one. If the prompt is
// already detailed the provider returns it (near) unchanged.
app.post("/api/improve-prompt", async (req, res) => {
  if (!assertConfigured(res)) return;
  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "`prompt` (string) is required." });
  }
  try {
    const improved = await improvePrompt(prompt);
    res.json({ prompt: improved });
  } catch (err) {
    console.error("improve-prompt failed:", err);
    res.status(502).json({ error: err.message || "Failed to improve prompt." });
  }
});

// Generate a multi-file website from a prompt.
// Returns { files: [{ path, content }], entry }.
app.post("/api/generate", async (req, res) => {
  if (!assertConfigured(res)) return;
  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "`prompt` (string) is required." });
  }
  try {
    const result = await generateWebsite(prompt);
    res.json(result);
  } catch (err) {
    console.error("generate failed:", err);
    res.status(502).json({ error: err.message || "Failed to generate website." });
  }
});

app.listen(PORT, () => {
  console.log(`AI builder backend listening on http://localhost:${PORT}`);
});
