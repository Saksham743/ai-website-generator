import type { GeneratedFile } from "@/lib/api";

// Stitches a multi-file static project into a single self-contained HTML
// document so it can render inside a sandboxed <iframe>. Because the iframe
// loads from a blob URL, relative paths like "styles/main.css" would not
// resolve, so we inline referenced CSS/JS by path.

function findFile(files: GeneratedFile[], rawPath: string): GeneratedFile | undefined {
  const path = rawPath.replace(/^\.?\//, "").split(/[?#]/)[0];
  return files.find((f) => f.path === path);
}

export function buildPreviewDocument(
  files: GeneratedFile[],
  entryPath: string
): string {
  const entry = findFile(files, entryPath) || files.find((f) => f.path.endsWith(".html"));
  if (!entry) return "<!DOCTYPE html><html><body>No HTML entry file found.</body></html>";

  let html = entry.content;

  // Inline <link rel="stylesheet" href="..."> with local files.
  html = html.replace(
    /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/gi,
    (match, href) => {
      if (/^https?:\/\//i.test(href)) return match; // keep external CDNs
      const css = findFile(files, href);
      return css ? `<style>\n${css.content}\n</style>` : match;
    }
  );

  // Inline <script src="..."> with local files.
  html = html.replace(
    /<script[^>]*src=["']([^"']+)["'][^>]*>\s*<\/script>/gi,
    (match, src) => {
      if (/^https?:\/\//i.test(src)) return match; // keep external CDNs
      const js = findFile(files, src);
      return js ? `<script>\n${js.content}\n</script>` : match;
    }
  );

  return html;
}
