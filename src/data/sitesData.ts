import { useMemo } from "react";

export type AssetType = "Office" | "Retail" | "Other";

export interface SitePin {
  id: string;
  lat: number;
  lng: number;
  type: AssetType;
  address: string;
  area: number; // sqf
  rentPerSqf: number;
  floors: number;
  floorNumber?: number;
  owner: string;
  image?: string;
}

export const ASSET_COLORS: Record<AssetType, string> = {
  Office: "#3b82f6",   // blue
  Retail: "#22c55e",   // green
  Other: "#f97316",    // orange
};

// Seeded random for deterministic pin generation
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Point-in-polygon helper
function pointInPoly(lat: number, lng: number, poly: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [yi, xi] = poly[i], [yj, xj] = poly[j];
    if ((yi > lat) !== (yj > lat) && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

// Simplified land polygons for NYC boroughs (lat, lng)
const MANHATTAN_POLY: [number, number][] = [
  [40.700, -74.018], [40.710, -74.014], [40.720, -74.012],
  [40.735, -74.009], [40.750, -74.005], [40.760, -74.000],
  [40.770, -73.997], [40.780, -73.990], [40.790, -73.975],
  [40.800, -73.965], [40.808, -73.955], [40.810, -73.950],
  [40.808, -73.940], [40.800, -73.935], [40.790, -73.940],
  [40.780, -73.950], [40.770, -73.955], [40.760, -73.960],
  [40.750, -73.965], [40.740, -73.970], [40.730, -73.975],
  [40.720, -73.978], [40.710, -73.980], [40.705, -73.998],
  [40.700, -74.010],
];

const BROOKLYN_POLY: [number, number][] = [
  [40.630, -74.005], [40.645, -74.000], [40.660, -73.990],
  [40.680, -73.980], [40.695, -73.975], [40.700, -73.970],
  [40.695, -73.950], [40.690, -73.940], [40.680, -73.935],
  [40.665, -73.930], [40.650, -73.925], [40.635, -73.930],
  [40.625, -73.945], [40.620, -73.960], [40.620, -73.980],
  [40.625, -73.995],
];

const QUEENS_POLY: [number, number][] = [
  [40.720, -73.940], [40.730, -73.930], [40.745, -73.920],
  [40.755, -73.910], [40.765, -73.900], [40.775, -73.885],
  [40.780, -73.870], [40.775, -73.855], [40.765, -73.850],
  [40.750, -73.855], [40.740, -73.860], [40.730, -73.870],
  [40.720, -73.885], [40.715, -73.900], [40.710, -73.920],
  [40.715, -73.935],
];

function isNycLand(lat: number, lng: number): boolean {
  return pointInPoly(lat, lng, MANHATTAN_POLY) ||
    pointInPoly(lat, lng, BROOKLYN_POLY) ||
    pointInPoly(lat, lng, QUEENS_POLY);
}

function generateWorldPins(): SitePin[] {
  const rand = seededRandom(42);
  const types: AssetType[] = ["Office", "Retail", "Other"];
  const cities = [
    // US
    { name: "New York", lat: 40.75, lng: -73.97, count: 51, spread: 0.04 },
    { name: "San Francisco", lat: 37.77, lng: -122.42, count: 25, spread: 0.06 },
    { name: "Chicago", lat: 41.88, lng: -87.63, count: 20, spread: 0.06 },
    { name: "Los Angeles", lat: 34.05, lng: -118.24, count: 20, spread: 0.1 },
    { name: "Miami", lat: 25.76, lng: -80.19, count: 15, spread: 0.05 },
    { name: "Boston", lat: 42.36, lng: -71.06, count: 18, spread: 0.05 },
    { name: "Seattle", lat: 47.61, lng: -122.33, count: 16, spread: 0.06 },
    { name: "Austin", lat: 30.27, lng: -97.74, count: 14, spread: 0.05 },
    { name: "Denver", lat: 39.74, lng: -104.99, count: 12, spread: 0.05 },
    { name: "Atlanta", lat: 33.75, lng: -84.39, count: 14, spread: 0.06 },
    { name: "Dallas", lat: 32.78, lng: -96.80, count: 14, spread: 0.06 },
    { name: "Washington DC", lat: 38.91, lng: -77.04, count: 18, spread: 0.05 },
    { name: "Philadelphia", lat: 39.95, lng: -75.17, count: 12, spread: 0.04 },
    { name: "Houston", lat: 29.76, lng: -95.37, count: 14, spread: 0.06 },
    { name: "Phoenix", lat: 33.45, lng: -112.07, count: 10, spread: 0.05 },
    { name: "Minneapolis", lat: 44.98, lng: -93.27, count: 10, spread: 0.04 },
    { name: "Portland", lat: 45.52, lng: -122.68, count: 10, spread: 0.04 },
    { name: "Charlotte", lat: 35.23, lng: -80.84, count: 10, spread: 0.04 },
    { name: "Nashville", lat: 36.16, lng: -86.78, count: 10, spread: 0.04 },
    { name: "San Diego", lat: 32.72, lng: -117.16, count: 10, spread: 0.04 },
    { name: "Detroit", lat: 42.33, lng: -83.05, count: 8, spread: 0.04 },
    { name: "Salt Lake City", lat: 40.76, lng: -111.89, count: 8, spread: 0.03 },
    { name: "Raleigh", lat: 35.78, lng: -78.64, count: 8, spread: 0.03 },
    // Canada
    { name: "Toronto", lat: 43.65, lng: -79.38, count: 22, spread: 0.08 },
    { name: "Vancouver", lat: 49.28, lng: -123.12, count: 16, spread: 0.06 },
    { name: "Montreal", lat: 45.50, lng: -73.57, count: 14, spread: 0.05 },
    { name: "Calgary", lat: 51.05, lng: -114.07, count: 10, spread: 0.04 },
    { name: "Ottawa", lat: 45.42, lng: -75.70, count: 8, spread: 0.03 },
    // Europe
    { name: "London", lat: 51.51, lng: -0.12, count: 45, spread: 0.1 },
    { name: "Paris", lat: 48.86, lng: 2.35, count: 30, spread: 0.08 },
    { name: "Frankfurt", lat: 50.11, lng: 8.68, count: 25, spread: 0.06 },
    { name: "Berlin", lat: 52.52, lng: 13.40, count: 18, spread: 0.06 },
    { name: "Amsterdam", lat: 52.37, lng: 4.90, count: 18, spread: 0.04 },
    { name: "Munich", lat: 48.14, lng: 11.58, count: 14, spread: 0.05 },
    { name: "Madrid", lat: 40.42, lng: -3.70, count: 16, spread: 0.06 },
    { name: "Barcelona", lat: 41.39, lng: 2.17, count: 14, spread: 0.05 },
    { name: "Milan", lat: 45.46, lng: 9.19, count: 16, spread: 0.05 },
    { name: "Zurich", lat: 47.38, lng: 8.54, count: 14, spread: 0.04 },
    { name: "Stockholm", lat: 59.33, lng: 18.07, count: 12, spread: 0.04 },
    { name: "Copenhagen", lat: 55.68, lng: 12.57, count: 10, spread: 0.04 },
    { name: "Dublin", lat: 53.35, lng: -6.26, count: 12, spread: 0.04 },
    { name: "Vienna", lat: 48.21, lng: 16.37, count: 10, spread: 0.04 },
    { name: "Brussels", lat: 50.85, lng: 4.35, count: 10, spread: 0.04 },
    { name: "Warsaw", lat: 52.23, lng: 21.01, count: 10, spread: 0.04 },
    { name: "Lisbon", lat: 38.72, lng: -9.14, count: 10, spread: 0.04 },
    { name: "Oslo", lat: 59.91, lng: 10.75, count: 8, spread: 0.03 },
    { name: "Helsinki", lat: 60.17, lng: 24.94, count: 8, spread: 0.03 },
    // Middle East & Asia
    { name: "Tel Aviv", lat: 32.08, lng: 34.78, count: 15, spread: 0.04 },
    { name: "Dubai", lat: 25.20, lng: 55.27, count: 30, spread: 0.08 },
    { name: "Tokyo", lat: 35.68, lng: 139.69, count: 40, spread: 0.12 },
    { name: "Singapore", lat: 1.35, lng: 103.82, count: 30, spread: 0.05 },
    { name: "Hong Kong", lat: 22.32, lng: 114.17, count: 25, spread: 0.05 },
    { name: "Shanghai", lat: 31.23, lng: 121.47, count: 25, spread: 0.1 },
    { name: "Seoul", lat: 37.57, lng: 126.98, count: 20, spread: 0.06 },
    { name: "Mumbai", lat: 19.08, lng: 72.88, count: 20, spread: 0.06 },
    { name: "Sydney", lat: -33.87, lng: 151.21, count: 25, spread: 0.1 },
    // Latin America
    { name: "São Paulo", lat: -23.55, lng: -46.63, count: 15, spread: 0.08 },
    { name: "Mexico City", lat: 19.43, lng: -99.13, count: 12, spread: 0.06 },
  ];

  const owners = [
    "Brookfield Properties", "CBRE Group", "JLL", "Cushman & Wakefield",
    "Hines", "Tishman Speyer", "Boston Properties", "Vornado Realty",
    "SL Green", "Mack Real Estate", "RXR Realty", "Silverstein Properties",
  ];

  const streets = [
    "Main St", "Park Ave", "Broadway", "Market St", "High St",
    "King St", "Queen St", "Victoria Rd", "Commerce Blvd", "Tower Rd",
    "Financial Dr", "Harbor Way", "Central Ave", "Business Park",
  ];

  const pins: SitePin[] = [];
  let id = 0;

  for (const city of cities) {
    let placed = 0;
    let attempts = 0;
    while (placed < city.count && attempts < city.count * 5) {
      attempts++;
      const type = types[Math.floor(rand() * 3)];
      const lat = city.lat + (rand() - 0.5) * city.spread * 2;
      const lng = city.lng + (rand() - 0.5) * city.spread * 2;

      // Skip pins that would land in water around NYC
      if (city.name === "New York" && !isNycLand(lat, lng)) continue;

      const totalFloors = Math.floor(rand() * 50) + 3;

      pins.push({
        id: `pin-${id++}`,
        lat,
        lng,
        type,
        address: `${Math.floor(rand() * 900) + 100} ${streets[Math.floor(rand() * streets.length)]}, ${city.name}`,
        area: Math.floor(rand() * 80000) + 5000,
        rentPerSqf: Math.floor(rand() * 80) + 20,
        floors: totalFloors,
        floorNumber: Math.floor(rand() * totalFloors) + 1,
        owner: owners[Math.floor(rand() * owners.length)],
      });
      placed++;
    }
  }

  return pins;
}

export const ALL_PINS = generateWorldPins();

export const NYC_PINS = ALL_PINS.filter((p) => p.address.includes("New York"));

export function useAssetDistribution(pins: SitePin[]) {
  return useMemo(() => {
    const counts = { Office: 0, Retail: 0, Other: 0 };
    pins.forEach((p) => counts[p.type]++);
    return [
      { name: "Office", value: counts.Office, color: ASSET_COLORS.Office },
      { name: "Retail", value: counts.Retail, color: ASSET_COLORS.Retail },
      { name: "Other", value: counts.Other, color: ASSET_COLORS.Other },
    ];
  }, [pins]);
}
