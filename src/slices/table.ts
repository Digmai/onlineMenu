import { ITable } from "../types";
import { AppDispatch, RootState } from "../store";
import { TableService } from "../services/TableService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  table: ITable[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  table: [
    { id: "1", num: 1 },
    { id: "2", num: 2 },
    { id: "3", num: 3 },
  ],
  loading: false,
  error: null,
};

const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    getTablesStart(state) {
      state.loading = true;
    },
    getTablesSuccess(state, action: PayloadAction<ITable[]>) {
      state.loading = false;
      state.error = null;
      state.table = action.payload;
    },
    getTablesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    setTables: (state, action) => {
      state.table = action.payload;
    },
  },
});

export const { getTablesFailure, getTablesStart, getTablesSuccess, setTables } =
  tablesSlice.actions;

export const getTable = (token: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getTablesStart());

    const response = await TableService.getTables(token);
    const tables = response;
    tables && dispatch(getTablesSuccess(tables));
  } catch (error: any) {
    console.log(error);

    throw new Error(error.data);
  }
};

export const selectUser = (state: RootState): TableState | null => {
  return state.tables;
};
export default tablesSlice.reducer;
