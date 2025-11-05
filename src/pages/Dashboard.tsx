import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import data from "@/data/production-data.json";
import { OEECard } from "@/components/OEECard";
import { BreakdownCards } from "@/components/BreakdownCards";
import { DowntimeTable } from "@/components/DowntimeTable";
import { ShiftSelector } from "@/components/ShiftSelector";
import { OEETrend } from "@/components/OEETrend";
import { ParetoAnalysis } from "@/components/ParetoAnalysis";
import {
  type DowntimeEvent,
  type Shift,
  type ProductionLine,
  calculateShiftOee,
  calculateAggregateOee,
  getRows,
  groupDowntimeByCategory,
} from "@/lib/oee";
import { IconDownload } from "@tabler/icons-react";

export default function Dashboard() {
  const [selected, setSelected] = useState<string>("all");

  const productionLine = data.productionLine as ProductionLine;
  const shifts = data.shifts as Shift[];
  const downtime = data.downtimeEvents as DowntimeEvent[];

  const {
    oee,
    availability,
    performance,
    quality,
    rows,
    downtimeByCategory,
    trendPrev,
    trendData,
  } = useMemo(() => {
    if (selected === "all") {
      const agg = calculateAggregateOee(shifts, productionLine, downtime);
      const rows = getRows(downtime);
      const downtimeByCategory = groupDowntimeByCategory(downtime);
      return {
        oee: agg.oee,
        availability: agg.availability,
        performance: agg.performance,
        quality: agg.quality,
        rows,
        downtimeByCategory,
        trendPrev: {
          oee: data.previousPeriod.totalOEE,
          availability: data.previousPeriod.availability,
          performance: data.previousPeriod.performance,
          quality: data.previousPeriod.quality,
        },
        trendData: shifts.map((s) => {
          const m = calculateShiftOee(s, productionLine, downtime);
          return { label: s.name.split(" ")[0], value: m.oee };
        }),
      };
    }

    const shift = shifts.find((s) => s.id === selected) as Shift;
    const m = calculateShiftOee(shift, productionLine, downtime);
    const rows = getRows(downtime, selected);
    const downtimeByCategory = groupDowntimeByCategory(downtime, selected);

    return {
      oee: m.oee,
      availability: m.availability,
      performance: m.performance,
      quality: m.quality,
      downtimeByCategory,
      rows,
      trendPrev: {
        oee: data.previousPeriod.totalOEE,
        availability: data.previousPeriod.availability,
        performance: data.previousPeriod.performance,
        quality: data.previousPeriod.quality,
      },
      trendData: [{ label: shift.name.split(" ")[0], value: m.oee }],
    };
  }, [selected, shifts, productionLine, downtime]);

  const headerSubtitle = `${productionLine.name} - ${data.metadata.site} - ${
    data.metadata.department
  } — ${new Date(data.metadata.reportDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;

  function handleExport() {
    const payload = {
      selection: selected,
      productionLine,
      date: data.metadata.reportDate,
      metrics: { oee, availability, performance, quality },
      previous: trendPrev,
      downtimeTop3: rows.slice(0, 3),
      downtimeByCategory: downtimeByCategory,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `oee-${selected}-${data.metadata.reportDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Production Line OEE Dashboard
          </h1>
          <p className="text-muted-foreground">{headerSubtitle}</p>
        </div>
        <div className="w-full sm:w-auto flex items-center gap-2">
          <div className="min-w-64">
            <ShiftSelector value={selected} onValueChange={setSelected} />
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleExport} variant="outline">
              <IconDownload className="size-4" />
              <span className="hidden sm:block">Export Metrics</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="md:col-span-3 space-y-4">
        <OEECard oee={oee} delta={oee - trendPrev.oee} />
        <BreakdownCards
          items={[
            {
              label: "Availability",
              value: availability,
              delta: availability - trendPrev.availability,
            },
            {
              label: "Performance",
              value: performance,
              delta: performance - trendPrev.performance,
            },
            {
              label: "Quality",
              value: quality,
              delta: quality - trendPrev.quality,
            },
          ]}
        />
        <OEETrend data={trendData} />
        <DowntimeTable rows={rows} />
        <ParetoAnalysis categories={downtimeByCategory} />
      </div>
    </div>
  );
}
