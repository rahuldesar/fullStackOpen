import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  //get sorted list of anecdotes from store.
  // const anecdotes = useSelector(state => state.anecdotes.sort((a,b) => b.votes - a.votes)); 
  const yoAnecdotes = useSelector(({anecdotes}) => anecdotes); 
  const filter = useSelector (({filter}) => filter);
  console.log("filter ", filter);


  const voteHandler = ( anecdote ) => {
    dispatch(voteAnecdote( anecdote ));
    dispatch(setNotification (`you voted ${anecdote.content} `, 5));
    
  }

  const tempAnecdotes = [...yoAnecdotes];
  const newAnecdotes = tempAnecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

  // newAnecdotes.filter(anecdote => anecdote.includes(filter));
  // let countriesList = countries.filter(country => country.name.common.toLowerCase().includes((event.target.value).toLowerCase()));
  //   setCountriesToShow(countriesList);
  
  return(
    <ul>
      {newAnecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={ () => voteHandler(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </ul>
  )
}


export default AnecdoteList;