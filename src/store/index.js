import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/task.slice.js";

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
  },
});
