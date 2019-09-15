import api from '../../config/api'

export const LOADING_POSTS = 'posts:LOADING_POSTS'
export const NEW_MESSAGE = 'posts:NEW_MESSAGE'

export const loadingPosts = (userChatActive) => async dispatch => {
  let messages
  if (userChatActive.idConversation) {
    messages = await api.get(`conversation/messages/${userChatActive.idConversation}`)
  }

  dispatch({
    type: LOADING_POSTS,
    payload: {
      posts: messages ? messages.data : { messages: [], _id: userChatActive.idConversation },
      userActive: userChatActive,
    }
  })
}

export const newMessage = (mensagem) => async dispatch => {
  dispatch({
    type: NEW_MESSAGE,
    payload: mensagem
  })
}