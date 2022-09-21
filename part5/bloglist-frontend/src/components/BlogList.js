import Blog from './Blog';

const BlogList = ({ blogs, handleBlogUpdate, handleBlogRemove, user }) => {


  return(
    <>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          handleBlogUpdate={ handleBlogUpdate }
          handleBlogRemove={ handleBlogRemove }
          user = { user }
        />

      )}
    </>
  );
};

export default BlogList;