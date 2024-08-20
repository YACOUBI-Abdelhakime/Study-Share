import { createSlice } from "@reduxjs/toolkit";
import { getChats } from "./asyncThuks";
import { ChatState } from "./types/state/ChatState";

const initialState: ChatState = {
  chats: [],
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
      .addCase(getChats.fulfilled, (state: ChatState, action) => {
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(getChats.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
    // Create chat
    // .addCase(addComment.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(addComment.fulfilled, (state: CommentState) => {
    //   state.isLoading = false;
    // })
    // .addCase(addComment.rejected, (state, action) => {
    //   console.log(action.payload);
    //   state.isLoading = false;
    // });
  },
});

/// Export comment slice reducer
export default chatSlice.reducer;
