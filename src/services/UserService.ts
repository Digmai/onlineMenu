import axios, { AxiosResponse } from "axios";
import { AuthResponse, IUser } from "../types";
import ApiService from "./ApiService";

/**
 * Interface for response data
 */
interface UserData {
  success: boolean;
  data: IUser | null;
  message: string;
}

/**
 * Class for handling user requests
 * @class
 */
export default class UserService {
  /**
   * Method for getting the current user's data
   * @returns {Promise<UserData>} Response data
   */
  static async getCurrentUser() {
    try {
      const response = await ApiService.get("/users");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  /**
   * Method for registering a new user
   * @param {IUser} userData User data to register
   * @returns {Promise<UserData>} Response data
   */
  static async registration(
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
}
