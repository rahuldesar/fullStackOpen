import Blog from './Blog';
import { useSelector } from 'react-redux';




const BlogList = ( ) => {
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  // console.log('BLOGLIST BLOGS',blogs);

  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}

            user={user}
          />
        ))}
    </div>
  );
};

export default BlogList;
