import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import socket, { url } from '../../../config/socket.io'
import { newMessage, previousPosts } from '../../../reducers/posts/actionsCreators'
import Message from '../Message'
import { ContainerPosts } from './styles'

let idsMessages = {}
let page = 0
const Posts = ({ posts, userInfo, idConversation, containerChatRef, positionLine, messagesNotRead, pageActual, nextPage, previousPosts, totalPages, setUrlPreviewImage, setLoadingMessages }) => {

  let socketnewMessage = io(url)
  useEffect(() => {
    page = 0
    containerChatRef.current.style.opacity = 0
    setTimeout(() => {
      if (!messagesNotRead) {
        containerChatRef.current.scrollTop += containerChatRef.current.scrollHeight
        containerChatRef.current.style.opacity = 1
        initialConversation()
      } else {
        if (containerChatRef.current.scrollHeight === containerChatRef.current.clientHeight) {
          containerChatRef.current.style.opacity = 1
          initialConversation()
          return
        }
        let warningMessage = document.createElement('span')
        warningMessage.textContent = 'Mensagen(s) não visualizada(s)'
        warningMessage.classList.add('warningMessage')
        const messages = document.querySelectorAll('[data-js="viewed:false"]')[0]
        let positionMessage = messages.getBoundingClientRect().top
        containerChatRef.current.scrollTop = (positionMessage - positionLine) + 100
        messages.insertAdjacentElement('afterbegin', warningMessage)
        containerChatRef.current.style.opacity = 1
      }
      socketnewMessage.on('newMessage', () => {
        if (containerChatRef.current.scrollHeight - containerChatRef.current.scrollTop - 100 < 600) {
          containerChatRef.current.scrollTop = containerChatRef.current.scrollHeight
        }
        initialConversation()
      })
    }, 180)

    initialConversation()
  }, [idConversation])

  const initialConversation = () => {
    if (containerChatRef.current.scrollHeight === containerChatRef.current.clientHeight) {
      const messages = document.querySelectorAll('[data-js="viewed:false"]')
      if (messages) {
        Object.keys(idsMessages).forEach(id => {
          messages.forEach(async message => {
            if (message.getBoundingClientRect().top < positionLine) {
              socket.emit('registerMessageViewed', id)
            }
          })
        })
        idsMessages = {}
      }
    }
  }
  const registerIdsMessages = (message) => {
    if (message.idUser.toString() !== userInfo._id && !message.viewed) {
      idsMessages = {
        ...idsMessages,
        [message._id]: message._id
      }
    }
  }

  const postsPrevious = async (e) => {
    if (e.currentTarget.scrollTop < 200) {
      if (pageActual < totalPages && page !== pageActual) {
        page = pageActual
        setLoadingMessages(true)
        await previousPosts(idConversation, nextPage)
        setTimeout(() => setLoadingMessages(false), 200)
        return
      }
    }
    if (pageActual === totalPages) page = 0
  }

  const messagesViewed = async (e) => {
    if (Object.keys(idsMessages).length > 0) {
      const messages = document.querySelectorAll('[data-js="viewed:false"]')
      messages.forEach(message => {
        if (idsMessages[message.getAttribute('data-id-message')]) {
          let id = idsMessages[message.getAttribute('data-id-message')]
          if (message.getBoundingClientRect().top < positionLine) {
            let { [id]: key, ...tail } = idsMessages
            idsMessages = {
              ...tail
            }
            socket.emit('registerMessageViewed', id)
          }
        }
      })
    }
    await postsPrevious(e)
  }

  return (
    <ContainerPosts ref={containerChatRef} onScroll={messagesViewed}>
      {posts[idConversation].map(message => {
        registerIdsMessages(message)
        return (
          <Message
            setUrlPreviewImage={setUrlPreviewImage}
            key={message._id}
            isIdUserLogged={message.idUser.toString() === userInfo._id}
            message={message}
          />
        )
      })}
    </ContainerPosts>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  posts: state.posts.posts,
  pageActual: state.posts.page,
  totalPages: state.posts.totalPages,
  nextPage: state.posts.nextPage,
  messagesNotRead: state.posts.userActive.messagesNotRead
})

export default connect(mapStateToProps, { newMessage, previousPosts })(Posts)
