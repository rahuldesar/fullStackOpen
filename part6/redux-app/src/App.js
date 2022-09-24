import React from 'react';
import ReactDOM from 'react-dom/client';

import { createStore } from 'redux';

// whole state of the application is stored into one JavaScript-object in the store

const action = {
  type: 'INCREMENT',
  payload: '',
}

// state of the application is defined using a reducer

const somethingReducer = (state , action) => {
  switch(action.type){
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
    }
  

}


const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default: // if none of the above matches, code comes here
      return state;
  }
};

const store = createStore(counterReducer);

// store.subscribe(() => {
//   const storeNow = store.getState()
//   console.log(storeNow)
// })



const App = () => {
  return (
    <div>
    <div>
      {store.getState()}
    </div>
    <button 
      onClick={e => store.dispatch({ type: 'INCREMENT' })}
    >
      plus
    </button>
    <button
      onClick={e => store.dispatch({ type: 'DECREMENT' })}
    >
      minus
    </button>
    <button 
      onClick={e => store.dispatch({ type: 'ZERO' })}
    >
      zero
    </button>
  </div>
  );
}

export default App;
