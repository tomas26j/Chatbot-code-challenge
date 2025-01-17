import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ChatBot from './components/ChatBot';
import Menu from './components/Menu';

const App = () => {
  return (
    <Provider store={store}>
      <ChatBot />
    </Provider>
  );
};

export default App;
