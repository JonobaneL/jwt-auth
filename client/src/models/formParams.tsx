export type LogInFormParams = {
  email: string;
  password: string;
};
export type SignUpFormParams = LogInFormParams & {
  confirmPassword: string;
};
