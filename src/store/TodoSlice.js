import { createSlice } from '@reduxjs/toolkit';
import { database } from "../lib/firebase";
import { doc, setDoc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { storage } from '../lib/firebase';
import { ref, uploadBytes, deleteObject } from "firebase/storage";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: []
    },
    reducers: {
        addTodoFirestore(state, action) {
            state.todos.push({
                id: action.payload.item.id,
                todo: action.payload.item.todo,
                done: action.payload.item.done,
                italic: action.payload.item.italic,
                bold: action.payload.item.bold,
                img: action.payload.item.img,
            })
        },

        addTodo(state, action) {
            state.todos.push({
                id: action.payload.id,
                todo: action.payload.text,
                done: false,
                italic: false,
                bold: false,
                img: []
            })
            setDoc(doc(database, 'Todos', action.payload.id), {
                id: action.payload.id,
                todo: action.payload.text,
                done: false,
                italic: false,
                bold: false,
                img: []
            })
            console.log('Uploaded');
        },

        updateTodo(state, action) {
            const index = state.todos.findIndex(el => el.id === action.payload.id)
            state.todos[index].todo = action.payload.text
            state.todos[index].italic = action.payload.italic
            state.todos[index].bold = action.payload.bold
            setDoc(doc(database, 'Todos', action.payload.id), {
                id: action.payload.id,
                todo: action.payload.text,
                italic: action.payload.italic,
                bold: action.payload.bold,
            }, { merge: true })
        },

        deleteTodo(state, action) {
            console.log(action.payload.todo)
            // Create a reference to the file to delete
            action.payload.todo.img.map(el => {
                const desertRef = ref(storage, `${el}`);
                // Delete the file
                deleteObject(desertRef).then(() => {
                    console.log(`File deleted successfully`)
                }).catch((error) => {
                    console.log(`Uh-oh, an img delete error occurred: ${error}`)
                });
            })

            state.todos = state.todos.filter(todo => todo.id !== action.payload.todo.id)
            deleteDoc(doc(database, "Todos", action.payload.todo.id))
        },

        completeTodo(state, action) {
            const toggleTodo = state.todos.find(todo =>
                todo.id === action.payload.todo.id);
            toggleTodo.done = !toggleTodo.done;
            setDoc(doc(database, 'Todos', action.payload.todo.id), {
                id: action.payload.todo.id,
                todo: action.payload.todo.todo,
                done: !action.payload.todo.done
            }, { merge: true })
        },

        addImage(state, action) {
            //add image in state
            state.todos.map(el => {
                if (el.id === action.payload.id) {
                    el.img.push(`Images/${action.payload.name}`)
                }
            })
            const storageRef = ref(storage, `Images/${action.payload.name}`);

            //add image in firebase storage
            fetch(action.payload.url)
                .then(function (response) {
                    return response.blob()
                })
                .then(function (blob) {
                    //here the image is a blob and is sent to the storage
                    uploadBytes(storageRef, blob).then(() => {
                        console.log('Uploaded a blob!');
                    });
                })

            //add image name in firebase firestore
            updateDoc(doc(database, 'Todos', action.payload.id), {
                img: arrayUnion(`Images/${action.payload.name}`)
            }, { merge: true })
                .catch((error) => console.log(error))
        },

        deleteImg(state, action) {
            //delete image in firebase storage
            // Create a reference to the file to delete
            const desertRef = ref(storage, `Images/${action.payload.name}`);
            // Delete the file
            deleteObject(desertRef).then(() => {
                console.log(`File deleted successfully`)
            }).catch((error) => {
                console.log(`Uh-oh, an img delete error occurred: ${error}`)
            });

            //delete image name in firebase firestore
            updateDoc(doc(database, 'Todos', action.payload.id), {
                img: arrayRemove(`Images/${action.payload.name}`)
            })
        }
    }
})

export const { addTodo, updateTodo, deleteTodo, addTodoFirestore, completeTodo, addImage, deleteImg } = todoSlice.actions;
export default todoSlice.reducer;