import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';
import './Note.css';

function deleteNoteRequest(noteId, cb) {
  fetch(`https://ancient-river-87952.herokuapp.com/api/notes/${noteId}`, {
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
    })
    .then(() => {
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

