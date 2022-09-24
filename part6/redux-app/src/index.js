import React from 'react';
import ReactDOM from 'react-dom/client';

import { createStore } from 'redux';
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

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map(note => 
          <li key={ note.id }>
            { note.content } <strong>{ note.important? 'important' : '' }</strong>
          </li>
        )}
      </ul>
      <button onClick={
        e =>store.dispatch({
          type:'NEW_NOTE',
          data: {
            content: 'testing button',
            important: true,
            id : Math.random()*100,
          }  
        }
      ) }> ADD NEW NOTE </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<App />)

renderApp()
store.subscribe(renderApp);