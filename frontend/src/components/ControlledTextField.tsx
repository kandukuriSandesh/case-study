// components/ControlledTextField.tsx

import {
  TextField,
  InputAdornment,
} from "@mui/material";
import type { TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type ControlledTextFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  adornmentStart?: string;
  rules?: Parameters<typeof Controller>[0]["rules"];
} & Omit<TextFieldProps, "name" | "label" | "variant">;

export default function ControlledTextField({
  name,
  label,
  required = false,
  adornmentStart,
  ...rest
}: ControlledTextFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: `${label} is required` } : undefined}
      render={({ field }) => (
        <TextField
          {...field}
          {...rest}
          label={label}
          fullWidth
          margin="normal"
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
          slotProps={{
            inputLabel: { shrink: true },
            input: adornmentStart
              ? {
                  startAdornment: (
                    <InputAdornment position="start">
                      {adornmentStart}
                    </InputAdornment>
                  ),
                }
              : undefined,
          }}
        />
      )}
    />
  );
}
