import axios from "axios";
import { ITable } from "../types";

const BASE_URL = "http://localhost:5000/api";

export const TableService = {
  createTable: async (
    token: string,
    tableNumber: number
  ): Promise<ITable | undefined> => {
    try {
      const response = await axios.post(`${BASE_URL}/table`, {
        headers: { Authorization: `Bearer ${token}` },
        tableNumber,
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  },

  getTables: async (token: string): Promise<ITable[] | undefined | []> => {
    try {
      const response = await axios.get(`${BASE_URL}/table`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data.tables;
    } catch (error) {
      console.log(error);
    }
  },

  updateTableStatus: async (
    id: string,
    token: string,
    status: string
  ): Promise<ITable[] | undefined> => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/table/${id}/update-status`,
        {
          status,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data.tables;
    } catch (error) {
      console.log(error);
    }
  },

  deleteTable: async (
    token: string,
    tableNumber: number
  ): Promise<ITable[] | undefined> => {
    try {
      const response = await axios.get<{ data: { tables: ITable[] } }>(
        `${BASE_URL}/table/${tableNumber}/delete`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data.tables;
    } catch (error) {
      console.log(error);
    }
  },
};
