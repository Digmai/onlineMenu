import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import ordersReducer from "./slices/orders";
import dishesReducer from "./slices/dishes";
import drinksReducer from "./slices/drinks";
import usersReducer from "./slices/users";

const store = configureStore({
  reducer: {

    user: userReducer,
    users: usersReducer,
    dishes: dishesReducer,
    drinks: drinksReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
