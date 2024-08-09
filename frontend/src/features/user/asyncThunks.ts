import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./types/User";
import { LoginDto } from "./types/dtos/LoginDto";
import { jwtDecode } from "jwt-decode";
import { SignupDto } from "./types/dtos/SignupDto";

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
      let user: User = tokenPayload.user;
      user.token = response.data.token;
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const register = createAsyncThunk(
  "userReducer/register",
  async (user: SignupDto, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", user);
      const tokenPayload: any = jwtDecode(response.data.token);
      let createdUser: User = tokenPayload.user;
      createdUser.token = response.data.token;
      return createdUser;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
