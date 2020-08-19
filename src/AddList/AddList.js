import React, { Component } from 'react'
import ShopLaterForm from '../ShopLaterForm/ShopLaterForm'
import ApiContext from '../ApiContext'
import config from '../config'
//import './AddList.css'

export default class AddList extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const newList = {
      name: e.target['list-name'].value,
      content: e.target['list-content'].value,
      folderId: e.target['list-folder-id'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/lists`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newList),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(list => {
        this.context.addList(list)
        this.props.history.push(`/folder/${list.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddList'>
        <h2>Create a list</h2>
        <ShopLaterForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='list-name-input'>
              Name
            </label>
            <input type='text' id='list-name-input' name='list-name' />
          </div>
          <div className='field'>
            <label htmlFor='list-content-input'>
              Content
            </label>
            <textarea id='list-content-input' name='list-content' />
          </div>
          <div className='field'>
            <label htmlFor='list-folder-select'>
              Folder
            </label>
            <select id='list-folder-select' name='list-folder-id'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add list
            </button>
          </div>
        </ShopLaterForm>
      </section>
    )
  }
}
