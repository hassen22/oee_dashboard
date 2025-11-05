import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getOeeStatusColor, formatPercent } from "@/lib/oee";

type Props = {
  oee: number;
  delta?: number; // vs previous period
};

export function OEECard({ oee, delta }: Props) {
  const status = getOeeStatusColor(oee);
  const colorClasses =
    status === "World-Class"
      ? "bg-green-500/10 text-green-600 border-green-500/20"
      : status === "Acceptable"
      ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      : "bg-red-500/10 text-red-600 border-red-500/20";

  const deltaText =
    typeof delta === "number"
      ? `${delta >= 0 ? "↑" : "↓"} ${formatPercent(Math.abs(delta), 0)}`
      : undefined;

  return (
    <Card className="text-center">
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <CardTitle className={`text-3xl color-${colorClasses}`}>
            OEE {formatPercent(oee, 0)}
          </CardTitle>
          <Badge className={`${colorClasses}`}>{status.toUpperCase()}</Badge>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          {deltaText ? (
            <span className={`text-sm`}>{deltaText} vs previous period</span>
          ) : null}
        </div>
      </CardHeader>
    </Card>
  );
}

export default OEECard;
