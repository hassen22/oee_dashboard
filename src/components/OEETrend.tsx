import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPercent, getOeeStatusColor } from "@/lib/oee";

type Item = { label: string; value: number };

type Props = {
  data: Item[];
};

export function OEETrend({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>OEE by Shift</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {data.map((d) => {
            const status = getOeeStatusColor(d.value);
            const color =
              status === "World-Class"
                ? "bg-green-500"
                : status === "Acceptable"
                ? "bg-yellow-500"
                : "bg-red-500";
            const barHeight = Math.min(100, Math.max(0, d.value * 100));
            return (
              <div key={d.label} className="flex flex-col items-center gap-2">
                <div className="h-28 w-8 bg-muted/60 flex flex-col justify-end relative">
                  <div
                    className={`${color} w-full transition-all`}
                    style={{ height: `${barHeight}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground">{d.label}</div>
                <div className="text-sm font-medium">
                  {formatPercent(d.value, 0)}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default OEETrend;
