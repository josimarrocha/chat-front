import { LOADING_POSTS, NEW_MESSAGE, CLEAN_POSTS_USER, MESSAGE_READ, PREVIOUS_POSTS } from './actionsCreators'

const initialState = {
  posts: {},
  userActive: {}
}

const loadingPosts = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_POSTS: {
      const { userActive, posts } = action.payload
      return {
        ...state,
        ...posts,
        posts: {
          ...state.posts,
          [posts.idConversation]: posts.posts
        },
        userActive: userActive
      }
    }
    case PREVIOUS_POSTS: {
      const { posts } = action.payload
      return {
        ...state,
        ...action.payload.posts,
        posts: {
          ...state.posts,
          [posts.idConversation]: [...posts.posts, ...state.posts[posts.idConversation]]
        },
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
    case CLEAN_POSTS_USER: {
      const { [action.payload]: id, ...tall } = state.posts
      return {
        posts: {
          ...tall
        },
        userActive: {}
      }
    }
    case MESSAGE_READ: {
      const { _id, conversation } = action.payload
      return {
        ...state,
        posts: {
          ...state.posts,
          [conversation]: state.posts[conversation].map(message => message._id === _id
            ? { ...action.payload }
            : message)
        }
      }
    }
    default:
      return state
  }
}

export default loadingPosts