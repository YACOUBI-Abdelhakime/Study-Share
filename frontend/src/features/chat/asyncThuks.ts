import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../../urls";
import { onMessageAdded } from "./chatSlice";
import { SendMessageDto } from "./types/dtos/sendMessageDto";

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
  async (
    setSocket: (socket: Socket | null) => void,
    thunkAPI
  ): Promise<void> => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    let socket: Socket | null = null;
    try {
      socket = io("http://localhost:3001/", {
        auth: {
          token: token,
        },
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("WebSocket connected id:", socket?.id);
        setSocket(socket);
      });
      socket.on("message", (chat) => {
        thunkAPI.dispatch(onMessageAdded(chat));
      });

      socket.on("disconnect", (r) => {
        console.error("Socket was disconnect>> ", r);
        setSocket(null);
      });

      socket.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    } catch (error) {
      console.error("WebSocket setup failed:", error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chatReducer/sendMessage",
  async ({
    socket,
    sendMessageDto,
  }: {
    socket: Socket;
    sendMessageDto: SendMessageDto;
  }) => {
    console.log("sendMessage() id:", socket?.id);
    if (!socket) {
      console.error("Socket is not connected");
      return;
    }
    try {
      socket.emit("message", sendMessageDto);
    } catch (error) {
      console.error("WebSocket setup failed:", error);
    }
  }
);
