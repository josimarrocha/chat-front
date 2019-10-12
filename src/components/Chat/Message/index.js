import React from 'react'
import getHours from '../../../config/getHours'
import { ContainerMessage } from './styles'

const Message = ({ isIdUserLogged, message, setUrlPreviewImage }) => {

  return (
    <ContainerMessage
      isIdUserLogged={isIdUserLogged}
      data-id-message={message._id}
      data-js={!isIdUserLogged && `viewed:${message.viewed}`}
      isImg={false}>
      {message &&
        <div className="content-message">
          {message.imagePath && <div className="content-img">
            <img
              onClick={() => setUrlPreviewImage(message.imagePath)}
              src={message.imagePath}
              alt="" />
          </div>}
          <div>
            <p>{message.message}</p>
            <span className='hour'>
              {getHours(message.createdAt, 'posts')}
            </span>
          </div>
        </div>
      }
    </ContainerMessage>
  )
}

export default Message
