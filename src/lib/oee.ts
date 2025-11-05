export type DowntimeEvent = {
  id: string;
  shiftId: string;
  category: string;
  reason: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  type: "planned" | "unplanned";
};

export type Shift = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  plannedProductionTime: number;
  targetQuantity: number;
  actualQuantity: number;
  goodQuantity: number;
  defectQuantity: number;
};

export type ProductionLine = {
  id: string;
  name: string;
  targetCycleTime: number;
  description?: string;
};

export type PreviousPeriod = {
  description: string;
  totalOEE: number;
  availability: number;
  performance: number;
  quality: number;
};

export type OeeComponents = {
  availability: number;
  performance: number;
  quality: number;
  oee: number;
};

export type ShiftOee = OeeComponents & {
  shiftId: string;
  shiftName: string;
  plannedProductionTime: number;
  operatingTime: number;
  totalOutput: number;
  goodOutput: number;
  unplannedDowntime: number;
};

export type AggregateOee = OeeComponents & {
  totalPlannedProductionTime: number;
  totalOperatingTime: number;
  totalOutput: number;
  totalGoodOutput: number;
  totalUnplannedDowntime: number;
};

export function calculateUnplannedDowntimeMinutes(
  downtimeEvents: DowntimeEvent[],
  shiftId?: string
): number {
  return downtimeEvents
    .filter(
      (d) => d.type === "unplanned" && (!shiftId || d.shiftId === shiftId)
    )
    .reduce((sum, d) => sum + d.durationMinutes, 0);
}

export function groupDowntimeByCategory(
  downtimeEvents: DowntimeEvent[],
  shiftId?: string
): { category: string; totalMinutes: number; type: "planned" | "unplanned" }[] {
  const map = new Map<
    string,
    { totalMinutes: number; type: "planned" | "unplanned" }
  >();
  for (const d of downtimeEvents) {
    if (shiftId && d.shiftId !== shiftId) continue;
    const key = d.category;
    const entry = map.get(key);
    if (entry) {
      entry.totalMinutes += d.durationMinutes;
    } else {
      map.set(key, { totalMinutes: d.durationMinutes, type: d.type });
    }
  }
  return Array.from(map.entries())
    .map(([category, v]) => ({
      category,
      totalMinutes: v.totalMinutes,
      type: v.type,
    }))
    .sort((a, b) => b.totalMinutes - a.totalMinutes);
}

export function getRows(
  downtimeEvents: DowntimeEvent[],
  shiftId?: string
): {
  reason: string;
  category: string;
  totalMinutes: number;
  type: "planned" | "unplanned";
}[] {
  const rows = [];
  for (const d of downtimeEvents) {
    if (shiftId && d.shiftId !== shiftId) continue;
    rows.push({
      reason: d.reason,
      category: d.category,
      totalMinutes: d.durationMinutes,
      type: d.type,
    });
  }
  return rows.sort((a, b) => b.totalMinutes - a.totalMinutes);
}

export function calculateShiftOee(
  shift: Shift,
  productionLine: ProductionLine,
  downtimeEvents: DowntimeEvent[]
): ShiftOee {
  const unplannedDowntime = calculateUnplannedDowntimeMinutes(
    downtimeEvents,
    shift.id
  );
  const plannedProductionTime = shift.plannedProductionTime;
  const operatingTime = Math.max(plannedProductionTime - unplannedDowntime, 0);

  const totalOutput = shift.actualQuantity;
  const goodOutput = shift.goodQuantity;

  // Availability: Operating Time / Planned Production Time
  const availability =
    plannedProductionTime > 0 ? operatingTime / plannedProductionTime : 0;

  // Performance: (Ideal Cycle Time × Total Output) / Operating Time
  const operatingTimeSeconds = operatingTime * 60;
  const idealTimeSeconds = productionLine.targetCycleTime * totalOutput;
  const performance =
    operatingTimeSeconds > 0 ? idealTimeSeconds / operatingTimeSeconds : 0;

  // Quality: Good Units / Total Units
  const quality = totalOutput > 0 ? goodOutput / totalOutput : 0;

  // OEE
  const oee = availability * performance * quality;

  return {
    shiftId: shift.id,
    shiftName: shift.name,
    plannedProductionTime,
    operatingTime,
    totalOutput,
    goodOutput,
    unplannedDowntime,
    availability,
    performance,
    quality,
    oee,
  };
}

export function calculateAggregateOee(
  shifts: Shift[],
  productionLine: ProductionLine,
  downtimeEvents: DowntimeEvent[]
): AggregateOee {
  // Weighted by operating time for Availability and Performance; by total output for Quality
  let totalPlannedProductionTime = 0;
  let totalOperatingTime = 0;
  let totalOutput = 0;
  let totalGoodOutput = 0;
  let totalUnplannedDowntime = 0;

  for (const s of shifts) {
    const shiftMetrics = calculateShiftOee(s, productionLine, downtimeEvents);
    totalPlannedProductionTime += s.plannedProductionTime;
    totalOperatingTime += shiftMetrics.operatingTime;
    totalOutput += shiftMetrics.totalOutput;
    totalGoodOutput += shiftMetrics.goodOutput;
    totalUnplannedDowntime += shiftMetrics.unplannedDowntime;
  }

  const availability =
    totalPlannedProductionTime > 0
      ? totalOperatingTime / totalPlannedProductionTime
      : 0;
  const performance =
    totalOperatingTime > 0
      ? (productionLine.targetCycleTime * totalOutput) /
        (totalOperatingTime * 60)
      : 0;
  const quality = totalOutput > 0 ? totalGoodOutput / totalOutput : 0;
  const oee = availability * performance * quality;

  return {
    totalPlannedProductionTime,
    totalOperatingTime,
    totalOutput,
    totalGoodOutput,
    totalUnplannedDowntime,
    availability,
    performance,
    quality,
    oee,
  };
}

export function getOeeStatusColor(
  oee: number
): "World-Class" | "Acceptable" | "Needs Attention" {
  if (oee >= 0.85) return "World-Class";
  if (oee >= 0.65) return "Acceptable";
  return "Needs Attention";
}

export function formatPercent(value: number, digits = 0): string {
  return `${(value * 100).toFixed(digits)}%`;
}

export function calculateDeltas(
  current: OeeComponents,
  previous: OeeComponents
) {
  return {
    oee: current.oee - previous.oee,
    availability: current.availability - previous.availability,
    performance: current.performance - previous.performance,
    quality: current.quality - previous.quality,
  };
}
