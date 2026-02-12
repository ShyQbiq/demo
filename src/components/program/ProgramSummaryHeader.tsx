import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProgramSummaryHeaderProps {
  siteName: string;
  programType: string;
}

export function ProgramSummaryHeader({ siteName, programType }: ProgramSummaryHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-subtle">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Program</h1>
          <p className="text-sm text-muted-foreground">{siteName}</p>
        </div>
      </div>
      <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
        {programType}
      </Badge>
    </div>
  );
}
