import axios from "axios";
import { IUser, VerifyTokenResponse } from "../types";

export const AuthService = {
  // Метод для авторизации пользователей
  //   async login(
  //     username: string,
  //     password: string
  //   ): Promise<AxiosResponse<{ token: string }>> {
  //     const response = await axios.post(`${BASE_URL}auth/login`, {
  //       username,
  //       password,
  //     });
  //     return response.data;
  //   },

  // Функция для проверки токена и получения информации о пользователе
  async verifyToken(token: string): Promise<VerifyTokenResponse> {
    const response = await axios.post("/auth/verify", { token });
    return response.data;
  },
  login: async (email: string, password: string): Promise<string> => {
    const response = await axios.post("/api/auth/login", { email, password });
    return response.data.token;
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
