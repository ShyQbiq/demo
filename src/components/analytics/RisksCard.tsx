import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RISKS = [
  { title: "Floor plate depth exceeds 15m on south wing, limiting daylight penetration to interior zones", severity: "High" },
  { title: "Current circulation routing creates bottleneck near the main elevator lobby during peak hours", severity: "High" },
  { title: "Acoustic privacy scores below threshold in open-plan areas adjacent to collaboration hubs", severity: "Medium" },
  { title: "Structural columns at grid lines C4–C7 constrain partition flexibility for future reconfiguration", severity: "Medium" },
  { title: "Emergency egress path from L12 amenity zone requires additional signage to meet code compliance", severity: "Low" },
];

const severityColor = {
  High: "bg-destructive/15 text-destructive border-destructive/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Low: "bg-muted text-muted-foreground border-border",
};

export function RisksCard() {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-subtle space-y-3 h-full">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <h3 className="text-sm font-semibold">Risks & Constraints</h3>
      </div>

      <ul className="space-y-2.5">
        {RISKS.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="flex items-start gap-3 group cursor-pointer rounded-md p-2 -mx-2 hover:bg-muted/50 transition-colors"
          >
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground leading-relaxed">{item.title}</p>
              <Badge variant="outline" className={`text-[9px] px-1.5 py-0 mt-1 ${severityColor[item.severity as keyof typeof severityColor]}`}>
                {item.severity}
              </Badge>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
