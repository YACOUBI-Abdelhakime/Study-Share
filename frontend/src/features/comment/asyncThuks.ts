import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddCommentDto } from "./types/dtos/addCommentDto";

export const getComments = createAsyncThunk(
  "commentReducer/getComments",
  async (publicationId: string, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.get(
        `http://localhost:3000/comments/publication/${publicationId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { publicationId, comments: response.data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const addComment = createAsyncThunk(
  "commentReducer/addComment",
  async (comment: AddCommentDto, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.post(
        `http://localhost:3000/comments`,
        comment,
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
