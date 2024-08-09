import { createSlice } from "@reduxjs/toolkit";
import { getPublications } from "./asyncThuks";
import { PublicationState } from "./types/PublicationState";

const initialState: PublicationState = {
  publications: [],
  isLoading: false,
};

const publicationSlice = createSlice({
  name: "publicationReducer",
  initialState,
  reducers: {
    // fnOne: (state, action) => {
    //   state.products = [...];
    // },
    // fnTwo: (state, action) => {
    //   state.product = [...];
    // },
  },
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
      });
  },
});

/// Export product slice reducer
export default publicationSlice.reducer;
