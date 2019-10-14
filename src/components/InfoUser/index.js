import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import gethours from '../../config/getHours'
import UserMenuConfig from './UserConfig'
import SearchUser from '../SearchUser'
import socket from '../../config/socket.io'
import { updateImageProfile, updateNameUser } from '../../reducers/userInfo/actionsCreators'
import { ConatinerInfo, PreviewImage, ModalUpdateName, Actions } from './styles'

let timer
const InfoUser = ({ userInfo, userActive, status, updateImageProfile, updateNameUser }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [showInputUpdateName, setShowInpurtUpdateName] = useState(false)
  const [fileImage, setFileImage] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    userActive._id && socket.on('typing', info => {
      if (info.idUser === userActive._id && info.idConversation === userActive.idConversation) {
        clearTimeout(timer)
        setIsTyping(true)
        timer = setTimeout(() => {
          setIsTyping(false)
        }, 1000)
      }
    })
  }, [userActive._id])

  const renderStatus = () => {
    if (status.hasOwnProperty('_id')) {
      return (
        status.status ?
          <small className='user-status'>
            <b>{isTyping ? 'Digitando...' : 'Online'}</b>
          </small>
          :
          <small style={{ fontSize: 11 }}>
            <b>Visto por último {gethours(status.updatedAt)}</b>
          </small>
      )
    }
  }

  const imageProfileUpdate = async () => {
    if (fileImage) {
      const data = new FormData()
      data.append('imageProfile', fileImage)
      updateImageProfile(data)
      closeUpdateImage()
    }
  }

  const closeUpdateImage = () => {
    setFileImage(null)
    setIsMenuVisible(false)
  }

  const updateName = (e) => {
    e.preventDefault()
    const name = e.target.newName.value
    if (name !== '') {
      updateNameUser(name)
      setShowInpurtUpdateName(false)
      setIsMenuVisible(false)
    }
  }

  return (
    <ConatinerInfo>
      {fileImage && <PreviewImage>
        <div className="close-preview" onClick={closeUpdateImage}>
          <i className="fas fa-times"></i>
        </div>
        <div className="image-content">
          <figure>
            <img src={window.URL.createObjectURL(fileImage)} alt="" />
          </figure>
        </div>
        <Actions>
          <button className='btn' onClick={imageProfileUpdate}>Confirmar</button>
          <button className='btn' onClick={closeUpdateImage}>Cancelar</button>
        </Actions>
      </PreviewImage>}
      {showInputUpdateName && <ModalUpdateName>
        <form action="" onSubmit={updateName}>
          <div className="form-group">
            <input
              type="text"
              name="newName"
              defaultValue={userInfo.name}
              placeholder='Digite um novo nome para o perfil' />
          </div>
          <Actions>
            <button className='btn'>Alterar</button>
            <button className='btn' onClick={() => setShowInpurtUpdateName(false)}>Cancelar</button>
          </Actions>
        </form>
      </ModalUpdateName>}

      <div className="user-conversation">
        {userActive.hasOwnProperty('_id') &&
          <>
            <div className="user-img conversation">
              <img src={userActive.imageProfile ? userActive.imageProfile : 'images/userDefault.png'} alt="" />
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
      <div className="user-logged">
        <div onClick={() => setTimeout(() => setIsMenuVisible(!isMenuVisible), 100)}>
          <i className="fas fa-sort-down"></i>
          <div className="user-info logged">
            {userInfo.name && <h3>{userInfo.name}</h3>}
            {userInfo.email && <p>{userInfo.email}</p>}
          </div>
          <div className="user-img logged">
            <img src={userInfo.imageProfile ? userInfo.imageProfile : 'images/userDefault.png'} alt="" />
          </div>
        </div>
        {isMenuVisible &&
          <UserMenuConfig
            setFileImage={setFileImage}
            setIsMenuVisible={setIsMenuVisible}
            setShowInpurtUpdateName={setShowInpurtUpdateName} />
        }
      </div>
    </ConatinerInfo>
  )
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  status: state.listConversations.status,
  userActive: state.posts.userActive
})

export default connect(mapStateToProps, { updateImageProfile, updateNameUser })(InfoUser)
