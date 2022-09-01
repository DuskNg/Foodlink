import { AddPayload } from "../../components/Layout/AddProduct";
import { UpdatePayload } from "./../../components/Layout/VanDetail";
import { RootState } from "./../../app/store";
import { Vans } from "./../../models/vans";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeletePayload } from "../../components/Layout";

export interface VanState {
  vansState: Vans[];
  vanState: Vans;
  isGetting: boolean;
  isGettingById: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  isAdding: boolean;
  message: string;
}

const initialState: VanState = {
  vansState: [],
  vanState: {},
  isGetting: false,
  isGettingById: false,
  isDeleting: false,
  isUpdating: false,
  isAdding: false,
  message: "",
};

const vanSlice = createSlice({
  name: "vans",
  initialState,
  reducers: {
    // Get Vans
    getVans(state) {
      state.isGetting = true;
    },
    getVansSucceeded(state, action: PayloadAction<Vans[]>) {
      state.isGetting = false;
      state.vansState = action.payload;
    },
    getVansFailed(state, action: PayloadAction<string>) {
      state.isGetting = false;
    },

    // Delete van
    deleteVan(state, action: PayloadAction<DeletePayload>) {
      state.isDeleting = true;
    },

    deleteVanSucceeded(state, action: PayloadAction<string>) {
      state.isDeleting = false;
      state.message = action.payload;
    },

    deleteVanFailed(state, action: PayloadAction<string>) {
      state.isDeleting = false;
      state.message = action.payload;
    },

    // update Vans
    updateVan(state, action: PayloadAction<UpdatePayload>) {
      state.isUpdating = true;
      state.message = "";
    },
    updateVanSucceeded(state) {
      state.isUpdating = false;
    },
    updateVanFailed(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },

    // add new vans
    addVan(state, action: PayloadAction<AddPayload>) {
      state.isAdding = true;
      state.message = "";
    },
    addVanSucceeded(state) {
      state.isAdding = false;
    },
    addVanFailed(state, action: PayloadAction<string>) {
      state.isAdding = false;
      state.message = action.payload;
    },

    //get by id
    getVanById(state, action: PayloadAction<string>) {
      state.isGettingById = true;
      state.message = "";
    },
    getVanByIdSucceeded(state, action: PayloadAction<Vans>) {
      state.isGettingById = false;
      state.vanState = action.payload;
    },
    getVanByIdFailed(state) {
      state.isGettingById = false;
    },
  },
});

//Actions
export const vanActions = vanSlice.actions;

//Selectors
export const selectVans = (state: RootState) => state.vans.vansState;
export const selectVan = (state: RootState) => state.vans.vanState;
export const selectVansMessage = (state: RootState) => state.vans.message;
export const selectUpdating = (state: RootState) => state.vans.isUpdating;
export const selectDeleting = (state: RootState) => state.vans.isDeleting;
export const selectAdding = (state: RootState) => state.vans.isAdding;

//reducers
const vanReducer = vanSlice.reducer;
export default vanReducer;
