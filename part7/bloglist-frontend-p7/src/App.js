import { useEffect, useRef } from 'react';
import blogService from './services/blogs';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import './static/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersAllReducer';
import { setUser } from './reducers/userReducer';
import LoginForm from './components/LoginForm';
import BlogListHeader from './components/BlogListHeader';
import {
  Routes,
  Route,
  // Link,
  Navigate,
  // useNavigate,
  useMatch
} from 'react-router-dom';
import UserBlogCount from './components/UserBlogCount';
import UserBlogsList from './components/UserBlogsList';
import BlogsDetail from './components/BlogsDetail';

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());

  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const userAll = useSelector(state => state.allUsers);

  const userById = (id) =>
    userAll.find(user => user.id === id);

  const blogById = (id) =>
    blogs.find(user => user.id === id);


  const matchUsers = useMatch('/users/:id');
  const userSelected = matchUsers? userById((matchUsers.params.id)): null;

  const matchBlog = useMatch('/blogs/:id');
  const blogSelected = matchBlog? blogById((matchBlog.params.id)): null;




  return (
    <div className="app">
      <Notification />

      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <BlogListHeader />
          <h2> BLOG APP</h2>
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

            <Route path="/users/:id" element={<UserBlogsList userSelected = {userSelected}/>} />
            <Route path="/blogs/:id" element={<BlogsDetail blog = {blogSelected}/>} />
            <Route path="/users" element ={<UserBlogCount/>}/>
            <Route path="/home" element={<Navigate replace to="/"/>} />
            <Route path="/blogs" element={<Navigate replace to="/"/>} />

          </Routes>
        </>
      )}
    </div>
  );
};

export default App;