import { ErrorResponse, ITable } from "../types";
import { RootState } from "../store";
import { TableService } from "../services/TableService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  table: ITable[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  table: null,
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

    setTablesState: (state, action: { payload: ITable[] }) => {
      state.table = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTables.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTables.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.table = action.payload;
    });
    builder.addCase(getTables.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.table = null;
    });
  },
});

export const {
  getTablesFailure,
  getTablesStart,
  getTablesSuccess,
  setTablesState,
} = tablesSlice.actions;

export const getTables = createAsyncThunk(
  "table/getTables",
  async (_, { rejectWithValue }) => {
    try {
      const response = await TableService.getTables();
      return response.tables;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

export const createTable = createAsyncThunk(
  "table/createTable",
  async (tableNumber: number, { dispatch, rejectWithValue }) => {
    try {
      const table = await TableService.createTable(tableNumber);
      dispatch(getTables());
      return table;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

export const deleteTable = createAsyncThunk(
  "table/deleteTable",
  async (tableNumber: number, { dispatch, rejectWithValue }) => {
    try {
      const tables = await TableService.deleteTable(tableNumber);
      tables && dispatch(setTablesState(tables));
      return []; // если удаление прошло успешно, мы можем вернуть пустой массив
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const selectTables = (state: RootState): TableState | null => {
  return state.tables;
};
export default tablesSlice.reducer;
