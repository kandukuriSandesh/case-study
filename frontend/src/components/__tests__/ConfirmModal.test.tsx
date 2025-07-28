import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmModal from "../ConfirmModal";
import { describe, it, expect, vi } from "vitest";

describe("ConfirmModal", () => {
  const defaultProps = {
    title: "Confirm Approval",
    contentText: "Are you sure you want to approve?",
    confirmButtonText: "Confirm",
    open: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
  };

  it("renders with given title and content", () => {
    render(<ConfirmModal {...defaultProps} />);
    expect(screen.getByText("Confirm Approval")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to approve?")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    render(<ConfirmModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onConfirm when Confirm is clicked", () => {
    render(<ConfirmModal {...defaultProps} />);
    fireEvent.click(screen.getByText("Confirm"));
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });
});