import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserService from "../services/UserService";
import { AppDispatch, RootState } from "../store";
import { IUser } from "./../types";

/**
 * Interface for slice state
 */
interface UsersState {
  currentUser: IUser[] | null;
  error: string | null;
}

/**
 * Initial state for slice
 */
const initialState: UsersState = {
  currentUser: null,
  error: null,
};

/**
 * User slice of the store
 */
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    /**
     * Set the currently logged in user
     * @param {UsersState} state - Current state
     * @param {PayloadAction<User | null>} payload - Payload containing user data
     */
    setCurrentUser: (
      state: UsersState,
      { payload }: PayloadAction<IUser | null>
    ) => {
      if (payload) state.currentUser?.push(payload);
      state.error = null;
    },
    /**
     * Set an error message for the user slice
     * @param {UsersState} state - Current state
     * @param {PayloadAction<string>} payload - Payload containing error message
     */
    setError: (state: UsersState, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
});

/**
 * Export actions from slice
 */
export const { setCurrentUser, setError } = usersSlice.actions;

/**
 * Selectors for user slice of the store
 */
export const selectCurrentUser = (state: RootState): IUser[] | null =>
  state.users.currentUser;
export const selectError = (state: RootState): string | null =>
  state.users.error;

/**
 * Async thunk to get the currently logged in user
 * @returns {Promise<void>} Nothing
 */
export const getCurrentUser = () => async (dispatch: AppDispatch) => {
  try {
    const response = await UserService.getCurrentUser();
    if (response.success) {
      dispatch(setCurrentUser(response.data));
    } else {
      dispatch(setError(response.message));
    }
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export default usersSlice.reducer;
