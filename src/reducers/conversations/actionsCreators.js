import api from '../../config/api'

export const LOADING_CONVERSATIONS = 'conversations:LOADING_CONVERSATIONS'
export const STATUS = 'convertation:USER_STATUS'

export const loadingConversations = () => async  dispatch => {
  const { data } = await api.get('/conversations')

  dispatch({
    type: LOADING_CONVERSATIONS,
    payload: data
  })
}

export const updateStatus = (status) => dispatch => {
  dispatch({
    type: STATUS,
    payload: status
  })
}

