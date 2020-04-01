import React, { Component } from 'react';
import NotefulContext from './NotefulContext'
import './NotePage.css';

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
      </div>
    )
  }
}
