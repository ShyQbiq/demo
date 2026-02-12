import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  label: string;
  completed?: boolean;
  active?: boolean;
}

interface StepperProps {
  steps: Step[];
  className?: string;
}

export function Stepper({ steps, className }: StepperProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors",
              step.completed
                ? "bg-primary text-primary-foreground"
                : step.active
                ? "border-2 border-primary text-primary"
                : "border border-border text-muted-foreground"
            )}
          >
            {step.completed ? <Check className="h-3.5 w-3.5" /> : i + 1}
          </div>
          <span
            className={cn(
              "text-xs font-medium",
              step.active ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {step.label}
          </span>
          {i < steps.length - 1 && (
            <div className={cn("h-px w-8", step.completed ? "bg-primary" : "bg-border")} />
          )}
        </div>
      ))}
    </div>
  );
}
