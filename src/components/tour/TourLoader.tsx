import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TourLoaderProps {
  onComplete?: () => void;
  /** If provided, these lines are used as stage labels instead of defaults */
  stages?: string[];
}

const DEFAULT_STAGES = [
  "Applying wall materials…",
  "Setting floor finishes…",
  "Installing ceiling systems…",
  "Placing furniture collection…",
  "Configuring lighting…",
  "Rendering walkthrough…",
  "Finalizing video…",
];

const TOTAL_DURATION = 8000;

export function TourLoader({ onComplete, stages }: TourLoaderProps) {
  const STAGES = stages && stages.length > 0 ? stages : DEFAULT_STAGES;
  const STAGE_INTERVAL = TOTAL_DURATION / STAGES.length;
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setStageIndex(Math.min(Math.floor(elapsed / STAGE_INTERVAL), STAGES.length - 1));
      if (elapsed >= TOTAL_DURATION) {
        clearInterval(tick);
        onComplete?.();
      }
    }, 80);
    return () => clearInterval(tick);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in gap-6 bg-white rounded-xl overflow-hidden">
      {/* Three bouncing dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-primary"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Stage text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm text-muted-foreground"
        >
          {STAGES[stageIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
