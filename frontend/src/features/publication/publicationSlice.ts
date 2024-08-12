import { createSlice } from "@reduxjs/toolkit";
import {
  addPublication,
  getPublications,
  getPublicationTagValues,
  togglePublicationDiscussion,
} from "./asyncThuks";
import { PublicationState } from "./types/PublicationState";

const initialState: PublicationState = {
  publications: [],
  publicationTagValues: [],
  isLoading: false,
};

const publicationSlice = createSlice({
  name: "publicationReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get publications
      .addCase(getPublications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publications = action.payload;
      })
      .addCase(getPublications.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Get publication tag values
      .addCase(getPublicationTagValues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublicationTagValues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publicationTagValues = action.payload;
      })
      .addCase(getPublicationTagValues.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Toggle publication discussion open/close
      .addCase(togglePublicationDiscussion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(togglePublicationDiscussion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.publications = state.publications.map((publication) => {
          if (publication._id === action.payload._id) {
            publication.isDiscussionOpen = action.payload.isDiscussionOpen;
          }
          return publication;
        });
      })
      .addCase(togglePublicationDiscussion.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Add publications
      .addCase(addPublication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPublication.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addPublication.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

/// Export product slice reducer
export default publicationSlice.reducer;
