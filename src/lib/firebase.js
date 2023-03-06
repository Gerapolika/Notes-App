// Import the functions 
import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyARIcwSsq_DpOth2-6lmxcCz2-Ql2wi1PU",
    authDomain: "control-work-todos.firebaseapp.com",
    databaseURL: "https://control-work-todos-default-rtdb.firebaseio.com",
    projectId: "control-work-todos",
    storageBucket: "control-work-todos.appspot.com",
    messagingSenderId: "573313063908",
    appId: "1:573313063908:web:230f8d6db4a973080d05f1"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

// Get a list of Todos from database
async function getTodos(database) {
    const todosCol = collection(database, 'Todos');
    const todosSnapshot = await getDocs(todosCol);
    const todosList = todosSnapshot.docs.map(doc => doc.data());
    return todosList;
}

export const todoList = getTodos(database);
export const storage = getStorage(app);


