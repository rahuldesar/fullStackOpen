import { createSlice } from '@reduxjs/toolkit'
import NewNote from '../components/NewNote';
import noteService from '../services/notes';  

//REPLACED BY createSlice
//
// const noteReducer = (state = initialState , action) => {
//   console.log('ACTION: ', action);
//   switch (action.type) {
//     case 'NEW_NOTE':{
//       //action= {type, data} && action.data = {content,importance,id}
//       state = [...state, action.data];
//       return state;
//     }
    
//     case 'TOGGLE_IMPORTANCE':{
//       //action = {type, data} , action.data = {id}
//       const id = action.data.id;
//       const noteToChange = state.find( note => note.id === id);
//       const changedNote = { 
//         ...noteToChange,
//         important : !noteToChange.important
//       };
//       return state.map(note => 
//         note.id !== id ? note : changedNote
//       );
//     };
    
//     default:
//     return state;
//   }
// };

// const generateId = () => Number((Math.random()*1_000_000).toFixed(0));

// *** Functions that create actions are called action creators. ***
// export const createNote = ( content ) => {
//   return{
//     type : 'NEW_NOTE',
//     data : {
//       content,
//       important : false,
//       id: generateId()
//     }
//   };
// };

// export const toggleImportanceOf = ( id ) => {
//   return { 
//     type : 'TOGGLE_IMPORTANCE',
//     data : { id }
//   }
// }

const noteSlice = createSlice({
  name: 'notes',
  initialState : [],
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )     
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action){
      return action.payload;
    }
  },
})

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = content => {
  return async dispatch => {
    dispatch(appendNote(NewNote));
  };
};

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer