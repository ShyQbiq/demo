import { X, Eye, Sun, Move, Shield, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { DesignOption } from "./DesignOptionCard";
import { motion } from "framer-motion";

interface DesignDrawerProps {
  option: DesignOption;
  onClose: () => void;
}

const METRICS = [
  { label: "Efficiency", key: "efficiency" as const, icon: Eye },
  { label: "Daylight", key: "daylight" as const, icon: Sun },
  { label: "Circulation", key: "circulation" as const, icon: Move },
  { label: "Privacy", key: "privacy" as const, icon: Shield },
];

const PROS = [
  "Maximizes open floor plate for flexible team arrangements",
  "Strong daylight penetration with perimeter workstations",
  "Efficient core-to-window depth ratio under 12m",
];

const CONS = [
  "Slightly reduced privacy for executive zone",
  "Circulation paths may cause noise in collaboration areas",
  "Limited expansion capacity on north wing",
];

export function DesignDrawer({ option, onClose }: DesignDrawerProps) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-80 shrink-0 border-l bg-card flex flex-col h-full overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h3 className="text-sm font-semibold">{option.name}</h3>
          {option.tag && (
            <Badge variant="outline" className="text-[10px] mt-1">{option.tag}</Badge>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Metrics */}
      <div className="p-4 space-y-3 border-b">
        <h4 className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
          Performance Metrics
        </h4>
        <div className="grid grid-cols-2 gap-2.5">
          {METRICS.map(({ label, key, icon: Icon }) => (
            <div key={key} className="rounded-lg border bg-muted/30 p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Icon className="h-3 w-3" />
                <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
              </div>
              <p className="text-lg font-bold">{option[key]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pros */}
      <div className="p-4 space-y-2.5 border-b">
        <div className="flex items-center gap-2">
          <ThumbsUp className="h-3.5 w-3.5 text-success" />
          <h4 className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
            Strengths
          </h4>
        </div>
        <ul className="space-y-2">
          {PROS.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-success shrink-0" />
              {pro}
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="p-4 space-y-2.5">
        <div className="flex items-center gap-2">
          <ThumbsDown className="h-3.5 w-3.5 text-destructive" />
          <h4 className="text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
            Considerations
          </h4>
        </div>
        <ul className="space-y-2">
          {CONS.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-destructive shrink-0" />
              {con}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-auto p-4 border-t space-y-2">
        <Button className="w-full">Select This Option</Button>
        <Button variant="outline" className="w-full">Download Report</Button>
      </div>
    </motion.div>
  );
}
