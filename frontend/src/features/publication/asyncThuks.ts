import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddPublicationDto } from "./types/dtos/AddPublicationDto";
import { SERVER_URL } from "../../utils/constants/urls";

export const getPublications = createAsyncThunk(
  "publicationReducer/getPublications",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.get(`${SERVER_URL}/publications`, {
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
        `${SERVER_URL}/publications/tag-values`,
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

export const togglePublicationDiscussion = createAsyncThunk(
  "publicationReducer/togglePublicationDiscussion",
  async (publicationId: string, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.get(
        `${SERVER_URL}/publications/toggle-discussion/${publicationId}`,
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
        `${SERVER_URL}/publications`,
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

export const deletePublication = createAsyncThunk(
  "publicationReducer/deletePublication",
  async (publicationId: string, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.delete(
        `${SERVER_URL}/publications/${publicationId}`,

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
