import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Pin {
  id: string;
  label: string;
  top: string;
  left: string;
}

interface SiteMapPlaceholderProps {
  pins: Pin[];
  selectedPinId?: string;
  onPinClick: (id: string) => void;
}

export function SiteMapPlaceholder({ pins, selectedPinId, onPinClick }: SiteMapPlaceholderProps) {
  return (
    <div className="relative h-full w-full rounded-lg border bg-surface-sunken overflow-hidden">
      {/* Grid lines to simulate map */}
      <div className="absolute inset-0 opacity-[0.07]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute w-full border-t border-foreground" style={{ top: `${(i + 1) * 8}%` }} />
        ))}
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute h-full border-l border-foreground" style={{ left: `${(i + 1) * 6}%` }} />
        ))}
      </div>

      {/* Simulated roads */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute top-[30%] left-0 w-full h-1 bg-foreground rounded-full" />
        <div className="absolute top-[60%] left-0 w-full h-0.5 bg-foreground rounded-full" />
        <div className="absolute top-0 left-[40%] h-full w-1 bg-foreground rounded-full" />
        <div className="absolute top-0 left-[70%] h-full w-0.5 bg-foreground rounded-full" />
      </div>

      {/* Simulated blocks */}
      <div className="absolute top-[10%] left-[10%] w-[20%] h-[15%] rounded bg-muted/60 border border-border" />
      <div className="absolute top-[45%] left-[50%] w-[15%] h-[20%] rounded bg-muted/60 border border-border" />
      <div className="absolute top-[70%] left-[15%] w-[18%] h-[12%] rounded bg-muted/60 border border-border" />
      <div className="absolute top-[15%] left-[75%] w-[12%] h-[18%] rounded bg-muted/60 border border-border" />

      {/* Pins */}
      {pins.map((pin) => (
        <button
          key={pin.id}
          onClick={() => onPinClick(pin.id)}
          className={cn(
            "absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 group cursor-pointer",
          )}
          style={{ top: pin.top, left: pin.left }}
        >
          <span
            className={cn(
              "text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap",
              selectedPinId === pin.id
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground border border-border"
            )}
          >
            {pin.label}
          </span>
          <MapPin
            className={cn(
              "h-7 w-7 drop-shadow-md transition-colors",
              selectedPinId === pin.id ? "text-primary fill-primary/20" : "text-destructive fill-destructive/20"
            )}
          />
          {/* Shadow dot */}
          <div className="w-2 h-1 rounded-full bg-foreground/15 -mt-1" />
        </button>
      ))}

      {/* Map attribution */}
      <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground bg-card/80 backdrop-blur-sm px-2 py-0.5 rounded">
        © OpenStreetMap contributors
      </div>

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-1">
        <button className="h-7 w-7 rounded bg-card border border-border shadow-sm flex items-center justify-center text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">+</button>
        <button className="h-7 w-7 rounded bg-card border border-border shadow-sm flex items-center justify-center text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">−</button>
      </div>
    </div>
  );
}
