import { LOADING_POSTS, NEW_MESSAGE } from './actionsCreators'

const initialState = {
  posts: {
    messages: []
  },
  userActive: {}
}

const loadingPosts = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_POSTS: {
      const { userActive, posts } = action.payload
      return {
        ...state,
        posts: {
          ...state.posts,
          [posts._id]: posts.messages
        },
        userActive: userActive
      }
    }
    case NEW_MESSAGE: {
      const { conversation } = action.payload
      return {
        ...state,
        posts: {
          ...state.posts,
          [conversation]: state.posts[conversation]
            ? state.posts[conversation].concat(action.payload)
            : [action.payload]
        }
      }
    }
    default:
      return state
  }
}

export default loadingPosts