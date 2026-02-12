import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ASSET_COLORS, type AssetType } from "@/data/sitesData";

interface AssetPieChartProps {
  data: { name: string; value: number; color: string }[];
  totalLabel?: string;
}

export function AssetPieChart({ data, totalLabel }: AssetPieChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-44 w-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={76}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-2.5 w-full">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full" style={{ background: d.color }} />
              <span className="text-muted-foreground">{d.name}</span>
            </div>
            <span className="font-medium">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
