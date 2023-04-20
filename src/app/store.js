import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice/todoSlice";

export default configureStore({
  reducer: {
    todo: todoReducer,
  },
});
