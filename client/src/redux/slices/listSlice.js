import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/list`;

// Fetch lists
export const getLists = createAsyncThunk(
  "lists/getLists",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add a list
export const addList = createAsyncThunk(
  "lists/addList",
  async (listData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.post(API_URL, listData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a list
export const updateList = createAsyncThunk(
  "lists/updateList",
  async ({ id, title }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.patch(
        `${API_URL}/${id}`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a list
export const removeList = createAsyncThunk(
  "lists/removeList",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const listSlice = createSlice({
  name: "lists",
  initialState: { lists: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(getLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addList.pending, (state) => {
        state.loading = true;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.loading = false;
        state.lists.push(action.payload);
      })
      .addCase(addList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateList.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.lists.findIndex(
          (list) => list._id === action.payload._id
        );
        if (index !== -1) state.lists[index] = action.payload;
      })
      .addCase(updateList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeList.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeList.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = state.lists.filter((list) => list._id !== action.payload);
      })
      .addCase(removeList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default listSlice.reducer;
