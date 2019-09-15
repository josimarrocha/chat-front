import React from 'react'
import { connect } from 'react-redux'
import api from '../../../config/api'
import getHours from '../../../config/getHours'
import { loadingPosts } from '../../../reducers/posts/actionsCreators'
import { updateStatus } from '../../../reducers/conversations/actionsCreators'
import { UserConversation } from './styles'

const UserChat = ({ userChat, loadingPosts, search, listConversations, lastUpdate, updateStatus }) => {

  const createConversation = async (userId) => {
    const isCreatedConversation = listConversations.contacts.some(conversation => conversation.user._id === userId)
    if (!isCreatedConversation) {
      const { data } = await api.post('/create/conversation', { userId })
      await loadingPosts({ ...userChat, idConversation: data._id })
      updateStatus({})
    }
  }

  const handleClickList = async (idConversation) => {
    await loadingPosts({ ...userChat, idConversation })
    updateStatus({})
  }

  return (
    <UserConversation
      onClick={() => listConversations.contacts.length === 0
        ? createConversation(userChat._id)
        : listConversations.contacts.every(item => item.user._id === userChat._id
          ? handleClickList(item.idConversation)
          : createConversation(userChat._id))}
      search={search}
    >
      <div className="user-image">
        <img src="images/img.jpg" alt="" />
      </div>
      <div className="user-info">
        <div className="user-name">
          <h4>{userChat.name}</h4>
          <p>{userChat.username}</p>
        </div>
      </div>
      {!search && <div className="last-update">
        <span>{getHours(lastUpdate)}</span>
      </div>}
    </UserConversation>
  )
}

const mapStateToProps = state => ({
  listConversations: state.listConversations
})

export default connect(mapStateToProps, { loadingPosts, updateStatus })(UserChat)
