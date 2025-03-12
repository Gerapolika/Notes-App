import React from "react";
import "./Footer.scss";
import { TodosState, TodosType } from "../../../types/types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearComplete, setOption } from "../../store/TodoSlice";

const Footer = () => {
  const todos: Array<TodosType> = useSelector(
    (state: TodosState) => state.todos.todos,
  );

  const dispatch = useDispatch();

  const option: string = useSelector((state: TodosState) => state.todos.option);

  const handleOption = (option: string): void => {
    dispatch(setOption({ option: option }));
  };

  return (
    <div className="footer">
      <div className="footer__items"> {todos.filter((el) => !el.done).length} items left</div>

      <div className="footer__buttons">
        <button
          className={`footer__buttons__btn ${option === "all" ? "footer-btn-active" : ""}`}
          onClick={() => handleOption("all")}
        >
          All
        </button>
        <button
          className={`footer__buttons__btn ${option === "active" ? "footer-btn-active" : ""}`}
          onClick={() => handleOption("active")}
        >
          Active
        </button>
        <button
          className={`footer__buttons__btn ${option === "completed" ? "footer-btn-active" : ""}`}
          onClick={() => handleOption("completed")}
        >
          Completed
        </button>
      </div>

      <div className="footer__items">
        <button 
        className="footer__buttons__btn"
        onClick={() => dispatch(clearComplete({}))}
        >Clear completed</button>
      </div>
    </div>
  );
};

export default Footer;
