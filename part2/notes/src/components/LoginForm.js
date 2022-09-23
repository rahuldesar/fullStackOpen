import { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ checkLogin }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    checkLogin({
      username: username,
      password: password
    });
  };
  return(
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input id="login-username" type="text" value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        Password
        <input id="login-password" type="password" value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button id="login-button" type="submit"> LOGIN </button>
    </form>
  );
};

LoginForm.proTypes = {
  checkLogin: PropTypes.func.isRequired,
};

export default LoginForm;