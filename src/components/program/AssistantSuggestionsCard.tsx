import { Lightbulb } from "lucide-react";

export function AssistantSuggestionsCard() {
  return (
    <div className="rounded-lg border bg-accent/50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-4 w-4 text-accent-foreground" />
        <h3 className="text-sm font-semibold text-accent-foreground">qbiq Suggestions</h3>
      </div>
      <ul className="space-y-2 text-xs text-muted-foreground">
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
          Based on the projected headcount of 1,800, consider increasing meeting room allocation by 15% to maintain the recommended 1:12 ratio.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
          Current desk-sharing ratio of 1:1.2 is below industry benchmark of 1:1.5 — adjusting could save approximately 4,200 sqft.
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
          Adding a wellness room and mothers room is recommended for compliance with updated workplace standards.
        </li>
      </ul>
    </div>
  );
}
