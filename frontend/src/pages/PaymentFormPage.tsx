import {
  Box,
  Button,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import { useForm, FormProvider,Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPayment } from "../api/paymentapi";
import { fetchAccounts } from "../api/accountapi";
import type {
  Account,
  PaymentFormData,
  FormattedPaymentData,
} from "../types/types";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";
import ControlledTextField from "../components/ControlledTextField";

export default function PaymentFormPage() {
  const methods = useForm<PaymentFormData>({
    defaultValues: {
    accountId: "", 
    amount: "",
    recipientName: "",
    recipientBank: "",
    recipientAccountNumber: "",
    notes: "",
  },
  });
  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [pendingData, setPendingData] =
    useState<FormattedPaymentData | null>(null);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await fetchAccounts();
        setAccounts(data);
      } catch (err: unknown) {
        toast.error("Failed to load accounts");
      } finally {
        setLoading(false);
      }
    };
    loadAccounts();
  }, []);

  const onSubmit = async (data: PaymentFormData) => {
    if (accounts.length === 0) {
      toast.error("No accounts found. Cannot create payment.");
      return;
    }

    const formattedData: FormattedPaymentData = {
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
      <Typography variant="h5" mb={2}>
        New Payment
      </Typography>

      {loading ? (
        <Typography>Loading accounts...</Typography>
      ) : accounts.length === 0 ? (
        <Typography color="error">
          No accounts available. Please create an account first.
        </Typography>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="accountId"
              control={methods.control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  select
                  fullWidth
                  margin="normal"
                  label="Account"
                  value={field.value ?? ""} 
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  error={!!methods.formState.errors.accountId}
                  helperText={methods.formState.errors.accountId?.message || " "}
                >
                  <MenuItem value="" >
                    Select an account
                  </MenuItem>
                  {accounts.map((acc) => (
                    <MenuItem key={acc.id} value={String(acc.id)}>
                      {acc.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <ControlledTextField
              name="amount"
              label="Amount"
              required
              type="number"
              adornmentStart="£"
            />
            <ControlledTextField
              name="recipientName"
              label="Recipient Name"
              required
            />
            <ControlledTextField
              name="recipientBank"
              label="Bank Name"
              required
            />
            <ControlledTextField
              name="recipientAccountNumber"
              label="Recipient Account Number"
              required
            />
            <ControlledTextField
              name="notes"
              label="Notes (optional)"
              multiline
              minRows={2}
            />

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </FormProvider>
      )}

      <ConfirmModal
        title="Duplicate Payment Warning"
        contentText="A similar payment was made recently. Do you still want to proceed?"
        confirmButtonText="Proceed Anyway"
        open={duplicateModalOpen}
        onClose={() => setDuplicateModalOpen(false)}
        onConfirm={handleForceSubmit}
      />
    </Box>
  );
}
