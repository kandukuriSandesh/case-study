import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function PaymentFormPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate("/payments");
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>New Payment</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Account ID" fullWidth margin="normal" {...register("accountId")} required select>
          <MenuItem value={1}>Account 1</MenuItem>
          <MenuItem value={2}>Account 2</MenuItem>
        </TextField>
        <TextField label="Amount" fullWidth margin="normal" {...register("amount")} required />
        <TextField label="Recipient Name" fullWidth margin="normal" {...register("recipientName")} required />
        <TextField label="Bank Name" fullWidth margin="normal" {...register("bankName")} required />
        <TextField label="Recipient Account" fullWidth margin="normal" {...register("recipientAccount")} required />
        <TextField label="Notes (optional)" fullWidth margin="normal" {...register("notes")} />
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </Box>
  );
}