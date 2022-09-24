import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';


const AnecdoteList = () => {
  const dispatch = useDispatch();

  //get sorted list of anecdotes from store.
  const anecdotes = useSelector(state => state.sort((a,b) => b.votes - a.votes)); 
  const voteHandler = ( id ) => {
    dispatch(voteAnecdote( id ));
  }

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={ () => voteHandler(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </ul>
  )
}


export default AnecdoteList;