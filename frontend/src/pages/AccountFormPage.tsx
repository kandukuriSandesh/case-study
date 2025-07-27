import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type { Account } from "../types/types";
import { createAccount, fetchAccountById, updateAccountById } from "../api/accountapi";
import { useEffect } from "react";

export default function AccountFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Account>();

  useEffect(() => {
  if (isEdit) {
    fetchAccountById(Number(id)).then((data) => {
      if (data) {
        const strippedPhone = data.phoneNumber.startsWith("+44")
          ? data.phoneNumber.slice(3)
          : data.phoneNumber;

        reset({ ...data, phoneNumber: strippedPhone });
      }
    });
  }
}, [id, reset]);


  // If id exists, fetch account data and reset form with it
  // If not, form will be empty for creating a new account

  const onSubmit = async (data: Account) => {
    try {
      // Prepend +44 to the phone number
      const phoneNumberWithPrefix = `+44${data.phoneNumber}`;

      const updatedData: Account = {
        ...data,
        phoneNumber: phoneNumberWithPrefix,
      };

      if (id) {
        const updated = await updateAccountById(Number(id), updatedData);
        if (updated) {
          navigate("/accounts");
        }
      } else {
        const { id: _omitId, ...accountData } = updatedData;
        const newAccount = await createAccount(accountData);
        if (newAccount) {
          navigate("/accounts");
        }
      }
    } catch (error) {
      console.error("Account submit failed:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>{isEdit ? "Edit" : "New"} Account</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Name" InputLabelProps={{ shrink: true }} fullWidth margin="normal" {...register("name")} required />
        <TextField label="Address" InputLabelProps={{ shrink: true }} fullWidth margin="normal" {...register("address")} required />
        <TextField
          label="Phone"
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: <InputAdornment position="start">+44</InputAdornment>,
          }}
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^7\d{9}$/,
              message: "Enter a valid UK mobile number (e.g. 7123456789)",
            },
          })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        <TextField InputLabelProps={{ shrink: true }} label="Bank Account (optional)" fullWidth margin="normal" {...register("bankAccountNumber")} />
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </Box>
  );
}