import React from "react";
import deleteIcon from "../images/delete-icon.png"
import editIcon from "../images/editing-icon.png"
import { useDispatch } from "react-redux"
import { deleteTodo, completeTodo } from '../store/TodoSlice'

const ToDo = ({ todos, handleClick }) => {

    const dispatch = useDispatch()

    return (
        <>
            {todos.map(todo =>
                <div className="todo" key={todo.id}>
                    <label>
                        <input type="checkbox"
                            onChange={() => dispatch(completeTodo({ todo }))}></input>
                        <span></span>
                    </label>
                    <p
                        className={`
                        todo-article
                        ${todo.done ? "completed-todo" : "not-completed-todo"} 
                        ${todo.italic ? "italic" : ""} 
                        ${todo.bold ? "bold-text" : ""}
                        `}
                        dangerouslySetInnerHTML={{ __html: todo.todo }}
                    ></p>
                    <div>
                        <button className="icon"
                            onClick={(e) => handleClick(todo)}
                        >
                            <img src={editIcon} alt="editIcon" />
                        </button>
                        <button className="icon"
                            onClick={() => dispatch(deleteTodo({ todo }))}
                        >
                            <img src={deleteIcon} alt="delete-icon" />
                        </button>
                    </div>
                </div>)}
        </>
    )
}

export default ToDo