import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/task`;

// Fetch tasks
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add a task
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.post(API_URL, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updatedTask }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await axios.patch(`${API_URL}/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Reorder a task
export const reorderTask = createAsyncThunk(
  "tasks/reorderTask",
  async ({ taskId, newOrder, listId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await axios.put(
        `${API_URL}/reorder`,
        { taskId, newOrder, listId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return { taskId, newOrder, listId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a task
export const removeTask = createAsyncThunk(
  "tasks/removeTask",
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

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(reorderTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(reorderTask.fulfilled, (state, action) => {
        state.loading = false;
        const { taskId, newOrder, listId } = action.payload;
        const movedTask = state.tasks.find((task) => task._id === taskId);
        if (!movedTask) return;

        const oldOrder = movedTask.order;
        movedTask.order = newOrder;
        state.tasks.forEach((task) => {
          if (task.list._id === listId && task._id !== taskId) {
            if (
              newOrder < oldOrder &&
              task.order >= newOrder &&
              task.order < oldOrder
            ) {
              task.order += 1;
            } else if (
              newOrder > oldOrder &&
              task.order > oldOrder &&
              task.order <= newOrder
            ) {
              task.order -= 1;
            }
          }
        });
        state.tasks.sort((a, b) => a.order - b.order);
      })

      .addCase(reorderTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
