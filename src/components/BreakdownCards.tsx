import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formatPercent } from "@/lib/oee";

type Item = {
  label: string;
  value: number;
  delta?: number;
};

type Props = {
  items: Item[];
};

export function BreakdownCards({ items }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((it) => {
        const isUp = (it.delta ?? 0) >= 0;
        const deltaText =
          typeof it.delta === "number"
            ? `${isUp ? "+" : "- "}${formatPercent(Math.abs(it.delta), 0)}`
            : undefined;
        return (
          <Card key={it.label}>
            <CardHeader>
              <CardDescription>{it.label}</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">
                  {formatPercent(it.value, 0)}
                </CardTitle>
                {deltaText ? (
                  <span
                    className={`flex items-center gap-1 text-sm ${
                      isUp ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isUp ? "↑" : "↓"}
                    {deltaText}
                  </span>
                ) : null}
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}

export default BreakdownCards;
