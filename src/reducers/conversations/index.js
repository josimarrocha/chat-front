import { LOADING_CONVERSATIONS, STATUS } from './actionsCreators'

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
    default:
      return state
  }
}

export default conversations