import { createSlice } from '@reduxjs/toolkit';

const notificationSlice =  createSlice({
  name : 'notifications',
  initialState: '',
  reducers : {
    createNotification(state,action){
      return action.payload;
    },
    resetNotification(state, action){
      return ('');
    }
  }
})
export default notificationSlice.reducer;

export const { createNotification, resetNotification} = notificationSlice.actions;

export const setNotification = ( notification , time = 4 ) => {
  return async dispatch => {
    dispatch(createNotification(notification));
    
    setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000);
  }
}