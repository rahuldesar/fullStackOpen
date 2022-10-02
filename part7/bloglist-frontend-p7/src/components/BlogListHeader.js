import { useSelector, useDispatch } from 'react-redux';
import { setNotification, clearNotification } from '../reducers/notificationReducer';
import { resetUser } from '../reducers/userReducer';

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
    <>
      <h2>blogs</h2>
      <span>
        {user.username} ( {user.name} ) logged in{' '}
      </span>
      <button id="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default BlogListHeader;