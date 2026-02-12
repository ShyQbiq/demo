import { Building2, DollarSign, Globe, TrendingUp } from "lucide-react";

interface SitesSummaryStatsProps {
  totalArea: string;
  avgRent: string;
  regions: number;
}

function StatSection({ title, stats }: { title: string; stats: { label: string; value: string; icon: React.ElementType }[] }) {
  return (
    <div className="space-y-3 pt-2 border-t border-border">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-2.5">
            <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SitesSummaryStats({ totalArea, avgRent, regions }: SitesSummaryStatsProps) {
  const portfolioStats = [
    { label: "Total Area", value: `${totalArea} sqf`, icon: Building2 },
    { label: "Avg. Rent", value: `${avgRent}/sqf`, icon: DollarSign },
    { label: "Regions", value: `${regions}`, icon: Globe },
    { label: "Avg. Occupancy", value: "87%", icon: TrendingUp },
  ];

  const prospectStats = [
    { label: "Total Area", value: "843M sqf", icon: Building2 },
    { label: "Avg. Rent", value: "$43/sqf", icon: DollarSign },
    { label: "Regions", value: "182", icon: Globe },
    { label: "Avg. Occupancy", value: "68%", icon: TrendingUp },
  ];

  return (
    <div className="space-y-4">
      <StatSection title="Portfolio Summary" stats={portfolioStats} />
      <StatSection title="Prospect Summary" stats={prospectStats} />
    </div>
  );
}