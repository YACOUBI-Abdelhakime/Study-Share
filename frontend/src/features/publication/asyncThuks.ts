import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddPublicationDto } from "./types/dtos/AddPublicationDto";

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

export const getPublicationTagValues = createAsyncThunk(
  "publicationReducer/getPublicationTagValues",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.get(
        "http://localhost:3000/publications/tag-values",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const addPublication = createAsyncThunk(
  "publicationReducer/addPublication",
  async (publication: AddPublicationDto, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.post(
        "http://localhost:3000/publications",
        publication,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
