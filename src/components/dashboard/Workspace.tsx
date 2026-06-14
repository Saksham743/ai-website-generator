import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Wand2,
  Code2,
  Eye,
  Download,
  Copy,
  RotateCcw,
  Upload,
  PanelRight,
  PanelLeft,
  Coins,
  Check,
  Loader2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/Card";
import type { Project } from "@/pages/DashboardPage";

interface WorkspaceProps {
  project: Project | null;
  onProjectCreated: (project: Project) => void;
}

const demoCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: #0a0a0a;
      color: #ffffff;
      line-height: 1.6;
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 4rem;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #a78bfa, #6366f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero {
      max-width: 800px;
      margin: 6rem auto;
      text-align: center;
      padding: 0 2rem;
    }
    .hero h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      background: linear-gradient(135deg, #a78bfa, #6366f1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero p {
      font-size: 1.2rem;
      color: #a1a1aa;
      margin-bottom: 2rem;
    }
    .btn {
      display: inline-block;
      padding: 0.8rem 2rem;
      background: linear-gradient(135deg, #7c3aed, #4f46e5);
      color: white;
      border-radius: 0.75rem;
      font-weight: 600;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <nav>
    <div class="logo">Portfolio</div>
    <div style="display:flex;gap:2rem;">
      <a href="#" style="color:#a1a1aa;text-decoration:none;">Work</a>
      <a href="#" style="color:#a1a1aa;text-decoration:none;">About</a>
      <a href="#" style="color:#a1a1aa;text-decoration:none;">Contact</a>
    </div>
  </nav>
  <section class="hero">
    <h1>Creative Developer & Designer</h1>
    <p>Building beautiful digital experiences with modern technology. Specializing in 3D, animation, and interactive design.</p>
    <a href="#" class="btn">View My Work</a>
  </section>
</body>
</html>`;

export default function Workspace({ project, onProjectCreated }: WorkspaceProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedCode, setGeneratedCode] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [copied, setCopied] = useState(false);
  const [credits, setCredits] = useState(25);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load project code
  useEffect(() => {
    if (project) {
      setPrompt(project.prompt);
      setGeneratedCode(project.code || demoCode);
    }
  }, [project]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setProgress(0);
    setGeneratedCode("");

    // Simulate progressive generation
    const totalSteps = 20;
    for (let i = 0; i <= totalSteps; i++) {
      await new Promise((r) => setTimeout(r, 150));
      setProgress(Math.round((i / totalSteps) * 100));

      if (i === Math.floor(totalSteps * 0.3)) {
        setGeneratedCode(demoCode.slice(0, Math.floor(demoCode.length * 0.3)));
      } else if (i === Math.floor(totalSteps * 0.6)) {
        setGeneratedCode(demoCode.slice(0, Math.floor(demoCode.length * 0.6)));
      } else if (i === totalSteps) {
        setGeneratedCode(demoCode);
      }
    }

    setIsGenerating(false);
    setCredits((c) => Math.max(0, c - 1));

    if (!project) {
      onProjectCreated({
        id: Date.now().toString(),
        name: prompt.slice(0, 40) + (prompt.length > 40 ? "..." : ""),
        prompt,
        code: demoCode,
        createdAt: new Date(),
      });
    }
  };

  const handleImprovePrompt = () => {
    const improvements = [
      "Create a modern, responsive portfolio website for a 3D artist with a dark theme, animated project gallery, and contact form",
      "Design a sleek SaaS landing page with hero section, features grid, pricing table, testimonials carousel, and CTA section",
      "Build an elegant restaurant website with online menu, reservation system, photo gallery, and Google Maps integration",
    ];
    setPrompt(improvements[Math.floor(Math.random() * improvements.length)]);
  };

  const handleCopy = async () => {
    if (generatedCode) {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Update iframe content
  useEffect(() => {
    if (iframeRef.current && generatedCode) {
      const blob = new Blob([generatedCode], { type: "text/html" });
      iframeRef.current.src = URL.createObjectURL(blob);
      return () => URL.revokeObjectURL(iframeRef.current?.src || "");
    }
  }, [generatedCode]);

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
          {/* Credits */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <Coins className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-gray-300">
              <span className="text-white font-medium">{credits}</span> credits
            </span>
          </div>
          {/* Profile */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-xs font-bold">
              JD
            </div>
            <span className="text-sm text-gray-400 hidden sm:block">John Doe</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
                  disabled={isGenerating}
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

            {/* Progress Bar */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin text-violet-400" />
                        Generating website...
                      </span>
                      <span className="text-violet-400 font-medium">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>

        {/* Split Screen: Editor + Preview */}
        <div className="flex-1 flex overflow-hidden px-4 pb-4">
          <div className="flex-1 flex rounded-2xl border border-white/[0.08] bg-[#060612] overflow-hidden">
            {/* Code Editor */}
            <div className={`flex flex-col ${showPreview ? "w-1/2" : "w-full"} border-r border-white/[0.06] transition-all duration-300`}>
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Code2 className="h-3.5 w-3.5" />
                  <span>index.html</span>
                  {generatedCode && (
                    <span className="text-gray-600">
                      ({generatedCode.split("\n").length} lines)
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {showPreview ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex-1 overflow-hidden relative">
                {generatedCode ? (
                  <textarea
                    ref={editorRef}
                    value={generatedCode}
                    onChange={(e) => setGeneratedCode(e.target.value)}
                    className="w-full h-full bg-transparent text-sm font-mono text-gray-300 py-4 pr-4 pl-12 resize-none focus:outline-none leading-relaxed"
                    spellCheck={false}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-600">
                    <div className="text-center">
                      <Code2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">Generated code will appear here</p>
                      <p className="text-xs mt-1">Describe your website above and click Generate</p>
                    </div>
                  </div>
                )}
                {/* Line Numbers */}
                {generatedCode && (
                  <div className="absolute left-0 top-0 bottom-0 w-8 py-4 text-right text-xs text-gray-700 font-mono select-none pointer-events-none">
                    {generatedCode.split("\n").map((_, i) => (
                      <div key={i} className="leading-relaxed">
                        {i + 1}
                      </div>
                    ))}
                  </div>
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
                      <span>Live Preview</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-white">
                    {generatedCode ? (
                      <iframe
                        ref={iframeRef}
                        className="w-full h-full border-0"
                        title="Website Preview"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-[#fafafa] text-gray-400">
                        <div className="text-center">
                          <Eye className="h-12 w-12 mx-auto mb-3 opacity-30" />
                          <p className="text-sm">Preview will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Action Bar */}
        {generatedCode && !isGenerating && (
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
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="hidden sm:inline text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="hidden sm:inline">Copy Code</span>
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
