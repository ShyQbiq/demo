import { motion } from "framer-motion";

const BENCHMARKS = [
  { label: "Efficiency", yours: 87, benchmark: 78 },
  { label: "Density", yours: 72, benchmark: 80 },
  { label: "Daylight", yours: 91, benchmark: 74 },
  { label: "Flow", yours: 83, benchmark: 76 },
  { label: "Privacy", yours: 68, benchmark: 71 },
  { label: "Flexibility", yours: 79, benchmark: 69 },
];

export function BenchmarkChart() {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-subtle space-y-4 h-full">
      <div>
        <h3 className="text-sm font-semibold">Benchmark Comparison</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Your design vs. industry average</p>
      </div>

      <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
          <span>Your Design</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/30" />
          <span>Industry Avg</span>
        </div>
      </div>

      <div className="space-y-3">
        {BENCHMARKS.map((item, i) => (
          <div key={item.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">{item.label}</span>
              <span className="font-semibold">{item.yours}%</span>
            </div>
            <div className="relative h-2 rounded-full bg-muted overflow-hidden">
              {/* Benchmark bar (behind) */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.benchmark}%` }}
                transition={{ duration: 0.6, delay: i * 0.05 + 0.2, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 rounded-full bg-muted-foreground/25"
              />
              {/* Your bar (front) */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.yours}%` }}
                transition={{ duration: 0.8, delay: i * 0.05 + 0.1, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 rounded-full bg-primary"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
