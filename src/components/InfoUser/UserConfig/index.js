import React, { useRef, useEffect } from 'react'
import { ConfigList } from './styles'

const MenuConfig = ({ setFileImage }) => {
  const configRef = useRef()
  useEffect(() => { configRef.current.focus() }, [])
  const logout = () => {
    localStorage.removeItem('@chat@')
    window.location.reload()
  }
  return (
    <>
      <ConfigList ref={configRef}>
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
