import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Picker } from 'emoji-mart'
import { loadingConversations } from '../../../reducers/conversations/actionsCreators'
import 'emoji-mart/css/emoji-mart.css'
import api from '../../../config/api'
import { ContainerSend, PreviewImg } from './styles'

const SendMessage = ({ userActive, loadingConversations }) => {
  const [messageText, setMessageText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [fileImg, setFileImg] = useState(null)

  const sendMessage = async (e) => {
    e.preventDefault()
    if (messageText || fileImg) {
      const data = new FormData()
      data.append('userId', userActive._id)
      data.append('message', messageText)
      data.append('image', fileImg ? fileImg : '')
      await api.post('conversation/message', data)

      await loadingConversations()
      setMessageText('')
      setFileImg(null)
    }
  }

  const addEmoji = (e) => {
    let emoji = e.native;
    setMessageText(messageText + emoji)
  }

  return (
    <ContainerSend>
      {fileImg && <PreviewImg>
        <div className="header">
          <div className="image-name">
            <p>{fileImg.name}</p>
          </div>
          <div className="close" onClick={() => setFileImg(null)}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="img-content">
          <img src={URL.createObjectURL(fileImg)} alt="" />
        </div>
      </PreviewImg>}
      <div className="message-content">
        {showEmoji && <Picker
          onSelect={addEmoji}
          set={'google'}
          style={{ position: 'absolute', bottom: '80px', left: 0, zIndex: 20 }}
        />}
        <textarea
          cols="50"
          rows="2"
          placeholder='Escreva uma mensagem'
          value={messageText}
          onChange={({ target }) => setMessageText(target.value)}
        />
      </div>
      <input type="file" name="" id="#file" hidden onChange={({ target: { files } }) => setFileImg(files[0])} />

      <div className="icons">
        <i className="far fa-laugh" onClick={() => setShowEmoji(!showEmoji)} />
        <label htmlFor="#file">
          <i className="fas fa-image" />
        </label>
      </div>
      <div className="btn-send">
        <a href="/" onClick={sendMessage}>Enviar</a>
      </div>
    </ContainerSend>
  )
}

const mapStateToProps = state => ({
  userActive: state.posts.userActive,
  listConversations: state.listConversations
})

export default connect(mapStateToProps, { loadingConversations })(SendMessage)
