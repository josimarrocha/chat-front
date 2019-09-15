import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../../reducers/userInfo/actionsCreators'
import Form from '../../Form'

const SignIn = ({ loginUser, setIsSignIn, messageError, setMessageError }) => {
  useEffect(() => {
    setMessageError('')
  }, [])

  const login = async (e) => {
    e.preventDefault()
    const { email, password } = e.target
    if (!email.value || !password.value) {
      setMessageError('Preencha os campos corretamente!')
      return false
    }

    await loginUser(email.value, password.value)
    window.location.reload()
  }
  return (
    <Form submit={login} setIsSignIn={setIsSignIn} messageError={messageError} />
  )
}

export default connect(null, { loginUser })(SignIn)
