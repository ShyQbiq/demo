import { cn } from "@/lib/utils";

interface DataTableProps {
  headers: string[];
  rows: string[][];
  className?: string;
}

export function DataTable({ headers, rows, className }: DataTableProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg border bg-card shadow-subtle", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
