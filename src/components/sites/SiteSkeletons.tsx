import { Skeleton } from "@/components/ui/skeleton";

export function MapSkeleton() {
  return (
    <div className="h-full w-full rounded-lg border bg-muted/30 p-4 flex flex-col gap-3">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-32" />
        <div className="flex gap-1">
          <Skeleton className="h-7 w-7 rounded" />
          <Skeleton className="h-7 w-7 rounded" />
        </div>
      </div>
      <Skeleton className="flex-1 rounded-md" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Skeleton className="h-5 w-40 mb-2" />
        <Skeleton className="h-3 w-56" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-3">
            <Skeleton className="h-3 w-14 mb-2" />
            <Skeleton className="h-5 w-20" />
          </div>
        ))}
      </div>
      <div>
        <Skeleton className="h-3 w-16 mb-2" />
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-md" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <Skeleton className="h-28 w-full rounded-lg" />
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
        <span className="text-muted-foreground text-lg">📍</span>
      </div>
      <p className="text-sm font-medium text-foreground">No site selected</p>
      <p className="text-xs text-muted-foreground mt-1">Click a pin on the map to view site details.</p>
    </div>
  );
}
