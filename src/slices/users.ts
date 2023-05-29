import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserService from "../services/UsersService";
import { AppDispatch, RootState } from "../store";
import { FormUserValues, IUser } from "../types";
import { getTables } from "./table";

/**
 * Interface for slice state
 */
interface UsersState {
  currentUser: IUser[] | null;
  error: string | null;
}

const initialState: UsersState = {
  currentUser: null,
  error: null,
};

export const usersListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    setCurrentUser: (
      state: UsersState,
      { payload }: PayloadAction<IUser[]>
    ) => {
      state.currentUser = [...payload];
      state.error = null;
    },
    setError: (state: UsersState, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
});

export const { setCurrentUser, setError } = usersListSlice.actions;

export const getCurrentUser = () => async (dispatch: AppDispatch) => {
  try {
    const response = await UserService.getCurrentUsers();
    response && dispatch(setCurrentUser(response));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const addUser = (values: IUser) => async (dispatch: AppDispatch) => {
  try {
    const response = await UserService.registrationUser(values);
    console.log(response);

    dispatch(getCurrentUser());
    // dispatch(getTables());
  } catch (error) {
    console.log(error);
  }
};

export const updateUser =
  (paramsUpdateUser: { id: string; user: FormUserValues }) =>
  async (dispatch: AppDispatch) => {
    try {
      console.log({ paramsUpdateUser });
      const response = await UserService.getCurrentUsers();
      response && dispatch(setCurrentUser(response));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

export const deleteUser = (_id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await UserService.deleteUser(_id);
    dispatch(getCurrentUser());
    console.log(response);
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const selectCurrentUser = (state: RootState): IUser[] | null =>
  state.usersList.currentUser;
export const selectError = (state: RootState): string | null =>
  state.usersList.error;

export default usersListSlice.reducer;
