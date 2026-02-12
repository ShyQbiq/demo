import { motion } from "framer-motion";
import { Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SAVINGS = [
  {
    title: "Consolidate MEP routing",
    description: "Shared risers on floors 8–12 could reduce ductwork by 18%, saving an estimated $2.1M.",
    impact: "$2.1M",
  },
  {
    title: "Standardise workstation spec",
    description: "Reducing furniture SKUs from 14 to 6 unlocks volume pricing and simplifies procurement.",
    impact: "$1.4M",
  },
  {
    title: "Phase contingency release",
    description: "Releasing 40% of contingency after structural completion aligns spend with risk profile.",
    impact: "$0.8M",
  },
];

export function SavingsOpportunities() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="rounded-lg border bg-card shadow-subtle h-full flex flex-col"
    >
      <div className="flex items-center gap-2 p-5 border-b">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent">
          <Lightbulb className="h-3.5 w-3.5 text-accent-foreground" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">Savings Opportunities</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Potential total: $4.3M</p>
        </div>
      </div>

      <div className="flex-1 p-5 space-y-4">
        {SAVINGS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="group space-y-1"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <span className="text-xs font-semibold text-primary">{item.impact}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            {i < SAVINGS.length - 1 && <div className="pt-3 border-b border-border/50" />}
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t">
        <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 hover:bg-primary/5 hover:border-primary/30 transition-colors">
          View All Opportunities
          <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  );
}
