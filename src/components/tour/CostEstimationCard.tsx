import { motion } from "framer-motion";
import { DollarSign, Armchair, Layers, DoorOpen, Grid3X3, PanelTop, Wallpaper } from "lucide-react";

interface CostLine {
  label: string;
  range: string;
  icon: React.ElementType;
}

interface CostVariant {
  title: string;
  subtitle: string;
  items: CostLine[];
  total: { label: string; range: string };
}

const VARIANTS: Record<string, CostVariant> = {
  "video-1": {
    title: "High-End Finishes",
    subtitle: "Natural furniture collection · per 1,000 sqm",
    items: [
      { label: "Furniture Items", range: "$600K – $900K", icon: Armchair },
      { label: "Floors", range: "$250K – $350K", icon: Layers },
      { label: "Ceilings", range: "$140K – $200K", icon: PanelTop },
      { label: "Walls", range: "$150K – $220K", icon: Wallpaper },
      { label: "Glass Partitions", range: "$180K – $280K", icon: Grid3X3 },
      { label: "Doors", range: "$120K – $180K", icon: DoorOpen },
    ],
    total: { label: "Indicative High-End Total", range: "≈ $1.55M – $2.1M" },
  },
  "video-2": {
    title: "High-End Finishes",
    subtitle: "MIKEA furniture collection · per 1,000 sqm",
    items: [
      { label: "Furniture Items (MIKEA)", range: "$520K – $800K", icon: Armchair },
      { label: "Floors", range: "$250K – $350K", icon: Layers },
      { label: "Ceilings", range: "$140K – $200K", icon: PanelTop },
      { label: "Walls", range: "$150K – $220K", icon: Wallpaper },
      { label: "Glass Partitions", range: "$180K – $280K", icon: Grid3X3 },
      { label: "Doors", range: "$120K – $180K", icon: DoorOpen },
    ],
    total: { label: "Indicative Total (MIKEA)", range: "≈ $1.36M – $2.03M" },
  },
  "video-3": {
    title: "Affordable Finishes",
    subtitle: "Modern furniture · solid walls · per 1,000 sqm",
    items: [
      { label: "Furniture (basic / MIKEA)", range: "$380K – $550K", icon: Armchair },
      { label: "Floors (vinyl / porcelain)", range: "$120K – $180K", icon: Layers },
      { label: "Ceilings (gypsum / exposed)", range: "$80K – $120K", icon: PanelTop },
      { label: "Walls (painted / gypsum)", range: "$90K – $140K", icon: Wallpaper },
      { label: "Glass Partitions", range: "$0", icon: Grid3X3 },
      { label: "Doors (flush laminate)", range: "$70K – $100K", icon: DoorOpen },
    ],
    total: { label: "Indicative Total (Affordable)", range: "≈ $740K – $1.19M" },
  },
};

export function CostEstimationCard({ variant = "video-1" }: { variant?: string }) {
  const data = VARIANTS[variant] ?? VARIANTS["video-1"];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold">Cost Estimation</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{data.title} · {data.subtitle}</p>
      </div>
      <div className="space-y-2">
        {data.items.map(({ label, range, icon: Icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="flex items-center gap-3 rounded-lg border bg-card px-4 py-2.5"
          >
            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold">{range}</p>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Total */}
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45 }}
        className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3"
      >
        <DollarSign className="h-4 w-4 shrink-0 text-primary" />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-muted-foreground">{data.total.label}</p>
          <p className="text-sm font-semibold text-primary">{data.total.range}</p>
        </div>
      </motion.div>
    </div>
  );
}
