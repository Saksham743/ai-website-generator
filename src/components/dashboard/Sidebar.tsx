import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  FolderOpen,
  LayoutTemplate,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeft,
  Plus,
  ChevronRight,
  FileCode,
  Clock,
} from "lucide-react";
import type { Project } from "@/pages/DashboardPage";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeProject: Project | null;
  onSelectProject: (project: Project | null) => void;
}

const recentProjects: Project[] = [
  {
    id: "1",
    name: "Portfolio Website",
    prompt: "Create a modern portfolio for a 3D artist",
    files: [],
    entry: "index.html",
    createdAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    name: "SaaS Landing Page",
    prompt: "Build a landing page for an AI startup",
    files: [],
    entry: "index.html",
    createdAt: new Date("2025-01-14"),
  },
  {
    id: "3",
    name: "Restaurant Site",
    prompt: "Design a website for an Italian restaurant",
    files: [],
    entry: "index.html",
    createdAt: new Date("2025-01-13"),
  },
];

const navItems = [
  { icon: Plus, label: "New Project", action: "new" },
  { icon: FolderOpen, label: "My Projects", action: "projects" },
  { icon: LayoutTemplate, label: "Templates", action: "templates" },
  { icon: Settings, label: "Settings", action: "settings" },
];

export default function Sidebar({ collapsed, onToggle, activeProject, onSelectProject }: SidebarProps) {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("projects");
  const [showProjects, setShowProjects] = useState(true);

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-screen bg-[#060612] border-r border-white/[0.06] flex flex-col z-20 shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-white/[0.06]">
        <button
          onClick={onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors shrink-0"
        >
          {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-white whitespace-nowrap">
              SiteForge<span className="text-violet-400"> AI</span>
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setActiveNav(item.action);
              if (item.action === "new") {
                onSelectProject(null);
              }
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
              activeNav === item.action
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}

        {/* Projects Section */}
        {!collapsed && (
          <div className="pt-4">
            <button
              onClick={() => setShowProjects(!showProjects)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-300 transition-colors w-full"
            >
              <ChevronRight
                className={`h-3 w-3 transition-transform ${showProjects ? "rotate-90" : ""}`}
              />
              Recent Projects
            </button>
            {showProjects && (
              <div className="mt-2 space-y-0.5">
                {recentProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                      activeProject?.id === project.id
                        ? "bg-white/10 text-white border border-white/[0.08]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <FileCode className="h-4 w-4 shrink-0 text-violet-400" />
                    <div className="flex-1 text-left truncate">
                      <div className="truncate">{project.name}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 mt-0.5">
                        <Clock className="h-3 w-3" />
                        {project.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Logout */}
      <div className="px-3 py-3 border-t border-white/[0.06]">
        <button
          onClick={() => navigate("/")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
