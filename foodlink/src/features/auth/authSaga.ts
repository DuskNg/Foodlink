import { User } from "./../../models/user";
import { PayloadAction } from "@reduxjs/toolkit";
import { take, fork, call, put } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";
import authApi from "../../api/authApi";

function* loginHandler(payload: LoginPayload) {
  try {
    const userData: User = yield call(authApi.postLogin, payload);

    localStorage.setItem("accessToken", userData.token || "{}");
    localStorage.setItem("user", JSON.stringify(userData));
    yield put(authActions.loginSucceeded(userData));
  } catch (error) {
    yield put(authActions.loginFailed("SomeThing wrong! Please try again"));
  }
}

function* logoutHandler() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
}

function* watchLoginFlow() {
  // thêm vòng lặp while để lắng nghe vô hạn
  while (true) {
    // waiting for a login dispatch from user
    const action: PayloadAction<LoginPayload> = yield take(
      authActions.login.type
    );
    yield fork(loginHandler, action.payload);
  }
}

function* watchLogoutFlow() {
  while (true) {
    yield take(authActions.logout.type);
    yield fork(logoutHandler);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
  yield fork(watchLogoutFlow);
}
