import React, { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Togglable from './components/Togglable';
import './index.css';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...');
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, []);

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };
    console.log(id, note , changedNote);
    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch( error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server. ERROR : ${error}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important);

  const checkLogin = async ( loginCredentials ) => {
    try{
      const user = await loginService.login(loginCredentials);

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );

      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage('Wrong Credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            checkLogin={checkLogin}
          />
        </Togglable> :
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note" ref ={noteFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      }

      <h1 >Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) =>
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  );
};

export default App;