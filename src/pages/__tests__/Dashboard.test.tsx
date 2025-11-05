import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "../Dashboard";

// Mock Recharts to avoid rendering issues in tests
vi.mock("recharts", async () => {
  const actual = await vi.importActual("recharts");
  return {
    ...actual,
    BarChart: ({ children }: { children?: React.ReactNode }) => (
      <div data-testid="bar-chart">{children}</div>
    ),
    Bar: ({ children }: { children?: React.ReactNode }) => (
      <div data-testid="bar">{children}</div>
    ),
    LineChart: ({ children }: { children?: React.ReactNode }) => (
      <div data-testid="line-chart">{children}</div>
    ),
    Line: () => <div data-testid="line" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="grid" />,
    Cell: () => <div data-testid="cell" />,
    Tooltip: () => <div data-testid="tooltip" />,
    ReferenceLine: () => <div data-testid="reference-line" />,
    ResponsiveContainer: ({ children }: { children?: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

// Mock the JSON data import
vi.mock("@/data/production-data.json", () => ({
  default: {
    productionLine: {
      id: "LINE_A1",
      name: "Assembly Line A1",
      targetCycleTime: 45,
      description: "Test line",
    },
    shifts: [
      {
        id: "SHIFT_1",
        name: "Early Shift",
        startTime: "2025-10-27T06:00:00Z",
        endTime: "2025-10-27T14:00:00Z",
        plannedProductionTime: 480,
        targetQuantity: 640,
        actualQuantity: 582,
        goodQuantity: 571,
        defectQuantity: 11,
      },
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
    ],
    downtimeEvents: [
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
        shiftId: "SHIFT_2",
        category: "Material Shortage",
        reason: "Delayed parts delivery",
        startTime: "2025-10-27T15:30:00Z",
        endTime: "2025-10-27T16:00:00Z",
        durationMinutes: 30,
        type: "unplanned",
      },
    ],
    previousPeriod: {
      description: "Prior week",
      totalOEE: 0.78,
      availability: 0.87,
      performance: 0.92,
      quality: 0.97,
    },
    metadata: {
      site: "Test Site",
      department: "Test Department",
      reportDate: "2025-10-27",
      worldClassOEETarget: 0.85,
      minimumAcceptableOEE: 0.65,
    },
  },
}));

describe("Dashboard", () => {
  it("should render dashboard title", () => {
    render(<Dashboard />);
    expect(
      screen.getByText("Production Line OEE Dashboard")
    ).toBeInTheDocument();
  });

  it("should render production line information in subtitle", () => {
    render(<Dashboard />);
    expect(screen.getByText(/Assembly Line A1/i)).toBeInTheDocument();
  });

  it("should render breakdown cards", () => {
    render(<Dashboard />);
    expect(screen.getByText("Availability")).toBeInTheDocument();
    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("Quality")).toBeInTheDocument();
  });

  it("should render OEE trend chart", () => {
    render(<Dashboard />);
    expect(screen.getByText("OEE by Shift")).toBeInTheDocument();
  });

  it("should render downtime table", () => {
    render(<Dashboard />);
    expect(screen.getByText("Top 3 Downtime Reasons")).toBeInTheDocument();
  });

  it("should render export button", () => {
    render(<Dashboard />);
    expect(screen.getByText("Export Metrics")).toBeInTheDocument();
  });
});
