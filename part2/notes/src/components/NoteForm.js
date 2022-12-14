import { useState } from 'react';

const NoteForm = ({ createNote }) => {
  // onSubmit, handleChange, value
  const [newNote, setNewNote] = useState('');

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: false,
    });

    setNewNote('');
  };
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          id = "new-note1"
          value={newNote}
          onChange={handleChange}
          placeholder='note-input'
        />
        <input
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;