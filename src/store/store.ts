import { configureStore } from '@reduxjs/toolkit';
import reducer from './TodoSlice';

const reduxStore = configureStore({
    reducer: { todos: reducer },
})

export default reduxStore;

export type AppStore = typeof reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>;