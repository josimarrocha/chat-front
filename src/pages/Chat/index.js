import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { updateStatus } from '../../reducers/conversations/actionsCreators'
import { loginUser, getInfoUserLogged } from '../../reducers/userInfo/actionsCreators'
import { loadingConversations } from '../../reducers/conversations/actionsCreators'
import InfoUser from '../../components/InfoUser'
import Posts from '../../components/Chat'
import ListChat from '../../components/ListChat'
import Auth from '../../components/Auth'
import { ContainerChat } from './styles'
import socket from '../../config/socket.io'
let timer

const Chat = ({ userInfo, loadingConversations, userActive, updateStatus, getInfoUserLogged }) => {
  const [isLogged, setIsLogged] = useState(null)
  const [isInitialStatusUpdate, setIsInitialStatusUpdate] = useState(false)

  useEffect(() => {
    const getUserInfo = async () => {
      const token = JSON.parse(localStorage.getItem('@chat@'))
      if (token) {
        setIsLogged(true)
        getInfoUserLogged()
        loadingConversations()
      } else {
        setIsLogged(false)
      }
    }
    getUserInfo()
  }, [])

  useEffect(() => {
    if (userActive.hasOwnProperty('_id')) {
      clearInterval(timer)
      timer = setInterval(() => {
        socket.emit('verifyStatus', userActive._id)
      }, 3000)
    }
  }, [userActive])

  useEffect(() => {
    if (!isInitialStatusUpdate) {
      updateStatus()
      setIsInitialStatusUpdate(true)
    }
  }, [userActive])

  userInfo._id && window.addEventListener('beforeunload', function () {
    socket.emit('off', userInfo._id)
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
  userActive: state.posts.userActive
})

export default connect(mapStateToProps, { updateStatus, loadingConversations, loginUser, getInfoUserLogged })(Chat)
