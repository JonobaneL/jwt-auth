import { AuthResponse, User } from "@/models/authResponse";
import { createAsyncThunk, createSlice, isAction } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";
import axios from "axios";

type initialStateProps = {
  user: User | null;
  isAuth: boolean;
};
const initialState: initialStateProps = {
  user: null,
  isAuth: false,
};
type UserProps = {
  email: string;
  password: string;
};

export const logInThunk = createAsyncThunk<User, UserProps>(
  "user/log-in",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await AuthService.login(email, password);
      console.log(res);
      localStorage.setItem("token", res.data.accessToken);
      return res.data.user;
    } catch (err) {
      return rejectWithValue("something wrong");
    }
  }
);

export const signUpThunk = createAsyncThunk<User, UserProps>(
  "user/sign-up",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await AuthService.signup(email, password);
      console.log(res);
      localStorage.setItem("token", res.data.accessToken);
      return res.data.user;
    } catch (err) {
      return rejectWithValue("something wrong");
    }
  }
);
export const logOutThunk = createAsyncThunk<void, undefined>(
  "user/log-out",
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
    } catch (err) {
      return rejectWithValue("something wrong");
    }
  }
);

export const checkIsAuth = createAsyncThunk<User, undefined>(
  "user/auth-check",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post<AuthResponse>(
        `${import.meta.env.VITE_API_URL}/refresh`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log(res);
      localStorage.setItem("token", res.data.accessToken);
      return res.data.user;
    } catch (err) {
      return rejectWithValue("something wrong");
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(logInThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(logOutThunk.fulfilled, (state) => {
        state.isAuth = false;
        state.user = null;
      })
      .addCase(checkIsAuth.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
      });
  },
});
// const { setAuth, setUser } = userSlice.actions;
export default userSlice.reducer;
