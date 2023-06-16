import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProducts } from "../types";
import { AppDispatch, RootState } from "../store";
import { sortDataSlaceProduct } from "../utils/sortDataSlaceProduct";

interface IProductState {
  loading: boolean;
  product: IProduct[] | null;
  error: string | null;
}

const Product: IProduct[] = Array.from({ length: 30 }, (_, i) => ({
  _id: i.toString(),
  name: `Пица Домашняя${i}`,
  totalWeight: 430,
  price: Math.floor(Math.random() * 100) * 101,
  image: `f.jfif`,
  category: ["Category 1", "Category 2", "Category 3"][
    Math.floor(Math.random() * 3)
  ],
  subcategory: ["Subcategory A", "Subcategory B", "Subcategory B"][
    Math.floor(Math.random() * 3)
  ],
  CookingTime: Math.floor(Math.random() * 60),
  DishOrDrink: Math.random() < 0.5 ? "Dish" : "Drink",
  ingredients: [
    { name: "Ingredient A", weight: Math.floor(Math.random() * 100) },
    { name: "Ingredient B", weight: Math.floor(Math.random() * 100) },
    { name: "Ingredient C", weight: Math.floor(Math.random() * 100) },
  ],
}));

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

export const fetchProduct = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(getDishesStart());
    try {
      // hare a fetching porduct list
      const data = sortDataSlaceProduct([...Product]);
      dispatch(getDishesSuccess(Product));
    } catch (error: any) {
      dispatch(getDishesFailure(error.message));
    }
  };
};

export const selectDishesLoading = (state: RootState) => state.product.loading;
export const selectDishesError = (state: RootState) => state.product.error;
export const selectAllProduct = (state: RootState) =>
  state.product.product && sortDataSlaceProduct([...state.product.product]);
export const selectGetProductById = (id?: string) => (state: RootState) => {
  if (state.product.product && id) {
    return state.product.product.filter((p: IProduct) => p._id === id)[0];
  }
};

export default productSlice.reducer;
