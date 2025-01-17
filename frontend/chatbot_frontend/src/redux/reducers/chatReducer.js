// reducers/chatReducer.js
import {
    FETCH_MENU_SUCCESS,
    FETCH_ORDERS_SUCCESS,
    ADD_CHAT_MESSAGE,
    SET_BOT_MESSAGE,
    CLEAR_CHAT_HISTORY,
    SET_CURRENT_ORDER,
    CLEAR_CURRENT_ORDER,
  } from '../actions/chatActions';
  
  const initialState = {
    menu: [],
    orders: [],
    chatHistory: [],
    currentOrder: [],
  };
  
  const chatReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MENU_SUCCESS:
        return { ...state, menu: action.payload };
  
      case FETCH_ORDERS_SUCCESS:
        return { ...state, orders: action.payload };
  
      case ADD_CHAT_MESSAGE:
        return { ...state, chatHistory: [...state.chatHistory, action.payload] };
  
      case SET_BOT_MESSAGE:
        return {
          ...state,
          chatHistory: [...state.chatHistory, { text: action.payload, isUser: false }],
        };
  
      case SET_CURRENT_ORDER:
        return {
          ...state,
          currentOrder: action.payload,
        };
  
      case CLEAR_CURRENT_ORDER:
        return {
          ...state,
          currentOrder: [],
        };
  
      case CLEAR_CHAT_HISTORY:
        return { ...state, chatHistory: [] };
  
      default:
        return state;
    }
  };
  
  export default chatReducer;
  