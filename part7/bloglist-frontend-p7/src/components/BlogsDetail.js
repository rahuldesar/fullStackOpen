// import { Link } from "react-router-dom";
import { useField } from '../hooks/newBlogHook';
import { useDispatch } from 'react-redux';
import { likeBlog, newCommentBlog } from '../reducers/blogsReducer';
import { setNotification, clearNotification } from '../reducers/notificationReducer';


const BlogsDetail = ({ blog }) => {
  const dispatch = useDispatch();
  console.log('blog',blog);
  const comment = useField('text');
  const comments = blog.comments;
  console.log('🚀 ~ file: BlogsDetail.js ~ line 13 ~ BlogsDetail ~ comments', comments);



  const handleComment = (e) => {
    e.preventDefault();
    dispatch(newCommentBlog(blog, comment.value));
    dispatch(setNotification([
      `ADDED COMMENT : ${comment.value} `,
      'success',
    ]));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 4000);
    comment.reset('');
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

  const showComments = ()  => {
    if(comments.length ===0 )
      return ( <> </>);
    else {
      return(
        <>
          <b><u> SOME TESTIMONIALS </u></b>
          {comments.map(comment =>
            <div key={comment}>{comment}</div>
          )}
        </>
      );
    };
  };



  return (
    <div>
      <h3> {blog.title} </h3>
      <a href={blog.url}> {blog.url} </a>
      <p> LIKES : {blog.likes}
        <button onClick={handleLike}> LIKE </button>
      </p>
      <p>Added By : {blog.user.name} </p>

      <div>
        <div>
          {showComments()}
        </div>

        <form onSubmit={handleComment}>
          <input type="text" placeholder="Please share your thought" {...comment} reset=''/>
          <br />
          <button type='submit'> COMMENT </button>
        </form>
      </div>
    </div>
  );
};

export default BlogsDetail;