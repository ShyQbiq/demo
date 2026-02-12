import { motion } from "framer-motion";

export function DesignPlanPlaceholder() {
  return (
    <div className="h-full w-full flex items-center justify-center animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full rounded-lg border bg-card overflow-hidden"
      >
        {/* Grid overlay to simulate a floor plan */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Mock rooms */}
        <div className="absolute inset-8 flex flex-col gap-2">
          <div className="flex gap-2 flex-1">
            <div className="flex-[2] rounded-md border-2 border-primary/20 bg-primary/5 flex items-center justify-center">
              <span className="text-xs text-primary/60 font-medium">Open Workspace</span>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex-1 rounded-md border-2 border-accent-foreground/20 bg-accent/30 flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground font-medium">Conf A</span>
              </div>
              <div className="flex-1 rounded-md border-2 border-accent-foreground/20 bg-accent/30 flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground font-medium">Conf B</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 h-24">
            <div className="flex-1 rounded-md border-2 border-muted-foreground/20 bg-muted/50 flex items-center justify-center">
              <span className="text-[10px] text-muted-foreground font-medium">Core</span>
            </div>
            <div className="flex-[2] rounded-md border-2 border-primary/15 bg-primary/5 flex items-center justify-center">
              <span className="text-xs text-primary/50 font-medium">Collaboration Zone</span>
            </div>
            <div className="flex-1 rounded-md border-2 border-muted-foreground/20 bg-muted/50 flex items-center justify-center">
              <span className="text-[10px] text-muted-foreground font-medium">Pantry</span>
            </div>
          </div>
        </div>

        {/* Label */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border rounded-md px-3 py-1.5">
          <p className="text-xs font-semibold">Generated Floor Plan</p>
          <p className="text-[10px] text-muted-foreground">Top-scored layout • 92% match</p>
        </div>
      </motion.div>
    </div>
  );
}
