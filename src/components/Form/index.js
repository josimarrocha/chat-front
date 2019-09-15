import React from 'react'
import { FormContainer } from './styles'

const Form = ({ submit, signUp, setIsSignIn, messageError }) => {
  return (
    <FormContainer onSubmit={submit}>
      <span className='error'>{messageError}</span>
      {signUp && <div className="group-input">
        <input type="text" name='name' placeholder='Digite seu nome completo' />
      </div>}
      <div className="group-input">
        <input type="email" name='email' placeholder='Digite seu email' />
      </div>
      <div className="group-input">
        <input type="password" name='password' placeholder='Digite sua senha' />
      </div>
      {signUp && <div className="group-input">
        <input type="password" name='confirmPassword' placeholder='Confirme sua senha' />
      </div>}
      <div className="btn-actions">
        <button
          onClick={() => signUp ? setIsSignIn(true) : setIsSignIn(false)}
          className='btn sign-up'
          type='button'>
          {signUp
            ? <span><i className="fas fa-arrow-left" />Voltar</span>
            : 'Cadastre-se'}
        </button>
        <button className='btn sign-in'>{signUp ? 'Cadastre-se' : 'Login'}</button>
      </div>
    </FormContainer>
  )
}

export default Form
