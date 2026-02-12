import { Building2, Layers, ArrowUpDown, DoorOpen, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProject } from "@/contexts/ProjectContext";
import { toast } from "@/hooks/use-toast";

interface SiteData {
  id: string;
  name: string;
  address: string;
  status: string;
  area: string;
  floors: string;
  elevators: string;
  access: string;
  images: string[];
}

interface SiteDetailsPanelProps {
  site: SiteData;
}

const metrics = [
  { key: "area", label: "Area", icon: Building2 },
  { key: "floors", label: "Floors", icon: Layers },
  { key: "elevators", label: "Elevators", icon: ArrowUpDown },
  { key: "access", label: "Access", icon: DoorOpen },
] as const;

export function SiteDetailsPanel({ site }: SiteDetailsPanelProps) {
  const navigate = useNavigate();
  const { setSelectedSite } = useProject();

  const handleSelectSite = () => {
    setSelectedSite(site.name);
    toast({ title: "Site selected", description: `${site.name} is now the active site.` });
  };

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">{site.name}</h2>
          <Badge variant="outline" className="text-xs">{site.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{site.address}</p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map(({ key, label, icon: Icon }) => (
          <div key={key} className="rounded-lg border bg-card p-3 shadow-subtle">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Icon className="h-3.5 w-3.5" />
              <span className="text-[11px] font-medium uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-base font-semibold">{site[key]}</p>
          </div>
        ))}
      </div>

      {/* Thumbnail gallery */}
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Gallery</p>
        <div className="grid grid-cols-3 gap-2">
          {site.images.map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-md bg-muted border border-border flex items-center justify-center text-muted-foreground text-[10px] font-medium"
            >
              IMG {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-2">
        <Button className="w-full" onClick={handleSelectSite}>Select Site</Button>
        <Button variant="outline" className="w-full" onClick={() => navigate("/program")}>View Program</Button>
        <Button variant="secondary" className="w-full" onClick={() => navigate("/designs")}>Generate Designs</Button>
      </div>

      {/* Insights card */}
      <div className="rounded-lg border bg-accent/50 p-4 mt-auto">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="h-4 w-4 text-accent-foreground" />
          <h3 className="text-sm font-semibold text-accent-foreground">Insights</h3>
        </div>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
            Praesent commodo cursus magna vel scelerisque nisl consectetur.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
            Donec sed odio dui nulla vitae elit libero a pharetra augue.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
            Maecenas faucibus mollis interdum etiam porta sem malesuada.
          </li>
        </ul>
      </div>
    </div>
  );
}
