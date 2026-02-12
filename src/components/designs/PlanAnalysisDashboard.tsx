import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Lightbulb, Users, TriangleAlert } from "lucide-react";
import analyticPlan1 from "@/assets/analytic-plan-1.png";
import analyticPlan2 from "@/assets/analytic-plan-2.png";

const fade = (i: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.05 * i, duration: 0.3 },
});

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

const useCountUp = (target: number, durationMs = 1000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, durationMs]);

  return value;
};

/* ─── tiny donut via SVG ─── */
const MiniDonut = ({
  segments,
  size = 120,
}: {
  segments: { pct: number; color: string; label: string }[];
  size?: number;
}) => {
  const r = 40;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {segments.map((s, i) => {
        const dash = (s.pct / 100) * c;
        const el = (
          <motion.circle
            key={i}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="18"
            initial={{ strokeDasharray: `0 ${c}` }}
            animate={{ strokeDasharray: `${dash} ${c - dash}` }}
            transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
            strokeDashoffset={-offset}
            transform="rotate(-90 50 50)"
          />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
};

const DonutWithLabels = ({
  segments,
  size,
}: {
  segments: { pct: number; color: string; label: string }[];
  size?: number;
}) => (
  <div className="flex items-center gap-3">
    <MiniDonut segments={segments} size={size} />
    <div className="space-y-1">
      {segments.map((s) => (
        <div key={s.label} className="flex items-center gap-1.5 text-[11px]">
          <span
            className="w-2.5 h-2.5 rounded-sm shrink-0"
            style={{ backgroundColor: s.color }}
          />
          <span className="text-muted-foreground">{s.label}</span>
          <span className="font-semibold ml-auto">{s.pct}%</span>
        </div>
      ))}
    </div>
  </div>
);

/* ─── benchmark bar ─── */
const BenchmarkBar = ({
  label,
  value,
  benchmark,
  color,
}: {
  label: string;
  value: number;
  benchmark: string;
  color: string;
}) => (
  <div className="flex items-center gap-2 text-[11px]">
    <span className="w-24 text-muted-foreground">{label}</span>
    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ backgroundColor: color }}
      />
    </div>
    <span className="text-[10px] text-muted-foreground w-16">{benchmark}</span>
  </div>
);

/* ─── KPI tile ─── */
const KpiTile = ({
  label,
  value,
  sub,
}: {
  label: string;
  value: number;
  sub?: string;
}) => {
  const count = useCountUp(value, 2000);
  return (
    <div className="rounded-lg border bg-card p-3">
    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
      {label}
    </p>
      <p className="text-lg font-bold mt-0.5 tabular-nums">{formatNumber(count)}</p>
    {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
    </div>
  );
};

const DensityTile = ({
  label,
  value,
  unit,
  benchmark,
  icon,
}: {
  label: string;
  value: string;
  unit: string;
  benchmark: string;
  icon?: React.ReactNode;
}) => (
  <div className="rounded-lg border bg-card p-3 space-y-1">
    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
      {label}
    </p>
    <div className="flex items-baseline gap-1">
      {icon}
      <span className="text-xl font-bold text-red-500">{value}</span>
      <span className="text-[10px] text-muted-foreground">{unit}</span>
    </div>
    <p className="text-[10px] text-muted-foreground">BM: {benchmark}</p>
  </div>
);

/* ─── seat type row ─── */
const SeatTypeRow = ({
  label,
  total,
  bars,
}: {
  label: string;
  total: number | string;
  bars: { value: number; color: string }[];
}) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-sm font-bold">{total}</span>
    </div>
    <div className="flex gap-0.5 h-2">
      {bars.map((b, i) => (
        <motion.div
          key={i}
          className="h-full rounded-sm"
          initial={{ width: 0 }}
          animate={{ width: `${(b.value / 200) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 * i }}
          style={{ backgroundColor: b.color, minWidth: b.value > 0 ? 4 : 0 }}
        />
      ))}
    </div>
    <div className="flex gap-3">
      {bars.map((b, i) => (
        <span key={i} className="text-[10px] text-muted-foreground flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-sm inline-block"
            style={{ backgroundColor: b.color }}
          />
          {b.value}
        </span>
      ))}
    </div>
  </div>
);

/* ═══════ MAIN COMPONENT ═══════ */
export function PlanAnalysisDashboard() {
  const kpis = useMemo(
    () => [
      { label: "Total Area", value: 27770, sub: "sqf" },
      { label: "Usable Area", value: 23153, sub: "/ 27,770 sqf" },
      { label: "Net Area", value: 18088, sub: "/ 27,770 sqf" },
      { label: "Headcount", value: 193 },
    ],
    []
  );
  const netAreaSegments = [
    { pct: 47, color: "#8EA8D8", label: "Primary" },
    { pct: 18, color: "#A3D9A5", label: "Collaboration" },
    { pct: 21, color: "#F5D76E", label: "Support" },
    { pct: 0, color: "#E8A0C0", label: "Amenities" },
    { pct: 15, color: "#C5A3D9", label: "Speciality" },
  ];

  const seatBreakdown = [
    { pct: 69, color: "#8EA8D8", label: "Open" },
    { pct: 31, color: "#F5D76E", label: "Enclosed" },
  ];

  return (
    <div className="h-full overflow-y-auto p-5 space-y-5 animate-fade-in">
      {/* Header */}
      <motion.div {...fade(0)}>
        <h2 className="text-base font-semibold">
          Program mix distribution and density analysis
        </h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
          Evaluate functional balance and programmatic fit. Aids comparison
          against benchmarks. The analysis offers initial clarity on program
          distribution within the floor plan, supporting proper accessibility to
          various room categories, and provides key data.
        </p>
      </motion.div>

      {/* KPI Row */}
      <motion.div {...fade(1)} className="grid grid-cols-4 gap-3">
        {kpis.map((kpi) => (
          <KpiTile key={kpi.label} label={kpi.label} value={kpi.value} sub={kpi.sub} />
        ))}
      </motion.div>

      {/* Insights */}
      <motion.div
        {...fade(2)}
        className="rounded-lg border bg-card p-4 space-y-1"
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
          Insights
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Primary seating makes up <strong>47%</strong> of the net area, below
          the benchmark, while the collab to work ratio of{" "}
          <strong>0.8 to 1</strong> exceeds the benchmark, indicating a stronger
          focus on collaboration spaces.
        </p>
      </motion.div>

      {/* Two columns: Area Breakdown | Seating & Density */}
      <div className="grid grid-cols-2 gap-4">
        {/* Area Breakdown */}
        <motion.div {...fade(3)} className="rounded-lg border bg-card p-4 space-y-3">
          <h3 className="text-xs font-semibold">Area Breakdown</h3>
          <div className="flex items-start gap-4">
            <img
              src={analyticPlan1}
              alt="Floor plan"
              className="w-36 h-auto rounded border object-contain"
            />
            <div>
              <p className="text-[10px] font-semibold mb-2">
                Net Area Breakdown (%)
              </p>
              <DonutWithLabels segments={netAreaSegments} size={100} />
            </div>
          </div>
        </motion.div>

        {/* Seating & Density */}
        <motion.div {...fade(4)} className="rounded-lg border bg-card p-4 space-y-3">
          <h3 className="text-xs font-semibold">Seating & Density</h3>
          <div className="flex items-start gap-4">
            <img
              src={analyticPlan2}
              alt="Seating plan"
              className="w-36 h-auto rounded border object-contain"
            />
            <div>
              <p className="text-[10px] font-semibold mb-2">Breakdown (%)</p>
              <DonutWithLabels segments={seatBreakdown} size={100} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Density + Seat Types row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Density */}
        <motion.div {...fade(5)} className="space-y-3">
          <h3 className="text-xs font-semibold">Density</h3>
          <div className="grid grid-cols-2 gap-3">
            <DensityTile
              label="Usable Density"
              value="129"
              unit="sqf/seats"
              benchmark="70-110 sqf/seats"
              icon={<Users className="h-3.5 w-3.5 text-muted-foreground" />}
            />
            <DensityTile
              label="Pick Density"
              value="81"
              unit="sqf/HC"
              benchmark="45-65 sqf/seats"
              icon={<Users className="h-3.5 w-3.5 text-muted-foreground" />}
            />
          </div>

          <div className="rounded-lg border bg-card p-3 space-y-2">
            <h4 className="text-[10px] font-semibold uppercase tracking-wider">
              Work Seats Ratio
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground">
                  Collab. : Work
                </p>
                <p className="text-base font-bold flex items-center gap-1">
                  <TriangleAlert className="h-3 w-3 text-amber-500" />
                  0.8 : 1
                </p>
                <p className="text-[10px] text-muted-foreground">
                  BM: 0.4-0.65 : 1
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">
                  Meeting : Work
                </p>
                <p className="text-base font-bold flex items-center gap-1">
                  <TriangleAlert className="h-3 w-3 text-amber-500" />
                  0.68 : 1
                </p>
                <p className="text-[10px] text-muted-foreground">BM: N/A</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Seat Types Distribution */}
        <motion.div
          {...fade(6)}
          className="rounded-lg border bg-card p-4 space-y-3"
        >
          <h3 className="text-xs font-semibold">Seat Types Distribution</h3>
          <SeatTypeRow
            label="Work Seats"
            total={193}
            bars={[
              { value: 162, color: "#8EA8D8" },
              { value: 31, color: "#F5D76E" },
            ]}
          />
          <SeatTypeRow
            label="Collab Seats"
            total={21}
            bars={[
              { value: 5, color: "#A3D9A5" },
              { value: 16, color: "#E8A0C0" },
            ]}
          />
          <SeatTypeRow
            label="Breakout Seats"
            total="N/A"
            bars={[]}
          />
        </motion.div>
      </div>

      {/* Area Use vs Benchmarks */}
      <motion.div
        {...fade(7)}
        className="rounded-lg border bg-card p-4 space-y-3"
      >
        <h3 className="text-xs font-semibold">Area Use vs. Benchmarks</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <BenchmarkBar label="Primary" value={47} benchmark="50%-70%" color="#8EA8D8" />
          <BenchmarkBar label="Amenities" value={3} benchmark="0%-5%" color="#F5D76E" />
          <BenchmarkBar label="Collaboration" value={18} benchmark="15%-25%" color="#A3D9A5" />
          <BenchmarkBar label="Floor Support Open" value={5} benchmark="N/A" color="#C5A3D9" />
          <BenchmarkBar label="Support" value={21} benchmark="15%-20%" color="#E8A0C0" />
        </div>
      </motion.div>
    </div>
  );
}
