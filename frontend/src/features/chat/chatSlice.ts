import { createSlice } from "@reduxjs/toolkit";
import { connectSocket, getChats } from "./asyncThuks";
import { ChatState } from "./types/state/ChatState";
import { Socket } from "socket.io-client";

const initialState: ChatState = {
  chats: [],
  socket: null,
  isLoading: false,
};

const chatSlice = createSlice({
  name: "chatReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get chats
      .addCase(getChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(getChats.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Connect socket
      .addCase(connectSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(connectSocket.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.socket = action.payload as Socket | null;
        let x = action.payload as Socket | null;
        console.log("<--/-->Socket id = ", x?.id);
      })
      .addCase(connectSocket.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

/// Export comment slice reducer
export default chatSlice.reducer;
