import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import noteReducer from './reducers/noteReducer';


const store = createStore(noteReducer)
store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
})

store.dispatch({
  type:'NEW_NOTE',
  data:{
    content : 'ADDED BY REDUX REDUCER',
    important: false,
    id:2,
  }
});
store.dispatch({
  type:'NEW_NOTE',
  data:{
    content : 'ADDED BY REDUX REDUCER2',
    important: true,
    id:3,
  }
});



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = { store }>
    <App />
  </Provider>
)
