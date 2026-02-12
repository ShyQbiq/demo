import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

export function CostHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg border bg-card p-6 shadow-subtle"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total Estimated Cost
          </p>
          <p className="text-4xl font-bold tracking-tight">$146.2M</p>
          <p className="text-sm text-muted-foreground">
            Confidence range: $138.4M – $154.1M
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <DollarSign className="h-6 w-6" />
        </div>
      </div>

      {/* Confidence range bar */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground">
          <span>$138.4M</span>
          <span className="text-xs font-semibold text-foreground">$146.2M</span>
          <span>$154.1M</span>
        </div>
        <div className="relative h-3 rounded-full bg-muted overflow-hidden">
          {/* Full range */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 rounded-full bg-primary/20"
          />
          {/* Core estimate */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="absolute inset-y-0 left-[20%] rounded-full bg-primary/50"
          />
          {/* Point estimate marker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute top-0 bottom-0 left-[50%] w-0.5 bg-primary"
          />
        </div>
      </div>
    </motion.div>
  );
}
