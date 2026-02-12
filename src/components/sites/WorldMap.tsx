import { useEffect, useRef, useCallback, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { type SitePin, ASSET_COLORS } from "@/data/sitesData";

interface WorldMapProps {
  pins: SitePin[];
  center?: [number, number];
  zoom?: number;
  selectedPinId?: string;
  onPinClick?: (pin: SitePin) => void;
  /** Use a large pin-icon style instead of a small dot */
  pinStyle?: "dot" | "pin";
}

function createDotElement(pin: SitePin, isSelected: boolean): HTMLDivElement {
  const el = document.createElement("div");
  const size = isSelected ? 14 : 8;
  const color = ASSET_COLORS[pin.type];
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.borderRadius = "50%";
  el.style.backgroundColor = color;
  el.style.opacity = isSelected ? "1" : "0.7";
  el.style.border = `${isSelected ? 2 : 1}px solid ${color}`;
  el.style.cursor = "pointer";
  el.style.boxSizing = "border-box";
  return el;
}

function createPinElement(pin: SitePin): HTMLDivElement {
  const color = ASSET_COLORS[pin.type];
  const el = document.createElement("div");
  el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3" fill="white" stroke="white"/></svg>`;
  el.style.cursor = "pointer";
  el.style.filter = "drop-shadow(0 2px 4px rgba(0,0,0,0.3))";
  return el;
}

export function WorldMap({ pins, center = [40, -95], zoom = 2, selectedPinId, onPinClick, pinStyle = "dot" }: WorldMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [center[1], center[0]],
      zoom,
      attributionControl: false,
      scrollZoom: false,
      dragPan: false,
      doubleClickZoom: false,
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render markers when pins or selection changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const renderMarkers = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      pins.forEach((pin) => {
        const isSelected = selectedPinId === pin.id;
        const el = pinStyle === "pin" ? createPinElement(pin) : createDotElement(pin, isSelected);
        const anchor = pinStyle === "pin" ? "bottom" : "center";
        if (onPinClick) {
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            onPinClick(pin);
          });
        }

        const marker = new maplibregl.Marker({ element: el, anchor })
          .setLngLat([pin.lng, pin.lat])
          .addTo(map);

        markersRef.current.push(marker);
      });
    };

    if (map.isStyleLoaded()) {
      renderMarkers();
    } else {
      map.once("load", renderMarkers);
    }

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [pins, selectedPinId, onPinClick]);

  // Fly to center/zoom — skip the initial render, and only fly when values actually change
  const initialRender = useRef(true);
  const prevCenter = useRef(center);
  const prevZoom = useRef(zoom);
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (initialRender.current) {
      initialRender.current = false;
      prevCenter.current = center;
      prevZoom.current = zoom;
      return;
    }

    // Only fly if values actually changed
    if (prevCenter.current[0] === center[0] && prevCenter.current[1] === center[1] && prevZoom.current === zoom) {
      return;
    }

    prevCenter.current = center;
    prevZoom.current = zoom;

    map.flyTo({
      center: [center[1], center[0]],
      zoom,
      duration: 2500,
      essential: true,
    });
  }, [center, zoom]);

  return (
    <div className="h-full w-full rounded-lg border overflow-hidden">
      <div ref={containerRef} className="h-full w-full" style={{ minHeight: "100%" }} />
    </div>
  );
}
