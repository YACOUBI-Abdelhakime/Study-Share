import { createSlice } from "@reduxjs/toolkit";
import { getComments } from "./asyncThuks";
import { CommentState } from "./types/CommentState";

const initialState: CommentState = {
  comments: {},
  openCommentsPanelPublicationId: "",
  isLoading: false,
};

const commentSlice = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {
    openCommentsPanel: (state, action) => {
      state.openCommentsPanelPublicationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get comments
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state: CommentState, action) => {
        state.isLoading = false;
        let { publicationId, comments } = action.payload;
        state.comments[publicationId] = comments;
      })
      .addCase(getComments.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

/// Export synchronous actions from productSlice.actions
export const { openCommentsPanel } = commentSlice.actions;

/// Export comment slice reducer
export default commentSlice.reducer;
