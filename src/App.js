// Libraries imported
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Styles and other components
import './App.css';
import NoteThumb from './components/NoteThumb';

function App() {

  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    // At first rendering we will call a FETCH to the API in order to get all the notes
    console.log(`Downloading all the notes...`);
    axios.get('/api/notes').then((response) => {
      setNoteList(response.data);
    }).catch((err) => {
      console.error(`Cannot fetch notes! ${err}`);
    })

  }, []);

  return (
    <div className="App">
      <header className="App-header">
       <h1>Welcome to Blu Note </h1>
      </header>
      <div id="mainContainer">
        <aside>
          <div className="buttonPanel">
            <button>Add Note </button>
            <button>Delete Note</button>
          </div>
          <div id="noteList">
            {noteList.map( (note) => <NoteThumb note={note} /> )}
          </div>
        </aside>
        <main>
          <h2> Note title / summary </h2>
          <p> Main Note content </p>
          <div className="buttonPanel">
            <button> Save Note </button>
            <button> Delete Note </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
