import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NotefulContext from './NotefulContext'
import './FolderList.css';

export default class FolderList extends Component { 
  static contextType = NotefulContext;
  
  render() {
    const { folders } = this.context;
    return (
      <div className='folder-container'>
        <ul className='folder-list'>
          {folders.map(folder =>
          <li key={folder.id}>
            <Link to={`/folder/${folder.id}`} style={{ textDecoration: 'none' }}>
              {folder.folder_name}
            </Link>
          </li>
        )}
        </ul>
        <Link to={'/add-folder'}>
          Add folder
        </Link>
      </div>
    )
  }
}