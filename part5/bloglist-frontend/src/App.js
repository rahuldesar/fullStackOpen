import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState([]);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(unsortedBlogs =>
      unsortedBlogs.sort((a,b) => b.likes - a.likes)
    )
    .then(sortedBlogs => 
      setBlogs(sortedBlogs))  
  }, [])

  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
      if(loggedUserJSON){
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        blogService.setToken(user.token);
      }
  }, []);

  const handleLogin = async ( event ) => {
    event.preventDefault();

    try{
      const user = await loginService.login({
        username , password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      
      blogService.setToken(user.token);
      // console.log("USER FROM LOGIN ", user);
      setUser(user);
      setNotification(
        [`Login Successful : Logged-in as ${username}`,'success']
      );
      console.log(notification);
      setUsername('');
      setPassword('');

    } catch (exception) {
      setNotification(
        [`Login Failure as ${username}. Incorrect username or password`,'fail']
      );
      console.log(notification);

    }

    setTimeout(() => {
      setNotification([]);
    }, 4000);
  }

  const handleLogout =() => {
    let user = window.localStorage.getItem('loggedBlogappUser');
    user = JSON.parse(user);
    window.localStorage.removeItem('loggedBlogappUser');
    setNotification(
      [`Logout Sucessful for user ${user.name}`,'fail']
    );
    setTimeout(() => {
      setNotification([]);
    }, 4000);
    setUser(null);

    
  }

  const loginForm = () => {
    return(
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input type="text" value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          Password
          <input type="password" value={password} name="Password" 
          onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit"> LOGIN </button>
      </form>
    )
  };

  const handleNewBlogCreate = (blogObject) => {  
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote));
        setNotification(
          [`Blog Added: ${returnedNote.title} - ${returnedNote.author} `,'success']
        );
      console.log(notification);
      })
      .catch( error => {
        setNotification(
          `Adding Blog failure. Check if data is in correct format.`,'fail'
        );
      console.log(notification);
      console.log(error);
      })
    setTimeout(() => {
      setNotification([]);
    }, 4000);
  }

  const handleBlogUpdate = (id , newBlog) =>{
    console.log("newBlog",newBlog);
    blogService
      .update(id, newBlog)
      .then(returnedBlog => {
        console.log('returnedBlog', returnedBlog);
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog));
        setNotification(
          [`Liked: ${newBlog.title} - ${newBlog.author} `,'success']
        );
      })
      .catch( error => {
        setNotification(
          `Updating Blog failure.`,'fail'
        );
      })
      setTimeout(() => {
        setNotification([]);
      }, 4000);
  }

  const handleBlogRemove = (id) =>{
    const blog = blogs.find(n => n.id === id);
    const deleteBlog = { ...blog}
    let tempName = deleteBlog.title;
    let tempAuthor = deleteBlog.author;
    if (window.confirm(`Remove Blog : ${tempName} by ${tempAuthor}`)) {
      blogService.remove(deleteBlog.id)
      .then(() =>
        setNotification([`${tempName} removed`,'success'])
      )
      .catch(error => {
        setNotification([`Note '${tempName}' was already removed from server`,'fail']) 
        })
      setTimeout(() => {
        setNotification([])
      }, 4000);
      let tempBlogs = blogs.filter(blog => blog.id !== id);
      setBlogs(tempBlogs);
    } 
  }


  return (
    <div className='app'>
      <Notification notification={ notification } />

      {
        user === null?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <span>{user.username} ( {user.name} ) logged in    </span>
          <button onClick={handleLogout}> Logout </button>
          <br></br>
          <br></br>
        
          <Togglable buttonLabel='Create New Blog' ref ={blogFormRef}>
            <BlogForm  handleNewBlogCreate = { handleNewBlogCreate }  />
          </Togglable>
          <br></br>

          <BlogList 
          blogs = {blogs}
          handleBlogUpdate={ handleBlogUpdate } 
          handleBlogRemove = {handleBlogRemove}
          user = {user}
          />
        </div>
      }
    </div>
  )
}

export default App;
