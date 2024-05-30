import Note from './components/Note'
import React, { useEffect, useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [showImportant, setShowImportant] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/notes'; 
 
  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setNotes(data))
  }, [apiUrl])

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changedNote)
    })
      .then(response => response.json())
      .then(data => {
        setNotes(notes.map(note => note.id !== id ? note : data))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowImportant(!showImportant)}>
        {showImportant ? 'Show All' : 'Show Important'}
      </button>
      <ul>
        {notes.map(note => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportance = {() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App