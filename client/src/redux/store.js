import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice";
import listReducer from "./slices/listSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listReducer,
    tasks: taskReducer,
  },
});
