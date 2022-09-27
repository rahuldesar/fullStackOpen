import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
// import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch();

  //Create new anecdote with textvalue from input box with name = "newAnecdote",
  // id is generated with another fxn, and vote is set to zero as default.
  const createNewAnecdote = async (event) => {
    event.preventDefault();
    let content = event.target.newAnecdote.value;
    event.target.newAnecdote.value = '';

    props.createAnecdote(content);
    props.setNotification(`you added "${content}"`, 3);
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

export default connect(
  null,
  { setNotification, createAnecdote}
)(AnecdoteForm);