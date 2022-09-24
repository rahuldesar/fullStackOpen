import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import noteReducer, { createNote }  from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';

import { filterChange } from './reducers/filterReducer';

const store = configureStore({
  reducer : {
    notes: noteReducer,
    filter: filterReducer,
  }
})
//VIEW REALTIME LOG OF STATE
console.log("STORE STATE : ", store.getState());
store.subscribe(() => 
console.log("STORE STATE : ", store.getState()));

store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = { store }>
    <App />
  </Provider>
)

