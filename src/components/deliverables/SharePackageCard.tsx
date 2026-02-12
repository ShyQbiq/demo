import { motion } from "framer-motion";
import { Mail, Link2, FileOutput } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SharePackageCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-lg border bg-card p-5 shadow-subtle space-y-4"
    >
      <div>
        <h3 className="text-sm font-semibold">Share Package</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Distribute deliverables to stakeholders</p>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant="outline" size="sm" className="justify-start gap-2 text-xs hover:bg-primary/5 hover:border-primary/30 transition-colors">
          <Mail className="h-3.5 w-3.5" /> Send via Email
        </Button>
        <Button variant="outline" size="sm" className="justify-start gap-2 text-xs hover:bg-primary/5 hover:border-primary/30 transition-colors">
          <Link2 className="h-3.5 w-3.5" /> Copy Share Link
        </Button>
        <Button variant="outline" size="sm" className="justify-start gap-2 text-xs hover:bg-primary/5 hover:border-primary/30 transition-colors">
          <FileOutput className="h-3.5 w-3.5" /> Export as ZIP
        </Button>
      </div>
    </motion.div>
  );
}
