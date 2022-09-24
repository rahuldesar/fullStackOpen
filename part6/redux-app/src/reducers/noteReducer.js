import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    content: 'reducer defines how redux works',
    important: true,
    id:1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id:2,
  }
]

//REPLACED BY createSlice

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

const generateId = () => Number((Math.random()*1_000_000).toFixed(0));

  // Functions that create actions are called action creators.
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
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload
      // redux toolkit uses Immer library, which uses the mutated state to produce new immutable state
      // SO we can use PUSH even though it violates reducer's immutability principle.
      state.push({
        content,
        important: false,
        id: generateId(),
      })
    },
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
    }
  },
})

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer