import { useEffect, useRef } from 'react';
import blogService from './services/blogs';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import { setUser } from './reducers/userReducer';
import LoginForm from './components/LoginForm';
import BlogListHeader from './components/BlogListHeader';
import {
  Routes,
  Route,
  // Link,
  // Navigate,
  // useNavigate,
  // useMatch
} from 'react-router-dom';
import UserBlogList from './components/UserBlogList';



const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const user = useSelector(state => state.user);

  return (
    <div className="app">
      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <BlogListHeader />
          <h2> BLOG APP</h2>
          <br />
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <br />
          <Routes>
            <Route path="/" element = {
              <div>
                <BlogList />
              </div>
            }/>
            <Route path="/users" element ={<UserBlogList/>}/>
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
