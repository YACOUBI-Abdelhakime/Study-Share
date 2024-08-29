import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { SERVER_URL, WEBSOCKET_URL } from "../../utils/constants/urls";
import { onMessageAdded, onMessageRead } from "./chatSlice";
import { SendMessageDto } from "./types/dtos/sendMessageDto";
import { CreateChatDto } from "./types/dtos/createChatDto";
import { Chat } from "./types/schemas/Chat";
import { Message } from "./types/schemas/Message";

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

export const getSelectedChat = createAsyncThunk(
  "chatReducer/getSelectedChat",
  async (
    {
      socket,
    }: {
      socket: Socket;
    },
    thunkAPI
  ) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;
    const selectedChatId = state.chatReducer.selectedChatId;

    if (!selectedChatId) {
      return null;
    }
    let chat: Chat;
    try {
      const response = await axios.get(
        `${SERVER_URL}/chats/${selectedChatId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      chat = response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("something went wrong");
    }

    // Read all unread messages
    thunkAPI.dispatch(
      readMessage({
        socket: socket,
        messages: chat.messages,
        userId: state.userReducer.user._id,
      })
    );

    return chat;
  }
);

export const readMessage = createAsyncThunk(
  "chatReducer/readMessage",
  async ({
    socket,
    messages,
    userId,
  }: {
    socket: Socket;
    messages: Message[];
    userId: string;
  }) => {
    if (!socket) {
      console.error("Socket is not connected");
      return;
    }

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (message.senderId !== userId && message.read === false) {
        // Mark message as read
        try {
          socket.emit("message-read", { messageId: message._id });
        } catch (error) {
          console.error("WebSocket setup failed:", error);
          return;
        }
      } else {
        break;
      }
    }
  }
);

export const createChat = createAsyncThunk(
  "chatReducer/createChat",
  async (createChatDto: CreateChatDto, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;

    try {
      const response = await axios.post(`${SERVER_URL}/chats`, createChatDto, {
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
      socket = io(WEBSOCKET_URL, {
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

      socket.on("message-read", (chatIdAndMessage) => {
        thunkAPI.dispatch(onMessageRead(chatIdAndMessage));
      });

      socket.on("disconnect", () => {
        console.error("Socket was disconnected");
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
