import Note from './components/Note'
import React, { useEffect, useState } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/notes'; 
 
  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setNotes(data))
  }, [apiUrl])

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App