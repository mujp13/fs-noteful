import React, { Component } from 'react';
import NotefulContext from './NotefulContext';
import './AddFolder.css';
import PropTypes from 'prop-types';

class AddFolder extends Component {
  static contextType = NotefulContext;
  
  state = {
    error: null
  };

  handleSubmit = e => {
    e.preventDefault();
    // get the form fields from the event
    const { name } = e.target;
    const folder = {
      name: name.value
    }

    this.setState({ error: null });

    fetch('http://localhost:8000/api/folders', {
      method: 'POST',
      body: JSON.stringify(folder),
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
        this.context.addFolder(data)
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

    return (
      <section className="AddFolder">
        <h2>Create a folder</h2>
        <form 
          className="AddFolder__form" 
          onSubmit={this.handleSubmit}
        >
          <div className="AddFolder__error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor="name">Folder Name </label>
            <input type="text" name="name" id="name" placeholder="Name of folder" required />
          </div>
          <div className="AddFolder__buttons">
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

export default AddFolder;

AddFolder.propTypes = {
  folder: PropTypes.string.isRequired
};