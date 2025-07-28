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
  numeric?: boolean;
  rules?: Parameters<typeof Controller>[0]["rules"];
} & Omit<TextFieldProps, "name" | "label" | "variant">;

export default function ControlledTextField({
  name,
  label,
  required = false,
  adornmentStart,
  rules,
  numeric = false,
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
      rules={{
        ...(required ? { required: `${label} is required` } : {}),
        ...rules,
      }}
      render={({ field }) => (
        <TextField
          {...field}
          {...rest}
          type={numeric ? "number" : "text"}
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
                  inputProps: adornmentStart === "+44" ? { maxLength: 10 } : undefined,
                }
              : undefined,
          }}
        />
      )}
    />
  );
}
