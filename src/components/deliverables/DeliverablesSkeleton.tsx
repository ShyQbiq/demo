import { Skeleton } from "@/components/ui/skeleton";

export function DeliverablesSkeleton() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20 rounded-md" />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-4">
        <div className="space-y-4">
          <Skeleton className="h-64 rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Skeleton className="h-44 rounded-lg" />
            <Skeleton className="h-44 rounded-lg" />
          </div>
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    </div>
  );
}
