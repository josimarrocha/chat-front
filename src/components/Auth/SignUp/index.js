import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import api from '../../../config/api'
import { loginUser } from '../../../reducers/userInfo/actionsCreators'
import Form from '../../Form'

const SignUp = ({ setIsSignIn, messageError, setMessageError, loginUser }) => {
  useEffect(() => {
    setMessageError('')
  }, [])
  const register = async (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = e.target
    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
      setMessageError('Todos os campos são obrigatórios!')
      return false
    }

    if (password.value !== confirmPassword.value) {
      setMessageError('Senhas diferentes!')
      return false
    }
    try {
      await api.post('auth/register', {
        name: name.value,
        email: email.value,
        password: password.value
      })
      await loginUser(email.value, password.value)
      window.location.reload()
    } catch (error) {
      setMessageError('Ocorreu um erro ao tentar se cadastrar!')
    }

  }
  return (
    <Form submit={register} setIsSignIn={setIsSignIn} signUp={true} messageError={messageError} />
  )
}

export default connect(null, { loginUser })(SignUp)
