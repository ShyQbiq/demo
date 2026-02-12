import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, FileText, Loader2 } from "lucide-react";
import { useStep } from "@/contexts/StepContext";

const SHARING_STEPS = [
  { variant: "sharing-1", label: "Revit model", recipient: "Building Architect", type: "RVT" },
  { variant: "sharing-2", label: "CAD drawings", recipient: "Interior Designer", type: "DWG" },
  { variant: "sharing-3", label: "ESG report", recipient: "Compliance Officer", type: "PDF" },
  { variant: "sharing-4", label: "Bill of Quantities", recipient: "General Constructor", type: "XLSX" },
  { variant: "sharing-5", label: "Visual assets", recipient: "Marketing Manager", type: "ZIP" },
];

export function SharingAnimation() {
  const { centerVariant } = useStep();

  // Determine how many steps are done based on current variant
  const currentSharingIdx = SHARING_STEPS.findIndex((s) => s.variant === centerVariant);
  const visibleCount = currentSharingIdx + 1;

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="rounded-xl border bg-card p-8 shadow-card space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Sharing Deliverables</h2>
            <p className="text-sm text-muted-foreground">
              Distributing output package to stakeholders
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{visibleCount}/{SHARING_STEPS.length}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary origin-left"
                initial={{ width: "0%" }}
                animate={{ width: `${(visibleCount / SHARING_STEPS.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
