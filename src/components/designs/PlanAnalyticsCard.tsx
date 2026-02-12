import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Users, Triangle } from "lucide-react";

// ─── Plan 1 data ───
const PLAN_1 = {
  openWork: 91,
  enclosedWork: 25,
  enclosedCollab: 80,
  openCollab: 39,
  totalNetSqf: 14_430,
  headcount: 114,
  breakout: 12,
};

// ─── Plan 2 data (more conference rooms, less density) ───
const PLAN_2 = {
  openWork: 102,
  enclosedWork: 22,
  enclosedCollab: 114,  // 19 conference rooms → more seats
  openCollab: 44,
  totalNetSqf: 15_200,
  headcount: 114,
  breakout: 10,
};

interface PlanAnalyticsCardProps {
  variant?: "v1" | "v2";
}

function getPlanData(variant: "v1" | "v2") {
  const d = variant === "v2" ? PLAN_2 : PLAN_1;
  const totalWork = d.openWork + d.enclosedWork;
  const totalCollab = d.enclosedCollab + d.openCollab;
  const openPct = Math.round((d.openWork / totalWork) * 100);
  const enclosedPct = 100 - openPct;
  return { ...d, totalWork, totalCollab, openPct, enclosedPct };
}

interface BarSegment {
  value: number;
  color: string;
}

function HorizontalBar({ segments, total }: { segments: BarSegment[]; total: number }) {
  return (
    <div className="flex h-2.5 rounded-full overflow-hidden bg-muted/40 w-full">
      {segments.map((seg, i) => (
        <motion.div
          key={i}
          initial={{ width: 0 }}
          animate={{ width: `${(seg.value / total) * 100}%` }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="h-full"
          style={{ backgroundColor: seg.color }}
        />
      ))}
    </div>
  );
}

function MetricBox({
  label,
  value,
  unit,
  benchmark,
  icon,
  warning,
}: {
  label: string;
  value: string;
  unit: string;
  benchmark?: string;
  icon?: React.ReactNode;
  warning?: boolean;
}) {
  return (
    <div className="rounded-lg border bg-card p-3 space-y-1">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-1.5">
        {icon}
        <span className={`text-lg font-bold ${warning ? "text-destructive" : ""}`}>{value}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      {benchmark && (
        <p className="text-[10px] text-muted-foreground/70">{benchmark}</p>
      )}
    </div>
  );
}

export function PlanAnalyticsCard({ variant = "v1" }: PlanAnalyticsCardProps) {
  const p = getPlanData(variant);
  const { totalWork, totalCollab, openPct, enclosedPct, totalNetSqf, headcount, enclosedCollab, openWork, enclosedWork, openCollab, breakout } = p;

  const SEATING_DATA = [
    { name: "Open", value: openPct, color: "hsl(var(--primary))" },
    { name: "Enclosed", value: enclosedPct, color: "hsl(var(--muted))" },
  ];

  const usableDensity = Math.round(totalNetSqf / (totalWork + totalCollab));
  const pickDensity = Math.round(totalNetSqf / headcount);
  const collabWorkRatio = (totalCollab / totalWork).toFixed(2);
  const meetingWorkRatio = (enclosedCollab / totalWork).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5"
    >
      {/* Seating & Density donut */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Seating &amp; Density</h3>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Enclosed</p>
            <p className="text-sm font-semibold">{enclosedPct}%</p>
          </div>
          <div className="h-[100px] w-[100px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SEATING_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={46}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {SEATING_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Open</p>
            <p className="text-sm font-semibold">{openPct}%</p>
          </div>
        </div>
      </div>

      <div className="border-t" />

      {/* Seat Types Distribution */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Seat Types Distribution</h3>

        {/* Work Seats */}
        <div className="rounded-lg border bg-card p-3 space-y-2 mb-3">
          <p className="text-xs text-muted-foreground">Work Seats</p>
          <p className="text-xl font-bold">{totalWork}</p>
          <div className="flex items-center gap-2">
            <HorizontalBar
              segments={[
                { value: openWork, color: "hsl(var(--primary))" },
                { value: enclosedWork, color: "hsl(45 93% 70%)" },
              ]}
              total={totalWork}
            />
          </div>
          <div className="flex gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-primary" /> {openWork}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm" style={{ background: "hsl(45 93% 70%)" }} /> {enclosedWork}
            </span>
          </div>
        </div>

        {/* Collab Seats */}
        <div className="rounded-lg border bg-card p-3 space-y-2 mb-3">
          <p className="text-xs text-muted-foreground">Collab Seats</p>
          <p className="text-xl font-bold">{totalCollab}</p>
          <div className="flex items-center gap-2">
            <HorizontalBar
              segments={[
                { value: enclosedCollab, color: "hsl(var(--primary))" },
                { value: openCollab, color: "hsl(45 93% 70%)" },
              ]}
              total={totalCollab}
            />
          </div>
          <div className="flex gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-primary" /> {enclosedCollab}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm" style={{ background: "hsl(45 93% 70%)" }} /> {openCollab}
            </span>
          </div>
        </div>

        {/* Breakout Seats */}
        <div className="rounded-lg border bg-card p-3 space-y-1">
          <p className="text-xs text-muted-foreground">Breakout Seats</p>
          <p className="text-xl font-bold">{breakout}</p>
        </div>
      </div>

      <div className="border-t" />

      {/* Density */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Density</h3>
        <div className="grid grid-cols-2 gap-2">
          <MetricBox
            label="Usable Density"
            value={String(usableDensity)}
            unit="sqf/seats"
            benchmark="BM: 70-110 sqf/seats"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricBox
            label="Pick Density"
            value={String(pickDensity)}
            unit="sqf/HC"
            benchmark="BM: 45-65 sqf/seats"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>

      {/* Work Seats Ratio */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Work Seats Ratio</h3>
        <div className="grid grid-cols-2 gap-2">
          <MetricBox
            label="Collab. : Work"
            value={`${collabWorkRatio} : 1`}
            unit=""
            benchmark="BM: 0.4-0.65 : 1"
            warning
            icon={<Triangle className="h-3.5 w-3.5 text-destructive" />}
          />
          <MetricBox
            label="Meeting : Work"
            value={`${meetingWorkRatio} : 1`}
            unit=""
            benchmark="BM: N/A"
            warning
            icon={<Triangle className="h-3.5 w-3.5 text-destructive" />}
          />
        </div>
      </div>
    </motion.div>
  );
}
