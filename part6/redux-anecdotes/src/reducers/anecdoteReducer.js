import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';


//Random ID generator used to create new Anecdote.
// const getId = () => (100000 * Math.random()).toFixed(0)

//Boiler plate of anecdote
// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

//changine array of strings to array of objects.
// const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice =  createSlice({
  name : 'anecdotes',
  initialState : [],
  reducers : {
    updateAnecdote(state, action) {
      console.log(action.payload);
      const id = action.payload.id;
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote: action.payload
      );
    },
    setAnecdotes(state, action){
      return action.payload;
    },
    appendAnecdote(state, action){
      state.push(action.payload);
    },

  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes =await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  }
}

export const voteAnecdote = anecdoteToChange => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdoteToChange,
      votes : anecdoteToChange.votes + 1,
    }
    const newAnecdote = await anecdoteService.update(changedAnecdote.id, changedAnecdote);
    console.log("🚀 ~ file: anecdoteReducer.js ~ line 62 ~ voteAnecdote ~ newAnecdote", newAnecdote)
    dispatch(updateAnecdote(newAnecdote));
  }
};

// export const voteHandler = id => {
//   const noteToChange = state.find(n => n.id === id)
//   const changedNote = { 
//     ...noteToChange, 
//     important: !noteToChange.important 
//   }
//   return state.map(note =>
//     note.id !== id ? note : changedNote 
//   )     
// }



// anecdoteService.getAll()
      // .then(anecdotes => dispatch(setAnecdotes(anecdotes)


// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'NEW_ANECDOTE':{
//       //action= {type, data} && action.data = {content, votes, id}
//       state = [...state, action.data];
//       return state;
//     }
    
//     case 'VOTE_ANECDOTE': {
//       //action = {type, data} , action.data = {id}
//       const id = action.data.id;
//       const anecdoteToChange = state.find(anecdote => anecdote.id === id);
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes : anecdoteToChange.votes + 1
//       } 
      
//       return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote);
//     }
    
//     default:
//     return state;
//   }
// }

//extra Functions (ACTION CREATORS?)  to export 
//USE THIS TO CREATE ACTION FOR EASIER DISPATCH.

// export const createAnecdote = ( content ) => {
//   return{
//     type : 'NEW_ANECDOTE',
//     data : {
//       content,
//       votes : 0,
//       id: getId()
//     }
//   };
// };

// export const voteAnecdote= ( id ) => {
//   return { 
//     type : 'VOTE_ANECDOTE',
//     data : { id }
//   }
// }

//default export so that we can import like `import anecdoteReducer from './reducers/anecdoteReducer'`
export default anecdoteSlice.reducer;

export const { setAnecdotes, appendAnecdote, updateAnecdote} = anecdoteSlice.actions;