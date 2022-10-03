import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const UserBlogList = () => {

  const usersAll = useSelector(state => state.allUsers);

  // console.log('🚀 ~ file: UserBlogCount.js ~ line 16 ~ UserBlogList ~ usersAll', usersAll);

  if(usersAll === null) {
    return (
      <div>
        <h3>Error retrieving Users.</h3>
        <Link to="/"> HOME PAGE </Link>
      </div>
    );
  } else {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>username</th>
              <th>Name</th>
              <th>Blogs Created</th>
            </tr>
            {usersAll.map((user) => {
              return (
                <tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                  <td>{user.name}</td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

};

export default UserBlogList;