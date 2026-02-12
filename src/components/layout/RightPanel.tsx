import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface RightPanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}

export function RightPanel({ open, onClose, title = "Details", children }: RightPanelProps) {
  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed right-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-96 border-l bg-card shadow-elevated animate-slide-in-right"
      )}
    >
      <div className="flex h-12 items-center justify-between border-b px-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        <button
          onClick={onClose}
          className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="overflow-y-auto p-4 h-[calc(100%-3rem)]">{children}</div>
    </div>
  );
}
