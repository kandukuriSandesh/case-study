import axios, {isAxiosError} from './axiosInstance';
import { toast } from "react-toastify";
import type { Account } from "../types/types";

export const fetchAccounts = async (): Promise<Account[]> => {
  try {
    const res = await axios.get("/api/accounts");
     return Array.isArray(res.data) ? res.data : [];;
  } catch (err: unknown) {
    console.error(err);
    toast.error("Failed to load accounts");
    return [];
  }
};


export const createAccount = async (account: Partial<Account>): Promise<Account | null> => {
  try {
    const res = await axios.post("/api/accounts", account);
    toast.success("Account created successfully");
    return res.data;
  } catch (err: unknown) {
    console.error(err);

    if (isAxiosError(err)) {
      if (err.response?.status === 409) {
        toast.error("Account already exists with these details");
        return null;
      }
      toast.error(err.response?.data?.message || "Failed to create account");
    } else {
      toast.error("An unexpected error occurred");
    }

    return null;
  }
};

export const fetchAccountById = async (id: number): Promise<Account | null> => {
  try {
    const res = await axios.get(`/api/accounts/${id}`);
    return res.data;
  } catch (err: unknown) {
    console.error(err);
    toast.error("Failed to fetch account details");
    return null;
  }
};

export const updateAccountById = async (id: number, account: Account): Promise<Account | null> => {
  try {
    const res = await axios.patch(`/api/accounts/${id}`, account);
    toast.success("Account updated successfully");
    return res.data;
  } catch (err: unknown) {
    console.error(err);
    toast.error("Failed to update account");
    return null;
  }
};


