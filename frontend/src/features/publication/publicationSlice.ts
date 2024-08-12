import { createSlice } from "@reduxjs/toolkit";
import {
  addPublication,
  getPublications,
  getPublicationTagValues,
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
