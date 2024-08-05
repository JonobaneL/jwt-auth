export type User = {
  email: string;
  isActive: boolean;
  id: string;
};
export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
