import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { newMessage } from '../../../reducers/posts/actionsCreators'
import { loadingConversations } from '../../../reducers/conversations/actionsCreators'
import Message from '../Message'
import { ContainerPosts } from './styles'

const Posts = ({ posts, userInfo, idConversation }) => {

  useEffect(() => {
    const container = document.querySelector('.container')
    container.scrollTop = container.scrollHeight
    const socket = io('http://localhost:3333')
    socket.on('newMessage', () => {
      container.scrollTop = container.scrollHeight
    })
  }, [idConversation])

  return (
    <ContainerPosts className='container'>
      {posts[idConversation].map(message => (
        <Message
          key={message._id}
          idUser={message.idUser.toString() === userInfo.user._id}
          message={message}
        />
      ))}
    </ContainerPosts>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  posts: state.posts.posts
})

export default connect(mapStateToProps, { newMessage, loadingConversations })(Posts)
