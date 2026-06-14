import { useMemo } from "react";
import { FileCode, FileType, FileJson, File as FileIcon } from "lucide-react";
import type { GeneratedFile } from "@/lib/api";
import { cn } from "@/utils/cn";

interface FileTreeProps {
  files: GeneratedFile[];
  activePath: string | null;
  onSelect: (path: string) => void;
}

function iconFor(path: string) {
  if (path.endsWith(".html")) return FileCode;
  if (path.endsWith(".css")) return FileType;
  if (path.endsWith(".js") || path.endsWith(".json")) return FileJson;
  return FileIcon;
}

// Flat list grouped by top-level folder. Keeps the tree readable without
// pulling in a heavy tree component; good enough for generated projects.
export default function FileTree({ files, activePath, onSelect }: FileTreeProps) {
  const groups = useMemo(() => {
    const map = new Map<string, GeneratedFile[]>();
    for (const f of files) {
      const slash = f.path.indexOf("/");
      const folder = slash === -1 ? "" : f.path.slice(0, slash);
      if (!map.has(folder)) map.set(folder, []);
      map.get(folder)!.push(f);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [files]);

  return (
    <div className="py-2 text-sm">
      {groups.map(([folder, items]) => (
        <div key={folder || "root"} className="mb-1">
          {folder && (
            <div className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-gray-600">
              {folder}
            </div>
          )}
          {items.map((f) => {
            const Icon = iconFor(f.path);
            const label = folder ? f.path.slice(folder.length + 1) : f.path;
            return (
              <button
                key={f.path}
                onClick={() => onSelect(f.path)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-1.5 text-left transition-colors",
                  folder && "pl-6",
                  activePath === f.path
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-violet-400" />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
