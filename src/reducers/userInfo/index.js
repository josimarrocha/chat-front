import { LOGIN_USER, SEARCH_USER } from './actionsCreators'

const initialState = {
  serachUsers: []
}

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload
      }
    case SEARCH_USER:
      return {
        ...state,
        serachUsers: action.payload
      }
    default:
      return state
  }
}

export default userInfo