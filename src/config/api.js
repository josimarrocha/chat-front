import axios from 'axios'

const getToken = () => {
  const token = JSON.parse(localStorage.getItem('@chat@'))
  if (token) {
    return axios.create({
      baseURL: 'http://localhost:3333',
      headers: {
        'Authorization': `Bearer ${token.token}`
      }
    })
  } else {
    return axios.create({
      baseURL: 'http://localhost:3333',
    })
  }

}

export default getToken()