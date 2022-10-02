import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store';
import App from './App';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';

store.subscribe( () =>
  console.log('SUBSCRIPTION update: ', store.getState())
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
