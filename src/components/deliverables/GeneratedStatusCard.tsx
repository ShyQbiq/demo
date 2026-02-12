import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

const CHECKLIST = [
  { label: "Floor plans exported", done: true },
  { label: "3D renders generated", done: true },
  { label: "BOQ spreadsheet compiled", done: true },
  { label: "Cost summary attached", done: true },
  { label: "Tour video encoded", done: false },
  { label: "Final review sign-off", done: false },
];

export function GeneratedStatusCard() {
  const completed = CHECKLIST.filter((c) => c.done).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-lg border bg-card p-5 shadow-subtle space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Generation Status</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{completed}/{CHECKLIST.length} items ready</p>
        </div>
        <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-0.5">
          {Math.round((completed / CHECKLIST.length) * 100)}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(completed / CHECKLIST.length) * 100}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="h-full rounded-full bg-primary"
        />
      </div>

      <div className="space-y-2">
        {CHECKLIST.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="flex items-center gap-2.5"
          >
            {item.done ? (
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground/40 shrink-0" />
            )}
            <span className={`text-xs ${item.done ? "text-foreground" : "text-muted-foreground"}`}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
