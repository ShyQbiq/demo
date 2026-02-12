import { motion } from "framer-motion";

const SEGMENTS = [
  { label: "Open Office", pct: 35, color: "hsl(var(--primary))" },
  { label: "Meeting Rooms", pct: 18, color: "hsl(var(--success))" },
  { label: "Private Offices", pct: 12, color: "hsl(var(--warning))" },
  { label: "Collaboration", pct: 15, color: "hsl(198 70% 70%)" },
  { label: "Support / Amenities", pct: 10, color: "hsl(var(--destructive))" },
  { label: "Circulation", pct: 10, color: "hsl(var(--muted-foreground))" },
];

export function ProgramMixChart() {
  let cumulative = 0;

  return (
    <div className="rounded-lg border bg-card p-5 shadow-subtle space-y-4 h-full">
      <div>
        <h3 className="text-sm font-semibold">Program Mix</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Space allocation breakdown</p>
      </div>

      {/* Stacked horizontal bar */}
      <div className="h-8 rounded-md overflow-hidden flex">
        {SEGMENTS.map((seg, i) => {
          const delay = cumulative * 0.008;
          cumulative += seg.pct;
          return (
            <motion.div
              key={seg.label}
              initial={{ width: 0 }}
              animate={{ width: `${seg.pct}%` }}
              transition={{ duration: 0.7, delay, ease: "easeOut" }}
              className="h-full relative group cursor-pointer"
              style={{ backgroundColor: seg.color }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/20 transition-opacity" />
            </motion.div>
          );
        })}
      </div>

      {/* Legend grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {SEGMENTS.map((seg, i) => (
          <motion.div
            key={seg.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="flex items-center gap-2"
          >
            <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-[11px] text-muted-foreground truncate">{seg.label}</span>
            <span className="text-[11px] font-semibold ml-auto">{seg.pct}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
