import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';

import { ALL_PERSONS } from './queries';

const Notify= ({ errorMessage }) => {
  if(!errorMessage){
    return null;
  };
  return(
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = ( ) => {
  const [errorMessage, setErrorMessage] = useState(null);
  console.log("🚀 ~ file: App.js ~ line 20 ~ App ~ errorMessage", errorMessage)

  const result = useQuery(ALL_PERSONS);
  
  if(result.loading){
    return <div> LOADING RESULTS... </div> 
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  console.log(result.data.allPersons);
  
  return(
    <div>
      <Notify errorMessage = {errorMessage} />
      <Persons persons = { result.data.allPersons } />
      <PersonForm setError = {notify}/>
      <PhoneForm setError = {notify} />
    </div>
  )
};




export default App;