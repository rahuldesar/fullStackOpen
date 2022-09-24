

const noteReducer = (state = [{content: 'xxADDED BY REDUX REDUCER2xx', important: false, id: 1}] , action) => {
  switch (action.type) {
    case 'NEW_NOTE':{
      //action= {type, data} && action.data = {content,importance,id}
      state = [...state, action.data];
      return state;
    }
    
    case 'TOGGLE_IMPORTANCE':{
      //action = {type, data} , action.data = {id}
      const id = action.data.id;
      const noteToChange = state.find( note => note.id === id);
      const changedNote = { 
        ...noteToChange,
        important : !noteToChange.important
      };
      return state.map(note => 
        note.id !== id ? note : changedNote
      );
    };
    
    default:
    return state;
  }
};

export default noteReducer;