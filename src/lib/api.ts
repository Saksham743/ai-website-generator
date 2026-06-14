// Typed client for the backend proxy. The browser never sees the API key;
// it only talks to our own /api/* routes (proxied to Express in dev).

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface GenerateResult {
  entry: string;
  files: GeneratedFile[];
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      /* ignore non-JSON error bodies */
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

// Turn a generic prompt into a detailed one (or return it ~unchanged).
export function improvePrompt(prompt: string): Promise<{ prompt: string }> {
  return postJson<{ prompt: string }>("/api/improve-prompt", { prompt });
}

// Generate a multi-file website from a prompt.
export function generateWebsite(prompt: string): Promise<GenerateResult> {
  return postJson<GenerateResult>("/api/generate", { prompt });
}
