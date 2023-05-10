import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

interface ISortDataState {
  loading: boolean;
  error: string | null;
  category: string | null;
  subcategory: string | null;
}

const initialState: ISortDataState = {
  error: null,
  loading: false,
  category: null,
  subcategory: null,
};

const sortDataSlice = createSlice({
  name: "sortData",
  initialState,
  reducers: {
    sortDataStart(state) {
      state.error = null;
      state.loading = true;
    },
    setSortDataCategorySuccess(state, action: PayloadAction<string>) {
      state.error = null;
      state.loading = false;
      state.category = action.payload;
    },
    setSortDataSubcategorySuccess(state, action: PayloadAction<string>) {
      state.error = null;
      state.loading = false;
      state.subcategory = action.payload;
    },
    sortDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  sortDataStart,
  sortDataFailure,
  setSortDataCategorySuccess,
  setSortDataSubcategorySuccess,
} = sortDataSlice.actions;

export const setCategory = (data: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(sortDataStart());
    try {
      dispatch(setSortDataCategorySuccess(data));
    } catch (error: any) {
      dispatch(sortDataFailure(error.message));
    }
  };
};

export const setSubcategory = (data: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(sortDataStart());
    try {
      dispatch(setSortDataSubcategorySuccess(data));
    } catch (error: any) {
      dispatch(sortDataFailure(error.message));
    }
  };
};

export const selectCategory = (state: RootState) => state.sortData.category;
export const selectSubcategory = (state: RootState) =>
  state.sortData.subcategory;
export const selectSortDataError = (state: RootState) => state.sortData.error;
export const selectSortDataLoading = (state: RootState) =>
  state.sortData.loading;

export default sortDataSlice.reducer;
