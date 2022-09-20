import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login';
import Notification from './components/Notification';
import './index.css';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  // const [newBlog, setNewBlog] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notification, setNotification] = useState([]);

  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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


  const handleNewBlogCreate = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
  
    blogService
      .create(blogObject)
      .then(returnedNote => {
        debugger;
        setBlogs(blogs.concat(returnedNote));
        
        setTitle('');
        setAuthor('');
        setUrl('');
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
      }

      )
        
      

    setTimeout(() => {
      setNotification([]);
    }, 4000);
  }

  const blogForm = () => {
    return(
      <form onSubmit={handleNewBlogCreate}>
        <div>
          Title : 
          <input type="text" value={title} name="Title"
          onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author : 
          <input type="text" value={author} name="Author"
          onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url :
          <input type="text" value={url} name="URL"
          onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit"> Create </button>
      </form>
    )
  }

  const blogList = () => {
    return(
      <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    )
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

  return (
    <div>
      <Notification notification={ notification } />

      {
        user === null?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p> {user.name} logged in</p>
          <div>
            <button onClick={handleLogout}> Logout </button>
          </div>
          { blogForm() }
          { blogList() }
        </div>
      }
    </div>
  )
}

export default App
