import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers : {
    setBlogs(state, action){
      return action.payload;
    },
    updateBlogs(state, action){
      console.log(action.payload);
      const id = action.payload.id;
      return state.map(blog =>
        blog.id !== id? blog: action.payload);
    },
    appendBlog(state,action){
      return [...state, action.payload];
    },
    deleteBlog(state,action){
      console.log('DELETE BLOG ACTION Payload', action.payload);
      return state.filter((blog) => blog.id !== action.payload);
    }
  }
});


export default blogSlice.reducer;
export const { setBlogs, appendBlog, updateBlogs, deleteBlog }  = blogSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = blogToChange => {

  console.log(blogToChange);
  return async dispatch => {
    const changedBlog = {
      ...blogToChange,
      likes : blogToChange.likes + 1,
      user : blogToChange.user.id,
    };
    console.log(changedBlog);
    const newBlog= await blogService.update(changedBlog.id, changedBlog);
    dispatch(updateBlogs(newBlog));
  };
};

export const removeBlog = id => {
  console.log(id);
  return async dispatch => {
    await blogService.remove(id);
    dispatch(deleteBlog(id));
  };
};


// const handleNewBlogCreate = (blogObject) => {
//   blogFormRef.current.toggleVisibility();
//   blogService
//     .create(blogObject)
//     .then((returnedNote) => {
//       setBlogs(blogs.concat(returnedNote));
//       setNotification([
//         `Blog Added: ${returnedNote.title} - ${returnedNote.author} `,
//         'success',
//       ]);
//       console.log(notification);
//     })
//     .catch((error) => {
//       setNotification(
//         'Adding Blog failure. Check if data is in correct format.',
//         'fail'
//       );
//       console.log(notification);
//       console.log(error);
//     });
//   setTimeout(() => {
//     setNotification([]);
//   }, 4000);
// };



// const handleBlogUpdate = (id, newBlog) => {
//   console.log('newBlog', newBlog);
//   blogService
//     .update(id, newBlog)
//     .then((returnedBlog) => {
//       console.log('returnedBlog', returnedBlog);
//       setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
//       setNotification([
//         `Liked: ${newBlog.title} - ${newBlog.author} `,
//         'success',
//       ]);
//     })
//     .catch((error) => {
//       setNotification(`Updating Blog failure. error : ${error}`, 'fail');
//     });
//   setTimeout(() => {
//     setNotification([]);
//   }, 4000);
// };

// const handleBlogRemove = (id) => {
//   const blog = blogs.find((n) => n.id === id);
//   const deleteBlog = { ...blog };
//   let tempName = deleteBlog.title;
//   let tempAuthor = deleteBlog.author;
//   if (window.confirm(`Remove Blog : ${tempName} by ${tempAuthor}`)) {
//     blogService
//       .remove(deleteBlog.id)
//       .then(() => setNotification([`${tempName} removed`, 'success']))
//       .catch((error) => {
//         setNotification([
//           `Note '${tempName}' was already removed from server. Error ; ${error}`,
//           'fail',
//         ]);
//       });
//     setTimeout(() => {
//       setNotification([]);
//     }, 4000);
//     let tempBlogs = blogs.filter((blog) => blog.id !== id);
//     setBlogs(tempBlogs);
//   }
// };