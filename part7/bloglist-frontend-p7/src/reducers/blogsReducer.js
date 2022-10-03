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

export const newCommentBlog = (blogToChange , comment) => {
  return async dispatch => {
    const changedBlog = {
      ...blogToChange,
      comments : blogToChange.comments.concat(comment),
      user : blogToChange.user.id,
    };
    console.log(changedBlog);
    const newBlog= await blogService.update(changedBlog.id, changedBlog);
    dispatch(updateBlogs(newBlog));
  };
};
