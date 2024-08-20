import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreateChatDto } from "./types/dtos/createChatDto";
import { SERVER_URI } from "../../server.uri";

export const getChats = createAsyncThunk(
  "chatReducer/getChats",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.get(`${SERVER_URI}/chats`, {
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

// export const addComment = createAsyncThunk(
//   "commentReducer/addComment",
//   async (comment: AddCommentDto, thunkAPI) => {
//     const state: any = thunkAPI.getState();
//     const token = state.userReducer.user.token;
//     try {
//       const response = await axios.post(`${SERVER_URI}/comments`, comment, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue("something went wrong");
//     }
//   }
// );
