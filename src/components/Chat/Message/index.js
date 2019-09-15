import React, { useState } from 'react'
import getHours from '../../../config/getHours'
import { ContainerMessage } from './styles'

const Message = ({ idUser, message }) => {
  const [isPreview, setIsPreview] = useState(false)
  return (
    <ContainerMessage idUser={idUser} isImg={false} preview={isPreview}>
      {isPreview && <div className="close-preview" onClick={() => setIsPreview(false)}>
        <i className="fas fa-times"></i>
      </div>}
      {message &&
        <div className="content-message">
          {message.imagePath && <div className="content-img">
            <img
              onClick={() => setIsPreview(!isPreview)}
              src={`http://localhost:3333/files/${message.imagePath}`}
              alt="" />
          </div>}
          <div>
            <p>{message.message}</p>
            <span className='hour'>
              {getHours(message.createdAt)}
            </span>
          </div>
        </div>
      }
    </ContainerMessage>
  )
}

export default Message
