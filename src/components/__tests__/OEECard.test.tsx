import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OEECard } from "../OEECard";

describe("OEECard", () => {
  it("should render OEE value correctly", () => {
    render(<OEECard oee={0.85} />);
    expect(screen.getByText(/OEE 85%/i)).toBeInTheDocument();
  });

  it("should display World-Class status for OEE >= 0.85", () => {
    render(<OEECard oee={0.85} />);
    expect(screen.getByText("WORLD-CLASS")).toBeInTheDocument();
  });

  it("should display Acceptable status for OEE between 0.65 and 0.85", () => {
    render(<OEECard oee={0.75} />);
    expect(screen.getByText("ACCEPTABLE")).toBeInTheDocument();
  });

  it("should display Needs Attention status for OEE < 0.65", () => {
    render(<OEECard oee={0.6} />);
    expect(screen.getByText("NEEDS ATTENTION")).toBeInTheDocument();
  });

  it("should display delta when provided", () => {
    render(<OEECard oee={0.85} delta={0.05} />);
    expect(screen.getByText(/↑ 5%/i)).toBeInTheDocument();
    expect(screen.getByText(/vs previous period/i)).toBeInTheDocument();
  });

  it("should display negative delta correctly", () => {
    render(<OEECard oee={0.75} delta={-0.05} />);
    expect(screen.getByText(/↓ 5%/i)).toBeInTheDocument();
  });
});
