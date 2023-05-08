import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiService } from "../services/ApiService";
import { AppDispatch, RootState } from "../store";
import { Drink } from "../types";

interface DrinksState {
  drinks: Drink[];
  loading: boolean;
  error: string | null;
}
//https://source.unsplash.com/500x550/?tree,nature
const initialState: DrinksState = {
  drinks: [
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
  loading: false,
  error: null,
};

const drinksSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {
    getDrinksStart(state) {
      state.loading = true;
    },
    getDrinksSuccess(state, action: PayloadAction<Drink[]>) {
      state.loading = false;
      state.error = null;
      state.drinks = action.payload;
    },
    getDrinksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateDrinkStart(state) {
      state.loading = true;
    },
    updateDrinkSuccess(state, action: PayloadAction<Drink>) {
      state.loading = false;
      state.error = null;
      state.drinks = state.drinks.map((drink) =>
        drink._id === action.payload._id ? action.payload : drink
      );
    },
    updateDrinkFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addDrinkStart(state) {
      state.loading = true;
    },
    addDrinkSuccess(state, action: PayloadAction<Drink>) {
      state.loading = false;
      state.error = null;
      state.drinks.push(action.payload);
    },
    addDrinkFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteDrinkStart(state) {
      state.loading = true;
    },
    deleteDrinkSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.drinks = state.drinks.filter(
        (drink) => drink._id !== action.payload
      );
    },
    deleteDrinkFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getDrinksStart,
  getDrinksSuccess,
  getDrinksFailure,
  updateDrinkStart,
  updateDrinkSuccess,
  updateDrinkFailure,
  addDrinkStart,
  addDrinkSuccess,
  addDrinkFailure,
  deleteDrinkStart,
  deleteDrinkSuccess,
  deleteDrinkFailure,
} = drinksSlice.actions;

export const fetchDrinks = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(getDrinksStart());
    try {
      const drinks = await ApiService.get<Drink[]>("drinks");
      dispatch(getDrinksSuccess(drinks.data));
    } catch (error: any) {
      dispatch(getDrinksFailure(error.message));
    }
  };
};

export const selectDrinksLoading = (state: RootState) => state.drinks.loading;
export const selectDrinksError = (state: RootState) => state.drinks.error;
export const selectAllDrinks = (state: RootState) => state.drinks.drinks;

export default drinksSlice.reducer;
