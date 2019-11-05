import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import UserChat from '../ListChat/UserChat'
import { searchUser } from '../../reducers/userInfo/actionsCreators'
import { ContainerSearch } from './styles'

const SearchUser = ({ searchUsers, searchUser }) => {
  const [showList, setShowList] = useState(false)
  const inputRef = useRef()

  const search = () => {
    const input = inputRef.current.value
    searchUser(input)
  }

  return (
    <ContainerSearch>
      <form action="">
        <input type="text"
          ref={inputRef}
          className='input-search'
          onFocus={() => setShowList(true)}
          onBlur={() => inputRef.current.value = ''}
          placeholder='Pesquisar usuários'
          name='input'
          autoComplete='off'
          onChange={search}
        />
        {showList && <ul>
          {searchUsers.map(user => (
            <UserChat
              key={`search:${user._id}`}
              search={true}
              userChat={user}
              setShowList={setShowList}
            />
          ))}
        </ul>}
      </form>
    </ContainerSearch>
  )
}

const mapStateToProps = state => ({
  searchUsers: state.userInfo.serachUsers
})

export default connect(mapStateToProps, { searchUser })(SearchUser)
