import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  Sparkles,
  Wand2,
  Code2,
  Eye,
  Download,
  Copy,
  RotateCcw,
  Upload,
  Coins,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import FileTree from "@/components/dashboard/FileTree";
import { improvePrompt, generateWebsite, type GeneratedFile } from "@/lib/api";
import { buildPreviewDocument } from "@/lib/preview";
import type { Project } from "@/pages/DashboardPage";

interface WorkspaceProps {
  project: Project | null;
  onProjectCreated: (project: Project) => void;
}

function languageFor(path: string) {
  if (path.endsWith(".css")) return "css";
  if (path.endsWith(".js")) return "javascript";
  if (path.endsWith(".json")) return "json";
  return "html";
}

export default function Workspace({ project, onProjectCreated }: WorkspaceProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [files, setFiles] = useState<GeneratedFile[]>([]);
  const [entry, setEntry] = useState("index.html");
  const [activePath, setActivePath] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [copied, setCopied] = useState(false);
  const [credits, setCredits] = useState(25);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load a selected project's files.
  useEffect(() => {
    if (project) {
      setPrompt(project.prompt);
      setFiles(project.files);
      setEntry(project.entry);
      setActivePath(project.files[0]?.path ?? null);
      setError(null);
    }
  }, [project]);

  const activeFile = useMemo(
    () => files.find((f) => f.path === activePath) ?? null,
    [files, activePath]
  );

  const previewDoc = useMemo(
    () => (files.length ? buildPreviewDocument(files, entry) : ""),
    [files, entry]
  );

  // Push the stitched document into the sandboxed iframe.
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !previewDoc) return;
    const blob = new Blob([previewDoc], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframe.src = url;
    return () => URL.revokeObjectURL(url);
  }, [previewDoc]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateWebsite(prompt);
      setFiles(result.files);
      setEntry(result.entry);
      setActivePath(result.entry || result.files[0]?.path || null);
      setCredits((c) => Math.max(0, c - 1));

      if (!project) {
        onProjectCreated({
          id: Date.now().toString(),
          name: prompt.slice(0, 40) + (prompt.length > 40 ? "..." : ""),
          prompt,
          files: result.files,
          entry: result.entry,
          createdAt: new Date(),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImprovePrompt = async () => {
    if (!prompt.trim() || isImproving) return;
    setIsImproving(true);
    setError(null);
    try {
      const { prompt: improved } = await improvePrompt(prompt);
      setPrompt(improved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not improve prompt.");
    } finally {
      setIsImproving(false);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (!activePath) return;
    setFiles((prev) =>
      prev.map((f) => (f.path === activePath ? { ...f, content: value ?? "" } : f))
    );
  };

  const handleCopy = async () => {
    if (!activeFile) return;
    await navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download each file individually, preserving relative folder paths.
  const handleDownload = () => {
    for (const f of files) {
      const blob = new Blob([f.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = f.path.replace(/\//g, "_");
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const hasFiles = files.length > 0;

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Top Header */}
      <header className="h-14 border-b border-white/[0.06] bg-[#0a0a1a] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-medium text-white">
            {project ? project.name : "New Project"}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <Coins className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-gray-300">
              <span className="text-white font-medium">{credits}</span> credits
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-xs font-bold">
              JD
            </div>
            <span className="text-sm text-gray-400 hidden sm:block">John Doe</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Prompt Area */}
        <div className="px-4 py-3 shrink-0">
          <GlassCard className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Create a modern portfolio website for a 3D artist with dark theme, animated gallery, and contact section..."
                  rows={2}
                  className="w-full bg-transparent text-sm text-white placeholder-gray-500 resize-none focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                      handleGenerate();
                    }
                  }}
                />
                <div className="absolute bottom-1 right-1 text-xs text-gray-600">
                  ⌘+Enter to generate
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleImprovePrompt}
                  loading={isImproving}
                  disabled={isGenerating || !prompt.trim()}
                >
                  <Wand2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Improve</span>
                </Button>
                <Button
                  size="md"
                  onClick={handleGenerate}
                  loading={isGenerating}
                  disabled={!prompt.trim()}
                >
                  <Sparkles className="h-4 w-4" />
                  Generate
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                    <Loader2 className="h-3 w-3 animate-spin text-violet-400" />
                    Generating your website with AI...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>

        {/* Split Screen: Files + Editor + Preview */}
        <div className="flex-1 flex overflow-hidden px-4 pb-4">
          <div className="flex-1 flex rounded-2xl border border-white/[0.08] bg-[#060612] overflow-hidden">
            {hasFiles ? (
              <>
                {/* File Tree */}
                <div className="w-48 border-r border-white/[0.06] overflow-y-auto shrink-0">
                  <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-gray-500 border-b border-white/[0.06]">
                    Files
                  </div>
                  <FileTree files={files} activePath={activePath} onSelect={setActivePath} />
                </div>

                {/* Editor */}
                <div
                  className={`flex flex-col ${showPreview ? "w-1/2" : "flex-1"} border-r border-white/[0.06] transition-all duration-300`}
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Code2 className="h-3.5 w-3.5" />
                      <span>{activePath ?? "—"}</span>
                    </div>
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="px-2 py-1 rounded-md text-xs text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {showPreview ? "Hide preview" : "Show preview"}
                    </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    {activeFile && (
                      <Editor
                        height="100%"
                        theme="vs-dark"
                        path={activeFile.path}
                        language={languageFor(activeFile.path)}
                        value={activeFile.content}
                        onChange={handleEditorChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 13,
                          scrollBeyondLastLine: false,
                          wordWrap: "on",
                          automaticLayout: true,
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Preview */}
                <AnimatePresence>
                  {showPreview && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "50%", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col overflow-hidden"
                    >
                      <div className="flex items-center px-4 py-2 border-b border-white/[0.06]">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Eye className="h-3.5 w-3.5" />
                          <span>Live Preview (full site)</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-white">
                        <iframe
                          ref={iframeRef}
                          className="w-full h-full border-0"
                          title="Website Preview"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-600">
                <div className="text-center">
                  <Code2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Your generated project will appear here</p>
                  <p className="text-xs mt-1">Describe your website above and click Generate</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Bar */}
        {hasFiles && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 pb-4 shrink-0"
          >
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[#060612] px-4 py-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!activeFile}>
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="hidden sm:inline text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="hidden sm:inline">Copy File</span>
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleGenerate}>
                  <RotateCcw className="h-4 w-4" />
                  <span className="hidden sm:inline">Regenerate</span>
                </Button>
              </div>
              <Button size="sm" onClick={() => alert("Website published! 🚀")}>
                <Upload className="h-4 w-4" />
                Publish
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
