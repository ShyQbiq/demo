import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const OPPORTUNITIES = [
  { title: "Consolidate underused meeting rooms on L12 east wing", impact: "High", savings: "~240 sqm" },
  { title: "Convert fixed desks to flexible hot-desking zones", impact: "Medium", savings: "~180 sqm" },
  { title: "Relocate server room to basement for noise reduction", impact: "Medium", savings: "Quality ↑" },
  { title: "Expand natural light corridors by repositioning core walls", impact: "Low", savings: "Wellness ↑" },
  { title: "Introduce shared amenity hub between departments", impact: "High", savings: "~120 sqm" },
];

const impactColor = {
  High: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Low: "bg-muted text-muted-foreground border-border",
};

export function OpportunitiesCard() {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-subtle space-y-3 h-full">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-warning" />
        <h3 className="text-sm font-semibold">Optimization Opportunities</h3>
      </div>

      <ul className="space-y-2.5">
        {OPPORTUNITIES.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="flex items-start gap-3 group cursor-pointer rounded-md p-2 -mx-2 hover:bg-muted/50 transition-colors"
          >
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-foreground leading-relaxed">{item.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${impactColor[item.impact as keyof typeof impactColor]}`}>
                  {item.impact}
                </Badge>
                <span className="text-[10px] text-muted-foreground">{item.savings}</span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
