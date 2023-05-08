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
    {
      _id: "1",
      image: "f.jfif",
      ingredients: [
        { name: "Lobster", weight: 120 },
        { name: "White Wine", weight: 130 },
        { name: "Risotto Rice", weight: 180 },
        { name: "Onion", weight: 110 },
        { name: "Butter", weight: 160 },
        { name: "White Wine", weight: 220 },
      ],
      name: 'Пица "Домашняя"',
      price: 1220,
      CookingTime: 30,
    },
    {
      _id: "1",
      image: "f.jfif",
      ingredients: [
        { name: "Lobster", weight: 120 },
        { name: "White Wine", weight: 130 },
        { name: "Risotto Rice", weight: 180 },
        { name: "Onion", weight: 110 },
        { name: "Butter", weight: 160 },
        { name: "White Wine", weight: 220 },
      ],
      name: 'Пица "Домашняя"',
      price: 1220,
      CookingTime: 15,
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
