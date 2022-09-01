import { RootState } from "./../../app/store";
import { User } from "./../../models/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
  message?: string;
}

const initialState = {
  isLoggedIn: false,
  logging: false,
  currentUser: {},
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
      state.message = "";
    },

    loginSucceeded(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },

    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
      state.message = action.payload;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = {};
    },
  },
});

//Actions
export const authActions = authSlice.actions;

//Selector
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;
export const selectMessage = (state: RootState) => state.auth.message;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

//Reducer
const authReducer = authSlice.reducer;
export default authReducer;
