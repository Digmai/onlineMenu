import { ITable } from "../types";
import ApiService from "./ApiService";

export const TableService = {
  createTable: async (tableNumber: number) => {
    try {
      const response = await ApiService.post(`/table`, {
        tableNumber,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getTables: async () => {
    try {
      const response = await ApiService.get(`/table`);
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  updateTableStatus: async (
    id: string,
    status: string
  ): Promise<ITable[] | undefined> => {
    try {
      const response = await ApiService.patch(`/table/${id}/update-status`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  deleteTable: async (tableNumber: number): Promise<ITable[] | undefined> => {
    try {
      const response = await ApiService.get(`/table/${tableNumber}/delete`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
