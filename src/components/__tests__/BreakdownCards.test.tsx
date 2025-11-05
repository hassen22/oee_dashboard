import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BreakdownCards } from "../BreakdownCards";

describe("BreakdownCards", () => {
  const mockItems = [
    {
      label: "Availability",
      value: 0.88,
      delta: 0.02,
    },
    {
      label: "Performance",
      value: 0.92,
      delta: -0.01,
    },
    {
      label: "Quality",
      value: 0.97,
    },
  ];

  it("should render all items", () => {
    render(<BreakdownCards items={mockItems} />);
    expect(screen.getByText("Availability")).toBeInTheDocument();
    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("Quality")).toBeInTheDocument();
  });

  it("should display correct percentage values", () => {
    render(<BreakdownCards items={mockItems} />);
    expect(screen.getByText("88%")).toBeInTheDocument();
    expect(screen.getByText("92%")).toBeInTheDocument();
    expect(screen.getByText("97%")).toBeInTheDocument();
  });

  it("should display positive delta", () => {
    render(<BreakdownCards items={mockItems} />);
    expect(screen.getByText(/\+2%/i)).toBeInTheDocument();
  });

  it("should display negative delta", () => {
    render(<BreakdownCards items={mockItems} />);
    expect(screen.getByText(/- 1%/i)).toBeInTheDocument();
  });
});
