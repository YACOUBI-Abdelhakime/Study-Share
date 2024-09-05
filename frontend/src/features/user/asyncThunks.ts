import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./types/User";
import { LoginDto } from "./types/dtos/LoginDto";
import { jwtDecode } from "jwt-decode";
import { SignupDto } from "./types/dtos/SignupDto";
import { SERVER_URL } from "../../utils/constants/urls";
import { addAlertMessage } from "../global/globalSlice";
import { AlertType } from "../global/types/AlertType";

const api = axios.create({
  baseURL: SERVER_URL,
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
      const message: string = error.response.data.message;
      const type: AlertType = AlertType.ERROR;
      thunkAPI.dispatch(addAlertMessage({ message, type }));
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "userReducer/register",
  async (user: SignupDto, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", user);
      const message: string = "Please check your email to confirm your account";
      const type: AlertType = AlertType.SUCCESS;
      thunkAPI.dispatch(addAlertMessage({ message, type }));
      return response.data;
    } catch (error: any) {
      const message: string = error.response.data.message;
      const type: AlertType = AlertType.ERROR;
      thunkAPI.dispatch(addAlertMessage({ message, type }));
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getContacts = createAsyncThunk(
  "userReducer/getContacts",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.userReducer.user.token;

    try {
      const response = await axios.get(`${SERVER_URL}/users/contacts`, {
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
