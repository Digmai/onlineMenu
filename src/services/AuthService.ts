import axios from "axios";
import { IUser, TRole, VerifyTokenResponse } from "../types";
const BASE_URL = "http://localhost:5000/api";
interface IRes {
  token: string;
  user: {
    _id: string;
    email: string;
    role: TRole;
  };
}
export const AuthService = {
  // Функция для проверки токена и получения информации о пользователе
  async verifyToken(token: string): Promise<VerifyTokenResponse> {
    const response = await axios.get(`${BASE_URL}/auth/verify-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response as VerifyTokenResponse;
  },
  login: async (email: string, password: string): Promise<IRes> => {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },
  register: async (user: IUser, password: string): Promise<void> => {
    await axios.post("/api/auth/register", { user, password });
  },
  getUserInfo: async (): Promise<IUser> => {
    const response = await axios.get("/api/auth/user");
    return response.data.user;
  },
  logout: async (): Promise<void> => {
    await axios.post("/api/auth/logout");
  },
};
