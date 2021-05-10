import React from 'react';

const NoteThumb = (props) => {

  return (<div className="noteThumb">
            <p> { props.note.summary } </p>
          </div>)

};

export default NoteThumb;
