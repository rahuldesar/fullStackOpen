import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const UserBlogList = () => {
  const blogs = useSelector(state => state.blogs);
  console.log(blogs);
  let blogObject = {};
  let blogUserArr = [];


  for (const blog of blogs) {
    let username = blog.user.username;
    if( !(username in blogObject)) {
      blogObject[username] = 1;
    } else {
      blogObject[username]++;
    };
  };

  for (const key in blogObject) {
    let count = blogObject[key];
    let temp = blogs.find(blog => blog.user.username === key);
    let name = temp.user.name;
    let id = temp.user.id;
    console.log(temp);
    blogUserArr.push( { username:key, name, count, id } );
  }

  console.log(blogUserArr);

  return (
    <div>


      <table>
        <tr>
          <th>username</th>
          <th>Name</th>
          <th>Blogs Created</th>
        </tr>
        {blogUserArr.map((user) => {
          return (
            <tr key={user.id}>
              <td><Link to="/user/:user.id">{user.username}</Link></td>
              <td>{user.name}</td>
              <td>{user.count}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default UserBlogList;