import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

type Category = {
  category: string;
  totalMinutes: number;
  type: "planned" | "unplanned";
};

type Props = {
  categories: Category[];
};

export function ParetoAnalysis({ categories }: Props) {
  // Sort by duration (descending) - highest first
  const sorted = [...categories].sort(
    (a, b) => b.totalMinutes - a.totalMinutes
  );

  // Prepare chart data
  const chartData = sorted.map((cat) => ({
    category:
      cat.category.length > 15
        ? `${cat.category.substring(0, 15)}...`
        : cat.category,
    fullCategory: cat.category,
    minutes: cat.totalMinutes,
    type: cat.type,
    color: cat.type === "unplanned" ? "#ef4444" : "#3b82f6",
  }));

  const chartConfig = {
    minutes: {
      label: "Duration (min)",
      color: "#3b82f6",
    },
  };

  if (sorted.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pareto Analysis: Downtime Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            No downtime data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pareto Analysis: Downtime Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              left: 60,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-muted"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
              tickFormatter={(value) => `${value} min`}
            />
            <YAxis
              type="category"
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs"
              width={140}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload[0]) return null;
                const data = payload[0].payload;
                return (
                  <div className="rounded-lg border bg-background p-3 shadow-lg">
                    <div className="space-y-2">
                      <div className="font-medium">{data.fullCategory}</div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground text-sm">
                          Duration:
                        </span>
                        <span className="font-mono font-medium">
                          {data.minutes} min
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground text-sm">
                          Type:
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            data.type === "unplanned"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {data.type === "unplanned" ? "Unplanned" : "Planned"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
            <Bar dataKey="minutes" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.type === "unplanned" ? "#ef4444" : "#00a63e"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ParetoAnalysis;
