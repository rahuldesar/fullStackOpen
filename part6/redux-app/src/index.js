import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store';
import App from './App';
import { Provider } from 'react-redux';

//VIEW REALTIME LOG OF STATE
console.log("STORE STATE : ", store.getState());
store.subscribe(() => 
console.log("STORE STATE : ", store.getState()));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = { store }>
    <App />
  </Provider>
)

