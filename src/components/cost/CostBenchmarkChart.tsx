import { motion } from "framer-motion";

const PROJECTS = [
  { label: "This Project", value: 146.2, highlight: true },
  { label: "Tower A (2023)", value: 138.5, highlight: false },
  { label: "Campus B (2024)", value: 162.0, highlight: false },
  { label: "Office C (2023)", value: 129.8, highlight: false },
  { label: "Industry Avg", value: 142.0, highlight: false },
];

const MAX = Math.max(...PROJECTS.map((p) => p.value));

export function CostBenchmarkChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-lg border bg-card p-5 shadow-subtle space-y-4 h-full"
    >
      <div>
        <h3 className="text-sm font-semibold">Benchmark Comparison</h3>
        <p className="text-xs text-muted-foreground mt-0.5">vs. similar projects</p>
      </div>

      <div className="space-y-3">
        {PROJECTS.map((project, i) => (
          <div key={project.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className={project.highlight ? "font-semibold text-foreground" : "text-muted-foreground font-medium"}>
                {project.label}
              </span>
              <span className="font-semibold">${project.value}M</span>
            </div>
            <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(project.value / MAX) * 100}%` }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                className={`absolute inset-y-0 left-0 rounded-full ${
                  project.highlight ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
