import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    removeAllTodo: (state) => {
      state.todos = [];
    },
    updateTodoStatus: (state, action) => {      
      state.todos.map((obj) =>
        action.payload.id === obj.id
          ? (obj.isCompleted = action.payload.status)
          : ""
      );
    },
    EditTodo: (state, action) => {
      state.todos.map((obj) =>
        action.payload.id === obj.id ? (obj.value = action.payload.value, obj.date=action.payload.date) : ""
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTodo,
  removeTodo,
  removeAllTodo,
  updateTodoStatus,
  EditTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
