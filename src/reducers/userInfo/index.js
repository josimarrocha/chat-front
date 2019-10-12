import { LOGIN_USER, SEARCH_USER, UPDATE_IMAGE_PROFILE } from './actionsCreators'

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
    case UPDATE_IMAGE_PROFILE:
      return {
        ...state,
        imageProfile: action.payload
      }
    default:
      return state
  }
}

export default userInfo