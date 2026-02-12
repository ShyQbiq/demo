import { motion } from "framer-motion";
import renderV1OpenSpace from "@/assets/render-v1-open-space.jpg";
import renderV1Kitchen from "@/assets/render-v1-kitchen.jpg";
import renderV1Reception from "@/assets/render-v1-reception.jpg";
import renderV2OpenSpace from "@/assets/render-v2-open-space.jpg";
import renderV2Kitchen from "@/assets/render-v2-kitchen.jpg";
import renderV2Reception from "@/assets/render-v2-reception.jpg";
import renderV3OpenSpace from "@/assets/render-v3-open-space.jpg";
import renderV3Kitchen from "@/assets/render-v3-kitchen.jpg";
import renderV3Reception from "@/assets/render-v3-reception.jpg";

interface GalleryItem {
  label: string;
  src?: string;
}

const GALLERY_DATA: Record<string, GalleryItem[]> = {
  "video-1": [
    { label: "Open Space", src: renderV1OpenSpace },
    { label: "Kitchen", src: renderV1Kitchen },
    { label: "Reception", src: renderV1Reception },
  ],
  "video-2": [
    { label: "Open Space", src: renderV2OpenSpace },
    { label: "Kitchen", src: renderV2Kitchen },
    { label: "Reception", src: renderV2Reception },
  ],
  "video-3": [
    { label: "Open Space", src: renderV3OpenSpace },
    { label: "Kitchen", src: renderV3Kitchen },
    { label: "Reception", src: renderV3Reception },
  ],
};

const DEFAULT_ITEMS: GalleryItem[] = [
  { label: "Lobby Entrance" },
  { label: "Open Workspace" },
  { label: "Executive Suite" },
  { label: "Breakout Area" },
  { label: "Rooftop View" },
  { label: "Atrium Detail" },
];

export function RenderGallery({ variant }: { variant?: string }) {
  const items = (variant && GALLERY_DATA[variant]) || DEFAULT_ITEMS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="space-y-3"
    >
      <div>
        <h3 className="text-sm font-semibold">Render Gallery</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Key views from the walkthrough</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.06 }}
            className="group relative aspect-video rounded-lg border bg-muted/40 overflow-hidden cursor-pointer hover:shadow-card transition-shadow"
          >
            {item.src ? (
              <>
                <img src={item.src} alt={item.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-1.5 left-2 text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[11px] font-medium text-muted-foreground">{item.label}</span>
                </div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
              </>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
