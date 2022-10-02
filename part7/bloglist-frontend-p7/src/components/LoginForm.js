import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { setNotification, clearNotification } from '../reducers/notificationReducer';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      // console.log("USER FROM LOGIN ", user);
      dispatch(setUser(user));
      dispatch(setNotification([
        `Login Successful : Logged-in as ${username}`,
        'success',
      ]));
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification([
        `Login Failure as ${username}. Incorrect username or password`,
        'fail',
      ]));
    }

    setTimeout(() => {
      dispatch(clearNotification());
    }, 4000);
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          value={username}
          id="login-username"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          id="login-password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        {' '}
        LOGIN{' '}
      </button>
    </form>
  );
};


export default LoginForm;