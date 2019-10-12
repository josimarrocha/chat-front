import { LOADING_CONVERSATIONS, STATUS, UPDATE_MESSAGES_NOT_READ } from './actionsCreators'

const initialState = {
  contacts: [],
  status: {}
}
const conversations = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_CONVERSATIONS:
      return {
        ...state,
        contacts: action.payload
      }
    case STATUS:
      return {
        ...state,
        status: action.payload
      }
    case UPDATE_MESSAGES_NOT_READ:
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.idConversation === action.payload.idConversation
          ? { ...contact, messagesNotRead: action.payload.numberMessages }
          : contact)
      }
    default:
      return state
  }
}

export default conversations