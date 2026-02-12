import { Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEPARTMENTS = [
  { name: "Executive Leadership", headcount: "45" },
  { name: "Engineering", headcount: "380" },
  { name: "Design & Creative", headcount: "120" },
  { name: "Operations", headcount: "210" },
  { name: "Sales & Marketing", headcount: "280" },
  { name: "HR & Admin", headcount: "165" },
];

export function DepartmentsCard() {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-subtle space-y-4">
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">Departments / Functions</h3>
      </div>
      <div className="space-y-2.5">
        {DEPARTMENTS.map((dept) => (
          <div key={dept.name} className="flex items-center gap-3">
            <Label className="flex-1 text-sm text-foreground">{dept.name}</Label>
            <Input
              readOnly
              value={dept.headcount}
              className="h-8 w-20 bg-muted/40 text-sm font-medium text-right cursor-default focus-visible:ring-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
