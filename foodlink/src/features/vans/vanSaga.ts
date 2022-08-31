import { AddPayload } from "../../components/Layout/AddProduct";
import { UpdatePayload } from "./../../components/Layout/VanDetail";
import { DeletePayload } from "../../components/Layout/BodyContent";
import { PayloadAction } from "@reduxjs/toolkit";
import { ListResponse } from "./../../models/common";
import { Vans } from "./../../models/vans";
import { vanActions } from "./vanSlice";
import { fork, take, call, put } from "redux-saga/effects";
import vansApi from "../../api/vansApi";

//worker: get all van
function* getVansHandler() {
  try {
    const listVans: ListResponse<Vans> = yield call(vansApi.getAll);
    yield put(vanActions.getVansSucceeded(listVans.data));
  } catch (error) {
    yield put(
      vanActions.getVansFailed(
        "Something is wrong, can not get data, try again!"
      )
    );
  }
}
//worker: get van by id
function* getVanByIdHandler(payload: string) {
  try {
    const van: Vans = yield call(vansApi.getById, payload);
    yield put(vanActions.getVanByIdSucceeded(van));
  } catch (error) {
    yield put(vanActions.getVanByIdFailed());
  }
}
//worker: delete van
function* deleteVanHandler(payload: DeletePayload) {
  try {
    yield call(vansApi.delete, payload);
    yield put(vanActions.deleteVanSucceeded("Successful Delete!"));
  } catch (error) {
    yield put(vanActions.deleteVanFailed("This item can not be deleted!"));
  }
}
//worker: update van
function* updateVanHandler(payload: UpdatePayload) {
  try {
    yield call(vansApi.update, payload);
    yield put(vanActions.updateVanSucceeded());
  } catch (error) {
    yield put(
      vanActions.updateVanFailed("Something went wrong, please try again!")
    );
  }
}

//worker: add new van
function* addVanHandler(payload: AddPayload) {
  try {
    yield call(vansApi.add, payload);
    yield put(vanActions.addVanSucceeded());
  } catch (error) {
    yield put(vanActions.addVanFailed());
  }
}

// Watcher
//get vans
function* watchVansGet() {
  while (true) {
    yield take(vanActions.getVans.type);
    yield fork(getVansHandler);
  }
}
//get van by id
function* watchVansGetById() {
  while (true) {
    const action: PayloadAction<string> = yield take(
      vanActions.getVanById.type
    );
    yield fork(getVanByIdHandler, action.payload);
  }
}
//delete van
function* watchVanDelete() {
  while (true) {
    const action: PayloadAction<DeletePayload> = yield take(
      vanActions.deleteVan.type
    );
    yield fork(deleteVanHandler, action.payload);
  }
}
//update van
function* watchVanUpdate() {
  while (true) {
    const action: PayloadAction<UpdatePayload> = yield take(
      vanActions.updateVan.type
    );
    yield fork(updateVanHandler, action.payload);
  }
}
//add van
function* watchVanAdd() {
  while (true) {
    const action: PayloadAction<AddPayload> = yield take(
      vanActions.addVan.type
    );
    yield fork(addVanHandler, action.payload);
  }
}

export default function* vanSaga() {
  yield fork(watchVansGet);
  yield fork(watchVansGetById);
  yield fork(watchVanDelete);
  yield fork(watchVanUpdate);
  yield fork(watchVanAdd);
}
