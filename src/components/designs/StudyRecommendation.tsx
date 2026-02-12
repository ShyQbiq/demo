import { motion } from "framer-motion";
import { CheckCircle2, Star, Building2, Users, Ruler, Shield, DoorOpen, Coffee, TrendingUp, DollarSign } from "lucide-react";

const fade = (i: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.05 * i, duration: 0.3 },
});

const SHORTLIST = [
  { id: "#895130", seats: 200, recommended: true },
  { id: "#894331", seats: 165, note: "scalable" },
  { id: "#894304", seats: 188 },
];

const KEY_METRICS = [
  { label: "Capacity", value: "200 seats", icon: Users },
  { label: "Density", value: "10.76 m²/person", icon: Ruler },
  { label: "Privacy Score", value: "26", icon: Shield },
  { label: "Seating Mix", value: "148 focus / 52 open", icon: DoorOpen },
  { label: "Amenity Ratio", value: "0.9", icon: Coffee },
  { label: "Conference Ratio", value: "1.27", icon: Building2 },
  { label: "Cost Factor", value: "1.78", icon: DollarSign },
];

export function StudyRecommendation() {
  return (
    <div className="h-full overflow-y-auto p-5 space-y-5 animate-fade-in">
      {/* Header */}
      <motion.div {...fade(0)}>
        <h2 className="text-base font-semibold">
          Item Management – Focused Overview
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Best fits for approximately 200 employees
        </p>
      </motion.div>

      {/* Design Shortlist */}
      <motion.div {...fade(1)} className="rounded-lg border bg-card p-4 space-y-3">
        <h3 className="text-xs font-semibold">Design Shortlist</h3>
        <div className="grid grid-cols-3 gap-3">
          {SHORTLIST.map((s) => (
            <div
              key={s.id}
              className={`rounded-lg border p-3 space-y-1 ${
                s.recommended ? "border-primary bg-primary/5" : "bg-card"
              }`}
            >
              <div className="flex items-center gap-1.5">
                {s.recommended && (
                  <Star className="h-3.5 w-3.5 text-primary fill-primary" />
                )}
                <span className="text-sm font-bold">Study {s.id}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {s.seats} seats{s.note ? ` (${s.note})` : ""}
              </p>
              {s.recommended && (
                <span className="text-[10px] text-primary font-medium">
                  Recommended
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground italic">
          All shortlisted options are AI-generated and not yet Qbiq-verified.
        </p>
      </motion.div>

      {/* Recommended Study */}
      <motion.div {...fade(2)} className="rounded-lg border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <h3 className="text-xs font-semibold">
            Recommended: Study #895130
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {KEY_METRICS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-md border p-2 space-y-0.5">
              <div className="flex items-center gap-1">
                <Icon className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">{label}</span>
              </div>
              <p className="text-xs font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Why This Works */}
      <motion.div {...fade(3)} className="rounded-lg border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-semibold">
            Why This Works for Software Teams
          </h3>
        </div>
        <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
          <p>
            This layout strongly supports engineering and software development
            work. It provides a high number of enclosed and quiet focus seats
            while maintaining sufficient collaboration areas and meeting rooms.
          </p>
          <p>
            The density is efficient without feeling cramped and aligns well
            with contemporary tech-HQ standards. Costs remain reasonable
            compared to higher-privacy, more expensive schemes.
          </p>
          <p>The plan also allows flexibility in desk and room allocation, enabling:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Agile squad structures</li>
            <li>Dedicated project rooms</li>
            <li>Future refinements for hybrid work patterns</li>
          </ul>
        </div>
      </motion.div>

      {/* Bottom Line */}
      <motion.div {...fade(4)} className="rounded-lg border border-primary/30 bg-primary/5 p-4">
        <h4 className="text-xs font-semibold mb-1">Bottom Line</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          This space can evolve into a focused yet collaborative engineering
          hub, supporting deep, code-heavy work and product collaboration —
          without overspending on ultra-premium space or fully cellular office
          layouts.
        </p>
      </motion.div>
    </div>
  );
}
