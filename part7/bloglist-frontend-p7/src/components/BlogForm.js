import { useField } from '../hooks/newBlogHook';
import { createBlog } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';
import { setNotification, clearNotification } from '../reducers/notificationReducer';
import '../static/blogForm.css';


const BlogForm = ( ) => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');
  // console.log(title, author, url);

  const dispatch = useDispatch();

  const handleNewBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    dispatch(createBlog(blogObject));
    dispatch(setNotification([
      `Blog Added: ${blogObject.title} - ${blogObject.author} `,
      'success',
    ]));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 4000);
    resetSubmit();
  };

  const resetSubmit = () => {
    title.reset();
    author.reset();
    url.reset();
  };


  return (
    <form className='submit-form' onSubmit={handleNewBlog}>
      <div>
        Title :
        <input
          id="blogForm-title"
          placeholder="Blog Title"
          name="Title"
          {...title}
          reset = ''
        />
      </div>
      <div>
        author :
        <input
          id="blogForm-author"
          placeholder="Blog Title"
          name="Author"
          {...author}
          reset = ''
        />
      </div>
      <div>
        url :
        <input
          id="blogForm-url"
          placeholder="Blog Title"
          name="URL"
          {...url}
          reset = ''
        />
      </div>
      <button id="blogForm-submit" type="submit">
        {' '}
        Create{' '}
      </button>
    </form>
  );
};

export default BlogForm;
