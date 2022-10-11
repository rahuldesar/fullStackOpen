import { useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';
import { PERSON_ADDED } from './queries';

import { ALL_PERSONS } from './queries';

export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false: seen.add(k);
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}




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
  const [token, setToken] = useState(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  useSubscription( PERSON_ADDED, { 
    onSubscriptionData : ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded;
      notify(`${addedPerson.name} added `);
      
      updateCache(client.cache, {query: ALL_PERSONS}, addedPerson);
    }
  });
  
  if(result.loading){
    return <div> LOADING RESULTS... </div> 
  };
  console.log(result.data.allPersons);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  
  
  if(!token){
    return(
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken = {setToken}
          setError = {notify}
        />
      </div>
    )
  }

  return(
    <div>
      <button onClick={logout}> Logout </button>
      <Notify errorMessage = {errorMessage} />
      <Persons persons = { result.data.allPersons } />
      <PersonForm setError = {notify}/>
      <PhoneForm setError = {notify} />
    </div>
  )
};




export default App;