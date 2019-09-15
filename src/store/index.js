import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const logger = () => {
  return window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
}

export default createStore(reducers, {}, compose(applyMiddleware(thunk)))