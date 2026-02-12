import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const DATA = [
  { name: "Workstations", value: 38, color: "hsl(198, 70%, 42%)" },
  { name: "Meeting Rooms", value: 18, color: "hsl(152, 60%, 42%)" },
  { name: "Support", value: 14, color: "hsl(38, 92%, 50%)" },
  { name: "Circulation", value: 15, color: "hsl(215, 14%, 50%)" },
  { name: "Amenities", value: 10, color: "hsl(198, 70%, 70%)" },
  { name: "Other", value: 5, color: "hsl(220, 18%, 80%)" },
];

export function SpaceDonutChart() {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-subtle space-y-3">
      <h3 className="text-sm font-semibold">Space Allocation</h3>
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={DATA}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={78}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value}%`, ""]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1.5">
        {DATA.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-[11px] text-muted-foreground">{entry.name} {entry.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
