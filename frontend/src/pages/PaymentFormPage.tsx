import { Box, Button, MenuItem, TextField, Typography, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPayment } from "../api/paymentapi";
import { fetchAccounts } from "../api/accountapi";
import type { Account } from "../types/types";
import { toast } from "react-toastify";
import DuplicatePaymentModal from "../components/DuplicatePaymentModal";

export default function PaymentFormPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [pendingData, setPendingData] = useState<any | null>(null);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await fetchAccounts();
        setAccounts(data);
      } catch (err) {
        toast.error("Failed to load accounts");
      } finally {
        setLoading(false);
      }
    };
    loadAccounts();
  }, []);

  const onSubmit = async (data: any) => {
    if (accounts.length === 0) {
      toast.error("No accounts found. Cannot create payment.");
      return;
    }

    const formattedData = {
      ...data,
      accountId: Number(data.accountId),
      amount: parseFloat(data.amount),
    };

    const res = await createPayment(formattedData);

    if (res && "id" in res) {
      navigate("/payments");
    } else if (res && "allowDuplicate" in res) {
      setPendingData(formattedData);
      setDuplicateModalOpen(true);
    }
  };

  const handleForceSubmit = async () => {
    if (!pendingData) return;
    const res = await createPayment(pendingData, true);
    if (res && "id" in res) {
      setDuplicateModalOpen(false);
      setPendingData(null);
      navigate("/payments");
    } else {
      toast.error("Failed to force create payment");
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>New Payment</Typography>

      {loading ? (
        <Typography>Loading accounts...</Typography>
      ) : accounts.length === 0 ? (
        <Typography color="error">No accounts available. Please create an account first.</Typography>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Account"
            fullWidth
            margin="normal"
            select
            {...register("accountId", { required: true })}
          >
            {accounts.map((acc) => (
              <MenuItem key={acc.id} value={acc.id}>
                (ID: {acc.id}) {acc.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Amount"
            fullWidth
            margin="normal"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
            {...register("amount", { required: true })}
          />
          <TextField label="Recipient Name" fullWidth margin="normal" {...register("recipientName", { required: true })} />
          <TextField label="Bank Name" fullWidth margin="normal" {...register("recipientBank", { required: true })} />
          <TextField label="Recipient Account Number" fullWidth margin="normal" {...register("recipientAccountNumber", { required: true })} />
          <TextField label="Notes (optional)" fullWidth margin="normal" {...register("notes")} />

          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
        </form>
      )}

      <DuplicatePaymentModal
        open={duplicateModalOpen}
        onClose={() => setDuplicateModalOpen(false)}
        onConfirm={handleForceSubmit}
      />
    </Box>
  );
}
