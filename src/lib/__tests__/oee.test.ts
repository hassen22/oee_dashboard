import { describe, it, expect } from "vitest";
import {
  calculateUnplannedDowntimeMinutes,
  groupDowntimeByCategory,
  calculateAggregateOee,
  getRows,
  type DowntimeEvent,
  type Shift,
  type ProductionLine,
} from "../oee";

describe("oee utilities", () => {
  const mockProductionLine: ProductionLine = {
    id: "LINE_1",
    name: "Test Line",
    targetCycleTime: 45, // 45 seconds per part
  };

  const mockShift: Shift = {
    id: "SHIFT_1",
    name: "Early Shift",
    startTime: "2025-10-27T06:00:00Z",
    endTime: "2025-10-27T14:00:00Z",
    plannedProductionTime: 480, // 8 hours in minutes
    targetQuantity: 640,
    actualQuantity: 582,
    goodQuantity: 571,
    defectQuantity: 11,
  };

  const mockDowntimeEvents: DowntimeEvent[] = [
    {
      id: "DT_001",
      shiftId: "SHIFT_1",
      category: "Machine Failure",
      reason: "Hydraulic pump failure",
      startTime: "2025-10-27T08:15:00Z",
      endTime: "2025-10-27T09:45:00Z",
      durationMinutes: 90,
      type: "unplanned",
    },
    {
      id: "DT_002",
      shiftId: "SHIFT_1",
      category: "Material Shortage",
      reason: "Delayed parts delivery",
      startTime: "2025-10-27T11:30:00Z",
      endTime: "2025-10-27T12:00:00Z",
      durationMinutes: 30,
      type: "unplanned",
    },
    {
      id: "DT_003",
      shiftId: "SHIFT_1",
      category: "Planned Maintenance",
      reason: "Routine maintenance",
      startTime: "2025-10-27T13:30:00Z",
      endTime: "2025-10-27T14:00:00Z",
      durationMinutes: 30,
      type: "planned",
    },
  ];

  describe("calculateUnplannedDowntimeMinutes", () => {
    it("should calculate total unplanned downtime for all shifts", () => {
      const result = calculateUnplannedDowntimeMinutes(mockDowntimeEvents);
      expect(result).toBe(120);
    });

    it("should filter by shift ID correctly", () => {
      const events: DowntimeEvent[] = [
        ...mockDowntimeEvents,
        {
          id: "DT_004",
          shiftId: "SHIFT_2",
          category: "Machine Failure",
          reason: "Other failure",
          startTime: "2025-10-27T15:00:00Z",
          endTime: "2025-10-27T15:30:00Z",
          durationMinutes: 30,
          type: "unplanned",
        },
      ];
      const result = calculateUnplannedDowntimeMinutes(events, "SHIFT_1");
      expect(result).toBe(120);
    });
  });

  describe("groupDowntimeByCategory", () => {
    it("should group downtime events by category", () => {
      const result = groupDowntimeByCategory(mockDowntimeEvents);
      expect(result).toHaveLength(3);
      expect(result[0].category).toBe("Machine Failure");
      expect(result[0].totalMinutes).toBe(90);
    });

    it("should handle multiple events in same category", () => {
      const events: DowntimeEvent[] = [
        ...mockDowntimeEvents,
        {
          id: "DT_005",
          shiftId: "SHIFT_1",
          category: "Machine Failure",
          reason: "Another failure",
          startTime: "2025-10-27T10:00:00Z",
          endTime: "2025-10-27T10:15:00Z",
          durationMinutes: 15,
          type: "unplanned",
        },
      ];
      const result = groupDowntimeByCategory(events);
      const machineFailure = result.find(
        (r) => r.category === "Machine Failure"
      );
      expect(machineFailure?.totalMinutes).toBe(105);
    });
  });

  describe("getRows", () => {
    it("should return downtime events as rows", () => {
      const result = getRows(mockDowntimeEvents);
      expect(result).toHaveLength(3);
      expect(result[0].category).toBe("Machine Failure");
      expect(result[0].totalMinutes).toBe(90);
      expect(result[0].reason).toBe("Hydraulic pump failure");
    });
  });

  describe("calculateAggregateOee", () => {
    it("should calculate aggregate OEE for multiple shifts", () => {
      const shifts: Shift[] = [
        mockShift,
        {
          id: "SHIFT_2",
          name: "Late Shift",
          startTime: "2025-10-27T14:00:00Z",
          endTime: "2025-10-27T22:00:00Z",
          plannedProductionTime: 480,
          targetQuantity: 640,
          actualQuantity: 612,
          goodQuantity: 604,
          defectQuantity: 8,
        },
      ];

      const result = calculateAggregateOee(
        shifts,
        mockProductionLine,
        mockDowntimeEvents
      );

      expect(result.totalPlannedProductionTime).toBe(960);
      expect(result.totalOutput).toBe(1194);
      expect(result.totalGoodOutput).toBe(1175);
    });
  });
});
