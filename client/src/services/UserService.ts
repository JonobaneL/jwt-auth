import api from "@/http";
import { User } from "@/models/authResponse";
import { AxiosResponse } from "axios";

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<User[]>> {
    return api.get<User[]>("/users");
  }
}
