import React, { Component } from 'react';
import NotefulContext from './NotefulContext';
import { Link } from 'react-router-dom';
import './NotesPage.css';
import Note from './Note';
import PropTypes from 'prop-types';

export default class NotesPage extends Component {
  static contextType = NotefulContext;

  render() {
    const { notes } = this.context;
    const { folderid } = this.props.match.params;
    
    return (
      <div className="note-list-container">
        <ul className="note-list">
          {notes
            .filter(note => !folderid || folderid === note.folderid)
            .map(note => (
              <Note note={note} />
            ))}
        </ul>
        <Link to={'/add-note'}>
          Add note
        </Link>
      </div>
    );
  }
}


NotesPage.propTypes = {
  folders: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired
};