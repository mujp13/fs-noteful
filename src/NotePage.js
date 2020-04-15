import React, { Component } from 'react';
import NotefulContext from './NotefulContext'
import './NotePage.css';

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

export default class NotePage extends Component {
  static contextType = NotefulContext;

  render() {
    const note = this.context.notes.find(p =>
      p.id === +this.props.match.params.noteId
    )

    if (!note) {
      return null
    }

    return (
      <NotefulContext.Consumer>
        {(context) => (
          <div className='note-content'>
            <div className='note-header'>
              <h2>{note.note_name}</h2>
              {note.modified ? <p>Date modified on {note.modified}</p>
                            : <p>(added by user)</p>
              }
            </div>
            <div className='note-desc'>
              <p>{note.content}</p>
            </div>
            <button
                className="delete-button"
                onClick={() => {
                  deleteNoteRequest(note.id, context.deleteNote)
                  this.props.history.push('/')
                }}
              >
                Delete
            </button>
          </div>
        )}
      </NotefulContext.Consumer>
    )
  }
}
