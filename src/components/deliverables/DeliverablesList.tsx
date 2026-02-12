import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface DeliverableItem {
  name: string;
  type: string;
  size: string;
  updated: string;
}

interface Props {
  items: DeliverableItem[];
}

const TYPE_STYLES: Record<string, string> = {
  PDF: "bg-destructive/10 text-destructive border-destructive/20",
  DWG: "bg-primary/10 text-primary border-primary/20",
  PNG: "bg-accent text-accent-foreground border-accent-foreground/20",
  XLSX: "bg-success/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20",
  ZIP: "bg-warning/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/20",
};

export function DeliverablesList({ items }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-subtle">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">File Name</th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Size</th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Updated</th>
            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground" />
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <motion.tr
              key={item.name}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              className="border-b last:border-0 hover:bg-muted/30 transition-colors"
            >
              <td className="px-5 py-3.5 font-medium text-foreground">{item.name}</td>
              <td className="px-5 py-3.5">
                <Badge variant="outline" className={`text-[10px] font-semibold ${TYPE_STYLES[item.type] || ""}`}>
                  {item.type}
                </Badge>
              </td>
              <td className="px-5 py-3.5 text-muted-foreground">{item.size}</td>
              <td className="px-5 py-3.5 text-muted-foreground">{item.updated}</td>
              <td className="px-5 py-3.5 text-right">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
