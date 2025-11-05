import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

type Row = {
  reason: string;
  category: string;
  totalMinutes: number;
  type: "planned" | "unplanned";
};

type Props = {
  rows: Row[];
};

export function DowntimeTable({ rows }: Props) {
  const top = rows.slice(0, 3);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 3 Downtime Reasons</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reason</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Duration (min)</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {top.map((r) => (
              <TableRow key={r.category}>
                <TableCell>{r.reason}</TableCell>
                <TableCell>{r.category}</TableCell>
                <TableCell className="text-right">{r.totalMinutes}</TableCell>
                <TableCell
                  className={
                    r.type === "unplanned"
                      ? "text-red-600"
                      : "text-muted-foreground"
                  }
                >
                  {r.type === "unplanned" ? "Unplanned" : "Planned"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default DowntimeTable;
