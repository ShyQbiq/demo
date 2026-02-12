import { motion } from "framer-motion";
import { Ruler, Users, DoorOpen, LayoutGrid, Percent, TrendingUp } from "lucide-react";

const PLAN_METRICS = [
  { label: "Space Efficiency", value: "86%", icon: Percent },
  { label: "Daylight Score", value: "82%", icon: TrendingUp },
  { label: "Total Seats", value: "198", icon: Users },
  { label: "Conference Rooms", value: "19", icon: DoorOpen },
  { label: "Circulation", value: "78%", icon: LayoutGrid },
  { label: "Density", value: "90 sqf/pp", icon: Ruler },
];

export function PlanDataCard() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Plan Metrics</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Key performance indicators</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {PLAN_METRICS.map(({ label, value, icon: Icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="rounded-lg border bg-card p-3 space-y-1"
          >
            <div className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-lg font-bold">{value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
