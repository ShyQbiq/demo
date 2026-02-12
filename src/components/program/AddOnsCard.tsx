import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ADD_ONS = [
  { id: "cafe", label: "Café / Pantry", checked: true },
  { id: "gym", label: "Fitness Center", checked: true },
  { id: "lounge", label: "Staff Lounge", checked: false },
  { id: "library", label: "Library / Quiet Zone", checked: true },
  { id: "reception", label: "Reception & Lobby", checked: true },
  { id: "mailroom", label: "Mailroom / Print Hub", checked: false },
  { id: "mothers", label: "Wellness / Mother's Room", checked: false },
  { id: "bike", label: "Bike Storage", checked: true },
];

export function AddOnsCard() {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-subtle space-y-4">
      <div className="flex items-center gap-2">
        <Plus className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">Add-ons</h3>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {ADD_ONS.map((addon) => (
          <div key={addon.id} className="flex items-center gap-2.5">
            <Checkbox id={addon.id} defaultChecked={addon.checked} className="cursor-default" />
            <Label htmlFor={addon.id} className="text-sm cursor-default">
              {addon.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
