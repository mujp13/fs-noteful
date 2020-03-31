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
    const { name, content, folderId } = e.target;
    const note = {
      name: name.value,
      content: content.value,
      folderId: folderId.value
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
        name.value = ''
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
            <label htmlfor="name">Name </label>
            <input type="text" name="name" id="name" placeholder="Name of folder" required />
          </div>
          <div className="field">
            <label htmlfor="content">Content </label>
            <textarea type="text" name="content" id="content"></textarea>
          </div>
          <div className="field">
            <label htmlfor="folderId">Folder </label>
            <select type="text" name="folderId" id="folderId">
              <option>...</option>
              {this.context.folders.map(folder =>
              <option value={folder.id}>{folder.name}</option>
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