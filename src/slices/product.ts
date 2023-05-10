import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProducts } from "../types";
import { AppDispatch, RootState } from "../store";
import { ApiService } from "../services/ApiService";
import { sortDataSlaceProduct } from "../utils/sortDataSlaceProduct";

interface IProductState {
  loading: boolean;
  product: IProducts | null;
  error: string | null;
}

const Product: IProduct[] = [
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
  {
    _id: "3",
    price: 1220,
    CookingTime: 30,
    category: "Мангал",
    image: "f.jfif",
    name: "Антрикот",
    DishOrDrink: "Dish",
    subcategory: "Свинина",
    ingredients: [
      { name: "Lobster", weight: 120 },
      { name: "White Wine", weight: 130 },
      { name: "Risotto Rice", weight: 180 },
      { name: "Onion", weight: 110 },
      { name: "Butter", weight: 160 },
    ],
  },
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
  {
    _id: "3",
    price: 1220,
    CookingTime: 30,
    category: "Мангал",
    image: "f.jfif",
    name: "Ребрышки",
    DishOrDrink: "Dish",
    subcategory: "Свинина",
    ingredients: [
      { name: "Lobster", weight: 120 },
      { name: "White Wine", weight: 130 },
      { name: "Risotto Rice", weight: 180 },
      { name: "Onion", weight: 110 },
      { name: "Butter", weight: 160 },
    ],
  },
];

const initialState: IProductState = {
  loading: false,
  error: null,
  product: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getDishesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDishesSuccess(state, action: PayloadAction<IProducts>) {
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

export const fetchProduct = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(getDishesStart());
    try {
      // const dishes = await ApiService.get<IProduct[]>("dishes");
      const data = sortDataSlaceProduct([...Product]);
      dispatch(getDishesSuccess(data));
    } catch (error: any) {
      dispatch(getDishesFailure(error.message));
    }
  };
};

export const selectDishesLoading = (state: RootState) => state.product.loading;
export const selectDishesError = (state: RootState) => state.product.error;
export const selectAllProduct = (state: RootState) => state.product.product;

export default productSlice.reducer;
