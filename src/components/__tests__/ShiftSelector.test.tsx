import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShiftSelector } from "../ShiftSelector";

describe("ShiftSelector", () => {
  it("should render all shift options", () => {
    const mockOnChange = vi.fn();
    render(<ShiftSelector value="all" onValueChange={mockOnChange} />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Early")).toBeInTheDocument();
    expect(screen.getByText("Late")).toBeInTheDocument();
    expect(screen.getByText("Night")).toBeInTheDocument();
  });

  it("should call onValueChange when shift is selected", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(<ShiftSelector value="all" onValueChange={mockOnChange} />);

    const earlyButton = screen.getByText("Early");
    await user.click(earlyButton);

    expect(mockOnChange).toHaveBeenCalledWith("SHIFT_1");
  });

  it("should handle all shifts selection", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(<ShiftSelector value="SHIFT_1" onValueChange={mockOnChange} />);

    const allButton = screen.getByText("All");
    await user.click(allButton);

    expect(mockOnChange).toHaveBeenCalledWith("all");
  });

  it("should handle late shift selection", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(<ShiftSelector value="all" onValueChange={mockOnChange} />);

    const lateButton = screen.getByText("Late");
    await user.click(lateButton);

    expect(mockOnChange).toHaveBeenCalledWith("SHIFT_2");
  });

  it("should handle night shift selection", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(<ShiftSelector value="all" onValueChange={mockOnChange} />);

    const nightButton = screen.getByText("Night");
    await user.click(nightButton);

    expect(mockOnChange).toHaveBeenCalledWith("SHIFT_3");
  });
});
