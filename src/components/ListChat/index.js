import React, { useState } from 'react'
import { connect } from 'react-redux'
import UserChat from './UserChat'
import Confirm from '../Confirm'
import { cleanPosts } from '../../reducers/posts/actionsCreators'
import { loadingConversations } from '../../reducers/conversations/actionsCreators'
import { searchUser } from '../../reducers/userInfo/actionsCreators'
import { ContainerList } from './styles'

const ListChat = ({ listConversations, cleanPosts, loadingConversations, searchUser }) => {
  const [isShowConfirm, setIsShowConfirm] = useState(false)
  const [deleteUser, setDeleteUser] = useState({})

  const deleteConversation = async () => {
    await cleanPosts(deleteUser)
    loadingConversations()
    setIsShowConfirm(false)
  }

  return (
    <>
      {isShowConfirm &&
        <Confirm
          deleteConversation={deleteConversation}
          setIsShowConfirm={setIsShowConfirm} />
      }
      <ContainerList>
        <div className="content">
          {!listConversations.contacts.length ?
            <div className='add-user'>
              Sua lista de conversas está vazia<br />
            </div>
            :
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
          }
        </div>
      </ContainerList>

    </>
  )
}

const mapStateToProps = state => ({
  listConversations: state.listConversations
})

export default connect(mapStateToProps, { cleanPosts, loadingConversations, searchUser })(ListChat)
