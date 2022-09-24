import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  //Create new anecdote with textvalue from input box with name = "newAnecdote",
  // id is generated with another fxn, and vote is set to zero as default.
  const createNewAnecdote = (event) => {
    event.preventDefault();
    let content = event.target.newAnecdote.value;
    event.target.newAnecdote.value = '';
    dispatch(createAnecdote(content));
  }
  return ( 
    <>
    <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div><input name="newAnecdote" />
        <button type='submit'>create</button>
        </div>
      </form>
    </>
  )
}

export default AnecdoteForm;