import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
    todo: "",
  },
  reducers: {
    addTodo: (state, action) => {
      state.todoList = [...state.todoList, action.payload];
    },
    removeTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    toggleTodo: (state, action) => {
      state.todoList = state.todoList.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    },
    updateTodo: (state, action) => {
      state.todoList = state.todoList.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, text: action.payload.text };
        }
        return todo;
      });
    },
    resetTodoList: (state) => {
      state.todoList = [];
    },
  },
});

export const {
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodo,
  setTodo,
  resetTodoList,
} = todoSlice.actions;

export default todoSlice.reducer;
