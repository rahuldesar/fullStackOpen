import { useState } from "react";

const BlogForm = ({ handleNewBlogCreate })  =>{

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleNewBlog = (event) =>{
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    handleNewBlogCreate(blogObject);

    setTitle('');
    setAuthor('');
    setUrl('');
  }
  
  
  return(
    <form onSubmit={handleNewBlog}>
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

export default BlogForm;