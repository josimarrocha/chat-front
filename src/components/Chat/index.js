import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import Posts from './Posts'
import { newMessage } from '../../reducers/posts/actionsCreators'
import { loadingConversations } from '../../reducers/conversations/actionsCreators'
import SendMessage from './SendMessage'
import { ContainerChat } from './styles'

const Chat = ({ userActive, newMessage, loadingConversations }) => {
  useEffect(() => {
    const socket = io('http://localhost:3333')
    socket.on('newMessage', message => {
      newMessage(message)
      loadingConversations()
    })
  }, [])
  return (
    <ContainerChat>
      {userActive.hasOwnProperty('_id') && <Posts idConversation={userActive.idConversation} />}
      {userActive.hasOwnProperty('_id') && <SendMessage />}
    </ContainerChat>
  )
}
const mapStateToProps = state => ({
  userActive: state.posts.userActive
})
export default connect(mapStateToProps, { newMessage, loadingConversations })(Chat)
