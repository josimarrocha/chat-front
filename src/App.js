import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { updateStatus } from './reducers/conversations/actionsCreators'
import { loginUser } from './reducers/userInfo/actionsCreators'
import Chat from './pages/Chat'

const socket = io('http://localhost:3333')
let timer
let verifyStatus = false
function App({ loginUser, userActive, updateStatus, statusActiveUser }) {
  const [testStattus, setTestStatus] = useState({})
  useEffect(() => {
    if (userActive.hasOwnProperty('_id')) {
      clearInterval(timer)
      timer = setInterval(() => {
        socket.emit('verifyStatus', userActive._id)
      }, 3000)
    }
    setTestStatus(statusActiveUser)
  }, [userActive])

  useEffect(() => {
    socket.on('status', status => {
      if (statusActiveUser.status.hasOwnProperty('_id') && verifyStatus || userActive._id === status.userId) {

        if (statusActiveUser.status.userId !== status.userId && statusActiveUser.status.status !== status.status || statusActiveUser.status.status === status.status) {
          verifyStatus = null
          updateStatus(status)
          return false
        }
      } else if (verifyStatus === false) {
        !verifyStatus && updateStatus(status)
        verifyStatus = true
        return false
      }
      verifyStatus = true
    })
    console.log('dsds')
  }, [userActive])

  return (
    <div className="App">
      <Chat />
    </div>
  );
}
const mapStateToProps = state => ({
  userActive: state.posts.userActive,
  statusActiveUser: state.listConversations
})

export default connect(mapStateToProps, { loginUser, updateStatus })(App)
