import { useEffect } from "react";
import planGenPart1 from "@/assets/plan-gen-part1.mp4";
import planGenPart2 from "@/assets/plan-gen-part2.mp4";
import planGenPart3 from "@/assets/plan-gen-part3.mp4";

const VIDEO_MAP: Record<string, string> = {
  "generating-part-1": planGenPart1,
  "generating-part-2": planGenPart2,
  "generating-part-3": planGenPart3,
};

interface GeneratingDesignsProps {
  onComplete: () => void;
  variant: string;
}

export function GeneratingDesigns({ onComplete, variant }: GeneratingDesignsProps) {
  const videoSrc = VIDEO_MAP[variant] ?? planGenPart1;

  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [variant, onComplete]);

  return (
    <div className="flex items-center justify-center h-full animate-fade-in bg-white rounded-xl overflow-hidden" key={variant}>
      <video
        src={videoSrc}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-contain scale-[1.35] bg-white"
      />
    </div>
  );
}
