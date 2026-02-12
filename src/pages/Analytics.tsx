import { KpiCard } from "@/components/shared/KpiCard";
import { BenchmarkChart } from "@/components/analytics/BenchmarkChart";
import { ProgramMixChart } from "@/components/analytics/ProgramMixChart";
import { OpportunitiesCard } from "@/components/analytics/OpportunitiesCard";
import { RisksCard } from "@/components/analytics/RisksCard";
import { useRightPaneContent } from "@/hooks/useRightPaneContent";
import { useStep } from "@/contexts/StepContext";
import {
  Eye, Users, Sun, ArrowRightLeft, Shield, Shuffle,
} from "lucide-react";

const KPIS = [
  { title: "Efficiency", value: "87%", trend: "up" as const, change: "+3.2% vs avg", icon: <Eye className="h-5 w-5" /> },
  { title: "Density", value: "12.4m²", trend: "neutral" as const, change: "Per person", icon: <Users className="h-5 w-5" /> },
  { title: "Daylight", value: "91%", trend: "up" as const, change: "+17% vs avg", icon: <Sun className="h-5 w-5" /> },
  { title: "Flow", value: "83%", trend: "up" as const, change: "Good circulation", icon: <ArrowRightLeft className="h-5 w-5" /> },
  { title: "Privacy", value: "68%", trend: "down" as const, change: "-3% below target", icon: <Shield className="h-5 w-5" /> },
  { title: "Flexibility", value: "79%", trend: "up" as const, change: "+10% vs avg", icon: <Shuffle className="h-5 w-5" /> },
];

const Analytics = () => {
  const { rightVariant } = useStep();

  useRightPaneContent(
    <div className="space-y-4">
      <OpportunitiesCard />
      <RisksCard />
    </div>,
    rightVariant
  );

  return (
    <div className="space-y-4 animate-fade-in h-full overflow-y-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {KPIS.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>
      <BenchmarkChart />
      <ProgramMixChart />
    </div>
  );
};

export default Analytics;
