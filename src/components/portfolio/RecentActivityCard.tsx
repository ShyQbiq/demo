import { Clock, FileText, PenLine, Eye, Upload } from "lucide-react";

const ACTIONS = [
  { icon: PenLine, text: "Edited floor plan for Westfield Tower", time: "12 min ago" },
  { icon: Upload, text: "Uploaded site survey for Harbor Point", time: "1 hr ago" },
  { icon: Eye, text: "Reviewed cost estimate — Skyline Plaza", time: "3 hrs ago" },
  { icon: FileText, text: "Generated deliverables for Meridian Campus", time: "Yesterday" },
  { icon: PenLine, text: "Updated zoning constraints — Greenway Park", time: "2 days ago" },
];

export function RecentActivityCard() {
  return (
    <div className="rounded-lg border bg-card shadow-subtle p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">Recent Activity</h3>
      </div>
      <ul className="space-y-3">
        {ACTIONS.map((action, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent">
              <action.icon className="h-3 w-3 text-accent-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-foreground leading-snug">{action.text}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{action.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
