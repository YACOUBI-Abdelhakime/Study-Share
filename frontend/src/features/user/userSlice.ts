import { createSlice } from "@reduxjs/toolkit";
import { getContacts, login, register } from "./asyncThunks";
import { UserState } from "./types/UserState";

const initialState: UserState = {
  user: null,
  contacts: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // User login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // User Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Get contacts
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

/// Export product slice reducer
export default userSlice.reducer;
