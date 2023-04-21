import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/createSlice/todoSlice";
import userReducer from "../features/createSlice/userSlice";

export default configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
  },
});
