import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../types";
import { AppDispatch, RootState } from "../store";
import { ApiService } from "../services/ApiService";

interface IProductState {
  loading: boolean;
  product: IProduct[];
  error: string | null;
}

const initialState: IProductState = {
  loading: false,
  error: null,
  product: [
    {
      _id: "1",
      price: 1220,
      CookingTime: 30,
      category: "Бар",
      image: "f.jfif",
      name: "White Wine",
      DishOrDrink: "Dish",
      subcategory: "Вино",
      ingredients: [
        { name: "Lobster", weight: 120 },
        { name: "White Wine", weight: 130 },
        { name: "Risotto Rice", weight: 180 },
        { name: "Onion", weight: 110 },
        { name: "Butter", weight: 160 },
      ],
    },
    {
      _id: "2",
      price: 1220,
      CookingTime: 15,
      image: "f.jfif",
      category: "Кухня",
      DishOrDrink: "Dish",
      subcategory: "Пица",
      name: 'Пица "Домашняя"',
      ingredients: [
        { name: "Lobster", weight: 120 },
        { name: "White Wine", weight: 130 },
        { name: "Risotto Rice", weight: 180 },
        { name: "Onion", weight: 110 },
        { name: "Butter", weight: 160 },
        { name: "White Wine", weight: 220 },
      ],
    },
  ],
};

const productSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
    getDishesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDishesSuccess(state, action: PayloadAction<IProduct[]>) {
      state.loading = false;
      state.error = null;
      state.product = action.payload;
    },
    getDishesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getDishesStart, getDishesSuccess, getDishesFailure } =
productSlice.actions;

export const fetchDishes = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(getDishesStart());
    try {
      const dishes = await ApiService.get<IProduct[]>("dishes");
      dispatch(getDishesSuccess(dishes.data));
    } catch (error: any) {
      dispatch(getDishesFailure(error.message));
    }
  };
};

export const selectDishesLoading = (state: RootState) => state.product.loading;
export const selectDishesError = (state: RootState) => state.product.error;
export const selectAllDishes = (state: RootState) => state.product.product;

export default productSlice.reducer;
