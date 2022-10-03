import { useState } from 'react';
import { setNotification, clearNotification } from '../reducers/notificationReducer';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';


const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    borderRadius: 10,
    borderColor: '#bab4b4',
    paddingTop: 10,
    paddingBottom: 8,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: 20,
    boxShadow:
      'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  };

  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  };

  const btnStyle = {
    paddingLeft: 50,
    paddingRight: 50,
  };

  const btnLikeStyle = {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
  };

  const [showAll, setShowAll] = useState(false);

  const toggleVisibility = () => {
    setShowAll(!showAll);
  };


  const handleLike = () => {
    dispatch(likeBlog(blog));
    dispatch(setNotification([
      `Liked: ${blog.title} -- ${blog.author} `,
      'success',
    ]));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 4000);
  };

  const handleRemove = () => {
    dispatch(removeBlog(blog.id));
  };


  if (!showAll) {
    return (
      <div style={{ ...blogStyle, ...flexContainer }}>
        <div>
          {blog.title} - {blog.author}
        </div>
        <button
          className="blog-view-button"
          style={btnStyle}
          onClick={toggleVisibility}
        >
          {' '}
          view{' '}
        </button>
      </div>
    );
  } else {
    return (
      <div data-attr="blog-wrapper" style={{ ...blogStyle, ...flexContainer }}>
        <div className="blog-heading">
          {blog.title} - {blog.author}
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
            <div data-attr="likes-wrapper">{blog.likes}</div>
            <button
              className="blog-like-button"
              style={btnLikeStyle}
              onClick={handleLike}
            >
              {' '}
              Like{' '}
            </button>
          </div>
          <div className="blog-username">
            {blog.user.username} - ( {blog.user.name} )
          </div>
          {user.username === blog.user.username ? (
            <button
              className="blog-remove-button"
              style={btnStyle}
              onClick={handleRemove}
            >
              {' '}
              Remove{' '}
            </button>
          ) : (
            <></>
          )}
        </div>
        <button
          className="blog-hide-button"
          style={btnStyle}
          onClick={toggleVisibility}
        >
          {' '}
          hide{' '}
        </button>
      </div>
    );
  }
};

export default Blog;
