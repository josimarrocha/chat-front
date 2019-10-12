import React, { useState } from 'react'
import { connect } from 'react-redux'
import api from '../../../config/api'
import getHours from '../../../config/getHours'
import { loadingPosts } from '../../../reducers/posts/actionsCreators'
import { updateStatus } from '../../../reducers/conversations/actionsCreators'
import { UserConversation } from './styles'

const UserChat = ({ userChat, loadingPosts, search, listConversations, lastUpdate, updateStatus, userActive, posts, messagesNotRead, setIsShowConfirm, setDeleteUser, idConversation, setShowList }) => {
  const [isMenuOptions, setIsMenuOptions] = useState(false)

  const createConversation = async (userId) => {
    console.log('teste')
    const isCreatedConversation = listConversations.contacts.some(conversation => conversation.user._id === userId)
    if (!isCreatedConversation) {
      const { data } = await api.post('/create/conversation', { userId })
      await loadingPosts({ ...userChat, idConversation: data.idConversation })
      if (userActive.hasOwnProperty('_id')) {
        if (userActive._id === userId) return false
        updateStatus(true)
        return true
      }
    }
  }

  const handleClickList = async (idConversation) => {
    if (!userActive.hasOwnProperty('_id')) {
      await loadingPosts({ ...userChat, idConversation, messagesNotRead })
      return false
    }
    if (userActive.hasOwnProperty('_id')) {
      if (userActive._id.toString() === userChat._id.toString() && posts[idConversation]) {
        return false
      }
      await loadingPosts({ ...userChat, idConversation, messagesNotRead })
      updateStatus(true)
    }
  }

  return (
    <UserConversation
      onClick={() => {
        listConversations.contacts.length === 0
          ? createConversation(userChat._id)
          : listConversations.contacts.every(item => item.user._id === userChat._id
            ? handleClickList(item.idConversation)
            : createConversation(userChat._id))
        search && setShowList(false)
      }}>
      <div className="user-image">
        <img src={userChat.imageProfile ? userChat.imageProfile : 'images/userDefault.png'} alt="" />
      </div>
      <div className="user-info">
        <div className="user-name">
          <h4>{userChat.name.length >= 18 ? userChat.name.substring(0, 18) + '...' : userChat.name}</h4>
          <p>{userChat.username}</p>
          {!search && !!messagesNotRead && <span className='messages-not-read'>
            {messagesNotRead}
          </span>}
        </div>
      </div>
      {!search &&
        <>
          <div className="last-update">
            <span>{getHours(lastUpdate, 'list')}</span>
          </div>
          <div className="btn-user-options"
            onClick={() => setIsMenuOptions(!isMenuOptions)}
            onMouseLeave={() => setIsMenuOptions(false)}>
            <i className="fas fa-ellipsis-v"></i>
            {isMenuOptions && <ul className='user-options'>
              <li onClick={() => {
                setIsShowConfirm(true)
                setDeleteUser({
                  idUser: userChat._id,
                  idConversation
                })
              }}>Excluir contato</li>
            </ul>}
          </div>
        </>
      }
    </UserConversation>
  )
}

const mapStateToProps = state => ({
  listConversations: state.listConversations,
  userActive: state.posts.userActive,
  posts: state.posts.posts
})

export default connect(mapStateToProps, { loadingPosts, updateStatus })(UserChat)
