import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendBooks from './components/RecommendBooks'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();  
  }

  if(!token){
    return(
      <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>Login</button>
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <LoginForm show={page === 'login'} setToken = {setToken} setPage={setPage}/>
    </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <RecommendBooks show={page ==='recommend'} />

      
    </div>
  )
}

export default App
