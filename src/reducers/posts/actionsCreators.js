import api from '../../config/api'
import { UPDATE_MESSAGES_NOT_READ } from '../conversations/actionsCreators'
export const LOADING_POSTS = 'posts:LOADING_POSTS'
export const PREVIOUS_POSTS = 'posts:PREVIOUS_POSTS'
export const CLEAN_POSTS_USER = 'posts:CLEAN_POSTS_USER'
export const NEW_MESSAGE = 'posts:NEW_MESSAGE'
export const MESSAGE_READ = 'posts:MESSAGE_READ'


export const loadingPosts = (userChatActive) => async dispatch => {
  let messages
  if (userChatActive.idConversation) {
    messages = await api.get(`conversation/messages/${userChatActive.idConversation}/1`)
  }
  dispatch({
    type: LOADING_POSTS,
    payload: {
      // posts: messages ? messages.data : { messages: [], _id: userChatActive.idConversation },
      posts: messages ? messages.data : { messages: [], _id: userChatActive.idConversation },
      userActive: userChatActive,
    }
  })
}

export const previousPosts = (idConversation, page) => async dispatch => {
  const messages = await api.get(`conversation/messages/${idConversation}/${page}`)
  dispatch({
    type: PREVIOUS_POSTS,
    payload: {
      posts: messages.data
    }
  })
}

export const newMessage = (mensagem) => async dispatch => {
  dispatch({
    type: NEW_MESSAGE,
    payload: mensagem
  })
}

export const cleanPosts = ({ idConversation, idUser }) => async dispatch => {
  console.log(idConversation, idUser)
  await api.delete(`conversation/${idConversation}/${idUser}`)
  dispatch({
    type: CLEAN_POSTS_USER,
    payload: idConversation
  })
}

export const updateMessageRead = ({ message, messagesNotRead }) => dispatch => {
  dispatch({
    type: UPDATE_MESSAGES_NOT_READ,
    payload: {
      numberMessages: messagesNotRead,
      idConversation: message.conversation
    }
  })
  dispatch({
    type: MESSAGE_READ,
    payload: message
  })
}