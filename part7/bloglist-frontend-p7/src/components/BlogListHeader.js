import { useSelector, useDispatch } from 'react-redux';
import { setNotification, clearNotification } from '../reducers/notificationReducer';
import { resetUser } from '../reducers/userReducer';
import {
  // Routes,
  // Route,
  Link,
  // Navigate,
  // useNavigate,
  // useMatch
} from 'react-router-dom';


const BlogListHeader = ( ) => {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    let userData = window.localStorage.getItem('loggedBlogappUser');
    userData = JSON.parse(userData);
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(setNotification([`Logout Sucessful for user ${userData.name}`, 'fail']));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 4000);
    dispatch(resetUser());
  };

  return (
    <div>
      <Link to="/"> blogs </Link>
      <Link to="/users"> users </Link>
      <span>
        {user.username} ( {user.name} ) logged in{' '}
      </span>
      <button id="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default BlogListHeader;