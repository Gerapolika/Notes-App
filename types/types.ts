export type Todo = {
  todos: Array<TodosType>;
  option: string;
  showTodos: boolean;
}

export interface TodosState {
  readonly todos: Todo
}

export type TodosType = {
  id: string;
  todo: string;
  done: boolean;
};

export interface ModalProps {
  id: string;
}
