import React, { useState } from 'react'
import { connect } from 'react-redux'
import UserChat from './UserChat'
import Confirm from '../Confirm'
import { cleanPosts } from '../../reducers/posts/actionsCreators'
import { loadingConversations } from '../../reducers/conversations/actionsCreators'
import { ContainerList } from './styles'

const ListChat = ({ listConversations, cleanPosts, loadingConversations }) => {
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const [deleteUser, setDeleteUser] = useState({})

  const deleteConversation = async () => {
    await cleanPosts(deleteUser)
    loadingConversations()
    setIsShowConfirm(false)
  }
  return (
    <>
      {isShowConfirm && <Confirm
        deleteConversation={deleteConversation}
        setIsShowConfirm={setIsShowConfirm} />
      }
      <ContainerList>
        <div className="content">
          <ul className="list-conversas">
            {listConversations.contacts.map(conversation => (
              <UserChat
                key={conversation.user._id}
                userChat={conversation.user}
                lastUpdate={conversation.updatedAt}
                idConversation={conversation.idConversation}
                messagesNotRead={conversation.messagesNotRead}
                setDeleteUser={setDeleteUser}
                setIsShowConfirm={setIsShowConfirm}
              />
            ))}
          </ul>

        </div>
      </ContainerList>

    </>
  )
}

const mapStateToProps = state => ({
  listConversations: state.listConversations
})

export default connect(mapStateToProps, { cleanPosts, loadingConversations })(ListChat)
