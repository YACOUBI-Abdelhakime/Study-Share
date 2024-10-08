import { createSlice } from "@reduxjs/toolkit";
import { GlobalState } from "./types/GlobalState";

const initialState: GlobalState = {
  message: null,
  type: null,
};

const globalSlice = createSlice({
  name: "globalReducer",
  initialState,
  reducers: {
    addAlertMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    emptyAlertMessage: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

/// Export synchronous actions from productSlice.actions
export const { addAlertMessage, emptyAlertMessage } = globalSlice.actions;

/// Export comment slice reducer
export default globalSlice.reducer;
