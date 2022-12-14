import { useState } from 'react';

const BlogForm = ({ handleNewBlogCreate })  => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleNewBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };

    handleNewBlogCreate(blogObject);

    setTitle('');
    setAuthor('');
    setUrl('');
  };


  return(
    <form onSubmit={handleNewBlog}>
      <div>
        Title :
        <input type="text"
          id="blogForm-title"
          value={title} name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Blog Title'/>
      </div>
      <div>
        author :
        <input type="text"
          id="blogForm-author"
          value={author} name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='Blog Author'/>
      </div>
      <div>
        url :
        <input type="text"
          id="blogForm-url"
          value={url} name="URL"
          onChange={({ target }) => setUrl(target.value)}
          placeholder='Blog URL'/>
      </div>
      <button id="blogForm-submit" type="submit"> Create </button>
    </form>
  );
};

export default BlogForm;