import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, ArrowRight } from "lucide-react";
// PortfolioMapCard removed (Portfolio page is deprecated)
import { RecentActivityCard } from "@/components/portfolio/RecentActivityCard";
import { cn } from "@/lib/utils";
import { useRightPaneContent } from "@/hooks/useRightPaneContent";

const PROJECTS = [
  { name: "Westfield Tower", city: "New York", size: "48,200", status: "In Progress", updated: "2 hrs ago", region: "Northeast", type: "Commercial" },
  { name: "Harbor Point", city: "San Francisco", size: "22,800", status: "Planning", updated: "1 day ago", region: "West", type: "Mixed-Use" },
  { name: "Skyline Plaza", city: "Chicago", size: "61,500", status: "In Progress", updated: "5 hrs ago", region: "Midwest", type: "Commercial" },
  { name: "Meridian Campus", city: "Austin", size: "35,000", status: "Review", updated: "3 days ago", region: "South", type: "Office" },
  { name: "Greenway Park", city: "Denver", size: "18,400", status: "Concept", updated: "1 week ago", region: "West", type: "Residential" },
  { name: "Apex Tower", city: "Miami", size: "52,100", status: "In Progress", updated: "12 hrs ago", region: "South", type: "Commercial" },
  { name: "Lakeview Residences", city: "Toronto", size: "29,700", status: "Planning", updated: "4 days ago", region: "Northeast", type: "Residential" },
  { name: "Central Hub", city: "Seattle", size: "41,300", status: "Active", updated: "6 hrs ago", region: "West", type: "Mixed-Use" },
];

const STATUS_STYLES: Record<string, string> = {
  "In Progress": "bg-primary/10 text-primary border-primary/20",
  "Planning": "bg-warning/10 text-warning border-warning/20",
  "Review": "bg-info/10 text-info border-info/20",
  "Concept": "bg-muted text-muted-foreground border-border",
  "Active": "bg-success/10 text-success border-success/20",
};

const Portfolio = () => {
  const [region, setRegion] = useState("all");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");

  const filtered = PROJECTS.filter((p) => {
    if (region !== "all" && p.region !== region) return false;
    if (status !== "all" && p.status !== status) return false;
    if (type !== "all" && p.type !== type) return false;
    return true;
  });

  useRightPaneContent(
    <div className="space-y-4">
      {/* Map card removed */}
      <RecentActivityCard />
    </div>,
    "portfolio"
  );

  return (
    <div className="space-y-4 animate-fade-in h-full overflow-y-auto">
      <div className="flex gap-2 flex-wrap">
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-[130px] h-9 text-xs"><SelectValue placeholder="Region" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="Northeast">Northeast</SelectItem>
            <SelectItem value="West">West</SelectItem>
            <SelectItem value="Midwest">Midwest</SelectItem>
            <SelectItem value="South">South</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[130px] h-9 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Planning">Planning</SelectItem>
            <SelectItem value="Review">Review</SelectItem>
            <SelectItem value="Concept">Concept</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
          </SelectContent>
        </Select>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[130px] h-9 text-xs"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Commercial">Commercial</SelectItem>
            <SelectItem value="Residential">Residential</SelectItem>
            <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
            <SelectItem value="Office">Office</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border bg-card p-12 text-center">
          <p className="text-sm text-muted-foreground">No projects match the selected filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <div key={project.name} className="group rounded-lg border bg-card shadow-subtle hover:shadow-card transition-shadow flex flex-col">
              <div className="h-32 bg-muted rounded-t-lg flex items-center justify-center border-b">
                <Building2 className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-semibold leading-tight">{project.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{project.city}</p>
                  </div>
                  <Badge variant="outline" className={cn("text-[10px] shrink-0 border", STATUS_STYLES[project.status] || "")}>
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1 mb-3">
                  <span>{project.size} sqm</span>
                  <span className="h-3 w-px bg-border" />
                  <span>{project.type}</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Updated {project.updated}</span>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
