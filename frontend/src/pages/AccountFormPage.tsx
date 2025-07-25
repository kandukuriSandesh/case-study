import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function AccountFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (isEdit) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data) => reset(data));
    }
  }, [id]);

  const onSubmit = (data: any) => {
    console.log(data);
    navigate("/accounts");
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>{isEdit ? "Edit" : "New"} Account</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Name" fullWidth margin="normal" {...register("name")} required />
        <TextField label="Address" fullWidth margin="normal" {...register("address")} required />
        <TextField label="Phone" fullWidth margin="normal" {...register("phone")} required />
        <TextField label="Bank Account (optional)" fullWidth margin="normal" {...register("bankAccount")} />
        <Button type="submit" variant="contained">Submit</Button>
      </form>
    </Box>
  );
}