import { Link } from 'react-router-dom';


const UserBlogsList = ({ userSelected }) => {

  // console.log('userSelected', userSelected);
  const blogs = userSelected.blogs;
  // console.log('yo', blogs);
  return (
    <div>
      <h3> {userSelected.name} </h3>
      <h4> ADDED BLOGS : </h4>
      {
        blogs.map((blog) => {
          return (
            <div key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </div>
          );
        })
      }

    </div>
  );
};

export default UserBlogsList;