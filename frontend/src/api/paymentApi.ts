// src/api/paymentapi.ts
import axios from "./axiosInstance";
import { toast } from "react-toastify";
import type { Payment } from "../types/types";

// GET - Fetch all payments
export const fetchPayments = async (): Promise<Payment[]> => {
  try {
    const res = await axios.get("/api/payments");
    return res.data;
  } catch (err: any) {
    console.error(err);
    toast.error("Failed to load payments");
    return [];
  }
};

// POST - Create a new payment
export const createPayment = async (payment: Partial<Payment>): Promise<Payment | null> => {
  try {
    const res = await axios.post("/api/payments", payment);
    toast.success("Payment created successfully");
    return res.data;
  } catch (err: any) {
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
  } catch (err: any) {
    console.error(err);
    toast.error("Failed to update payment");
    return null;
  }
};
