// import { useDispatch, useSelector } from 'react-redux'

import { connect } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick}) => {
  return(
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important? 'important' : ''} </strong>
    </li>
  )
}

const Notes = (props) => {
  
  // const dispatch = useDispatch();
  

  //______________________________________________________________
  //REPLACING THIS WITH LEGACY STYLE CODE -> CONNECT
  //-------------------------------------------------------------- 
  // const dispatch = useDispatch();
  // const notes = useSelector( ({filter , notes}) => {
  //   if( filter === 'ALL')
  //     return notes;
  //   else if ( filter === 'IMPORTANT')
  //     return (notes.filter(note => note.important));
  //   else
  //     return (notes.filter(note => !note.important));
  // });
  //--------------------------------------------------------------

  return(
    <ul>
      {props.notes.map(note => 
        <Note 
          key = { note.id }
          note = { note }
          handleClick = { () => props.toggleImportanceOf(note.id) }
        />
        )}
    </ul>
  )
}

// REPLACING WITH LEGACY CODE
// export default Notes;


const mapStateToProps = (state) => {
  if ( state.filter === 'ALL' ) {
    return {
      notes: state.notes
    }
  };
  return {
    notes: (state.filter  === 'IMPORTANT' 
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
    )
  };
};

const mapDispatchToProps = { 
  toggleImportanceOf,
}

const ConnectedNotes = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Notes);
export default ConnectedNotes;