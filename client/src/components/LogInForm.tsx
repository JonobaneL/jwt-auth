import { LogInFormParams } from "@/models/formParams";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { emailValidation, passwordValidation } from "@/lib/formvalidation";
import Field from "./ui/Field";
import { useTypedDispatch } from "@/hooks/useReduxTypedHooks";
import { logInThunk } from "./store/userSlice";

const LogInForm = () => {
  const { register, handleSubmit, formState } = useForm<LogInFormParams>({
    mode: "onBlur",
  });
  const dispatch = useTypedDispatch();
  const onSubmit = (formData: LogInFormParams) => {
    console.log(formData);
    dispatch(logInThunk(formData));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field
        placeholder="Email address"
        className="w-full "
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
      <Button className="w-1/3 block mx-auto mt-6">Log In</Button>
    </form>
  );
};

export default LogInForm;
