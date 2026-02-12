import { useStep } from "@/contexts/StepContext";
import { useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { WorldMap } from "@/components/sites/WorldMap";
import { SiteMapMock } from "@/components/sites/SiteMapMock";
import { AssetPieChart } from "@/components/sites/AssetPieChart";
import { SitesLegend } from "@/components/sites/SitesLegend";
import { SiteInfoCard } from "@/components/sites/SiteInfoCard";
import { FloorMetricsCard } from "@/components/sites/FloorMetricsCard";
import { SitesSummaryStats } from "@/components/sites/SitesSummaryStats";
import { ALL_PINS, NYC_PINS, useAssetDistribution } from "@/data/sitesData";
import { useRightPaneContent } from "@/hooks/useRightPaneContent";
import { Skeleton } from "@/components/ui/skeleton";

import siteFloorplanImg from "@/assets/site-floorplan.png";
import taggedNfpImg from "@/assets/tagged-nfp.png";
import basicFloorImg from "@/assets/basic-floor-2.png";
import sitePhoto from "@/assets/site-photo.png";
import classifierVideo from "@/assets/classifier.mp4";

const LoadingPlaceholder = () => (
  <div className="space-y-4 animate-fade-in p-2">
    <Skeleton className="h-6 w-32 rounded" />
    <Skeleton className="h-40 rounded-lg" />
    <Skeleton className="h-40 rounded-lg" />
  </div>
);

const MoviePlaceholder = ({ label }: { label: string }) => (
  <div className="h-full flex items-center justify-center animate-fade-in">
    <div className="text-center space-y-4">
      <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);

const Sites = () => {
  const { centerVariant, rightVariant, currentStepIndex, totalSteps, next, signalVideoEnd } = useStep();
  const confettiFiredRef = useRef(false);

  const handlePinClick = useCallback(() => {
    if (currentStepIndex === 2) {
      next();
    }
  }, [currentStepIndex, next]);

  const isFinalStep = currentStepIndex >= totalSteps - 1;
  const allDistribution = [
    { name: "Office", value: 53, color: "#3b82f6" },
    { name: "Retail", value: isFinalStep ? 5972 : 5971, color: "#22c55e" },
    { name: "Other", value: 307, color: "#f97316" },
  ];
  const allSitesCount = allDistribution.reduce((total, item) => total + item.value, 0);
  const nycDistribution = useAssetDistribution(NYC_PINS);
  const nycSitesCount = nycDistribution.reduce((total, item) => total + item.value, 0);
  const selectedSite = NYC_PINS[0];

  useEffect(() => {
    if (!isFinalStep) {
      confettiFiredRef.current = false;
      return;
    }
    if (confettiFiredRef.current) return;
    confettiFiredRef.current = true;

    const duration = 1800;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 5,
        startVelocity: 35,
        spread: 70,
        ticks: 200,
        origin: { x: Math.random(), y: 0.1 },
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [isFinalStep]);

  // ─── Right pane content ───
  let rightContent: React.ReactNode = null;

  if (rightVariant === "global-overview") {
    rightContent = (
      <div className="space-y-6">
        <SitesLegend sitesCount={allSitesCount} />
        <AssetPieChart data={allDistribution} totalLabel="sites" />
        <SitesSummaryStats totalArea="24.8M" avgRent="$52" regions={22} />
      </div>
    );
  } else if (rightVariant === "nyc-overview") {
    rightContent = (
      <div className="space-y-6">
        <SitesLegend sitesCount={nycSitesCount} />
        <AssetPieChart data={nycDistribution} totalLabel="sites" />
        <SitesSummaryStats totalArea="3.2M" avgRent="$68" regions={1} />
      </div>
    );
  } else if (rightVariant === "site-details") {
    rightContent = (
      <div className="space-y-4">
        {/* Site photo */}
        <div className="rounded-lg overflow-hidden border">
          <img src={basicFloorImg} alt="Site" className="w-full h-48 object-cover" />
        </div>

        {/* Gallery */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Gallery</p>
          <div className="grid grid-cols-3 gap-2">
            {[sitePhoto, siteFloorplanImg, basicFloorImg].map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-md overflow-hidden border">
                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Site details (without the duplicate photo) */}
        <SiteInfoCard site={selectedSite} hidePhoto />
      </div>
    );
  } else if (rightVariant === "floor-details") {
    rightContent = (
      <div className="space-y-6">
        <SiteInfoCard site={selectedSite} />
        <FloorMetricsCard />
      </div>
    );
  } else if (rightVariant === "loading") {
    rightContent = <LoadingPlaceholder />;
  } else if (rightVariant === "program-guidelines") {
    rightContent = <LoadingPlaceholder />;
  }

  useRightPaneContent(rightContent, rightVariant);

  // ─── Center pane ───
  if (centerVariant === "world-map" || centerVariant === "world-map-updated" || centerVariant === "world-map-new-pin") {
    return (
      <div className="h-full animate-fade-in">
        <WorldMap pins={ALL_PINS} center={[40, -95]} zoom={2} />
      </div>
    );
  }

  if (centerVariant === "nyc-zoom") {
    return (
      <div className="h-full animate-fade-in">
        <WorldMap pins={NYC_PINS} center={[40.75, -73.98]} zoom={12} onPinClick={handlePinClick} />
      </div>
    );
  }

  if (centerVariant === "building-far" || centerVariant === "building-zoom") {
    return (
      <div className="h-full animate-fade-in">
        <WorldMap pins={[NYC_PINS[0]]} center={[NYC_PINS[0].lat, NYC_PINS[0].lng]} zoom={16} pinStyle="pin" />
      </div>
    );
  }

  if (centerVariant === "classifier-video") {
    return (
      <div className="h-full animate-fade-in flex items-center justify-center bg-white rounded-lg overflow-hidden">
        <video src={classifierVideo} autoPlay muted playsInline onEnded={signalVideoEnd} className="w-full h-full object-contain" />
      </div>
    );
  }

  if (centerVariant === "arch-analysis") {
    return <MoviePlaceholder label="Analyzing architectural plan…" />;
  }

  if (centerVariant === "floor-plan") {
    return (
      <div className="h-full animate-fade-in">
        <SiteMapMock />
      </div>
    );
  }

  if (centerVariant === "tagged-nfp") {
    return (
      <div className="h-full animate-fade-in flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden">
        <img src={taggedNfpImg} alt="Tagged floor plan" className="max-h-full max-w-full object-contain" />
      </div>
    );
  }

  if (centerVariant === "program-loading") {
    return <MoviePlaceholder label="Generating program…" />;
  }

  // Default: world map
  return (
    <div className="h-full animate-fade-in">
      <WorldMap pins={ALL_PINS} center={[40, -95]} zoom={2} />
    </div>
  );
};

export default Sites;
