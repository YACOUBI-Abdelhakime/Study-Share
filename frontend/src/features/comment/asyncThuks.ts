import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AddCommentDto } from "./types/dtos/addCommentDto";
import { SERVER_URL } from "../../utils/constants/urls";
import { AlertType } from "../global/types/AlertType";
import { addAlertMessage } from "../global/globalSlice";

export const getComments = createAsyncThunk(
  "commentReducer/getComments",
  async (publicationId: string, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.get(
        `${SERVER_URL}/comments/publication/${publicationId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { publicationId, comments: response.data };
    } catch (error: any) {
      const message: string = error.response.data.message;
      const type: AlertType = AlertType.ERROR;
      thunkAPI.dispatch(addAlertMessage({ message, type }));
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
      const response = await axios.post(`${SERVER_URL}/comments`, comment, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      const message: string = error.response.data.message;
      const type: AlertType = AlertType.ERROR;
      thunkAPI.dispatch(addAlertMessage({ message, type }));
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
