import { cn } from "@/lib/utils";

interface SkeletonBlockProps {
  lines?: number;
  className?: string;
}

export function SkeletonBlock({ lines = 3, className }: SkeletonBlockProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 rounded-md bg-muted animate-pulse-soft",
            i === lines - 1 ? "w-2/3" : "w-full"
          )}
        />
      ))}
    </div>
  );
}
