import { Skeleton } from "@/components/ui/skeleton";

export function CostSkeleton() {
  return (
    <div className="space-y-5 animate-fade-in">
      <Skeleton className="h-36 rounded-lg" />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-4">
        <div className="space-y-4">
          <Skeleton className="h-72 rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    </div>
  );
}
