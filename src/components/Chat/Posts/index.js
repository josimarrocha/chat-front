import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import socket, { url } from '../../../config/socket.io'
import { newMessage, previousPosts } from '../../../reducers/posts/actionsCreators'
import Message from '../Message'
import { ContainerPosts } from './styles'

let idsMessages = {}
let page = 0

const Posts = ({ posts, userInfo, idConversation, containerChatRef, positionLine, messagesNotRead, previousPosts, setUrlPreviewImage, setLoadingMessages, newMessage, loadingMessages }) => {
  let socketnewMessage = io(url)
  useEffect(() => {
    page = 0
    containerChatRef.current.style.opacity = 0
    containerChatRef.current.scrollTop = 0
    if (!messagesNotRead) {
      containerChatRef.current.scrollTop += 99999
      containerChatRef.current.style.opacity = 1
      initialConversation()
    } else {
      containerChatRef.current.scrollTop = 0
      setWarningMessageNotRead(true)
    }

    containerChatRef.current.style.opacity = 1
    initialConversation()
  }, [idConversation])

  useEffect(() => {
    socketnewMessage.on('newMessage', async (message) => {
      await newMessage(message)
      initialConversation()
      if (containerChatRef.current.scrollHeight - containerChatRef.current.scrollTop - 100 < 650) {
        containerChatRef.current.scrollTop = 99999
      } else {
        setWarningMessageNotRead(false)
      }
    })
  }, [])

  const createElementWarningMessage = (messages) => {
    let warningMessage = document.createElement('span')
    warningMessage.textContent = 'Mensagen(s) não visualizada(s)'
    warningMessage.classList.add('warningMessage')
    messages.insertAdjacentElement('afterbegin', warningMessage)
  }

  const setWarningMessageNotRead = (scroll) => {
    const messages = document.querySelectorAll('[data-js="viewed:false"]')[0]
    if (messages) {
      let positionMessage = messages.getBoundingClientRect().top
      containerChatRef.current.style.opacity = 1
      createElementWarningMessage(messages)
      if (scroll) containerChatRef.current.scrollTop = (positionMessage - positionLine.bottom) + 100
    }
  }

  const initialConversation = () => {
    if (containerChatRef.current.scrollHeight === containerChatRef.current.clientHeight) {
      const messages = document.querySelectorAll('[data-js="viewed:false"]')
      if (messages) {
        Object.keys(idsMessages).forEach(id => {
          messages.forEach(async message => {
            if (message.getBoundingClientRect().top < positionLine.bottom) {
              socket.emit('registerMessageViewed', id)
            }
          })
        })
        idsMessages = {}
      }
      containerChatRef.current.style.opacity = 1
    }
  }

  const registerIdsMessages = (message) => {
    let isUserContact = message.from.toString() !== userInfo._id
      ? true : message.to.toString() !== userInfo._id
        ? true : false

    if (isUserContact && !message.viewed) {
      idsMessages = {
        ...idsMessages,
        [message._id]: message._id
      }
    }
  }
  const postsPrevious = async (e) => {
    const { totalPages, page: pageActual, nextPage } = posts[idConversation]
    if (pageActual < totalPages && page !== pageActual) {
      page = pageActual
      setLoadingMessages(true)
      await previousPosts(idConversation, nextPage)
      setTimeout(() => {
        setLoadingMessages(false)
      }, 500)
      return
    }
    if (pageActual === totalPages) page = 0
  }

  const messagesViewed = async (e) => {
    if (Object.keys(idsMessages).length > 0) {
      const messages = document.querySelectorAll('[data-js="viewed:false"]')
      messages.forEach(message => {
        if (idsMessages[message.getAttribute('data-id-message')]) {
          let id = idsMessages[message.getAttribute('data-id-message')]
          if (message.getBoundingClientRect().top < positionLine.bottom) {
            let { [id]: key, ...tail } = idsMessages
            idsMessages = { ...tail }
            socket.emit('registerMessageViewed', id)
          }
        }
      })
    }
    if (e.currentTarget.scrollTop < 150) {
      let firstElement = containerChatRef.current.childNodes[1]
      await postsPrevious(e)
      if (loadingMessages) {
        containerChatRef.current.scrollTop = positionLine.top + firstElement.getBoundingClientRect().top
      }
    }
  }

  return (
    <ContainerPosts ref={containerChatRef} onScroll={messagesViewed}>
      {posts[idConversation].posts.map(message => {
        registerIdsMessages(message)
        return (
          <Message
            key={message._id}
            setUrlPreviewImage={setUrlPreviewImage}
            isIdUserLogged={message.from.toString() === userInfo._id}
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
  messagesNotRead: state.posts.userActive.messagesNotRead
})

export default connect(mapStateToProps, { newMessage, previousPosts })(Posts)
