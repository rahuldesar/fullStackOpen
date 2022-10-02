import { createSlice } from '@reduxjs/toolkit';
// import blogService from '../services/blogs';


const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers : {
    setNotification(state, action){
      return action.payload;
    },
    clearNotification() {
      return [];
    }
  }
});


export default notificationSlice.reducer;
export const { setNotification, clearNotification }  = notificationSlice.actions;
