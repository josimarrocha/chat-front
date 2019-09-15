import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import UserChat from './UserChat'
import { ContainerList } from './styles'

const ListChat = ({ listConversations, updateStatus }) => {
  return (
    <ContainerList>
      <ul className="list-conversas">
        {listConversations.contacts.map(conversation => (
          <UserChat
            key={conversation.user._id}
            userChat={conversation.user}
            lastUpdate={conversation.updatedAt}
          />
        ))}
      </ul>
    </ContainerList>
  )
}

const mapStateToProps = state => ({
  listConversations: state.listConversations
})

export default connect(mapStateToProps)(ListChat)
