import axios from "./axiosInstance";
import { toast } from "react-toastify";
import type { Account } from "../types/types";

// GET - Fetch all accounts
export const fetchAccounts = async (): Promise<Account[]> => {
  try {
    const res = await axios.get("/api/accounts");
    return res.data;
  } catch (err: any) {
    console.error(err);
    toast.error("Failed to load accounts");
    return [];
  }
};

// POST - Create a new account
export const createAccount = async (account: Partial<Account>): Promise<Account | null> => {
  try {
    const res = await axios.post("/api/accounts", account);
    toast.success("Account created successfully");
    return res.data;
  } catch (err: any) {
    console.error(err);
    toast.error("Failed to create account");
    return null;
  }
};

// GET - Fetch one account by ID
export const fetchAccountById = async (id: number): Promise<Account | null> => {
  try {
    const res = await axios.get(`/api/accounts/${id}`);
    return res.data;
  } catch (err: any) {
    console.error(err);
    toast.error("Failed to fetch account details");
    return null;
  }
};

// PUT - Update an account by ID
export const updateAccountById = async (id: number, account: Account): Promise<Account | null> => {
  try {
    const res = await axios.patch(`/api/accounts/${id}`, account);
    toast.success("Account updated successfully");
    return res.data;
  } catch (err: any) {
    console.error(err);
    toast.error("Failed to update account");
    return null;
  }
};


