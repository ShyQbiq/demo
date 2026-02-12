import { motion } from "framer-motion";

const ROWS = [
  { category: "Construction", estimate: "$62.8M", notes: "Structural, envelope, and site work" },
  { category: "Furniture & Fixtures", estimate: "$18.4M", notes: "Workstations, lounge, and storage" },
  { category: "MEP Systems", estimate: "$34.7M", notes: "Mechanical, electrical, plumbing" },
  { category: "Technology", estimate: "$16.1M", notes: "AV, networking, security systems" },
  { category: "Contingency", estimate: "$14.2M", notes: "10% reserve for scope changes" },
];

export function CostBreakdownTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="overflow-hidden rounded-lg border bg-card shadow-subtle"
    >
      <div className="p-5 border-b">
        <h3 className="text-sm font-semibold">Cost Breakdown</h3>
        <p className="text-xs text-muted-foreground mt-0.5">By major category</p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Estimate</th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <motion.tr
              key={row.category}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              className="border-b last:border-0 hover:bg-muted/30 transition-colors"
            >
              <td className="px-5 py-3.5 font-medium text-foreground">{row.category}</td>
              <td className="px-5 py-3.5 font-semibold text-foreground">{row.estimate}</td>
              <td className="px-5 py-3.5 text-muted-foreground">{row.notes}</td>
            </motion.tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-muted/30">
            <td className="px-5 py-3.5 font-semibold text-foreground">Total</td>
            <td className="px-5 py-3.5 font-bold text-foreground">$146.2M</td>
            <td className="px-5 py-3.5 text-muted-foreground">All categories</td>
          </tr>
        </tfoot>
      </table>
    </motion.div>
  );
}
