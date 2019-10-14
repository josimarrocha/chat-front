import React, { useRef, useEffect } from 'react'
import { ConfigList } from './styles'

const MenuConfig = ({ setFileImage, setShowInpurtUpdateName }) => {
  const configRef = useRef()
  useEffect(() => { configRef.current.focus() }, [])
  const logout = () => {
    localStorage.removeItem('@chat@')
    window.location.reload()
  }

  return (
    <>
      <ConfigList ref={configRef}>
        <li onClick={() => setShowInpurtUpdateName(true)}>Alterar nome do perfil</li>
        <li>
          <input
            type="file"
            id="#file" hidden
            onChange={({ target: { files } }) => setFileImage(files[0])} />
          <label htmlFor="#file">
            Alterar imagem
        </label></li>
        <li onClick={logout}>Logout</li>
      </ConfigList>
    </>
  )
}

export default MenuConfig
