import { combineReducers } from 'redux'
import userInfo from './userInfo'
import posts from './posts'
import listConversations from './conversations'

export default combineReducers({
  userInfo,
  posts,
  listConversations
})