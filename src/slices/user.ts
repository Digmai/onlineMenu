import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthService } from "../services/AuthService";
import { AppDispatch, RootState } from "../store";
import { IUser, Role } from "../types";

interface UsersState {
  user: IUser | null;
  isLoading: boolean;
  error: boolean;
  token: string | null;
}

const initialState: UsersState = {
  user: null,
  isLoading: false,
  error: false,
  token: localStorage.getItem("token") || null,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //
    //
    setFakeRoel: (state, { payload }: PayloadAction<Role>) => {
      state.user = {
        _id: "1",
        name: "#1677ff",
        password: "#4caf50",
        role: payload,
        username: "#fff",
      };
    },
    //
    //
    getUsersStart(state) {
      state.isLoading = true;
    },
    getUsersSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false;
      state.error = false;
      state.user = action.payload;
    },
    getUsersFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = true;
    },
    setUser: (state, action) => {
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
    setError: (state: UsersState, { payload }: PayloadAction<string>) => {
      state.error = true;
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
  setError,
  setFakeRoel,
} = usersSlice.actions;

//
// this async fethe :
//
export const login =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await AuthService.login(username, password);

      localStorage.setItem("token", response.data.accessToken);

      dispatch(setToken(response.data.accessToken));
      dispatch(setUser(response.data.user));
    } catch (error) {
      dispatch(setError(error as string));
      console.log("error ====>", error);

      // return Promise.reject(error.response.data);
    }
  };

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await AuthService.logout();
    // dispatch(logoutReducers());
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
    // dispatch(logout());
  }
};

//
// this selectors :
//
export const selectUser = (state: RootState) => {
  return state.user;
};
export const selectToken = (state: RootState) => {
  return state.user.token;
};
export default usersSlice.reducer;
