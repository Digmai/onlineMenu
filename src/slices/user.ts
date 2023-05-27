import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthService } from "../services/AuthService";
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
  name: "user",
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
      console.log(action.payload);
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logoutReducers: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      console.log("logout");
    },
  },
});

export const {
  logoutReducers,
  setUser,
  setToken,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
} = usersSlice.actions;

export const login =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await AuthService.login(username, password);

      localStorage.setItem("token", response.data.accessToken);

      dispatch(setToken(response.data.accessToken));
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log(error);

      // return Promise.reject(error.response.data);
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    const response = await AuthService.logout();
    dispatch(logoutReducers());
  } catch (error) {
    console.log(error);

    // throw Promise.reject(error?.response.data);
  }
};

export const verifyToken = () => async (dispatch: AppDispatch) => {
  try {
    const response = await AuthService.verifyToken();
    console.log("response", response);

    const { user } = response.data;

    dispatch(setUser(user));
  } catch (error) {
    console.log(error);
    dispatch(logout());
  }
};
export const selectUser = (state: RootState) => {
  return state.user;
};
export const selectToken = (state: RootState) => {
  return state.user.token;
};
export default usersSlice.reducer;
