import { Building2, Layers, MapPin, DollarSign, User, Hash } from "lucide-react";
import { type SitePin, ASSET_COLORS } from "@/data/sitesData";
import sitePhoto from "@/assets/basic-floor-2.png";

interface SiteInfoCardProps {
  site: SitePin;
  hidePhoto?: boolean;
}

const fields = [
  { key: "address", label: "Address", icon: MapPin },
  { key: "type", label: "Site Type", icon: Building2 },
  { key: "floor", label: "Floor", icon: Hash },
  { key: "rent", label: "Rent", icon: DollarSign },
  { key: "owner", label: "Building Owner", icon: User },
] as const;

export function SiteInfoCard({ site, hidePhoto }: SiteInfoCardProps) {
  const values: Record<string, string> = {
    address: site.address,
    type: site.type,
    floor: `${site.floorNumber ?? 1} of ${site.floors}`,
    area: `${site.area.toLocaleString()} sqf`,
    rent: `$${site.rentPerSqf}/sqf`,
    owner: site.owner,
  };

  return (
    <div className="space-y-4">
      {/* Site image */}
      {!hidePhoto && (
        <div className="h-36 w-full rounded-lg overflow-hidden">
          <img src={sitePhoto} alt="Site photo" className="h-full w-full object-cover" />
        </div>
      )}

      {/* Fields */}
      <div className="space-y-3">
        {fields.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex items-start gap-2.5">
            <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</p>
              <p
                className="text-sm font-medium truncate"
                style={key === "type" ? { color: ASSET_COLORS[site.type] } : undefined}
              >
                {values[key]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
