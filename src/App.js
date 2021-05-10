// Libraries imported
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Styles and other components
import './App.css';
import NoteThumb from './components/NoteThumb';
import NoteEditor from './components/NoteEditor';

function App() {

  const [noteList, setNoteList] = useState([]);
  const [selectedNote, setSelectedNote] = useState();

  const downloadNotes = () => {
    console.log(`Downloading all the notes...`);
    axios.get('/api/notes').then((response) => {
      setNoteList(response.data);
      setSelectedNote(response.data[0]);
    }).catch((err) => {
      console.error(`Cannot fetch notes! ${err}`);
    })
  };

  const addNote = async () => {
    try {
      const response = await axios.post('/api/note', { message: "Please edit this message", summary: "New Note" });
      console.log(`After note creation ${JSON.stringify(response.data)}`)
      setNoteList(previousList => [ response.data[0], ...previousList ] );
    } catch(error) {
      console.error(`Cannot fetch notes! ${error}`);
    }
  };

  const afterEditingHandler = (newNote) => {
    // Function called by the editor after some component was edited
    setSelectedNote(newNote);
    // Updating the list on the left
    setNoteList(previousList => previousList.map( (note) => note.id === newNote.id ? newNote : note ));
  }

  const afterDeletingHandler = async (noteObject) => {
    console.log(`Trying to delete note ${JSON.stringify(noteObject)}`);
    if (noteObject) {
      try {
        // deleting the object in the database
        const response = await axios.delete(`/api/note/${noteObject.id}`);
        // If everything was OK, deleting the object from the list on the right-hand side, 
        // then selecting the first item remaining
        if (response.status === 201) {
          // Success
          setNoteList(previousList => previousList.filter( (note) => note.id !== noteObject.id ));
          setSelectedNote(noteList[0].id === noteObject.id? noteList[1] : noteList[0]);
        } else {
          console.error(`Error during the note deletion process`)
        }
      } catch(err) {
        console.error(`Error during the API call of note deletion`);
        console.error(`Error: ${err}`);
      }

    }

  }

  useEffect(() => {
    // At first rendering we will call a FETCH to the API in order to get all the notes
    downloadNotes();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
       <h1>Welcome to Blu Note </h1>
      </header>
      <div id="mainContainer">
        <aside>
          <div className="buttonPanel">
            <button onClick={addNote}>Add Note</button>
            <button onClick={downloadNotes}>Refresh</button>
          </div>
          <div id="noteList">
            {noteList.map( (note, index) => <NoteThumb note={note} key={index} noteSelectHandler={setSelectedNote}/> )}
          </div>
        </aside>
        <main>
            <NoteEditor note={selectedNote} afterEditingHandler={afterEditingHandler} afterDeletingHandler={afterDeletingHandler} />
        </main>
      </div>
    </div>
  );
}

export default App;
