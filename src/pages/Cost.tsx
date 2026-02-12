import { CostHeader } from "@/components/cost/CostHeader";
import { CostBreakdownTable } from "@/components/cost/CostBreakdownTable";
import { CostBenchmarkChart } from "@/components/cost/CostBenchmarkChart";
import { SavingsOpportunities } from "@/components/cost/SavingsOpportunities";
import { CostSkeleton } from "@/components/cost/CostSkeleton";
import { useStep } from "@/contexts/StepContext";
import { useRightPaneContent } from "@/hooks/useRightPaneContent";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPlaceholder = () => (
  <div className="space-y-4 animate-fade-in p-2">
    <Skeleton className="h-6 w-32 rounded" />
    <Skeleton className="h-40 rounded-lg" />
    <Skeleton className="h-40 rounded-lg" />
  </div>
);

const Cost = () => {
  const { centerVariant, rightVariant } = useStep();

  const isLoading = centerVariant === "cost-loading";

  let rightContent: React.ReactNode = null;
  if (rightVariant === "cost-estimation") {
    rightContent = <SavingsOpportunities />;
  } else if (rightVariant === "loading") {
    rightContent = <LoadingPlaceholder />;
  }
  useRightPaneContent(rightContent, rightVariant);

  if (isLoading) return <CostSkeleton />;

  return (
    <div className="space-y-4 animate-fade-in h-full overflow-y-auto">
      <CostHeader />
      <CostBreakdownTable />
      <CostBenchmarkChart />
    </div>
  );
};

export default Cost;
