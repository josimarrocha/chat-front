import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { Container } from './styles'
const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true)
  const [messageError, setMessageError] = useState('')
  return (
    <Container>
      <header>
        <div className="logo">
          <i className="fas fa-comments"></i>
          <p>Chat</p>
        </div>
        <div className="login">
          <h1>{isSignIn ? 'Login' : 'Cadastro'}</h1>
        </div>
      </header>
      {isSignIn
        ? <SignIn
          setIsSignIn={setIsSignIn}
          messageError={messageError}
          setMessageError={setMessageError} />
        : <SignUp
          setIsSignIn={setIsSignIn}
          messageError={messageError}
          setMessageError={setMessageError} />}
    </Container>
  )
}

export default Auth
