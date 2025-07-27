import axios, {isAxiosError} from './axiosInstance'; // Assuming you have a custom axios instance set up
import { toast } from "react-toastify";
import type { Payment } from "../types/types";

// GET - Fetch all payments
export const fetchPayments = async (): Promise<Payment[]> => {
  try {
    const res = await axios.get("/api/payments");
    return res.data;
  } catch (err: unknown) {
    console.error(err);
    toast.error("Failed to load payments");
    return [];
  }
};

// POST - Create a new payment
export const createPayment = async (
  payment: Partial<Payment>,
  forceDuplicate = false
): Promise<Payment | { error: string; allowDuplicate: boolean } | null> => {
  try {
    const payload = { ...payment, ...(forceDuplicate && { force: true }) };
    const res = await axios.post("/api/payments", payload);
    toast.success("Payment created successfully");
    return res.data;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      if (err.response?.status === 409 && err.response.data?.allowDuplicate) {
        return err.response.data; // trigger modal
      }
    }

    console.error(err);
    toast.error("Failed to create payment");
    return null;
  }
};

// PATCH - Update payment status
export const updatePaymentStatus = async (id: number, status: "Pending" | "Approved"): Promise<Payment | null> => {
  try {
    const res = await axios.patch(`/api/payments/${id}`, { status });
    toast.success("Payment status updated");
    return res.data;
  } catch (err: unknown) {
    console.error(err);
    toast.error("Failed to update payment");
    return null;
  }
};
