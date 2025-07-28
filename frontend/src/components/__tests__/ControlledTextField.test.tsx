// src/components/_tests_/ControlledTextField.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ControlledTextField from "../ControlledTextField";
import { useForm, FormProvider } from "react-hook-form";
import userEvent from "@testing-library/user-event";

const Wrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const methods = useForm({ mode: "onSubmit" });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("ControlledTextField", () => {
  it("renders with label and optional adornment", () => {
    render(
      <Wrapper>
        <ControlledTextField
          name="phoneNumber"
          label="Phone"
          adornmentStart="+44"
        />
      </Wrapper>
    );

    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByText("+44")).toBeInTheDocument();
  });

  it("shows error message when required field is left empty", async () => {
    const user = userEvent.setup();

    const TestForm = () => {
      const methods = useForm({ mode: "onSubmit" });
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(() => {})}>
            <ControlledTextField name="name" label="Name" required />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    render(<TestForm />);
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
  });

  it("limits input length to 10 when +44 adornment is present", async () => {
    const user = userEvent.setup();

    const TestForm = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(() => {})}>
            <ControlledTextField
              name="phoneNumber"
              label="Phone"
              adornmentStart="+44"
            />
          </form>
        </FormProvider>
      );
    };

    render(<TestForm />);
    const input = screen.getByLabelText("Phone");
    await user.type(input, "12345678901234");

    expect((input as HTMLInputElement).value).toHaveLength(10);
  });
});