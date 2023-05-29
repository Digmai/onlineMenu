import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import usersReducer from "./slices/users";
import productSlice from "./slices/product";
import ordersReducer from "./slices/orders";
import sortDataSlice from "./slices/sortData";
import tablesSlice from "./slices/table";

const store = configureStore({
  reducer: {
    user: userReducer,
    tables: tablesSlice,
    orders: ordersReducer,
    product: productSlice,
    sortData: sortDataSlice,
    usersList: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
