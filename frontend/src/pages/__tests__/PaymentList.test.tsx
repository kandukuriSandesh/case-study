import { render, screen, waitFor } from "@testing-library/react";
import PaymentList from "../PaymentList";
import { BrowserRouter } from "react-router-dom";
import * as api from "../../api/paymentapi";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import type { Payment } from "../../types/types";

vi.mock("../api/paymentapi");

const mockPayments: Payment[] = [
  {
    id: 1,
    amount: 100,
    recipientName: "Alice",
    bankName: "HSBC",
    recipientAccount: "12345678",
    status: "Pending",
    account: {
      id: 2,
      name: "Lily",
      address: "123 Main St",
      phoneNumber: "+44 7700900123",
    },
  },
];


describe("PaymentList", () => {
  it("renders payments when data is loaded", async () => {
    vi.spyOn(api, "fetchPayments").mockResolvedValue(mockPayments);

    render(
      <BrowserRouter>
        <PaymentList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("£ 100.00")).toBeInTheDocument();
      expect(screen.getByText("Lily")).toBeInTheDocument();
    });
  });

  it("shows message if no payments", async () => {
    vi.spyOn(api, "fetchPayments").mockResolvedValue([]);

    render(
      <BrowserRouter>
        <PaymentList />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/No payments available/i)).toBeInTheDocument()
    );
  });
});