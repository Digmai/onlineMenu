import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { Dish } from "../types";
import { ApiService } from "../services/ApiService";

interface DishesState {
  loading: boolean;
  error: string | null;
  dishes: Dish[];
}

const initialState: DishesState = {
  loading: false,
  error: null,
  dishes: [
    { _id: "1", image: "1", ingredients: [",", "1"], name: "one", price: 1220 },
    {
      _id: "21",
      image: "2",
      ingredients: [",", "2"],
      name: "too",
      price: 1220,
    },
  ],
};

const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    getDishesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDishesSuccess(state, action: PayloadAction<Dish[]>) {
      state.loading = false;
      state.error = null;
      state.dishes = action.payload;
    },
    getDishesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getDishesStart, getDishesSuccess, getDishesFailure } =
  dishesSlice.actions;

export const fetchDishes = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(getDishesStart());
    try {
      const dishes = await ApiService.get<Dish[]>("dishes");
      dispatch(getDishesSuccess(dishes.data));
    } catch (error: any) {
      dispatch(getDishesFailure(error.message));
    }
  };
};

export const selectDishesLoading = (state: RootState) => state.dishes.loading;
export const selectDishesError = (state: RootState) => state.dishes.error;
export const selectAllDishes = (state: RootState) => state.dishes.dishes;

export default dishesSlice.reducer;