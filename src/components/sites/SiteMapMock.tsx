import { useState } from "react";
import { MapPin, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import farView from "@/assets/site-far.png";
import closeView from "@/assets/site-close.png";
import floorPlan from "@/assets/site-floorplan.png";

type ZoomStage = "far" | "close" | "floor";

const STAGES: { key: ZoomStage; src: string; label: string }[] = [
  { key: "far", src: farView, label: "Area View" },
  { key: "close", src: closeView, label: "Building View" },
  { key: "floor", src: floorPlan, label: "Floor Plan" },
];

const PIN_POSITIONS: Record<ZoomStage, { top: string; left: string } | null> = {
  far: { top: "58%", left: "38%" },
  close: { top: "72%", left: "48%" },
  floor: null,
};

export function SiteMapMock() {
  const [stage, setStage] = useState<ZoomStage>("far");

  const stageIndex = STAGES.findIndex((s) => s.key === stage);
  const currentStage = STAGES[stageIndex];
  const pinPos = PIN_POSITIONS[stage];

  const advance = () => {
    if (stageIndex < STAGES.length - 1) {
      setStage(STAGES[stageIndex + 1].key);
    }
  };

  const goBack = () => {
    if (stageIndex > 0) {
      setStage(STAGES[stageIndex - 1].key);
    }
  };

  return (
    <div className="relative h-full w-full rounded-lg border overflow-hidden bg-muted">
      <AnimatePresence mode="wait">
        <motion.img
          key={stage}
          src={currentStage.src}
          alt={currentStage.label}
          initial={{ opacity: 0, scale: 1.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover origin-center"
        />
      </AnimatePresence>

      {/* Pin overlay */}
      {pinPos && (
        <motion.button
          key={`pin-${stage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.25 }}
          onClick={advance}
          className="absolute z-10 flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-full cursor-pointer group"
          style={{ top: pinPos.top, left: pinPos.left }}
        >
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary text-primary-foreground shadow-sm whitespace-nowrap">
            Project Demo #1
          </span>
          <MapPin className="h-8 w-8 text-primary fill-primary/30 drop-shadow-md group-hover:scale-110 transition-transform" />
          <div className="w-2 h-1 rounded-full bg-foreground/20 -mt-1" />
        </motion.button>
      )}

      {/* Back button — always visible, goes to map at stage 0 */}
      <button
        onClick={goBack}
        className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-md bg-card/90 backdrop-blur-sm border border-border px-2 py-1.5 text-xs font-medium text-foreground shadow-sm hover:bg-card transition-colors"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        {stageIndex === 0 ? "Back to Map" : "Back"}
      </button>

      {/* Stage indicator */}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
        {STAGES.map((s, i) => (
          <div
            key={s.key}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === stageIndex ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"
            )}
          />
        ))}
        <span className="ml-1.5 text-[10px] font-medium text-foreground/70 bg-card/80 backdrop-blur-sm px-1.5 py-0.5 rounded">
          {currentStage.label}
        </span>
      </div>
    </div>
  );
}
