import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import PromisePolyfill from 'promise-polyfill'


if (!window.Promise) {
  window.Promise = PromisePolyfill
}


const useNotes = (url) => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios.get(url).then(response => {
      setNotes(response.data)
    });
  }, [url]);
  return notes;
};


const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const notes = useNotes(BACKEND_URL);

  const handleClick = () => {
    setCounter(counter + 1 );
    setValues(values.concat(counter));
    console.log(values);
  }
  return (
    <div className="container">
      HELLO THERE
      <br />
      {counter}
      <br />
      {values}
      <br />
      <button onClick = {handleClick}> PRESS </button>
      <div>{notes.length} notes on server {BACKEND_URL}</div>
    </div>
  )
};

export default App;