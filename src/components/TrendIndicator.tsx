import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatPercent } from "@/lib/oee";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

type Props = {
  oee: number;
  availability: number;
  performance: number;
  quality: number;
  previous: {
    oee: number;
    availability: number;
    performance: number;
    quality: number;
  };
};

function Row({
  label,
  value,
  prev,
}: {
  label: string;
  value: number;
  prev: number;
}) {
  const delta = value - prev;
  const isUp = delta > 0;
  const isDown = delta < 0;
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2">
        <span className="font-medium">{formatPercent(value, 0)}</span>
        <span
          className={`flex items-center gap-1 text-sm ${
            isUp
              ? "text-green-600"
              : isDown
              ? "text-red-600"
              : "text-muted-foreground"
          }`}
        >
          {isUp ? (
            <TrendingUp className="h-4 w-4" />
          ) : isDown ? (
            <TrendingDown className="h-4 w-4" />
          ) : (
            <Minus className="h-4 w-4" />
          )}
          {formatPercent(Math.abs(delta), 0)}
        </span>
      </span>
    </div>
  );
}

export function TrendIndicator({
  oee,
  availability,
  performance,
  quality,
  previous,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Period Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Row label="OEE" value={oee} prev={previous.oee} />
          <Row
            label="Availability"
            value={availability}
            prev={previous.availability}
          />
          <Row
            label="Performance"
            value={performance}
            prev={previous.performance}
          />
          <Row label="Quality" value={quality} prev={previous.quality} />
        </div>
      </CardContent>
    </Card>
  );
}

export default TrendIndicator;
