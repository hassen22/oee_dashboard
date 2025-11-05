import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DowntimeTable } from "../DowntimeTable";
import { getRows, type DowntimeEvent } from "@/lib/oee";

describe("DowntimeTable", () => {
  const downtimeEvents = [
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
      reason: "Routine welding robot maintenance",
      startTime: "2025-10-27T13:30:00Z",
      endTime: "2025-10-27T14:00:00Z",
      durationMinutes: 30,
      type: "planned",
    },
    {
      id: "DT_004",
      shiftId: "SHIFT_2",
      category: "Changeover",
      reason: "Scheduled tool change",
      startTime: "2025-10-27T17:00:00Z",
      endTime: "2025-10-27T17:25:00Z",
      durationMinutes: 25,
      type: "planned",
    },
    {
      id: "DT_005",
      shiftId: "SHIFT_2",
      category: "Quality Issue",
      reason: "Rework due to dimensional variance",
      startTime: "2025-10-27T19:45:00Z",
      endTime: "2025-10-27T20:15:00Z",
      durationMinutes: 30,
      type: "unplanned",
    },
  ] as DowntimeEvent[];
  const mockRows = getRows(downtimeEvents);

  it("should render table header", () => {
    render(<DowntimeTable rows={mockRows} />);
    expect(screen.getByText("Top 3 Downtime Reasons")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Duration (min)")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
  });
});
