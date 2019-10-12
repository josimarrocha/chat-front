import axios from 'axios'
import { url } from './socket.io'
const token = JSON.parse(localStorage.getItem('@chat@'))
let api
if (token) {
  api = axios.create({
    baseURL: url,
    headers: {
      'Authorization': `Bearer ${token.hasOwnProperty('token') ? token.token : ''}`,
    },
  })
} else {
  api = axios.create({
    baseURL: url,
  })
}


export default api