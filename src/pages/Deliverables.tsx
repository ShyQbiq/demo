import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DeliverablesList, type DeliverableItem } from "@/components/deliverables/DeliverablesList";
import { SharePackageCard } from "@/components/deliverables/SharePackageCard";
import { GeneratedStatusCard } from "@/components/deliverables/GeneratedStatusCard";
import { SharingAnimation } from "@/components/deliverables/SharingAnimation";
import { useStep } from "@/contexts/StepContext";
import { useRightPaneContent } from "@/hooks/useRightPaneContent";
import { OpportunitiesCard } from "@/components/analytics/OpportunitiesCard";
import { RisksCard } from "@/components/analytics/RisksCard";

const TAB_DATA: Record<string, DeliverableItem[]> = {
  overview: [
    { name: "Revit Model", type: "RVT", size: "84.2 MB", updated: "Feb 5, 2026" },
    { name: "CAD Drawings", type: "DWG", size: "12.4 MB", updated: "Feb 5, 2026" },
    { name: "ESG Report", type: "PDF", size: "6.8 MB", updated: "Feb 5, 2026" },
    { name: "Bill of Quantities", type: "XLSX", size: "3.8 MB", updated: "Feb 5, 2026" },
    { name: "Visual Assets Package", type: "ZIP", size: "148 MB", updated: "Feb 5, 2026" },
  ],
};

const Deliverables = () => {
  const { centerVariant, rightVariant } = useStep();

  // Right pane
  let rightContent: React.ReactNode = null;
  if (rightVariant === "analytics-highlights") {
    rightContent = (
      <div className="space-y-4">
        <OpportunitiesCard />
        <RisksCard />
      </div>
    );
  } else if (rightVariant === "deliverables-right" || rightVariant === "final-right") {
    rightContent = (
      <div className="space-y-4">
        <SharePackageCard />
        <GeneratedStatusCard />
      </div>
    );
  }
  useRightPaneContent(rightContent, rightVariant);

  if (centerVariant.startsWith("sharing-")) {
    return <SharingAnimation />;
  }

  // Default: deliverables overview
  return (
    <div className="space-y-4 animate-fade-in h-full overflow-y-auto">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Output Package</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-0">
          <DeliverablesList items={TAB_DATA.overview} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Deliverables;
