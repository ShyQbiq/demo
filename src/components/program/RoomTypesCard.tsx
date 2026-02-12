import { useState, useEffect } from "react";
import { LayoutGrid } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PROGRAM_ROOMS } from "@/data/programData";

/** IDs that get modified when "updated" kicks in */
const UPDATED_OVERRIDES: Record<number, { units: number; sqf?: number }> = {
  1:  { units: 2, sqf: 350 },    // Closed Collaboration
  2:  { units: 1, sqf: 75 },     // Cleaning Room
  3:  { units: 2, sqf: 240 },    // Game Room
  4:  { units: 3, sqf: 65 },     // IT
  5:  { units: 3, sqf: 920 },    // Multipurpose
  6:  { units: 2, sqf: 520 },    // Training
  7:  { units: 6, sqf: 130 },    // Videoconf
  8:  { units: 2, sqf: 180 },    // Kitchen
  9:  { units: 2, sqf: 550 },    // Employee Lounge
  10: { units: 4, sqf: 65 },     // Print Hub
  11: { units: 1, sqf: 450 },    // Reception
  12: { units: 2, sqf: 180 },    // Wellness Room
  13: { units: 130, sqf: 45 },   // Benching (more open space)
  14: { units: 5, sqf: 340 },    // Conference L
  15: { units: 5, sqf: 220 },    // Conference M
  16: { units: 7, sqf: 90 },     // Conference S
  17: { units: 4, sqf: 420 },    // Conference XL (total conf = 21)
  18: { units: 4, sqf: 35 },     // Focus Room
  19: { units: 75, sqf: 12 },    // Lockers
  20: { units: 24, sqf: 150 },   // Office M
  21: { units: 2, sqf: 290 },    // Office XL
  22: { units: 8, sqf: 35 },     // Phone Booth
  23: { units: 2, sqf: 70 },     // Storage
  24: { units: 2, sqf: 280 },    // Comfort L
  25: { units: 15, sqf: 65 },    // Comfort S
};

interface RoomTypesCardProps {
  updated?: boolean;
}

export function RoomTypesCard({ updated = false }: RoomTypesCardProps) {
  const getRows = (applyOverrides: boolean) =>
    PROGRAM_ROOMS.map((r) => {
      if (!applyOverrides) return { ...r };
      const override = UPDATED_OVERRIDES[r.id];
      if (!override) return { ...r };
      const newUnits = override.units;
      const newSqf = override.sqf ?? r.netSqfPerUnit;
      return {
        ...r,
        units: newUnits,
        netSqfPerUnit: newSqf,
        totalHeadcount: newUnits * r.headcountPerUnit,
        totalNetSqf: newUnits * newSqf,
      };
    });

  const [rooms, setRooms] = useState(() => getRows(updated));

  // Reset or apply overrides whenever `updated` changes
  useEffect(() => {
    setRooms(getRows(updated));
  }, [updated]);

  const handleUnitsChange = (id: number, val: string) => {
    const num = parseInt(val) || 0;
    setRooms((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              units: num,
              totalHeadcount: num * r.headcountPerUnit,
              totalNetSqf: num * r.netSqfPerUnit,
            }
          : r
      )
    );
  };

  const handleSqfChange = (id: number, val: string) => {
    const num = parseInt(val) || 0;
    setRooms((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, netSqfPerUnit: num, totalNetSqf: r.units * num }
          : r
      )
    );
  };

  return (
    <div className="rounded-lg border bg-card p-5 shadow-subtle space-y-4">
      <div className="flex items-center gap-2">
        <LayoutGrid className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">Room Types</h3>
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="text-[11px] uppercase tracking-wider font-medium h-9">Room</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-medium text-right h-9 w-20">Units</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-medium text-right h-9 w-24">Sqf/Unit</TableHead>
              <TableHead className="text-[11px] uppercase tracking-wider font-medium text-right h-9 w-24">Total Sqf</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="text-sm py-1.5">{row.roomName}</TableCell>
                  <TableCell className="text-right py-1.5">
                    <Input
                      type="number"
                      value={row.units}
                      onChange={(e) => handleUnitsChange(row.id, e.target.value)}
                      className="h-7 w-16 text-sm font-medium text-right ml-auto bg-muted/30 border-transparent focus:border-primary"
                    />
                  </TableCell>
                  <TableCell className="text-right py-1.5">
                    <Input
                      type="number"
                      value={row.netSqfPerUnit}
                      onChange={(e) => handleSqfChange(row.id, e.target.value)}
                      className="h-7 w-20 text-sm font-medium text-right ml-auto bg-muted/30 border-transparent focus:border-primary"
                    />
                  </TableCell>
                  <TableCell className="text-sm text-right py-1.5 font-medium text-muted-foreground">
                    {row.totalNetSqf.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
