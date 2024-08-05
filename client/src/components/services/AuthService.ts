import api from "@/http";
import { AuthResponse } from "@/models/authResponse";
import { AxiosResponse } from "axios";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post("/login", { email, password });
  }
  static async logout(): Promise<void> {
    return api.post("/logout");
  }
  static async signup(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post("/registration", { email, password });
  }
}
