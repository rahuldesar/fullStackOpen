import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store';
import App from './App';
import { Provider } from 'react-redux';

store.subscribe( () =>
  console.log('SUBSCRIPTION update: ', store.getState())
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <App />
  </Provider>
);
