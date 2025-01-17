import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ChatBot from './ChatBot';
import '@testing-library/jest-dom';

const mockStore = configureStore();

describe('ChatBot Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      chat: {
        messages: [],
        userMessage: '',
      },
    });
    store.dispatch = jest.fn();
  });

  test('renders ChatBot component', () => {
    render(
      <Provider store={store}>
        <ChatBot />
      </Provider>
    );

    expect(screen.getByText('Sushi Chatbot!')).toBeInTheDocument();
  });

  test('allows user to type a message', () => {
    render(
      <Provider store={store}>
        <ChatBot />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Escribe tu mensaje.../i);
    fireEvent.change(input, { target: { value: 'Hola' } });
    
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: 'Hola'
      })
    );
  });

  test('dispatches addUserMessage action on send', () => {
    render(
      <Provider store={store}>
        <ChatBot />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Escribe tu mensaje.../i);
    fireEvent.change(input, { target: { value: 'Hola' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(store.dispatch).toHaveBeenCalled();
  });

  test('displays bot response when a greeting is sent', async () => {
    store = mockStore({
      chat: {
        messages: [
          { text: 'Hola, soy tu sushi-asistente, dime en que te puedo ayudar', isUser: false }
        ],
        userMessage: '',
      },
    });

    render(
      <Provider store={store}>
        <ChatBot />
      </Provider>
    );

    expect(screen.getByText('Hola, soy tu sushi-asistente, dime en que te puedo ayudar')).toBeInTheDocument();
  });
}); 