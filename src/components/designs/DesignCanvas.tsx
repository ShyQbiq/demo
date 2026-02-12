import { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const ZONES = [
  { label: "Open Office", color: "hsl(198, 70%, 42%)", x: "5%", y: "5%", w: "42%", h: "45%" },
  { label: "Meeting Rooms", color: "hsl(152, 60%, 42%)", x: "50%", y: "5%", w: "45%", h: "28%" },
  { label: "Private Offices", color: "hsl(38, 92%, 50%)", x: "50%", y: "36%", w: "45%", h: "14%" },
  { label: "Collaboration", color: "hsl(198, 70%, 70%)", x: "5%", y: "53%", w: "28%", h: "22%" },
  { label: "Support", color: "hsl(215, 14%, 50%)", x: "36%", y: "53%", w: "25%", h: "22%" },
  { label: "Amenities", color: "hsl(0, 72%, 55%)", x: "64%", y: "53%", w: "31%", h: "22%" },
  { label: "Circulation", color: "hsl(220, 18%, 80%)", x: "5%", y: "78%", w: "90%", h: "17%" },
];

export function DesignCanvas() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-card">
        <div className="flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Floor Plan — Level 12</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs text-muted-foreground w-10 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom(1)}>
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-surface-sunken overflow-hidden flex items-center justify-center p-6">
        <motion.div
          className="relative w-full max-w-2xl aspect-[4/3] rounded-lg border bg-card shadow-subtle overflow-hidden"
          style={{ transform: `scale(${zoom})` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.04]">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`h-${i}`} className="absolute w-full border-t border-foreground" style={{ top: `${(i + 1) * 5}%` }} />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`v-${i}`} className="absolute h-full border-l border-foreground" style={{ left: `${(i + 1) * 5}%` }} />
            ))}
          </div>

          {/* Zones */}
          {ZONES.map((zone) => (
            <motion.div
              key={zone.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.random() * 0.3 }}
              className="absolute rounded-sm flex items-center justify-center cursor-pointer hover:brightness-110 transition-all border border-white/20"
              style={{
                left: zone.x,
                top: zone.y,
                width: zone.w,
                height: zone.h,
                backgroundColor: zone.color,
                opacity: 0.7,
              }}
            >
              <span className="text-[10px] font-semibold text-white drop-shadow-sm">
                {zone.label}
              </span>
            </motion.div>
          ))}

          {/* Core / structural elements */}
          <div className="absolute top-[30%] left-[46%] w-[6%] h-[20%] bg-foreground/20 rounded-sm flex items-center justify-center">
            <span className="text-[8px] text-foreground/60 font-medium">Core</span>
          </div>
        </motion.div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2.5 border-t bg-card overflow-x-auto">
        {ZONES.map((zone) => (
          <div key={zone.label} className="flex items-center gap-1.5 shrink-0">
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: zone.color }} />
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">{zone.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
