import { SignUpFormParams } from "@/models/formParams";

export const emailreg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const emailValidation = {
  pattern: {
    value: emailreg,
    message: "Invalid Email",
  },
  required: "This field is required",
};
export const passwordValidation = {
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters long",
  },
  required: "This field is required",
};
export const confirmPasswordValidation = {
  ...passwordValidation,
  validate: (value: string, formValues: SignUpFormParams) => {
    if (value !== formValues.password) return "Passwords do not match";
    return true;
  },
};
