import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import './Note.css';

function deleteNoteRequest(noteId, cb) {
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error;
        });
      }
      return res.json();
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      console.log({ data });
      cb(noteId);
    })
    .catch(error => {
      console.error(error);
    });
}

export default function Note({ note }) {
  return (
    <NotefulContext.Consumer>
      {context => (
        <div className="a-note">
          <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
            <p className="note-name">{note.note_name}</p>
          </Link>
          <Link to={`edit/${note.id}`} style={{ textDecoration: 'none' }}>
            Edit
          </Link>
          <button
            className="delete-button"
            onClick={() => {
              deleteNoteRequest(note.id, context.deleteNote);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </NotefulContext.Consumer>
  );
}

