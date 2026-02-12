import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStep } from "@/contexts/StepContext";
import { GeneratingDesigns } from "@/components/designs/GeneratingDesigns";
import { PlanAnalyticsCard } from "@/components/designs/PlanAnalyticsCard";
import { PlanAnalysisDashboard } from "@/components/designs/PlanAnalysisDashboard";
import { DesignRegenerateLoader } from "@/components/designs/DesignRegenerateLoader";

import { OpportunitiesCard } from "@/components/analytics/OpportunitiesCard";
import { RisksCard } from "@/components/analytics/RisksCard";
import { useRightPaneContent } from "@/hooks/useRightPaneContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import plan1Img from "@/assets/plan-1.png";
import plan2Img from "@/assets/plan-2.png";

const LoadingPlaceholder = () => (
  <div className="space-y-4 animate-fade-in p-2">
    <Skeleton className="h-6 w-32 rounded" />
    <Skeleton className="h-40 rounded-lg" />
    <Skeleton className="h-40 rounded-lg" />
  </div>
);

const THUMB_COUNT = 12;
const VISIBLE = 6;

const PlanImage = ({ src, alt }: { src: string; alt: string }) => {
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState(0);
  const canPrev = offset > 0;
  const canNext = offset + VISIBLE < THUMB_COUNT;

  return (
    <div className="h-full animate-fade-in flex flex-col bg-white rounded-lg overflow-hidden">
      <div className="flex-1 flex items-center justify-center min-h-0 p-4">
        <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
      </div>
      <div className="shrink-0 flex items-center justify-center gap-2 px-4 pb-4 pt-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          disabled={!canPrev}
          onClick={() => setOffset((o) => Math.max(0, o - 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: THUMB_COUNT })
            .slice(offset, offset + VISIBLE)
            .map((_, i) => {
              const idx = offset + i;
              return (
                <div
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`w-[4.5rem] h-[4.5rem] rounded-md overflow-hidden border-2 cursor-pointer transition-all hover:ring-1 hover:ring-primary/40 ${
                    selected === idx ? "border-primary ring-1 ring-primary/30" : "border-transparent"
                  }`}
                >
                  <img src={src} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              );
            })}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          disabled={!canNext}
          onClick={() => setOffset((o) => Math.min(THUMB_COUNT - VISIBLE, o + 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
const Designs = () => {
  const { centerVariant, rightVariant, signalVideoEnd } = useStep();

  const isGenerating = centerVariant.startsWith("generating-part-");

  // Right pane
  let rightContent: React.ReactNode = null;
  if (rightVariant === "plan-data") {
    rightContent = <PlanAnalyticsCard variant="v1" />;
  } else if (rightVariant === "plan-data-v2") {
    rightContent = <PlanAnalyticsCard variant="v2" />;
  } else if (rightVariant === "analytics-highlights") {
    rightContent = (
      <div className="space-y-4">
        <OpportunitiesCard />
        <RisksCard />
      </div>
    );
  } else if (rightVariant === "loading") {
    rightContent = <LoadingPlaceholder />;
  }
  useRightPaneContent(rightContent, rightVariant);

  if (centerVariant === "regenerating-spinner") {
    return (
      <div className="animate-fade-in h-full">
        <DesignRegenerateLoader onComplete={signalVideoEnd} />
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="animate-fade-in h-full">
        <GeneratingDesigns onComplete={signalVideoEnd} variant={centerVariant} />
      </div>
    );
  }

  if (centerVariant === "design-results") {
    return <PlanImage src={plan1Img} alt="Design Plan 1" />;
  }

  if (centerVariant === "design-option-2") {
    return <PlanImage src={plan2Img} alt="Design Plan 2" />;
  }

  if (centerVariant === "plan-analysis-dashboard") {
    return <PlanAnalysisDashboard />;
  }


  // Default: empty state before generation starts
  return <div className="h-full" />;
};

export default Designs;
