import api from "@/http";
import { AuthResponse } from "@/models/authResponse";
import axios, { AxiosResponse } from "axios";

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
  static async refreshToken(): Promise<AxiosResponse<AuthResponse>> {
    return axios.get(`${import.meta.env.VITE_API_URL}/refresh`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }
}
