import { createSlice } from "@reduxjs/toolkit";
import { Todo, TodosType } from "../../types/types";

const localStorageTodos: string | null = localStorage.getItem("todos");
const todoArray: Array<TodosType> = localStorageTodos
  ? JSON.parse(localStorageTodos!)
  : [];

const initialState: Todo = {
  todos: todoArray,
  option: "all" as string,
  showTodos: true as boolean,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action) {
      const todo: TodosType = {
        id: action.payload.id,
        todo: action.payload.todo,
        done: false,
      };
      state.todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    clearComplete(state, action) {
      state.todos = state.todos.filter((todo) => !todo.done);
      const localStorageTodos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos")!)
      : [];
    
      const filteredLocalStorageTodos = localStorageTodos.filter((todo:TodosType ) => !todo.done);
      localStorage.setItem("todos", JSON.stringify(filteredLocalStorageTodos));
    },

    completeTodo(state, action) {
      const toggleTodo = state.todos.find(
        (todo) => todo.id === action.payload.id,
      );
      toggleTodo!.done = !toggleTodo!.done;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    setOption(state, action) {
      state.option = action.payload.option;
      const localStorageTodos: string | null = localStorage.getItem("todos");
      const todoArray: Array<TodosType> = localStorageTodos
        ? JSON.parse(localStorageTodos!)
        : [];

      switch (action.payload.option) {
        case "all": {
          state.todos = todoArray;
          break;
        }
        case "active": {
          state.todos = todoArray.filter((el) => !el.done);
          break;
        }
        case "completed": {
          state.todos = todoArray.filter((el) => el.done);
          break;
        }
      }
    },

    setShowTodos(state, action) {
      state.showTodos = action.payload.showTodos;
    },
  },
});

export const {
  addTodo,
  clearComplete,
  completeTodo,
  setOption,
  setShowTodos,
} = todoSlice.actions;
export default todoSlice.reducer;
