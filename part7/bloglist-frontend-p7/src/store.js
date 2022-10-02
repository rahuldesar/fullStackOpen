import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';


const store = configureStore({
  reducer : {
    blogs : blogsReducer,
    notification : notificationReducer,
    user : userReducer,
  }
});

// store.dispatch({ type: 'blogs/setBlogs', payload: 'Redux Toolkit is awesome!' });

console.log(store.getState());
export default store;