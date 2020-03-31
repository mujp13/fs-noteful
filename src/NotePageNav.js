import React, { Component } from 'react';
import NotefulContext from './NotefulContext'
import './NotePageNav.css';

export default class NotePageNav extends Component {
  static contextType = NotefulContext;

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  render() {
    const { notes } = this.context;
    
    const note = notes.find(note => 
      note.id === this.props.match.params.noteId
    )
    const selectedFolder = this.context.folders.find(folder =>
      folder.id === note.folderid
    )

    return (
      <div className='note-page-nav'>
        <button
          onClick={this.handleClickCancel}
        >
          Go back
        </button>
        <p>{selectedFolder.folder_name}</p>
      </div>
    )
  }
}