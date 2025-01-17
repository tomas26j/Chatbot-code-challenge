// actions/chatActions.js
import axios from 'axios';

// Action types
export const FETCH_MENU_SUCCESS = 'FETCH_MENU_SUCCESS';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';
export const SET_BOT_MESSAGE = 'SET_BOT_MESSAGE';
export const CLEAR_CHAT_HISTORY = 'CLEAR_CHAT_HISTORY';

// Action creators
export const fetchMenu = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/products');
    dispatch({ type: FETCH_MENU_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching menu:', error);
  }
};

export const fetchOrders = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/orders');
    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

export const addChatMessage = (message, isUser = true) => ({
  type: ADD_CHAT_MESSAGE,
  payload: { text: message, isUser },
});

export const setBotMessage = (message) => ({
  type: SET_BOT_MESSAGE,
  payload: message,
});

export const clearChatHistory = () => ({
  type: CLEAR_CHAT_HISTORY,
});
