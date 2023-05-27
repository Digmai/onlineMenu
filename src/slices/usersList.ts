import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserService from "../services/UserService";
import { AppDispatch, RootState } from "../store";
import { IUser } from "../types";

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

export const selectCurrentUser = (state: RootState): IUser[] | null =>
  state.usersList.currentUser;
export const selectError = (state: RootState): string | null =>
  state.usersList.error;

export const getCurrentUser = () => async (dispatch: AppDispatch) => {
  try {
    const response = await UserService.getCurrentUser();
    dispatch(setCurrentUser(response));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};
export const addUser = (values: IUser) => async (dispatch: AppDispatch) => {
  try {
    await UserService.registration(values);
  } catch (error) {
    console.log(error);
  }
};

export default usersListSlice.reducer;
