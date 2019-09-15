import React from 'react'
import { ConfigList } from './styles'

const MenuConfig = () => {
  const logout = () => {
    localStorage.removeItem('@chat@')
    window.location.reload()
  }
  return (
    <ConfigList>
      <li onClick={null}>Alterar imagem</li>
      <li onClick={logout}>Logout</li>
    </ConfigList>
  )
}

export default MenuConfig
