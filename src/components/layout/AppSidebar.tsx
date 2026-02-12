import { NavLink, useLocation } from "react-router-dom";
import {
  Briefcase, MapPin, LayoutGrid, Palette, BarChart3,
  DollarSign, Eye, FileText, ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import qbikLogo from "@/assets/qbik-logo.jpeg";

const navItems = [
  { label: "Portfolio", icon: Briefcase, path: "/portfolio" },
  { label: "Sites", icon: MapPin, path: "/sites" },
  { label: "Program", icon: LayoutGrid, path: "/program" },
  { label: "Designs", icon: Palette, path: "/designs" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Cost Intelligence", icon: DollarSign, path: "/cost" },
  { label: "Tour", icon: Eye, path: "/tour" },
  { label: "Deliverables", icon: FileText, path: "/deliverables" },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-14" : "w-48"
      )}
    >
      <div className="flex h-14 items-center gap-3 border-b border-sidebar-border px-4">
        <img src={qbikLogo} alt="Qbik" className="h-7 w-7 rounded" />
        {!collapsed && (
          <span className="text-sm font-semibold text-sidebar-active tracking-tight">
            qbiq
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-hover text-sidebar-active"
                  : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-active"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={onToggle}
        className="flex h-10 items-center justify-center border-t border-sidebar-border text-sidebar-foreground hover:text-sidebar-active transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
