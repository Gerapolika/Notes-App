import './style/App.scss';
import ToDo from './components/ToDo';
import Modal from './components/Modal';
import React, { useState, useEffect } from "react";

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTodoFirestore } from './store/TodoSlice';

import { todoList } from "./lib/firebase";

function App() {

  const todos = useSelector(state => state.todos.todos);

  const [isModal, setModal] = useState(false);
  const [id, setId] = useState('')

  const dispatch = useDispatch();

  const changeModal = (todo) => {
    setId(todo.id)
    setModal(true)
  }

  useEffect(() => {
    todoList
      .then(result => result.map(item => dispatch(addTodoFirestore({ item }))
      ))
  }, [])


  return (
    <div className="App">

        <h1>Заметки</h1>
      <section className='container'>
        <ToDo
          todos={todos}
          handleClick={changeModal}
        />
      </section>

      <button
        className="button"
        onClick={() => { setId(''); setModal(true) }}>
        Создать новую заметку
      </button>

      <Modal
        isVisible={isModal}
        onClose={() => {
          setModal(false)
        }}
        handleChange={changeModal}
        id={id}
      />
    </div>
  );
}

export default App;
