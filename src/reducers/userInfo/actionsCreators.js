import api from '../../config/api'
import io from 'socket.io-client'
import { url } from '../../config/socket.io'
export const LOGIN_USER = 'user:LOGIN_USER'
export const SEARCH_USER = 'user:SEARCH_USER'
export const UPDATE_IMAGE_PROFILE = 'user:UPDATE_IMAGE_PROFILE'

const socket = io(url)
let timer
export const loginUser = (email, password) => async dispatch => {
  let data = { data: '' }
  data = await api.post(`/auth/sign-in`, {
    email,
    password
  })
  localStorage.setItem('@chat@', JSON.stringify({ token: data.data.token }))

  dispatch({
    type: LOGIN_USER,
    payload: data.data
  })
}

export const getInfoUserLogged = () => async dispatch => {
  const user = await api.get('/user')
  clearInterval(timer)
  timer = setInterval(() => {
    socket.emit('online', user.data._id)
  }, 2000)
  dispatch({
    type: LOGIN_USER,
    payload: user.data
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

export const updateImageProfile = (image) => async dispatch => {
  const { data: { newImage } } = await api.put('users/imageProfile', image)
  dispatch({
    type: UPDATE_IMAGE_PROFILE,
    payload: newImage
  })
}