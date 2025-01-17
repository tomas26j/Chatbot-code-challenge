import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  userMessage: '',
  currentOrder: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ text: action.payload, isUser: true });
    },
    addBotMessage: (state, action) => {
      state.messages.push({ text: action.payload, isUser: false });
    },
    setUserMessage: (state, action) => {
      state.userMessage = action.payload;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = [];
    },
  },
});

export const { addUserMessage, addBotMessage, setUserMessage, setCurrentOrder, clearCurrentOrder } = chatSlice.actions;
export default chatSlice.reducer;
