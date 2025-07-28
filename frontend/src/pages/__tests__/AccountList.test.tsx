import { render, screen, waitFor } from "@testing-library/react";
import AccountList from "../AccountList";
import { BrowserRouter } from "react-router-dom";
import * as api from "../../api/accountapi";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../api/accountapi");

const mockAccounts = [
  {
    id: 1,
    name: "John Doe",
    address: "123 Main St",
    phoneNumber: "+447700900123",
    bankAccountNumber: "12345678",
  },
];

describe("AccountList", () => {
  it("renders accounts when data is loaded", async () => {
    vi.spyOn(api, "fetchAccounts").mockResolvedValue(mockAccounts);

    render(
      <BrowserRouter>
        <AccountList />
      </BrowserRouter>
    );

    expect(screen.getByText(/Accounts/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("123 Main St")).toBeInTheDocument();
      expect(screen.getByText("+44 7700900123")).toBeInTheDocument();
    });
  });

  it("shows message if no accounts", async () => {
    vi.spyOn(api, "fetchAccounts").mockResolvedValue([]);

    render(
      <BrowserRouter>
        <AccountList />
      </BrowserRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/No accounts available/i)).toBeInTheDocument()
    );
  });
});