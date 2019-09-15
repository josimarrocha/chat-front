import api from '../../config/api'
import io from 'socket.io-client'
export const LOGIN_USER = 'user:LOGIN_USER'
export const SEARCH_USER = 'user:SEARCH_USER'

const socket = io('http://localhost:3333')

export const loginUser = (email, password) => async dispatch => {
  let data = { data: '' }
  const signIn = JSON.parse(localStorage.getItem('@chat@'))
  if (!signIn) {
    data = await api.post(`/auth/sign-in`, {
      email,
      password
    })
    localStorage.setItem('@chat@', JSON.stringify({ ...data.data }))
  } else {
    data.data = {
      ...signIn
    }
  }
  socket.emit('online', data.data.user._id)

  dispatch({
    type: LOGIN_USER,
    payload: data.data
  })
}

export const searchUser = (query) => async dispatch => {
  let data
  if (query !== '') {
    data = await api.get(`/users/${query}`)
  }

  dispatch({
    type: SEARCH_USER,
    payload: data ? data.data : []
  })
}