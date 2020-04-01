import React, { Component } from 'react';
import NotefulContext from './NotefulContext';
import './AddNote.css';
import PropTypes from 'prop-types';

class AddNote extends Component {
  static contextType = NotefulContext;
  
  state = {
    error: null
  };

  handleSubmit = e => {
    e.preventDefault();
    // get the form fields from the event
    const { note_name, content, folderid } = e.target;
    const note = {
      note_name: note_name.value,
      content: content.value,
      folderid: folderid.value
    }

    this.setState({ error: null });

    fetch('http://localhost:8000/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
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
        note_name.value = ''
        this.context.addNote(data)
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  handleClickCancel = () => {
    this.props.history.push('/');
  };

  render() {
    const { error } = this.state;
    console.log(this.context.folders)

    return (
      <section className="AddNote">
        <h2>Create a note</h2>
        <form 
          className="AddNote__form" 
          onSubmit={this.handleSubmit}
        >
          <div className="AddNote__error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <div className="field">
            <label htmlfor="note_name">Name </label>
            <input type="text" name="note_name" id="note_name" placeholder="Name of folder" required />
          </div>
          <div className="field">
            <label htmlfor="content">Content </label>
            <textarea type="text" name="content" id="content"></textarea>
          </div>
          <div className="field">
            <label htmlfor="folderid">Folder </label>
            <select type="text" name="folderid" id="folderid">
              <option>...</option>
              {this.context.folders.map(folder =>
              <option value={folder.id}>{folder.folder_name}</option>
            )}
            </select>
          </div>
          <div className="AddNote__buttons">
            <button type="button" onClick={this.handleClickCancel}>
              Cancel
            </button>{' '}
            <button type="submit">Save</button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddNote;

AddNote.propTypes = {
  note: PropTypes.string.isRequired
};