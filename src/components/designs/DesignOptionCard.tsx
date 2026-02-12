import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Sun, Move, Shield } from "lucide-react";
import { motion } from "framer-motion";

export interface DesignOption {
  id: string;
  name: string;
  efficiency: string;
  daylight: string;
  circulation: string;
  privacy: string;
  tag?: string;
}

interface DesignOptionCardProps {
  option: DesignOption;
  index: number;
  onOpen: (id: string) => void;
}

const METRIC_ICONS = [
  { label: "Efficiency", icon: Eye, key: "efficiency" as const },
  { label: "Daylight", icon: Sun, key: "daylight" as const },
  { label: "Circulation", icon: Move, key: "circulation" as const },
  { label: "Privacy", icon: Shield, key: "privacy" as const },
];

export function DesignOptionCard({ option, index, onOpen }: DesignOptionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="rounded-lg border bg-card shadow-subtle hover:shadow-card transition-all group"
    >
      {/* Preview placeholder */}
      <div className="relative h-40 bg-muted/50 rounded-t-lg overflow-hidden flex items-center justify-center">
        {/* Abstract floor plan shapes */}
        <div className="absolute inset-4 opacity-20">
          <div className="absolute top-0 left-0 w-[45%] h-[55%] rounded border-2 border-foreground" />
          <div className="absolute top-0 right-0 w-[48%] h-[40%] rounded border-2 border-foreground" />
          <div className="absolute bottom-0 left-0 w-[35%] h-[38%] rounded border-2 border-foreground" />
          <div className="absolute bottom-0 right-[5%] w-[55%] h-[50%] rounded border-2 border-foreground" />
          <div className="absolute top-[30%] left-[25%] w-[20%] h-[25%] rounded bg-foreground/10" />
        </div>
        <span className="text-xs font-medium text-muted-foreground relative z-10">
          Floor Plan Preview
        </span>
        {option.tag && (
          <Badge className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-[10px]">
            {option.tag}
          </Badge>
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-sm font-semibold">{option.name}</h3>

        {/* Metrics row */}
        <div className="grid grid-cols-4 gap-1">
          {METRIC_ICONS.map(({ label, icon: Icon, key }) => (
            <div key={key} className="text-center space-y-1">
              <Icon className="h-3.5 w-3.5 mx-auto text-muted-foreground" />
              <p className="text-xs font-semibold">{option[key]}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onOpen(option.id)}
        >
          Open
        </Button>
      </div>
    </motion.div>
  );
}
