import "./App.scss";
import ToDos from "./components/ToDo/ToDos";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, setShowTodos } from "./store/TodoSlice";
import Footer from "./components/Footer/Footer";
import { TodosState } from "../types/types";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyPress = (event: { key: string; }): void => {
    if (event.key === "Enter") {
      dispatch(addTodo({ 
        todo: inputValue,
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
       }));
      setInputValue("");
    }
  };

  const showTodos: boolean = useSelector(
    (state: TodosState) => state.todos.showTodos,
  );

  return (
    <div className="App">
      <h1>Todos</h1>
      <section className="container">
        <div className="content">
          <div className="content__input-section">
            <button
              className={`content__input-section__btn${showTodos ? "-active" : "-hidden"}`}
              onClick={() => dispatch(setShowTodos({ showTodos: !showTodos }))}
            />

            <input
              placeholder="What needs to be done?"
              onKeyDown={handleKeyPress}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <ToDos />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
