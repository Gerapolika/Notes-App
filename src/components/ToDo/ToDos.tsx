import React from "react";
import "./ToDos.scss";
import { useDispatch } from "react-redux";
import { completeTodo } from "../../store/TodoSlice";
import { TodosState, TodosType } from "../../../types/types";
import { useSelector } from "react-redux";

const ToDos = () => {
  const dispatch = useDispatch();

  const todos: Array<TodosType> = useSelector(
    (state: TodosState) => state.todos.todos,
  );

  const showTodos: boolean = useSelector(
    (state: TodosState) => state.todos.showTodos,
  );

  return (
    <div className={`todo-list ${showTodos ? '' : 'hidden-todo-list'}`}>
      {todos.map((todo) => (
        <div className="todo-list__todo" key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => dispatch(completeTodo({ id: todo.id }))}
            ></input>
            <span></span>
          </label>
          <p
            className={`todo-list__todo__text
                        ${todo.done ? "completed-text" : "not-completed-text"}`}
            dangerouslySetInnerHTML={{ __html: todo.todo }}
          ></p>
        </div>
      ))}
    </div>
  );
};

export default ToDos;
