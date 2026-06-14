// ──────────────────────────────────────────────────────────────
// Gemini provider.
//
// ALL provider-specific code lives in this file. The rest of the
// app only calls `improvePrompt()` and `generateWebsite()`. To swap
// to another LLM later, reimplement these two functions against the
// new API and nothing else has to change.
// ──────────────────────────────────────────────────────────────

const MODEL = () => process.env.GEMINI_MODEL || "gemini-2.5-flash";
const BASE_URL = () =>
  process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta";
const API_KEY = () => process.env.GEMINI_API_KEY;

// Low-level call to the native Gemini generateContent endpoint.
async function callGemini(systemInstruction, userText, expectJson) {
  const url = `${BASE_URL()}/models/${MODEL()}:generateContent?key=${API_KEY()}`;

  const body = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents: [{ role: "user", parts: [{ text: userText }] }],
    generationConfig: {
      temperature: 0.7,
      ...(expectJson ? { responseMimeType: "application/json" } : {}),
    },
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const detail = await resp.text().catch(() => "");
    throw new Error(`Gemini API error ${resp.status}: ${detail.slice(0, 500)}`);
  }

  const data = await resp.json();
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p) => p.text)
    .filter(Boolean)
    .join("");

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }
  return text;
}

const IMPROVE_SYSTEM = `You are a prompt engineer for an AI website builder.
The user gives a website request. If it is vague or generic, rewrite it into a
single, detailed, well-structured prompt describing layout, sections, content,
style, color palette and interactions. If the request is ALREADY detailed,
return it mostly unchanged (only tidy wording). Respond with ONLY the improved
prompt text, no preamble, no markdown fences.`;

export async function improvePrompt(prompt) {
  const text = await callGemini(IMPROVE_SYSTEM, prompt, false);
  return text.trim();
}

const GENERATE_SYSTEM = `You are an expert front-end engineer. Generate a COMPLETE
static website (plain HTML, CSS and vanilla JS) from the user's prompt.

Rules:
- Output a multi-file project. Always include an "index.html" entry file.
- Split reusable markup into an HTML partials approach is NOT supported by the
  browser, so instead put shared styles in "styles/main.css" and shared scripts
  in "scripts/main.js", and reference them from the HTML with relative paths
  (e.g. <link rel="stylesheet" href="styles/main.css">).
- You MAY create multiple HTML pages (e.g. "about.html") and put component-like
  chunks under a "components/" folder as additional .html/.css/.js files that
  index.html pulls in via <link>/<script> or that you inline-document.
- Use modern, responsive, attractive design. No external build tools.
- Do NOT use frameworks. No React. No CDN that requires a key.
- Reference assets only with relative paths so they resolve within the project.

Respond with ONLY a JSON object of this exact shape (no markdown fences):
{
  "entry": "index.html",
  "files": [
    { "path": "index.html", "content": "<!DOCTYPE html> ..." },
    { "path": "styles/main.css", "content": "..." },
    { "path": "scripts/main.js", "content": "..." }
  ]
}`;

export async function generateWebsite(prompt) {
  const text = await callGemini(GENERATE_SYSTEM, prompt, true);

  let parsed;
  try {
    parsed = JSON.parse(stripFences(text));
  } catch {
    throw new Error("Gemini did not return valid JSON for the website files.");
  }

  if (!Array.isArray(parsed.files) || parsed.files.length === 0) {
    throw new Error("Gemini response did not contain any files.");
  }

  const files = parsed.files
    .filter((f) => f && typeof f.path === "string" && typeof f.content === "string")
    .map((f) => ({ path: f.path.replace(/^\.?\//, ""), content: f.content }));

  const entry =
    typeof parsed.entry === "string" && files.some((f) => f.path === parsed.entry)
      ? parsed.entry
      : files.find((f) => f.path.endsWith("index.html"))?.path || files[0].path;

  return { entry, files };
}

// Safety net in case the model still wraps JSON in markdown fences.
function stripFences(text) {
  const trimmed = text.trim();
  const match = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return match ? match[1] : trimmed;
}
