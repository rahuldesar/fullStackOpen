import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import usersAllReducer from './reducers/usersAllReducer';


const store = configureStore({
  reducer : {
    blogs : blogsReducer,
    notification : notificationReducer,
    user : userReducer,
    allUsers : usersAllReducer,
  }
});

// store.dispatch({ type: 'blogs/setBlogs', payload: 'Redux Toolkit is awesome!' });

console.log(store.getState());
export default store;