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


let timeoutId ;
export const setNotification = ( notification , time = 4 ) => {
  return async dispatch => {
    if(timeoutId !== undefined) clearTimeout(timeoutId);
    dispatch(createNotification(notification));
    
    timeoutId = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000);
  }
}