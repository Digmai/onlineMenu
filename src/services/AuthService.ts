import { AxiosResponse } from "axios";
import { AuthResponse, IUser, VerifyTokenResponse } from "../types";
import ApiService from "./ApiService";

export const AuthService = {
  // Функция для проверки токена и получения информации о пользователе
  async verifyToken(): Promise<AxiosResponse<VerifyTokenResponse>> {
    const response = await ApiService.get(`/auth/verify-token`);

    return response;
  },
  login: async (
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> => {
    const response = await ApiService.post<AuthResponse>(`/auth/login`, {
      username,
      password,
    });
    if (!response.data) {
      throw new Error("is Error!");
    }

    return response;
  },
  // register: async (user: IUser, password: string): Promise<void> => {
  //   await axios.post("/api/auth/register", { user, password });
  // },
  getUserInfo: async (): Promise<IUser> => {
    const response = await ApiService.get("/api/auth/user");
    return response.data.user;
  },
  logout: async (): Promise<void> => {
    await ApiService.post("/auth/logout");
  },
};
