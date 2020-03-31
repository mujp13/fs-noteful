import React, { Component } from  'react';
import NotefulContext from './NotefulContext';
import config from './config'
import './EditNote.css';

const Required = () => (
  <span className='EditNote__required'>*</span>
)

class EditNote extends Component {

  static contextType = NotefulContext;

  state = {
    error: null,
    id: '',
    note_name: '',
    folderid: '',
    content: ''
  };

  componentDidMount() {
    const { noteId } = this.props.match.params
    fetch(config.API_ENDPOINT + `/${noteId}`, {
      method: 'GET'
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))

        return res.json()
      })
      .then(responseData => {
        this.setState({
          id: responseData.id,
          note_name: responseData.note_name,
          folderid: responseData.folderid,
          content: responseData.content
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  handleChangeName = e => {
    this.setState({ note_name: e.target.value })
  };

  handleChangefolderid = e => {
    this.setState({ folderid: e.target.value })
  };

  handleChangeContent = e => {
    this.setState({ content: e.target.value })
  };

  handleSubmit = e => {
    e.preventDefault()
    const { noteId } = this.props.match.params
    const { id, note_name, folderid, content } = this.state
    const newNote = { id, note_name, folderid, content }
    fetch(config.API_ENDPOINT + `/${noteId}`, {
      method: 'PATCH',
      body: JSON.stringify(newNote),
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.resetFields(newNote)
        this.context.updateNote(newNote)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || '',
      note_name: newFields.note_name || '',
      folderid: newFields.folderid || '',
      content: newFields.content || ''
    })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  render() {
    const { error, note_name, folderid, content } = this.state
    return (
      <section className='EditNote'>
        <h2>Edit note</h2>
        <form
          className='EditNote__form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditNote__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <input
            type='hidden'
            name='id'
          />
          <div>
            <label htmlFor='note__name'>
              Note Name
              {' '}
              <Required />
            </label>
            <input
              type='note__name'
              name='note__name'
              id='note__name'
              placeholder='Name of note!'
              required
              value={note_name}
              onChange={this.handleChangeName}
            />
          </div>
          <div>
            <label htmlFor='url'>
              Folder ID
              {' '}
              <Required />
            </label>
            <input
              type='folderid'
              name='folderid'
              id='folderid'
              placeholder='1: Important, 2: Spangley, 3: Super'
              required
              value={folderid}
              onChange={this.handleChangefolderid}
            />
          </div>
          <div>
            <label htmlFor='content'>
              Content
            </label>
            <textarea
              name='content'
              id='content'
              value={content}
              onChange={this.handleChangeContent}
            />
          </div>
          <div className='EditNote__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditNote;