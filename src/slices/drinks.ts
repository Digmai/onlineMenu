import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiService } from "../services/ApiService";
import { AppDispatch, RootState } from "../store";
import { Drink } from "../types";

interface DrinksState {
  drinks: Drink[];
  isLoading: boolean;
  isError: string | null;
}

const initialState: DrinksState = {
  drinks: [
    {
      _id: "1",
      image: "https://source.unsplash.com/500x550/?tree,cook",
      ingredients: [
        "Lobster",
        "Risotto Rice",
        "Onion",
        "Garlic",
        "Butter",
        "White Wine",
      ],
      name: "risotto string",
      price: 1220,
      CookingTime: 15,
    },
    {
      _id: "21",
      image: "https://source.unsplash.com/500x550/?tree,nature",
      ingredients: [
        "Lobster",
        "Risotto Rice",
        "Onion",
        "Garlic",
        "Butter",
        "White Wine",
      ],
      name: "Risotto",
      price: 1220,
      CookingTime: 30,
    },
  ],
  isLoading: false,
  isError: null,
};

const drinksSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {
    getDrinksStart(state) {
      state.isLoading = true;
    },
    getDrinksSuccess(state, action: PayloadAction<Drink[]>) {
      state.isLoading = false;
      state.isError = null;
      state.drinks = action.payload;
    },
    getDrinksFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = action.payload;
    },
    updateDrinkStart(state) {
      state.isLoading = true;
    },
    updateDrinkSuccess(state, action: PayloadAction<Drink>) {
      state.isLoading = false;
      state.isError = null;
      state.drinks = state.drinks.map((drink) =>
        drink._id === action.payload._id ? action.payload : drink
      );
    },
    updateDrinkFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = action.payload;
    },
    addDrinkStart(state) {
      state.isLoading = true;
    },
    addDrinkSuccess(state, action: PayloadAction<Drink>) {
      state.isLoading = false;
      state.isError = null;
      state.drinks.push(action.payload);
    },
    addDrinkFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = action.payload;
    },
    deleteDrinkStart(state) {
      state.isLoading = true;
    },
    deleteDrinkSuccess(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = null;
      state.drinks = state.drinks.filter(
        (drink) => drink._id !== action.payload
      );
    },
    deleteDrinkFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.isError = action.payload;
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

export const selectDrinksLoading = (state: RootState) => state.drinks.isLoading;
export const selectDrinksError = (state: RootState) => state.drinks.isError;
export const selectAllDrinks = (state: RootState) => state.drinks.drinks;

export default drinksSlice.reducer;
