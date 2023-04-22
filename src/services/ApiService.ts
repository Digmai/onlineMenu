import axios, { AxiosInstance, AxiosResponse } from "axios";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

const BASE_URL = "http://localhost:5000";

class ApiService {
  private static axiosInstance: AxiosInstance;

  static init() {
    ApiService.axiosInstance = axios.create({
      baseURL: BASE_URL,
    });
  }

  static async get<T>(url: string): Promise<AxiosResponse<T>> {
    const response = await ApiService.axiosInstance.get<T>(url);
    return response;
  }

  static async put<T>(url: string, data: T): Promise<AxiosResponse<T>> {
    const response = await ApiService.axiosInstance.put<T>(url, data);
    return response;
  }

  static async delete(url: string): Promise<AxiosResponse> {
    const response = await ApiService.axiosInstance.delete(url);
    return response;
  }

  static async post<T>(url: string, data: T): Promise<AxiosResponse<T>> {
    const response = await ApiService.axiosInstance.post<T>(url, data);
    return response;
  }

  static async getWebSocketConnection() {
    return io(BASE_URL);
  }
}

export { ApiService };
