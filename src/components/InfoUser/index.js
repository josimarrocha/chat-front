import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { loadingConversations } from '../../reducers/conversations/actionsCreators'
import UserMenuConfig from './UserConfig'
import SearchUser from '../SearchUser'
import { ConatinerInfo } from './styles'

const InfoUser = ({ userInfo, userActive, socket, status, loadingConversations }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const renderStatus = () => {
    if (status.hasOwnProperty('_id')) {
      return (
        status.status && <small className='user-status'>
          <b>Online</b>
        </small>
      )
    }
  }
  console.log('info')
  return (
    <ConatinerInfo>
      <div className="user-conversation">
        {userActive.hasOwnProperty('_id') &&
          <>
            <div className="user-img conversation">
              <img src="images/img.jpg" alt="" />
            </div>
            <div className="user-info conversation">
              {userActive && <h4>{userActive.name}</h4>}
              {userActive && <p>{userActive.username}</p>}
              {renderStatus()}
            </div>
          </>
        }
      </div>
      <SearchUser />
      <div className="user-logged"
        onClick={() => setIsMenuVisible(!isMenuVisible)}
        onMouseLeave={() => setIsMenuVisible(false)}
      >
        <div>
          <i className="fas fa-sort-down"></i>
          <div className="user-info logged">
            {userInfo.user && <h3>{userInfo.user.name}</h3>}
            {userInfo.user && <p>{userInfo.user.email}</p>}
          </div>
          <div className="user-img logged">
            <img src="images/img.jpg" alt="" />
          </div>
          {isMenuVisible && <UserMenuConfig />}
        </div>
      </div>
    </ConatinerInfo>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  status: state.listConversations.status,
  userActive: state.posts.userActive
})

export default connect(mapStateToProps, { loadingConversations })(InfoUser)
