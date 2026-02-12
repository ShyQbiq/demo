import { useStep } from "@/contexts/StepContext";
import { VideoPlayer, ChaptersCard } from "@/components/tour/VideoPlayer";
import { RenderGallery } from "@/components/tour/RenderGallery";
import { TourLoader } from "@/components/tour/TourLoader";
import { CostEstimationCard } from "@/components/tour/CostEstimationCard";
import { useRightPaneContent } from "@/hooks/useRightPaneContent";
import { Skeleton } from "@/components/ui/skeleton";
import tourVideo1 from "@/assets/tour-video-1.mp4";
import tourVideo2 from "@/assets/tour-video-2.mp4";
import tourVideo3 from "@/assets/tour-video-3.mp4";

const VIDEO_MAP: Record<string, string> = {
  "video-1": tourVideo1,
  "video-2": tourVideo2,
  "video-3": tourVideo3,
};

const LoadingPlaceholder = () => (
  <div className="space-y-4 animate-fade-in p-2">
    <Skeleton className="h-6 w-32 rounded" />
    <Skeleton className="h-40 rounded-lg" />
    <Skeleton className="h-40 rounded-lg" />
  </div>
);

const Tour = () => {
  const { centerVariant, rightVariant, signalVideoEnd, currentStep } = useStep();

  const isRendering = centerVariant === "rendering";

  // Right pane – keep empty during rendering
  let rightContent: React.ReactNode = null;
  if (isRendering) {
    rightContent = null;
  } else if (rightVariant === "cost-estimation") {
    rightContent = <CostEstimationCard variant={centerVariant} />;
  } else if (rightVariant === "loading") {
    rightContent = <LoadingPlaceholder />;
  } else if (rightVariant === "") {
    rightContent = null;
  } else {
    rightContent = <ChaptersCard />;
  }
  useRightPaneContent(rightContent, isRendering ? "__rendering__" : rightVariant);

  if (isRendering) {
    // Extract thinking lines from the current step to use as loader stages
    const thinkingMsg = currentStep.messages.find((m) => m.role === "thinking");
    const stages = thinkingMsg
      ? thinkingMsg.content.split("\n").filter(Boolean)
      : undefined;
    return <TourLoader onComplete={signalVideoEnd} stages={stages} />;
  }

  // All video variants show the same player component
  return (
    <div className="space-y-4 animate-fade-in h-full overflow-y-auto">
      <VideoPlayer videoSrc={VIDEO_MAP[centerVariant]} />
      <RenderGallery variant={centerVariant} />
    </div>
  );
};

export default Tour;
