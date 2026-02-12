import { Skeleton } from "@/components/ui/skeleton";

export function TourSkeleton() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-4">
        <div className="space-y-4">
          <Skeleton className="aspect-video rounded-lg" />
          <Skeleton className="h-8 rounded-md w-full" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-video rounded-lg" />
            ))}
          </div>
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    </div>
  );
}
