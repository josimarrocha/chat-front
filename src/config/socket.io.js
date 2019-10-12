import io from 'socket.io-client'
// export const url = 'https://api-chat-back.herokuapp.com/'
export const url = 'http://localhost:3333'
const socket = io(url)

export default socket
