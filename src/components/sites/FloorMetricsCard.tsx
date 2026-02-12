import { Ruler, Box, Users, ArrowRight, Sun } from "lucide-react";
import { motion } from "framer-motion";

const METRICS = [
  { label: "Gross Area", value: "18,400 sqf", icon: Ruler },
  { label: "Net Area", value: "14,720 sqf", icon: Box },
  { label: "Core Area", value: "3,680 sqf", icon: Box },
  { label: "Max Occupancy", value: "210 people", icon: Users },
  { label: "Facade Length", value: "312 ft", icon: ArrowRight },
  { label: "Window Ratio", value: "62%", icon: Sun },
];

export function FloorMetricsCard() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Floor Plan Analysis</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Detected parameters</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {METRICS.map(({ label, value, icon: Icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="rounded-lg border bg-card px-3 py-2.5"
          >
            <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <p className="text-[10px] uppercase tracking-wider">{label}</p>
            </div>
            <p className="text-sm font-semibold">{value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
