import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
  compact?: boolean;
}

export function KpiCard({ title, value, change, trend = "neutral", icon, compact }: KpiCardProps) {
  if (compact) {
    return (
      <div className="rounded-lg border bg-card p-3 shadow-subtle">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          {icon && <div className="shrink-0">{icon}</div>}
          <span className="text-[10px] font-medium uppercase tracking-wider truncate">{title}</span>
        </div>
        <p className="text-base font-bold tracking-tight">{value}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-5 shadow-subtle transition-shadow hover:shadow-card">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              {trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-kpi-up" />}
              {trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-kpi-down" />}
              {trend === "neutral" && <Minus className="h-3.5 w-3.5 text-kpi-neutral" />}
              <span
                className={cn(
                  "text-xs font-medium",
                  trend === "up" && "text-kpi-up",
                  trend === "down" && "text-kpi-down",
                  trend === "neutral" && "text-kpi-neutral"
                )}
              >
                {change}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
