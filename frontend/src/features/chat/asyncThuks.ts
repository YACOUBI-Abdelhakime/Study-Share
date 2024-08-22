import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { WS } from "../../socket";
import { SERVER_URL } from "../../urls";

export const getChats = createAsyncThunk(
  "chatReducer/getChats",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    try {
      const response = await axios.get(`${SERVER_URL}/chats`, {
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

export const connectSocket = createAsyncThunk(
  "chatReducer/connectSocket",
  async (_, thunkAPI): Promise<Socket | null> => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    let socket: Socket | null = null;
    try {
      socket = io("http://localhost:3001/chats", {
        query: {
          token: token,
        },
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("WebSocket connected:", socket?.id);
        WS.setWSocket(socket);
      });
      socket.on("message", (message) => {
        console.log("Message = " + message);
      });

      socket.on("disconnect", (reason) => {
        console.log("WebSocket disconnected err = " + reason);
        WS.setWSocket(null);
      });

      socket.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    } catch (error) {
      console.error("WebSocket setup failed:", error);
    }
    return socket;
  }
);
