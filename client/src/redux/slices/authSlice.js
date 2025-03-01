import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupUser, loginUser } from "../../api/authApi";

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const data = await signupUser(name, email, password);
      if (!data || !data.user || !data.token) {
        throw new Error("Invalid response format from server");
      }
      return data;
    } catch (error) {
      if (error.response?.status === 409) {
        return rejectWithValue("Email already in use! Try logging in.");
      }
      return rejectWithValue(
        error.message || "Signup failed. Please try again."
      );
    }
  }
);

// ✅ Async Thunk for Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginUser(email, password);
      if (!data || !data.user || !data.token) {
        throw new Error("Invalid response format from server");
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Login failed. Please try again."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Handle Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Handle Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
