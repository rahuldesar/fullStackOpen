import { createSlice } from '@reduxjs/toolkit';

const notificationSlice =  createSlice({
  name : 'notifications',
  initialState: '',
  reducers : {
    voteNotification(state, action){
      const content = action.payload;
      return (`you voted "${content}"`);
    },
    createAnecdoteNotification(state,action){
      const content = action.payload;
      return (`you added "${content}"`);
    },
    resetNotification(state, action){
      return ('');
    }
  }
})
export default notificationSlice.reducer;

export const {voteNotification, createAnecdoteNotification, resetNotification} = notificationSlice.actions;