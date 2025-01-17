import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import chatReducer from './chatSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,
    chat: chatReducer,
  },
});

export default store;
