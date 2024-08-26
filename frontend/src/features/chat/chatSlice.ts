import { createSlice } from "@reduxjs/toolkit";
import {
  connectSocket,
  createChat,
  getChats,
  getSelectedChat,
  sendMessage,
} from "./asyncThuks";
import { ChatState } from "./types/state/ChatState";

const initialState: ChatState = {
  chats: [],
  selectedChatId: "",
  selectedChat: null,
  isLoading: false,
};

const chatSlice = createSlice({
  name: "chatReducer",
  initialState,
  reducers: {
    onMessageAdded: (state, action) => {
      state.selectedChat = action.payload;
      const chatAlreadyExists = state.chats.some(
        (chat) => chat._id == action.payload._id
      );
      if (chatAlreadyExists) {
        state.chats = state.chats.map((chat) => {
          if (chat._id === action.payload._id) {
            return action.payload;
          }
          return chat;
        });
      } else {
        // Chat dose not exist add it to chats list
        state.chats.push(action.payload);
        state.chats.sort((a, b) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });
      }
    },
    onSelectedChat: (state, action) => {
      if (action.payload === "") {
        state.selectedChat = null;
      }
      state.selectedChatId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get chats
      .addCase(getChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
        state.chats.map((chat) => {
          chat.messages = chat.messages.reverse();
        });
      })
      .addCase(getChats.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Get selected chat
      .addCase(getSelectedChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSelectedChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedChat = action.payload;
        if (state.selectedChat) {
          state.selectedChat.messages = state.selectedChat.messages.reverse();
        }
      })
      .addCase(getSelectedChat.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Create chat
      .addCase(createChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedChatId = action.payload._id;
        state.selectedChat = action.payload;
        if (state.selectedChat) {
          state.selectedChat.messages = state.selectedChat.messages.reverse();
        }
        const chatAlreadyExists = state.chats.includes(action.payload);
        if (chatAlreadyExists) {
          return;
        }
        // Add chat to chats
        state.chats.push(action.payload);
        state.chats.sort((a, b) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });
      })
      .addCase(createChat.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Connect socket
      .addCase(connectSocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(connectSocket.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(connectSocket.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      // Send message using socket.io
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      });
  },
});

/// Export synchronous actions from productSlice.actions
export const { onMessageAdded, onSelectedChat } = chatSlice.actions;

/// Export comment slice reducer
export default chatSlice.reducer;
