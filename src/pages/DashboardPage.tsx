import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Workspace from "@/components/dashboard/Workspace";

export type Project = {
  id: string;
  name: string;
  prompt: string;
  code: string;
  createdAt: Date;
};

export default function DashboardPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a1a] overflow-hidden">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeProject={activeProject}
        onSelectProject={setActiveProject}
      />
      <Workspace
        project={activeProject}
        onProjectCreated={setActiveProject}
      />
    </div>
  );
}
