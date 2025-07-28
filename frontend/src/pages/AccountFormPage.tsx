import { Box, Button, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type { Account } from "../types/types";
import {
  createAccount,
  fetchAccountById,
  updateAccountById,
} from "../api/accountapi";
import { useEffect } from "react";
import ControlledTextField from "../components/ControlledTextField";

export default function AccountFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const methods = useForm<Account>({
    defaultValues: {
    name: "",
    address: "",
    phoneNumber: "",
    bankAccountNumber: "",
  },});
  const {
    handleSubmit,
    reset,
  } = methods;

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

  const onSubmit = async (data: Account) => {
    try {
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
      <Typography variant="h5" mb={2}>
        {isEdit ? "Edit" : "New"} Account
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextField name="name" label="Name" required />
          <ControlledTextField name="address" label="Address" required />
          <ControlledTextField
            name="phoneNumber"
            label="Phone"
            required
            adornmentStart="+44"
            numeric={true}
            rules={{
              pattern: {
                value: /^7\d{9}$/,
                message: "Enter a valid UK mobile number (e.g. 7123456789)",
              },
            }}
          />
          <ControlledTextField
            name="bankAccountNumber"
            label="Bank Account Number (optional)"
            numeric={true}
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
}
