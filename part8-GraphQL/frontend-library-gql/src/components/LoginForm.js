import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../queries';

const LoginForm = ({ setToken, setPage, show}) => {
  
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [login, result] = useMutation(LOGIN_USER,{
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  });


  
  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token',token);
      setPage("authors");
    }
  },[result.data]) //eslint-disable-line
  
  if(!show){return null};

  const handleLogin =( event ) =>{
    event.preventDefault();
    login({variables: {username, password}});
  }
  return(
    <div>
      <form onSubmit={handleLogin}>
        <div> USERNAME <input type="text" value={username}
          onChange={({ target }) => setUsername(target.value) }/>
        </div>
        <div> PASSWORD <input type="password" value={password}
          onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit"> LOGIN </button>
      </form>
    </div>
  )
}

export default LoginForm;