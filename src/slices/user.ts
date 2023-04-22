import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { AuthService } from "../services/AuthService";
import UserService from "../services/UserService";
import { AppDispatch, RootState } from "../store";
import { IUser } from "../types";

interface UsersState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UsersState = {
  user: null,
  isLoading: false,
  error: null,
  token: localStorage.getItem("token") || null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersStart(state) {
      state.isLoading = true;
    },
    getUsersSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    },
    getUsersFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const {
  logout,
  setUser,
  setToken,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
} = usersSlice.actions;

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await AuthService.login(email, password);
      const token = response;

      localStorage.setItem("token", token);

      dispatch(setToken(token));
      dispatch(setUser(jwtDecode<IUser>(token)));
    } catch (error) {
      console.log(error);

      // return Promise.reject(error.response.data);
    }
  };

export const addUser = (user: IUser) => async (dispatch: AppDispatch) => {
  try {
    const response = await UserService.registerUser(user);
    const token = response;
  } catch (error) {
    console.log(error);

    // throw Promise.reject(error?.response.data);
  }
};

export const verifyToken = (token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await AuthService.verifyToken(token);
    const { user } = response.data;

    dispatch(setUser(user));
    dispatch(setToken(token));
  } catch (error) {
    console.log(error);
    dispatch(logout());
  }
};
export const selectUser = (state: RootState): UsersState | null => {
  return state.user;
};
export default usersSlice.reducer;
