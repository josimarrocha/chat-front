import { LOADING_POSTS, NEW_MESSAGE, CLEAN_POSTS_USER, MESSAGE_READ, PREVIOUS_POSTS, CHANGE_USER_ACTIVE } from './actionsCreators'

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
        posts: {
          ...state.posts,
          [posts.idConversation]: posts
        },
        userActive: userActive
      }
    }
    case CHANGE_USER_ACTIVE:
      return {
        ...state,
        userActive: action.payload
      }
    case PREVIOUS_POSTS: {
      const { posts } = action.payload
      return {
        ...state,
        posts: {
          ...state.posts,
          [posts.idConversation]: {
            ...state.posts[posts.idConversation],
            ...posts,
            posts: [...posts.posts, ...state.posts[posts.idConversation].posts]
          }
        },
      }
    }
    case NEW_MESSAGE: {
      const { conversation } = action.payload
      if (state.posts[conversation]) {
        return {
          ...state,
          posts: {
            ...state.posts,
            [conversation]: {
              ...state.posts[conversation],
              posts: state.posts[conversation].hasOwnProperty('posts') &&
                state.posts[conversation].posts.concat(action.payload)
            }
          }
        }
      }
      return state
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
          [conversation]: {
            ...state.posts[conversation],
            posts: state.posts[conversation].posts.map(message => message._id === _id
              ? { ...action.payload }
              : message)
          }
        }
      }
    }
    default:
      return state
  }
}

export default loadingPosts