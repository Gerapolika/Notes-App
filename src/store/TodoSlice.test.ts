import { Todo } from "../../types/types";
import reducer, {
  addTodo,
  clearComplete,
  completeTodo,
  setOption,
  setShowTodos,
} from "./TodoSlice";

const prevStateTodos = [
  {
    id: "1234",
    todo: "Написать код",
    done: true,
  },
  {
    id: "5678",
    todo: "Проверить добавление todo",
    done: false,
  },
];

class localStorageMock {
  private store: { [key: string]: string } = {
    todos: JSON.stringify(prevStateTodos),
  };

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}
const localStorage = new localStorageMock();
Object.defineProperty(window, "localStorage", {
  value: localStorage,
});

test("Chek setOption action", () => {
  const previousState: Todo = {
    todos: prevStateTodos,
    option: "all",
    showTodos: true,
  };

  expect(reducer(previousState, setOption({ option: "active" }))).toEqual({
    todos: [
      {
        id: "5678",
        todo: "Проверить добавление todo",
        done: false,
      },
    ],
    option: "active",
    showTodos: true,
  });

  expect(reducer(previousState, setOption({ option: "completed" }))).toEqual({
    todos: [
      {
        id: "1234",
        todo: "Написать код",
        done: true,
      },
    ],
    option: "completed",
    showTodos: true,
  });

  
  expect(reducer(previousState, setOption({ option: "all" }))).toEqual({
    todos: [
      {
        id: "1234",
        todo: "Написать код",
        done: true,
      },
      {
        id: "5678",
        todo: "Проверить добавление todo",
        done: false,
      },
    ],
    option: "all",
    showTodos: true,
  });

});

test("Chek addTodo action", () => {
  const previousState: Todo = { todos: [], option: "all", showTodos: true };
  const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

  expect(
    reducer(
      previousState,
      addTodo({
        todo: "Проверить добавление todo",
        id: id,
      }),
    ),
  ).toEqual({
    todos: [
      {
        id: id,
        todo: "Проверить добавление todo",
        done: false,
      },
    ],
    option: "all",
    showTodos: true,
  });
});

test("Chek clearComplete action", () => {
  const previousState: Todo = {
    todos: prevStateTodos,
    option: "all",
    showTodos: true,
  };

  expect(reducer(previousState, clearComplete({}))).toEqual({
    todos: [
      {
        id: "5678",
        todo: "Проверить добавление todo",
        done: false,
      },
    ],
    option: "all",
    showTodos: true,
  });
});

test("Chek completeTodo action", () => {
  const previousState: Todo = {
    todos: prevStateTodos,
    option: "all",
    showTodos: true,
  };

  expect(reducer(previousState, completeTodo({ id: "5678" }))).toEqual({
    todos: [
      {
        id: "1234",
        todo: "Написать код",
        done: true,
      },
      {
        id: "5678",
        todo: "Проверить добавление todo",
        done: true,
      },
    ],
    option: "all",
    showTodos: true,
  });
});


test("Chek setShowTodos action", () => {
    const previousState: Todo = {
      todos: prevStateTodos,
      option: "all",
      showTodos: true,
    };
  
    expect(reducer(previousState, setShowTodos({ showTodos: false }))).toEqual({
      todos: [
        {
          id: "1234",
          todo: "Написать код",
          done: true,
        },
        {
          id: "5678",
          todo: "Проверить добавление todo",
          done: false,
        },
      ],
      option: "all",
      showTodos: false,
    });
  });
  
