import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { updateStatus } from '../../reducers/conversations/actionsCreators'
import { loginUser } from '../../reducers/userInfo/actionsCreators'
import { loadingConversations } from '../../reducers/conversations/actionsCreators'
import InfoUser from '../../components/InfoUser'
import Posts from '../../components/Chat'
import ListChat from '../../components/ListChat'
import Auth from '../../components/Auth'
import { ContainerChat } from './styles'

const socket = io('http://localhost:3333')
// userInfo.hasOwnProperty('user') && socket.emit('online', userInfo.user._id)

const Chat = ({ userInfo, updateStatus, loadingConversations, loginUser }) => {
  const [isLogged, setIsLogged] = useState(null)
  useEffect(() => {
    const infoUsuario = JSON.parse(localStorage.getItem('@chat@'))

    if (infoUsuario) {
      setIsLogged(true)
      loadingConversations()
      loginUser()
    } else {
      setIsLogged(false)
    }
  }, [])

  window.addEventListener('beforeunload', function () {
    socket.emit('off', userInfo.user._id)
    return ''
  })

  return (
    <ContainerChat>
      {isLogged === false && <Auth />}

      {isLogged && <>
        {/* info user and search users */}
        <InfoUser socket={socket} />
        {/* Component message */}
        <Posts />
        {/* Component list users */}
        <ListChat />
      </>}
    </ContainerChat>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  listConversations: state.listConversations,
  userActive: state.posts.userActive
})

export default connect(mapStateToProps, { updateStatus, loadingConversations, loginUser })(Chat)
