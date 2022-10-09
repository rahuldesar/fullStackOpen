import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setContext } from '@apollo/client/link/context';


import { ApolloClient, HttpLink, InMemoryCache, gql, ApolloProvider} from '@apollo/client';


const authLink = setContext((_ , { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token');
  return { 
    headers: {
      ...headers,
      authorization : token? `bearer ${token}`: null,
    }
  }
});

const httpLink = new HttpLink ({ uri: 'http://localhost:4000'});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

const query = gql`
  query{
    allPersons{
      name,
      phone,
      address {
        street,
        city
      }
      id
    }
  }
`

client.query({ query })
  .then((response) => {
    console.log("INDEX.JS RESPONSE QUERY : ",response.data);
  })

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client = {client}>
    <App />
  </ApolloProvider>
  )