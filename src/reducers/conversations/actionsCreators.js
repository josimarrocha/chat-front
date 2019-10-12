import api from '../../config/api'
import socket from '../../config/socket.io'

export const LOADING_CONVERSATIONS = 'conversations:LOADING_CONVERSATIONS'
export const UPDATE_MESSAGES_NOT_READ = 'conversations:UPDATE_MESSAGES_NOT_READ'
export const STATUS = 'convertation:USER_STATUS'

export const loadingConversations = () => async  dispatch => {
  const { data } = await api.get('/conversations')

  dispatch({
    type: LOADING_CONVERSATIONS,
    payload: data
  })
}

export const updateStatus = (cleanStatus) => dispatch => {
  if (cleanStatus) {
    dispatch({
      type: STATUS,
      payload: {}
    })
  } else {
    socket.on('status', status => {
      dispatch({
        type: STATUS,
        payload: status
      })
    })
  }
}

