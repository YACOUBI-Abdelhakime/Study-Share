import { createSlice } from "@reduxjs/toolkit";
import { connectSocket, getChats, sendMessage } from "./asyncThuks";
import { ChatState } from "./types/state/ChatState";

const initialState: ChatState = {
  chats: [],
  socket: null,
  isLoading: false,
};

const chatSlice = createSlice({
  name: "chatReducer",
  initialState,
  reducers: {
    onMessageAdded: (state, action) => {
      state.chats = state.chats.map((chat) => {
        if (chat._id === action.payload._id) {
          return action.payload;
        }
        return chat;
      });
    },
  },
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
      .addCase(connectSocket.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(connectSocket.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Send message using socket.io
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

/// Export synchronous actions from productSlice.actions
export const { onMessageAdded } = chatSlice.actions;

/// Export comment slice reducer
export default chatSlice.reducer;
