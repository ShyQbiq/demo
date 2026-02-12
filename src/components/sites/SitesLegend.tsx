

interface SitesLegendProps {
  sitesCount: number;
}

export function SitesLegend({ sitesCount }: SitesLegendProps) {
  return (
    <div className="text-center pt-4">
      <p className="text-4xl font-bold">{sitesCount.toLocaleString()}</p>
      <p className="text-xs text-muted-foreground">sites available</p>
    </div>
  );
}
