import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface Pin {
  id: string;
  label: string;
  lat: number;
  lng: number;
}

interface SiteMapProps {
  pins: Pin[];
  selectedPinId?: string;
  onPinClick: (id: string) => void;
}

export function SiteMap({ pins, selectedPinId, onPinClick }: SiteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [-73.975903, 40.748817],
      zoom: 13,
      attributionControl: false,
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Fly to selected
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const pin = pins.find((p) => p.id === selectedPinId);
    if (pin) {
      map.flyTo({ center: [pin.lng, pin.lat], zoom: 15, duration: 800 });
    } else if (pins.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      pins.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 50, maxZoom: 14 });
    }
  }, [selectedPinId, pins]);

  // Render markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const renderMarkers = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      pins.forEach((pin) => {
        const isSelected = selectedPinId === pin.id;

        const el = document.createElement("div");
        el.style.width = isSelected ? "30px" : "25px";
        el.style.height = isSelected ? "49px" : "41px";
        el.style.backgroundImage = "url(https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png)";
        el.style.backgroundSize = "contain";
        el.style.backgroundRepeat = "no-repeat";
        el.style.cursor = "pointer";

        el.addEventListener("click", () => onPinClick(pin.id));

        const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([pin.lng, pin.lat])
          .setPopup(
            new maplibregl.Popup({ offset: 10, closeButton: false })
              .setHTML(`<span style="font-weight:600;font-size:14px;">${pin.label}</span>`)
          )
          .addTo(map);

        markersRef.current.push(marker);
      });
    };

    if (map.isStyleLoaded()) {
      renderMarkers();
    } else {
      map.on("style.load", renderMarkers);
    }

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [pins, selectedPinId, onPinClick]);

  return (
    <div className="h-full w-full rounded-lg border overflow-hidden">
      <div ref={containerRef} className="h-full w-full" style={{ minHeight: "100%" }} />
    </div>
  );
}
