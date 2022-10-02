import { createSlice } from '@reduxjs/toolkit';
// import loginService from '../services/login';


let userSlice = createSlice({
  name : 'user',
  initialState : null,
  reducers : {
    setUser(state, action){
      return action.payload;
    },
    resetUser( ){
      return null;
    },
  }
});

export default userSlice.reducer;
export const { setUser, resetUser } = userSlice.actions;

