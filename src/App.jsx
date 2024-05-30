import React, { useState, useEffect } from 'react';
import Note from './components/Note';



const App = () => {
  const [notes, setNotes] = useState([]);
  const [showImportant, setShowImportant] = useState(false);
  const [newNote, setNewNote] = useState('');
  const apiUrl = 'http://localhost:3001/api/notes';

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setNotes(data))
      .catch(error => console.error('Fetch error:', error));
  }, [apiUrl]);

  const toggleImportanceOf = (id) => {
    const url = `${apiUrl}/${id}`;
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changedNote)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(updatedNote => {
        setNotes(notes.map(note => note.id !== id ? note : updatedNote));
      })
      .catch(error => console.error('Update error:', error));
  };

  const addNote = (event) => {
    event.prevenDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    };
    
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(noteObject)
  })
    .then(response => response.json())
    .then(data => {
      setNotes(notes.concat(data));
      setNewNote('');
    })
    .catch(error => console.error('Add note error:', error));
  };

  //app para deleatar notas
  const deleteNote = (id) => {
    const url = `${apiUrl}/${id}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        setNotes(notes.filter(note => note.id !== id));
      })
      .catch(error => console.error('Delete error:', error));
  };

  const notesToShow = showImportant ? notes.filter(note => note.important) : notes;

  return (
    <>
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowImportant(!showImportant)}>
        {showImportant ? 'Show All' : 'Show Important'}
      </button>
      <ul>
        {notesToShow.map(note => <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
          deleteNote={() => deleteNote(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">Save</button>
      </form>
      </div>
      </>
  );
}

export default App;
