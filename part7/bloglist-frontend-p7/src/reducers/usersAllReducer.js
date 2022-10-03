import { createSlice } from '@reduxjs/toolkit';
import  usersService from '../services/users';


let usersSlice = createSlice({
  name : 'allUsers',
  initialState : null,
  reducers : {
    setUsers(state, action){
      return action.payload;
    },
  }
});

export default usersSlice.reducer;
export const { setUsers }  = usersSlice.actions;

export const initializeUsers = () => {
  return async dispatch => {
    const blogs = await usersService.getAll();
    dispatch(setUsers(blogs));
  };
};
