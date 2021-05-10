import React, {useState, useRef} from 'react';
import axios from 'axios';

import './NoteEditor.css';

const NoteEditor = (props) => {

  const [isEditingMode, setEditingMode] = useState(false);
  const summaryInputRef = useRef();
  const messageInputRef = useRef();

  const editButtonHandler = () => {
    setEditingMode(true);
  }
  const saveButtonHandler = (event) => {
    
    if (isEditingMode) {
      // data Validation
      const noteSummary = summaryInputRef.current.value;
      const messageSummary = messageInputRef.current.value;
      // send HTTP query to the database
      axios.patch(`/api/note/${props.note.id}`, { summary: noteSummary, message: messageSummary })
        .then((response) => {
          props.afterEditingHandler(response.data[0]);
        }).catch((error) => {
          console.error(`Error in updating a note ${error}`)
        });

      // Notify the parent component that the list has changed
      
      setEditingMode(false);
    }
  }

  const displayJSX = <> 
                      <h2> {props.note? props.note.summary : 'Note Summary'}</h2>
                      <p> {props.note? props.note.message : 'Main Note Message'}</p>
                    </>;

  const editFormJSX = <> 
                        <label htmlFor="summaryInput">Enter the note summary:</label>
                        <input type="text" ref={summaryInputRef} maxlength="200" size="40" defaultValue={props.note? props.note.summary : ''}></input>
                        <label htmlFor="messageInput">Enter the note message:</label>
                        <textarea id="messageInput" ref={messageInputRef} name="messageInput" row="5" defaultValue={props.note? props.note.message: ''}></textarea>
                      </>;

  return (<article>
            <div className="buttonPanel">
              { isEditingMode? <button onClick={saveButtonHandler}>Save Note</button> : <button onClick={editButtonHandler}>Edit Note </button>}
              <button onClick={() => props.note ? props.afterDeletingHandler(props.note) : ''}> Delete Note </button>
            </div>
            { isEditingMode? editFormJSX : displayJSX}
          </article>)

};

export default NoteEditor;