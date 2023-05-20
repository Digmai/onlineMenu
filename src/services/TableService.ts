import axios from "axios";
import { ITable } from "../types";

export const TableService = {
  getTables: async (token: string): Promise<ITable[] | undefined> => {
    try {
      const response = await axios.get<{}, { data: { tables: ITable[] } }, {}>(
        "/api/tables",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.tables;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
  updateTables: async (
    token: string,
    id: string
  ): Promise<ITable[] | undefined> => {
    try {
      const response = await axios.get<{}, { data: { tables: ITable[] } }, {}>(
        `/api/tables/${id}/update`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.tables;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
  deleteTables: async (
    token: string,
    id: string
  ): Promise<ITable[] | undefined> => {
    try {
      const response = await axios.get<{}, { data: { tables: ITable[] } }, {}>(
        `/api/tables/${id}/delete`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.tables;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  },
};
