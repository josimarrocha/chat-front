import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { PulseLoader } from 'react-spinners'
import { CSSTransition } from 'react-transition-group'
import Posts from './Posts'
import { updateMessageRead } from '../../reducers/posts/actionsCreators'
import { loadingConversations } from '../../reducers/conversations/actionsCreators'
import SendMessage from './SendMessage'
import { ContainerChat, LineScroll } from './styles'
import socketMessageRead, { url } from '../../config/socket.io'

let positionLine = {}
const Chat = ({ userActive, loadingConversations, updateMessageRead }) => {
  const [urlPreviewImage, setUrlPreviewImage] = useState("")
  const [loadingMessages, setLoadingMessages] = useState(false)
  const containerChatRef = useRef()
  const lineRefTop = useRef()
  const lineRefBottom = useRef()

  useEffect(() => {
    positionLine = {
      top: lineRefTop.current.getBoundingClientRect().bottom,
      bottom: lineRefBottom.current.getBoundingClientRect().top
    }
    const socket = io(url)
    socket.on('newMessage', async () => {
      setTimeout(() => loadingConversations(), 200)
    })
    socketMessageRead.on('messageRead', message => {
      setTimeout(() => updateMessageRead(message), 300)
    })
  }, [])

  useEffect(() => {
    renderContainerPosts()
  }, [userActive.idConversation])

  const renderContainerPosts = () => {
    return (
      <Posts
        positionLine={positionLine}
        idConversation={userActive.idConversation}
        containerChatRef={containerChatRef}
        setUrlPreviewImage={setUrlPreviewImage}
        setLoadingMessages={setLoadingMessages}
        loadingMessages={loadingMessages}
      />
    )
  }

  return (
    <>
      <CSSTransition
        in={!!urlPreviewImage}
        timeout={300}
        classNames='preview'
        unmountOnExit
      >
        <div className="preview-image">
          <div className="close-preview" onClick={() => setUrlPreviewImage(false)}>
            <i className="fas fa-times"></i>
          </div>
          <figure>
            {urlPreviewImage && <img src={urlPreviewImage} alt="" />}
          </figure>
        </div>
      </CSSTransition>
      <ContainerChat>
        <div className="loader-mensagens">
          <PulseLoader
            loading={loadingMessages}
            color='#7693d2'
          />
        </div>
        {userActive.hasOwnProperty('_id') && renderContainerPosts()}
        <LineScroll ref={lineRefTop} top={true} />
        <LineScroll ref={lineRefBottom} />
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
export default connect(mapStateToProps, { loadingConversations, updateMessageRead })(Chat)
