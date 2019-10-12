import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { PulseLoader } from 'react-spinners'
import Posts from './Posts'
import { newMessage, updateMessageRead } from '../../reducers/posts/actionsCreators'
import { loadingConversations } from '../../reducers/conversations/actionsCreators'
import SendMessage from './SendMessage'
import { ContainerChat, MessageViewed } from './styles'
import socketMessageRead, { url } from '../../config/socket.io'

let positionLine
const Chat = ({ userActive, newMessage, loadingConversations, updateMessageRead }) => {
  const [urlPreviewImage, setUrlPreviewImage] = useState("")
  const [loadingMessages, setLoadingMessages] = useState(false)
  const containerChatRef = useRef()
  const lineRef = useRef()

  useEffect(() => {
    positionLine = lineRef.current.getBoundingClientRect().top
    const socket = io(url)
    socket.on('newMessage', async message => {
      await newMessage(message)
      setTimeout(() => loadingConversations(), 200)
    })
    socketMessageRead.on('messageRead', message => {
      updateMessageRead(message)
    })
  }, [])

  return (
    <>
      {urlPreviewImage &&
        <div className="preview-image">
          <div className="close-preview" onClick={() => setUrlPreviewImage(false)}>
            <i className="fas fa-times"></i>
          </div>
          <figure>
            <img src={urlPreviewImage} alt="" />
          </figure>
        </div>
      }
      <ContainerChat>
        <div className="loader-mensagens">
          <PulseLoader
            loading={loadingMessages}
            color='#7693d2'
          />
        </div>
        {userActive.hasOwnProperty('_id') &&
          <Posts
            positionLine={positionLine}
            idConversation={userActive.idConversation}
            containerChatRef={containerChatRef}
            setUrlPreviewImage={setUrlPreviewImage}
            setLoadingMessages={setLoadingMessages}
          />
        }
        <MessageViewed ref={lineRef} />
        {userActive.hasOwnProperty('_id')
          && <SendMessage containerChatRef={containerChatRef}
          />
        }
      </ContainerChat>
    </>
  )
}
const mapStateToProps = state => ({
  userActive: state.posts.userActive
})
export default connect(mapStateToProps, { newMessage, loadingConversations, updateMessageRead })(Chat)
