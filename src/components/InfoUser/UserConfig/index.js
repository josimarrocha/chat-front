import React, { useRef, useEffect } from 'react'
import { ConfigList } from './styles'

const MenuConfig = ({ setFileImage, setShowInpurtUpdateName, isMenuVisible, setIsMenuVisible }) => {
  const configRef = useRef()
  useEffect(() => { configRef.current && configRef.current.focus() }, [isMenuVisible])
  const logout = () => {
    localStorage.removeItem('@chat@')
    window.location.reload()
  }

  return (
    <>
      <input
        type="file"
        id="#fileUser" hidden
        onChange={({ target: { files } }) => setFileImage(files[0])} />
      {isMenuVisible &&
        <ConfigList ref={configRef} tabIndex={0} onBlur={() => setIsMenuVisible(false)}>
          <li onClick={() => setShowInpurtUpdateName(true)}>Alterar nome do perfil</li>
          <li>
            <label htmlFor="#fileUser">
              Alterar imagem
        </label></li>
          <li onClick={logout}>Logout</li>
        </ConfigList>}
    </>
  )
}

export default MenuConfig
