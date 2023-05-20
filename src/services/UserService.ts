import axios from "axios";
import { IUser } from "../types";

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
  static async getCurrentUser(): Promise<UserData> {
    try {
      const token = localStorage.getItem("authToken"); // получение токена из локального хранилища
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get("/api/users/current", config); // передача заголовка с токеном
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
  static async registerUser(userData: IUser): Promise<UserData> {
    try {
      const response = await axios.post("/api/users/register", userData);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  /**
   * Method for logging in a user
   * @param {IUser} userData User data to log in
   * @returns {Promise<UserData>} Response data
   */
  static async loginUser(userData: IUser): Promise<UserData> {
    try {
      const response = await axios.post("/api/users/login", userData);
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }

  /**
   * Method for logging out the current user
   * @returns {Promise<UserData>} Response data
   */
  static async logoutUser(): Promise<UserData> {
    try {
      const response = await axios.post("/api/users/logout");
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
}
