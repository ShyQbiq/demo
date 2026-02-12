import { LayoutGrid, Users, Ratio, Target } from "lucide-react";
import { ProgramSummaryHeader } from "@/components/program/ProgramSummaryHeader";
import { HeadcountCard } from "@/components/program/HeadcountCard";
// DepartmentsCard removed — CSV data is single-department
import { RoomTypesCard } from "@/components/program/RoomTypesCard";
import { AddOnsCard } from "@/components/program/AddOnsCard";
import { SpaceDonutChart } from "@/components/program/SpaceDonutChart";
import { AssistantSuggestionsCard } from "@/components/program/AssistantSuggestionsCard";
import { ProgramActionBar } from "@/components/program/ProgramActionBar";
import { ProgramLoader } from "@/components/program/ProgramLoader";
import { KpiCard } from "@/components/shared/KpiCard";
import { useProject } from "@/contexts/ProjectContext";
import { useStep } from "@/contexts/StepContext";
import { useRightPaneContent } from "@/hooks/useRightPaneContent";

const SITE_ADDRESSES: Record<string, string> = {
  "Site A — Main Block": "350 Fifth Avenue, New York, NY 10118",
  "Site B — Annex": "200 Park Avenue, New York, NY 10166",
  "Site C — Parking": "401 Fifth Avenue, New York, NY 10016",
  "Site D — Waterfront": "1 Water Street, Brooklyn, NY 11201",
  "Site E — Marina": "2 Marina Blvd, Brooklyn, NY 11201",
  "Site F — North Tower": "100 Skyline Drive, Chicago, IL 60601",
  "Site G — South Tower": "102 Skyline Drive, Chicago, IL 60601",
  "Site H — East Wing": "500 Meridian Ave, Austin, TX 73301",
  "Site I — West Wing": "502 Meridian Ave, Austin, TX 73301",
};

const Program = () => {
  const { selectedSite } = useProject();
  const { centerVariant, signalVideoEnd } = useStep();
  const address = SITE_ADDRESSES[selectedSite] || "";
  const isUpdated = centerVariant === "program-updated";
  const isGenerating = centerVariant === "generating" || centerVariant === "program-loading";

  useRightPaneContent(
    isGenerating ? null : (
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2.5">
          <KpiCard title="Total Net Sqf" value="23,145" icon={<LayoutGrid className="h-4 w-4" />} compact />
          <KpiCard title="Headcount" value="114" icon={<Users className="h-4 w-4" />} compact />
          <KpiCard title="Assigned Space" value="96%" icon={<Ratio className="h-4 w-4" />} compact />
          <KpiCard title="Building Net Sqf" value="15,050" icon={<Target className="h-4 w-4" />} compact />
        </div>
        <SpaceDonutChart />
        <AssistantSuggestionsCard />
      </div>
    ),
    centerVariant
  );

  if (isGenerating) {
    return <ProgramLoader onComplete={signalVideoEnd} />;
  }

  return (
    <div className="space-y-5 animate-fade-in h-full overflow-y-auto">
      <ProgramSummaryHeader
        siteName={`${selectedSite} · ${address}`}
        programType="Workplace Fit-Out"
      />
      <HeadcountCard />
      {/* DepartmentsCard removed — single department */}
      <RoomTypesCard updated={isUpdated} />
      <AddOnsCard />
      <ProgramActionBar />
    </div>
  );
};

export default Program;
