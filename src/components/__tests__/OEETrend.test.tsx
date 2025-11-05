import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OEETrend } from "../OEETrend";

describe("OEETrend", () => {
  const mockData = [
    { label: "Early", value: 0.85 },
    { label: "Late", value: 0.75 },
    { label: "Night", value: 0.6 },
  ];

  it("should render chart title", () => {
    render(<OEETrend data={mockData} />);
    expect(screen.getByText("OEE by Shift")).toBeInTheDocument();
  });

  it("should render all shift labels", () => {
    render(<OEETrend data={mockData} />);
    expect(screen.getByText("Early")).toBeInTheDocument();
    expect(screen.getByText("Late")).toBeInTheDocument();
    expect(screen.getByText("Night")).toBeInTheDocument();
  });

  it("should display OEE percentages", () => {
    render(<OEETrend data={mockData} />);
    expect(screen.getByText("85%")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("60%")).toBeInTheDocument();
  });
});
