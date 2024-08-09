import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPublications = createAsyncThunk(
  "publicationReducer/getPublications",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.get("http://localhost:3000/publications", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
