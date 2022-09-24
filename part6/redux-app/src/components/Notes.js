import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick}) => {
  return(
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important? 'important' : ''} </strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector( ({filter , notes}) => {
    if( filter === 'ALL') return notes;
    else if ( filter === 'IMPORTANT') return (notes.filter(note => note.important));
    else return (notes.filter(note => !note.important));
  });

  return(
    <ul>
      {notes.map(note => 
        <Note 
          key = { note.id }
          note = { note }
          handleClick = { () => dispatch(toggleImportanceOf(note.id)) }
        />
        )}
    </ul>
  )
}

export default Notes;