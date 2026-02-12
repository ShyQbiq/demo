import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DesignRegenerateLoaderProps {
  onComplete?: () => void;
}

const STEPS = [
  "Re-evaluating room placement…",
  "Applying density constraints…",
  "Validating conference counts…",
  "Finalizing layout…",
];

const DURATION = 6000;
const STEP_INTERVAL = DURATION / STEPS.length;

export function DesignRegenerateLoader({ onComplete }: DesignRegenerateLoaderProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setActiveStep(Math.min(Math.floor(elapsed / STEP_INTERVAL), STEPS.length - 1));
      if (elapsed >= DURATION) {
        clearInterval(tick);
        onComplete?.();
      }
    }, 80);
    return () => clearInterval(tick);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in gap-6 bg-white rounded-xl">
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
      <AnimatePresence mode="wait">
        <motion.p
          key={activeStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm text-muted-foreground"
        >
          {STEPS[activeStep]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
