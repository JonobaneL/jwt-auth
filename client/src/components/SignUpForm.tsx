import { SignUpFormParams } from "@/models/formParams";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import Field from "./ui/Field";
import {
  confirmPasswordValidation,
  emailValidation,
  passwordValidation,
} from "@/lib/formvalidation";
import { useTypedDispatch } from "@/hooks/useReduxTypedHooks";
import { signUpThunk } from "./store/userSlice";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const { register, handleSubmit, formState } = useForm<SignUpFormParams>({
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const onSubmit = (formData: SignUpFormParams) => {
    dispatch(
      signUpThunk({ email: formData.email, password: formData.confirmPassword })
    ).then(() => navigate("/"));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        placeholder="Email address"
        className="w-full"
        error={formState.errors.email?.message}
        {...register("email", emailValidation)}
      />

      <Field
        placeholder="Password"
        type="password"
        className="w-full mt-3"
        error={formState.errors.password?.message}
        {...register("password", passwordValidation)}
      />
      <Field
        placeholder="Confirm Password"
        className="w-full mt-3"
        type="password"
        error={formState.errors.confirmPassword?.message}
        {...register("confirmPassword", confirmPasswordValidation)}
      />
      <Button type="submit" className="block mx-auto w-1/3 mt-6">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
