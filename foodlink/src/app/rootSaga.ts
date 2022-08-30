import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import vanSaga from "../features/vans/vanSaga";

export default function* rootSaga() {
  yield all([authSaga(), vanSaga()]);
}
