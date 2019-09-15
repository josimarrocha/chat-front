import React, { useState } from 'react'
import { connect } from 'react-redux'
import UserChat from '../ListChat/UserChat'
import { searchUser } from '../../reducers/userInfo/actionsCreators'
import { ContainerSearch } from './styles'

const SearchUser = ({ searchUsers, searchUser }) => {
  const [inputText, setInpuntText] = useState('')

  const search = (e) => {
    const input = e.target
    searchUser(input.value)
  }

  return (
    <ContainerSearch>
      <form action="">
        <input type="text"
          placeholder='Pesquisar usuários'
          name='input'
          autoComplete='off'
          onChange={search}
        />
        <ul>
          {searchUsers.map(user => (
            <UserChat
              key={`search:${user._id}`}
              search={true}
              userChat={user}
            />
          ))}
        </ul>
      </form>
    </ContainerSearch>
  )
}

const mapStateToProps = state => ({
  searchUsers: state.userInfo.serachUsers
})

export default connect(mapStateToProps, { searchUser })(SearchUser)
