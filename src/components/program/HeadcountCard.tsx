import { useState } from "react";
import { Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROGRAM_SUMMARY } from "@/data/programData";

export function HeadcountCard() {
  const [fields, setFields] = useState([
    { label: "Program Headcount", value: String(PROGRAM_SUMMARY.programHeadcount) },
    { label: "Building Net Sqf", value: PROGRAM_SUMMARY.buildingNetSqf.toLocaleString() },
    { label: "Program Net Sqf", value: PROGRAM_SUMMARY.currentProgramNetSqf.toLocaleString() },
    { label: "Assigned Space", value: `${PROGRAM_SUMMARY.assignedSpacePct}%` },
  ]);

  const handleChange = (index: number, val: string) => {
    setFields((prev) => prev.map((f, i) => (i === index ? { ...f, value: val } : f)));
  };

  return (
    <div className="rounded-lg border bg-card p-5 shadow-subtle space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">Headcount</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fields.map((field, i) => (
          <div key={field.label} className="space-y-1.5">
            <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {field.label}
            </Label>
            <Input
              value={field.value}
              onChange={(e) => handleChange(i, e.target.value)}
              className="h-9 bg-muted/30 text-sm font-medium border-transparent focus:border-primary"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
