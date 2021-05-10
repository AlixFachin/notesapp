import React from 'react';
import './NoteThumb.css';

const NoteThumb = (props) => {

  return (<div className="noteThumb" onClick={() => {props.noteSelectHandler(props.note)} } >
            <p> { props.note.summary } </p>
          </div>)

};

export default NoteThumb;
