import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./types/User";
import { LoginDto } from "./types/LoginDto";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: { "Content-Type": "application/json" },
});

export const login = createAsyncThunk(
  "userReducer/login",
  async (login: LoginDto, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", login);
      const tokenPayload: any = jwtDecode(response.data.token);
      const user: User = tokenPayload.user;
      // Save token in local storage
      localStorage.setItem("token", response.data.token);
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const register = createAsyncThunk(
  "userReducer/register",
  async (user: User, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
