import { AxiosResponse } from "axios";
import { AuthResponse, IUser } from "../types";
import ApiService from "./ApiService";

export default class UserService {
  static async getCurrentUsers(): Promise<IUser[] | null> {
    try {
      const response = await ApiService.get("/users");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  static async registrationUser(
    values: IUser
  ): Promise<AxiosResponse<AuthResponse, any> | undefined> {
    try {
      return ApiService.post<AuthResponse>("/users/registration", {
        ...values,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async deleteUser(_id: string): Promise<IUser | null | undefined> {
    try {
      const response = await ApiService.delete(`/users/${_id}`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
